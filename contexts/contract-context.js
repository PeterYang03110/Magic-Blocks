import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';

import { CONTRACTS } from 'config';
import { useAuth } from 'contexts/auth-context';
import * as influenceAPI from 'services/api-influence';
import ERC20_ABI from 'libs/abis/erc20.json';

const ContractContext = createContext(null);

export function ContractProvider({ children }) {
  const { account, library } = useWeb3React();
  const { accessToken } = useAuth();
  const [balances, setBalances] = useState({});
  const [influenceStats, setInfluenceStats] = useState({});

  const getTokenBalanceInfo = useCallback(async () => {
    if (!account || !library) {
      return;
    }

    try {
      const provider = library.getSigner();
      const fiefTokenContract = new ethers.Contract(CONTRACTS.MABS, ERC20_ABI, provider);
      const stakingTokenContract = new ethers.Contract(CONTRACTS.STAKING, ERC20_ABI, provider);

      const [eth, fief, sFief] = await Promise.all([
        library.getBalance(account),
        fiefTokenContract['balanceOf(address)'](account),
        stakingTokenContract['balanceOf(address)'](account),
      ]);
      const ethBalance = ethers.utils.formatUnits(eth, 18);
      const fiefBalance = ethers.utils.formatUnits(fief, 18);
      const sFiefBalance = ethers.utils.formatUnits(sFief, 18);

      setBalances(prev => ({
        ...prev,
        eth: ethBalance,
        fief: fiefBalance,
        sFief: sFiefBalance,
      }));
    } catch (error) {
      setBalances({});
      console.error('[Error] getTokenBalanceInfo => ', error);
    }
  }, [account, library, setBalances]);

  const getUserBalanceInfo = useCallback(async () => {
    if (!accessToken) {
      return;
    }

    try {
      const [influenceInfo, influenceStats] = await Promise.all([
        influenceAPI.getInfluence(account),
        influenceAPI.getInfluenceStats(account),
      ]);
      const { data: { balance: ipBalance = 0 } = {} } = influenceInfo;
      const { data: influenceStatsData = {} } = influenceStats;

      setBalances(prev => ({
        ...prev,
        ip: ipBalance,
      }));
      setInfluenceStats(influenceStatsData);
    } catch (error) {
      setBalances({});
      setInfluenceStats({});
      console.error('[Error] getUserBalanceInfo => ', error);
    }
  }, [accessToken, account, setInfluenceStats, setBalances]);

  const getBalanceInfo = useCallback(() => {
    getTokenBalanceInfo();
    getUserBalanceInfo();
  }, [getTokenBalanceInfo, getUserBalanceInfo]);

  useEffect(() => {
    if (accessToken && account && library) {
      getBalanceInfo();
    } else {
      setBalances({});
      setInfluenceStats({});
    }
  }, [accessToken, account, library, getBalanceInfo]);

  return (
    <ContractContext.Provider
      value={{
        balances,
        influenceStats,
        getBalanceInfo,
      }}>
      {children}
    </ContractContext.Provider>
  );
}

export function useContracts() {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error('Missing stats context');
  }

  return context;
}
