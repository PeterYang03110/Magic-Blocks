import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';

import * as saleAPI from 'services/api-sale';
import * as purchaseAPI from 'services/api-purchase';
import ERC20_ABI from 'libs/abis/erc20.json';
import INFLUENCE_POINT_TRANSACTOR_ABI from 'libs/abis/influence-point-transactor.json';
import { useContracts } from 'contexts/contract-context';
import { usePopup } from 'contexts/popup-context';
import { useAuth } from 'contexts/auth-context';
import InfluencePurchaseSuccessModal from 'parts/SummaryModal/InfluencePurchaseSuccessModal';
import INFLUENCE_POINT_PACKAGES from 'utils/constants/influence-point-packages';
import getTransactionErrorMessage from 'utils/helpers/getTransactionErrorMessage';

const InfluencePointContext = createContext(null);

export function InfluencePointProvider({ children }) {
  const { library, account, chainId } = useWeb3React();
  const { accessToken } = useAuth();
  const { getBalanceInfo } = useContracts();
  const { setPopUp } = usePopup();

  const [loading, setLoading] = useState(false);
  const [influencePoints, setInfluencePoints] = useState(INFLUENCE_POINT_PACKAGES);
  const [selectedPackage, setSelectedPackage] = useState({});
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const getSupply = useCallback(async () => {
    try {
      const { data: influencePoints = [] } = await saleAPI.getAllSales({
        type: 'INFLUENCE_POINT',
      });

      let newInfluencePoints = [];
      for (const influencePointPackage of INFLUENCE_POINT_PACKAGES) {
        const influencePointInfo = influencePoints.find(
          item => item?.nft?.name === influencePointPackage.name,
        );
        const { prices = [], bonusPercentage = 0, minQuantity = 0 } = influencePointInfo;
        const { storePrice = 0 } = prices[0];

        newInfluencePoints = [
          ...newInfluencePoints,
          {
            ...influencePointPackage,
            ...influencePointInfo,
            price: storePrice,
            amount: Number(minQuantity),
            bonusPercent: Number(bonusPercentage) / 100,
            bonus: (Number(bonusPercentage) * minQuantity) / 100,
          },
        ];
      }
      setInfluencePoints(newInfluencePoints);
    } catch (error) {
      console.log('[Error] getSupply => ', error);
    }
  }, [setInfluencePoints]);

  useEffect(() => {
    getSupply();
  }, [getSupply]);

  const onPurchaseInfluencePoint = useCallback(
    async ipPackage => {
      if (!accessToken || !account || !library) {
        setPopUp({
          isError: true,
          title: 'Wallet Error',
          text: `Please connect to Ethereum chain.`,
        });
        return null;
      }

      setSelectedPackage(ipPackage);
      const isNative = true;
      let purchaseId = '';
      setLoading(true);
      const {
        id: saleId,
        nftId,
        amount: ipAmount,
        nft: { transactorAddress, nftType } = {},
        prices,
      } = ipPackage;
      const { address, decimals, symbol, price = 0 } = isNative ? prices[0] : prices[1];

      try {
        const storeTransactorContract = new ethers.Contract(
          transactorAddress,
          INFLUENCE_POINT_TRANSACTOR_ABI,
          library.getSigner(),
        );

        let tokenBalance;
        const tokenContract = new ethers.Contract(address, ERC20_ABI, library.getSigner());
        if (isNative) {
          tokenBalance = await library.getBalance(account);
        } else {
          tokenBalance = await tokenContract.balanceOf(account);
        }

        const totalPriceNFT = ethers.utils.parseUnits((price * ipAmount).toString(), decimals);
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
          quantity: ipAmount,
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
          nonce,
          totalPrice,
          purchaseId: nonce,
          amount: quantity,
          timestamp,
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
          const purchaseInfo = await storeTransactorContract.purchases(nonce);
          const purchaseInfoValue = Number(purchaseInfo);

          await purchaseAPI.createPurchase(purchaseId, {
            nftType,
            chainId,
            tokens: [purchaseInfoValue],
          });
          getBalanceInfo();
          setPurchaseSuccess(true);

          // Track purchase on Google Analytics
          dataLayer.push({ event: 'purchase', item: ipPackage.name, amount: 1 });
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
        console.log('onPurchaseInfluencePoint => ', error);
        if (!!purchaseId) {
          try {
            await purchaseAPI.createPurchase(purchaseId, {
              nftType,
              chainId,
            });
          } catch (error) {
            console.log('failPurchase => ', error);
            setLoading(false);
          }
        }

        const transactionErrorMessage = getTransactionErrorMessage({
          error: error?.message,
          mainTxErrorMessage: 'There was an error in purchasing influence points. Please try again.',
        });
  
        setPopUp({
          isError: true,
          title: 'Purchase Error',
          text: transactionErrorMessage,
        });
        setLoading(false);

        throw error;        
      }
      setLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      accessToken,
      account,
      library,
      chainId,
      setLoading,
      setPopUp,
      setSelectedPackage,
      setPurchaseSuccess,
      getBalanceInfo,
    ],
  );
  return (
    <InfluencePointContext.Provider
      value={{
        loading,
        influencePoints,
        onPurchaseInfluencePoint,
      }}>
      {purchaseSuccess && (
        <InfluencePurchaseSuccessModal
          open={purchaseSuccess}
          selectedPackage={selectedPackage}
          setSelectedPackage={setSelectedPackage}
          setOpen={setPurchaseSuccess}
        />
      )}
      {children}
    </InfluencePointContext.Provider>
  );
}

export function useInfluencePoint() {
  const context = useContext(InfluencePointContext);
  if (!context) {
    throw new Error('Context not initialized yet!');
  }

  return context;
}
