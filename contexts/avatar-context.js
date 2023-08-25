import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';

import { ETH_CHAIN_ID } from 'config';
import * as saleAPI from 'services/api-sale';
import * as purchaseAPI from 'services/api-purchase';
import * as contractRegistryAPI from 'services/api-contract-registry';
import ERC20_ABI from 'libs/abis/erc20.json';
import AVATAR_TRANSACTOR_ABI from 'libs/abis/avatar-transactor.json';
import { useContracts } from 'contexts/contract-context';
import { usePopup } from 'contexts/popup-context';
import { useAuth } from 'contexts/auth-context';
import { useAsset } from './asset-context';
import AvatarPurchaseSuccessModal from 'parts/SummaryModal/AvatarPurchaseSuccessModal';
import { isEmpty } from 'utils/helpers/utility';

const AvatarContext = createContext(null);

export function AvatarProvider({ children }) {
  const { library, account, chainId } = useWeb3React();
  const { accessToken } = useAuth();
  const { getBalanceInfo } = useContracts();
  const { getUserAvatars } = useAsset();
  const { setPopUp } = usePopup();

  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState({});
  const [contractRegistry, setContractRegistry] = useState({});
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [purchaseTokenIds, setPurchaseTokenIds] = useState([]);

  const getSupply = useCallback(async () => {
    try {
      const { data: avatars = [] } = await saleAPI.getAllSales({
        type: 'AVATAR',
      });

      if (!isEmpty(avatars)) {
        const { prices = [] } = avatars[0];
        const { price = 0 } = prices[0];
        setAvatar({ ...avatars[0], prices, price });
      }
    } catch (error) {
      console.log('[Error] getSupply => ', error);
    }
  }, [setAvatar]);

  useEffect(() => {
    getSupply();
  }, [getSupply]);

  const getContractRegistry = useCallback(async () => {
    try {
      const {
        nft: { contractAddress = '' },
      } = avatar;
      const { data: contractRegistry = {} } =
        await contractRegistryAPI.getContractRegistryByAddress(ETH_CHAIN_ID, contractAddress);
      setContractRegistry(contractRegistry);
    } catch (error) {
      console.log('[Error] getContractRegistry => ', error);
    }
  }, [avatar, setContractRegistry]);

  useEffect(() => {
    if (!isEmpty(avatar) && accessToken) {
      getContractRegistry();
    }
  }, [avatar, accessToken, getContractRegistry]);

  const onPurchaseAvatar = useCallback(
    async avatarAmount => {
      if (!accessToken || !account || !library) {
        setPopUp({
          isError: true,
          title: 'Wallet Error',
          text: `Please connect to Ethereum chain.`,
        });
        return null;
      }

      if (isEmpty(avatar)) {
        setPopUp({
          isError: true,
          title: 'Service Error',
          text: `There is no Avatar data.`,
        });
        return null;
      }

      setSelectedAmount(avatarAmount);
      const isNative = true;
      let purchaseId = '';
      setLoading(true);
      const {
        id: saleId,
        nftId,
        nft: { transactorAddress, contractAddress, nftType } = {},
        prices,
      } = avatar;
      const { address, decimals, symbol, price = 0 } = isNative ? prices[0] : prices[1];

      try {
        const storeTransactorContract = new ethers.Contract(
          transactorAddress,
          AVATAR_TRANSACTOR_ABI,
          library.getSigner(),
        );

        let tokenBalance;
        const tokenContract = new ethers.Contract(address, ERC20_ABI, library.getSigner());
        if (isNative) {
          tokenBalance = await library.getBalance(account);
        } else {
          tokenBalance = await tokenContract.balanceOf(account);
        }

        const totalPriceNFT = ethers.utils.parseUnits((price * avatarAmount).toString(), decimals);
        if (totalPriceNFT.gt(tokenBalance)) {
          setPopUp({
            isError: true,
            title: 'Balance Error',
            text: `Please check balance of token on your wallet.`,
          });
          setLoading(false);
          return;
        }

        let params = {
          id: nftId,
          saleId,
          sender: account.toLowerCase(),
          nftType,
          quantity: avatarAmount,
          paymentToken: symbol,
          chainId,
        };

        const {
          data: {
            id: pId,
            sender,
            signer,
            paymentToken,
            nonce,
            totalPriceDisplay,
            totalPrice,
            quantity,
            signature,
            timestamp,
          },
        } = await purchaseAPI.purchaseNFT(params);

        purchaseId = pId;
        if (!isNative) {
          const amount = ethers.utils.parseUnits(totalPriceDisplay, decimals);
          const tokenAllowance = await tokenContract.allowance(account, transactorAddress);
          if (tokenAllowance.lt(amount)) {
            const tokenApprove = await tokenContract.approve(
              transactorAddress,
              ethers.constants.MaxUint256,
            );
            const transactionApprove = await tokenApprove.wait(1);

            if (!transactionApprove.status) {
              setLoading(false);
              setPopUp({
                isError: true,
                title: 'Error',
                text: `There is an Error in Approved Transaction`,
              });
              return;
            }
          }
        }

        params = {
          sender,
          signer,
          paymentToken,
          nft: contractAddress,
          nonce,
          totalPrice,
          purchaseId: nonce,
          amount: quantity,
          timestamp,
          mustTransferTokens: true,
          signature,
        };

        const estimatedGasLimit = await storeTransactorContract.estimateGas.buyTokens(params, {
          value: totalPrice,
        });
        const gasLimit = parseInt(estimatedGasLimit.toNumber() * 1.2, 10);
        const tokenBuy = await storeTransactorContract.buyTokens(params, {
          gasLimit,
          value: totalPrice,
        });
        const transactionBuy = await tokenBuy.wait(1);

        if (transactionBuy.status) {
          const purchaseInfo = await storeTransactorContract.getPurchaseInfo(nonce);
          const purchasedTokenIds = purchaseInfo.map(tokenId => tokenId.toNumber());

          await purchaseAPI.createPurchase(purchaseId, {
            nftType,
            chainId,
            tokens: purchasedTokenIds,
          });
          getBalanceInfo();
          setPurchaseSuccess(true);
          // Track purchase on Google Analytics
          dataLayer.push({ event: 'purchase', item: 'AVATAR', amount: avatarAmount });
          setPurchaseTokenIds(purchasedTokenIds);
          getUserAvatars();
        } else {
          await purchaseAPI.createPurchase(purchaseId, {
            nftType,
            chainId,
          });
          setPopUp({
            isError: true,
            title: 'Error',
            text: 'There is an error in purchasing NFT',
          });
        }
      } catch (error) {
        console.log('onPurchaseAvatar => ', error);
        if (!!purchaseId) {
          try {
            await purchaseAPI.createPurchase(purchaseId, {
              nftType,
              chainId,
            });
            getSupply();
          } catch (error) {
            console.log('failPurchase => ', error);
            setLoading(false);
          }
        }

        setPopUp({
          isError: true,
          title: 'Purchase Error',
          text: 'There is an error in purchasing NFT',
        });
        setLoading(false);
      }
      setLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      accessToken,
      account,
      library,
      chainId,
      avatar,
      setLoading,
      setPopUp,
      setSelectedAmount,
      setPurchaseSuccess,
      setPurchaseTokenIds,
      getBalanceInfo,
    ],
  );
  return (
    <AvatarContext.Provider
      value={{
        loading,
        avatar,
        onPurchaseAvatar,
      }}>
      {purchaseSuccess && (
        <AvatarPurchaseSuccessModal
          open={purchaseSuccess}
          setOpen={setPurchaseSuccess}
          contractRegistry={contractRegistry}
          amount={selectedAmount}
          purchaseTokenIds={purchaseTokenIds}
          setPurchaseTokenIds={setPurchaseTokenIds}
        />
      )}
      {children}
    </AvatarContext.Provider>
  );
}

export function useAvatar() {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('Context not initialized yet!');
  }

  return context;
}
