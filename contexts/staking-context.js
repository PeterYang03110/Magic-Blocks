import { createContext, useState, useContext, useMemo, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { parseEther } from 'ethers/lib/utils';

import { CONTRACTS, ETH_CHAIN_ID } from 'config';
import * as stakingAPI from 'services/api-staking';
import * as influenceAPI from 'services/api-influence';
import ERC20_ABI from 'libs/abis/erc20.json';
import STAKING_ABI from 'libs/abis/staking.json';
import FEE_DISTRIBUTOR_ABI from 'libs/abis/fee-distributor.json';
import { useContracts } from 'contexts/contract-context';
import { usePopup } from 'contexts/popup-context';
import { useAuth } from 'contexts/auth-context';
import { getEpochSecondForDay } from 'utils/helpers/date';
import getTransactionErrorMessage from 'utils/helpers/getTransactionErrorMessage';

const StakingContext = createContext(null);

export function StakingProvider({ children }) {
  const { library, account } = useWeb3React();
  const { accessToken } = useAuth();
  const { getBalanceInfo } = useContracts();
  const { setPopUp } = usePopup();

  const [loading, setLoading] = useState(false);
  const [lockedAmount, setLockedAmount] = useState(0);
  const [lockEndDate, setLockEndDate] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [userClaimable, setUserClaimable] = useState(0);
  const [stakingInfo, setStakingInfo] = useState({});

  const unlockTime = useMemo(() => {
    const date = new Date();
    return date.setTime(+(lockEndDate?.toString() || 0) * 1000);
  }, [lockEndDate]);

  const isLocked = useMemo(() => Boolean(+(lockEndDate?.toString() || 0)), [lockEndDate]);

  const isExpired = useMemo(
    () => (unlockTime ? new Date(unlockTime) < new Date() : false),
    [unlockTime],
  );

  useEffect(() => {
    if (!account || !library) {
      setLockedAmount(0);
      setLockEndDate(0);
      setUserClaimable(0);
    }
  }, [account, library]);

  const getStakingLatestInfo = useCallback(async () => {
    try {
      const { data = {} } = await stakingAPI.getStakingLatestInfo(ETH_CHAIN_ID);
      setStakingInfo(data);
    } catch (error) {
      console.log('[Error] getStakingLatestInfo => ', error);
    }
  }, [setStakingInfo]);

  useEffect(() => {
    getStakingLatestInfo();
    const intervalId = setInterval(getStakingLatestInfo, 30 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [getStakingLatestInfo]);

  const getFeeDistributorInfo = useCallback(async () => {
    if (!account || !library) {
      return;
    }

    try {
      const feeDistributorContract = new ethers.Contract(
        CONTRACTS.FEE_DISTRIBUTOR,
        FEE_DISTRIBUTOR_ABI,
        library.getSigner(),
      );

      const userClaimable = await feeDistributorContract.callStatic['claim(address)'](account, {
        gasLimit: 1000000,
      });
      const userClaimableValue = ethers.utils.formatUnits(userClaimable, 18);
      setUserClaimable(userClaimableValue);
    } catch (error) {
      console.log('[Error] getFeeDistributorInfo => ', error);
    }
  }, [account, library, setUserClaimable]);

  const getStakingInfo = useCallback(async () => {
    if (!account || !library) {
      return;
    }
    try {
      const stakingContract = new ethers.Contract(
        CONTRACTS.STAKING,
        STAKING_ABI,
        library.getSigner(),
      );
      const [lockStats, totalSupply] = await Promise.all([
        stakingContract.locked(account, { gasLimit: 1000000 }),
        stakingContract['totalSupply()']({ gasLimit: 1000000 }),
      ]);

      const lockedAmount = ethers.utils.formatUnits(lockStats?.amount, 18);
      const lockEndDate = ethers.utils.formatUnits(lockStats?.end, 0);
      const totalSupplyValue = ethers.utils.formatUnits(totalSupply, 18);
      setLockedAmount(lockedAmount);
      setLockEndDate(lockEndDate);
      setTotalSupply(totalSupplyValue);
    } catch (error) {
      console.log('[Error] getStakingInfo => ', error);
    }
  }, [account, library, setLockedAmount, setLockEndDate, setTotalSupply]);

  useEffect(() => {
    if (account && library) {
      getFeeDistributorInfo();
      getStakingInfo();
    }
  }, [account, library, getFeeDistributorInfo, getStakingInfo]);

  const claim = useCallback(async () => {
    if (!accessToken || !account || !library) {
      return;
    }

    setLoading(true);
    try {
      const feeDistributorContract = new ethers.Contract(
        CONTRACTS.FEE_DISTRIBUTOR,
        FEE_DISTRIBUTOR_ABI,
        library.getSigner(),
      );
      const gasLimit = await feeDistributorContract.estimateGas['claim()']();
      const tokenClaim = await feeDistributorContract['claim()']({ gasLimit });
      const transactionClaim = await tokenClaim.wait(1);

      if (transactionClaim.status) {
        await influenceAPI.increaseInfluence(account);
        await getBalanceInfo();
        await getFeeDistributorInfo();
        await getStakingLatestInfo();
      }
    } catch (error) {
      console.log('[Error] claim => ', error);
      const transactionErrorMessage = getTransactionErrorMessage({
        error: error?.message,
        mainTxErrorMessage: 'There is an error in claiming Rewards',
      });

      setPopUp({
        isError: true,
        title: 'Claim Error',
        text: transactionErrorMessage,
      });
    }
    setLoading(false);
  }, [
    accessToken,
    account,
    library,
    getFeeDistributorInfo,
    getBalanceInfo,
    getStakingLatestInfo,
    setPopUp,
  ]);

  const createLock = useCallback(
    async data => {
      if (!accessToken || !account || !library) {
        return;
      }

      setLoading(true);
      try {
        const { balance, date } = data;
        const amount = parseEther(balance.toString());
        const fiefContract = new ethers.Contract(CONTRACTS.MABS, ERC20_ABI, library.getSigner());
        const allowance = await fiefContract.allowance(account, CONTRACTS.STAKING);
        if (amount.gt(allowance)) {
          const tokenApprove = await fiefContract.approve(
            CONTRACTS.STAKING,
            ethers.constants.MaxUint256,
          );

          const transactionApprove = await tokenApprove.wait(1);
          if (!transactionApprove.status) {
            setLoading(false);
            setPopUp({
              isError: true,
              title: 'Approve Error',
              text: 'There is an error in Approving MABS Token',
            });
            return;
          }
        }

        const lockedDate = getEpochSecondForDay(new Date(date));
        const stakingContract = new ethers.Contract(
          CONTRACTS.STAKING,
          STAKING_ABI,
          library.getSigner(),
        );

        const gasLimit = await stakingContract.estimateGas.create_lock(amount, lockedDate);
        const tokenLock = await stakingContract.create_lock(amount, lockedDate, { gasLimit });
        const transactionLock = await tokenLock.wait(1);

        if (transactionLock.status) {
          await influenceAPI.increaseInfluence(account);
          await getBalanceInfo();
          await getStakingInfo();
          await getStakingLatestInfo();
        }
      } catch (error) {
        console.log('[Error] createLock => ', error);
        const transactionErrorMessage = getTransactionErrorMessage({
          error: error?.message,
          mainTxErrorMessage: 'There is an error in Staking MABS Token',
          exceptionTxErrorMessages: [
            {
              error: 'execution reverted: Withdraw old tokens first',
              message: 'You should withdraw locked tokens first',
            },
          ],
        });

        setPopUp({
          isError: true,
          title: 'Staking Error',
          text: transactionErrorMessage,
        });
      }
      setLoading(false);
    },
    [accessToken, account, library, getBalanceInfo, getStakingInfo, getStakingLatestInfo, setPopUp],
  );

  const increaseAmount = useCallback(
    async data => {
      if (!accessToken || !account || !library) {
        return;
      }

      setLoading(true);
      try {
        const amount = parseEther(data.balance.toString());
        const fiefContract = new ethers.Contract(CONTRACTS.MABS, ERC20_ABI, library.getSigner());
        const allowance = await fiefContract.allowance(account, CONTRACTS.STAKING);
        if (amount.gt(allowance)) {
          const tokenApprove = await fiefContract.approve(
            CONTRACTS.STAKING,
            ethers.constants.MaxUint256,
          );

          const transactionApprove = await tokenApprove.wait(1);
          if (!transactionApprove.status) {
            setLoading(false);
            setPopUp({
              isError: true,
              title: 'Approve Error',
              text: 'There is an error in Approving MABS Token',
            });
            return;
          }
        }

        const stakingContract = new ethers.Contract(
          CONTRACTS.STAKING,
          STAKING_ABI,
          library.getSigner(),
        );
        const gasLimit = await stakingContract.estimateGas.increase_amount(amount);
        const tokenIncrease = await stakingContract.increase_amount(amount, { gasLimit });
        const transactionIncrease = await tokenIncrease.wait(1);

        if (transactionIncrease.status) {
          await influenceAPI.increaseInfluence(account);
          await getBalanceInfo();
          await getStakingInfo();
          await getStakingLatestInfo();
        }
      } catch (error) {
        console.log('[Error] increaseAmount => ', error);
        const transactionErrorMessage = getTransactionErrorMessage({
          error: error?.message,
          mainTxErrorMessage: 'There is an error in Increasing Amount',
        });

        setPopUp({
          isError: true,
          title: 'Staking Error',
          text: transactionErrorMessage,
        });
      }
      setLoading(false);
    },
    [accessToken, account, library, getBalanceInfo, getStakingInfo, getStakingLatestInfo, setPopUp],
  );

  const increaseTime = useCallback(
    async data => {
      if (!accessToken || !account || !library) {
        return;
      }

      setLoading(true);
      try {
        const lockedDate = getEpochSecondForDay(new Date(data.date));
        const stakingContract = new ethers.Contract(
          CONTRACTS.STAKING,
          STAKING_ABI,
          library.getSigner(),
        );
        const gasLimit = await stakingContract.estimateGas.increase_unlock_time(lockedDate);
        const tokenIncrease = await stakingContract.increase_unlock_time(lockedDate, {
          gasLimit,
        });
        const transactionIncrease = await tokenIncrease.wait(1);

        if (transactionIncrease.status) {
          await influenceAPI.increaseInfluence(account);
          await getBalanceInfo();
          await getStakingInfo();
          await getStakingLatestInfo();
        }
      } catch (error) {
        console.log('[Error] increaseTime => ', error);
        const transactionErrorMessage = getTransactionErrorMessage({
          error: error?.message,
          mainTxErrorMessage: 'There is an error in Increasing Time',
        });

        setPopUp({
          isError: true,
          title: 'Staking Error',
          text: transactionErrorMessage,
        });
      }
      setLoading(false);
    },
    [accessToken, account, library, getBalanceInfo, getStakingInfo, getStakingLatestInfo, setPopUp],
  );

  const withdraw = useCallback(async () => {
    if (!accessToken || !account || !library) {
      return;
    }

    setLoading(true);
    try {
      const stakingContract = new ethers.Contract(
        CONTRACTS.STAKING,
        STAKING_ABI,
        library.getSigner(),
      );
      const gasLimit = await stakingContract.estimateGas.withdraw();
      const tokenWithdraw = await stakingContract.withdraw({ gasLimit });
      const transactionWithdraw = await tokenWithdraw.wait(1);

      if (transactionWithdraw.status) {
        await influenceAPI.increaseInfluence(account);
        await getBalanceInfo();
        await getStakingInfo();
        await getStakingLatestInfo();
      }
    } catch (error) {
      console.log('[Error] withdraw => ', error);
      const transactionErrorMessage = getTransactionErrorMessage({
        error: error?.message,
        mainTxErrorMessage: 'There is an error in Withdrawing',
      });

      setPopUp({
        isError: true,
        title: 'Withdraw Error',
        text: transactionErrorMessage,
      });
    }
    setLoading(false);
  }, [
    accessToken,
    account,
    library,
    getBalanceInfo,
    getStakingInfo,
    getStakingLatestInfo,
    setPopUp,
  ]);

  return (
    <StakingContext.Provider
      value={{
        loading,
        lockedAmount,
        lockEndDate,
        totalSupply,
        unlockTime,
        isLocked,
        isExpired,
        userClaimable,
        stakingInfo,
        claim,
        createLock,
        increaseAmount,
        increaseTime,
        withdraw,
      }}>
      {children}
    </StakingContext.Provider>
  );
}

export function useStaking() {
  const context = useContext(StakingContext);
  if (!context) {
    throw new Error('Context not initialized yet!');
  }

  return context;
}
