import { InjectedConnector } from '@web3-react/injected-connector';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import { UnsupportedChainIdError } from '@web3-react/core';

import { ETHEREUM_PARAMS, ETH_CHAIN_ID } from 'config';
import MESSAGES from 'utils/constants/messages';

const injected = new InjectedConnector({
  supportedChainIds: [ETH_CHAIN_ID],
});

export const getNetworkName = chainId => {
  switch (parseInt(chainId)) {
    case 1:
    case 5:
      return 'Ethereum';
    default:
      return 'Wrong Network';
  }
};

export const getNetworkToken = chainId => {
  switch (parseInt(chainId)) {
    case 1:
    case 5:
      return 'ETH';
    default:
      return 'NoIcon';
  }
};

export const addChainNetwork = async chainParam => {
  try {
    const provider = await injected.getProvider();
    if (parseInt(chainParam.chainId) === ETH_CHAIN_ID) {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainParam.chainId }],
      });
    } else {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [chainParam],
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleConnectionError = error => {
  if (error instanceof NoEthereumProviderError) {
    return {
      message: MESSAGES.CONNECT_NO_ETHEREUM_PROVIDER_ERROR,
      button: 'Download Metamask',
    };
  } else if (error instanceof UnsupportedChainIdError) {
    return {
      message: MESSAGES.CONNECT_UNSUPPORTED_CHAIN_ID_ERROR,
      button: 'Switch to Ethereum Chain',
      confirmAction: addChainNetwork(ETHEREUM_PARAMS),
    };
  } else if (error instanceof UserRejectedRequestErrorInjected) {
    return {
      message: MESSAGES.CONNECT_ACCESS_BINANCE_ERROR,
      button: 'OK',
    };
  } else {
    return {
      message: MESSAGES.CONNECT_UNKNOWN_ERROR,
      button: 'OK',
    };
  }
};
