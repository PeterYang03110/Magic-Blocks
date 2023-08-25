import { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

import AssetPurchaseSuccessModal from 'parts/SummaryModal/AssetPurchaseSuccessModal';
import { ETH_CHAIN_ID } from 'config';
import * as saleAPI from 'services/api-sale';
import * as purchaseAPI from 'services/api-purchase';
import * as contractRegistryAPI from 'services/api-contract-registry';
import * as metadataAPI from 'services/api-metadata';
import BLUEPRINT_TRANSACTOR_ABI from 'libs/abis/blueprint-transactor.json';
import AVATAR_ABI from 'libs/abis/avatar.json';
import { useContracts } from 'contexts/contract-context';
import { usePopup } from 'contexts/popup-context';
import { useAuth } from 'contexts/auth-context';
import { isEmpty } from 'utils/helpers/utility';
import getTransactionErrorMessage from 'utils/helpers/getTransactionErrorMessage';

const AssetsContext = createContext(null);

export function AssetsProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [sales, setSales] = useState([]);
  const [purchasedAsset, setPurchasedAsset] = useState();
  const { library, account, chainId } = useWeb3React();
  const { accessToken } = useAuth();
  const { setPopUp } = usePopup();
  const { getBalanceInfo } = useContracts();
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [contractRegistry, setContractRegistry] = useState({});
  const {
    balances: { ip: ipBalance = 0 },
  } = useContracts();
  const [freeSale, setFreeSale] = useState(false);
  const [userAvatars, setAvatars] = useState([]);
  const [rewardAvailableWallet, setRewardAvailableWallet] = useState(false);

  const getSales = useCallback(async () => {
    try {
      const { data: sales = [] } = await saleAPI.getAllSales({
        type: 'BLUEPRINT_RECIPE',
      });
      setSales(sales);

      const freeSale = sales.find(sale => sale.discountPercentage === '100');
      if (freeSale) {
        setFreeSale(freeSale);
        setRewardAvailableWallet(true);
      }
    } catch (error) {
      console.log('[Error] getSales => ', error);
    }
  }, [setSales]);

  useEffect(() => {
    getSales();
  }, [getSales]);

  const getUserAvatars = useCallback(async () => {
    try {
      const { data: avatars = [] } = await saleAPI.getAllSales({
        type: 'AVATAR',
      });
      if (!isEmpty(avatars)) {
        const {
          nftId,
          nft: { contractAddress = '' },
        } = avatars[0];
        const { data: contractRegistry = {} } =
          await contractRegistryAPI.getContractRegistryByAddress(ETH_CHAIN_ID, contractAddress);

        const tokenContract = new ethers.Contract(contractAddress, AVATAR_ABI, library.getSigner());

        const avatarIds = await tokenContract.tokensOfOwner(account);

        if (avatarIds.length) {
          const rewardAvailableWallet = await saleAPI.checkRewardAvailablePerAccount(
            account,
            nftId,
            freeSale.nftId,
            freeSale.id,
          );
          setRewardAvailableWallet(rewardAvailableWallet.data.length ? false : true);
        }

        let avatarInfos = await Promise.all(
          avatarIds.map(async tokenId => {
            try {
              const metadataInfo = await metadataAPI.getMetadataInfo(contractRegistry.id, tokenId);

              return {
                ...metadataInfo,
                tokenId: tokenId.toNumber(),
                contractAddress: contractAddress,
                chainId: chainId,
                avatarId: nftId,
              };
            } catch (error) {
              console.log('[Error] getMetadataInfo => ', error);
            }
          }),
        );

        avatarInfos = avatarInfos.filter(avatar => !!avatar);
        setAvatars(avatarInfos);
      }
    } catch (error) {
      console.log('[Error] getUserAvatars => ', error);
    }
  }, [library, account, freeSale, chainId]);

  useEffect(() => {
    if (freeSale && accessToken && account) {
      getUserAvatars();
    }
  }, [freeSale, accessToken, account, getUserAvatars]);

  const getContractRegistry = useCallback(
    async asset => {
      try {
        const { contractAddress } = asset.nft;
        const { data: contractRegistry = {} } =
          await contractRegistryAPI.getContractRegistryByAddress(ETH_CHAIN_ID, contractAddress);
        setContractRegistry(contractRegistry);
      } catch (error) {
        console.log('[Error] getContractRegistry => ', error);
      }
    },
    [setContractRegistry],
  );

  const handleClosePurchaseSuccess = () => {
    setPurchaseSuccess(false);
    setPurchasedAsset();
  };

  const onPurchaseAsset = useCallback(
    async (asset, avatar) => {
      if (!accessToken || !account || !library) {
        setPopUp({
          isError: true,
          title: 'Wallet Error',
          text: `Please connect to Ethereum chain.`,
        });
        return null;
      }

      if (isEmpty(asset)) {
        setPopUp({
          isError: true,
          title: 'Service Error',
          text: `There is no Avatar data.`,
        });
        return null;
      }

      let purchaseId = '';
      setLoading(true);
      const {
        id,
        nftId,
        nft: { nftType = '', contractAddress, transactorAddress },
        prices,
      } = asset;
      const { symbol } = prices[0];
      try {
        const storeTransactorContract = new ethers.Contract(
          transactorAddress,
          BLUEPRINT_TRANSACTOR_ABI,
          library.getSigner(),
        );

        let params = {
          id: nftId,
          saleId: id,
          sender: account.toLowerCase(),
          nftType,
          quantity: 1,
          paymentToken: symbol,
          chainId,
        };

        if (avatar) {
          params = {
            ...params,
            metadata: {
              avatarTokenId: avatar.tokenId,
              avatarId: avatar.avatarId,
            },
          };
        }

        const { data } = await purchaseAPI.purchaseNFT(params);
        const {
          id: pId,
          sender,
          signer,
          paymentToken,
          nonce,
          totalPrice,
          quantity,
          signature,
          timestamp,
        } = data;

        purchaseId = pId;

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
          mustTransferTokens: false,
          signature,
        };

        const estimatedGasLimit = await storeTransactorContract.estimateGas.buyTokens(params);
        const gasLimit = parseInt(estimatedGasLimit.toNumber() * 1.2, 10);
        const tokenBuy = await storeTransactorContract.buyTokens(params, {
          gasLimit,
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
          await getContractRegistry(asset);
          getBalanceInfo();
          setPurchasedAsset(asset);
          setPurchaseSuccess(true);

          // Track purchase on Google Analytics
          dataLayer.push({ event: 'purchase', item: asset.name, amount: 1 });

          getSales();
        } else {
          await purchaseAPI.createPurchase(purchaseId, {
            nftType,
            chainId,
          });
          setPopUp({
            isError: true,
            title: 'Error',
            text: 'There was an error in purchasing this asset. Please try again.',
          });
        }
      } catch (error) {
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
          mainTxErrorMessage: 'There was an error in purchasing this asset. Please try again.',
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
      setPurchaseSuccess,
      getBalanceInfo,
      ipBalance,
    ],
  );

  return (
    <AssetsContext.Provider
      value={{
        loading,
        sales,
        rewardAvailableWallet,
        userAvatars,
        getUserAvatars,
        onPurchaseAsset,
      }}>
      {purchaseSuccess && (
        <AssetPurchaseSuccessModal
          open={purchaseSuccess}
          contractRegistry={contractRegistry}
          closeModal={handleClosePurchaseSuccess}
          purchasedAsset={purchasedAsset}
        />
      )}
      {children}
    </AssetsContext.Provider>
  );
}

export function useAsset() {
  const context = useContext(AssetsContext);
  if (!context) {
    throw new Error('Context not initialized yet!');
  }

  return context;
}
