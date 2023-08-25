import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { ETH_CHAIN_ID } from 'config';

const walletlink = new WalletLinkConnector({
  url: 'homestead',
  appName: 'Magic Blocks Finance',
  appLogoUrl:
    'https://assets.website-files.com/61f837d2703b6406c9213d05/61f837d2703b649ab0213d45_Black logo - no background.png',
});

const injected = new InjectedConnector({ supportedChainIds: [ETH_CHAIN_ID] });
const trustWallet = new InjectedConnector({ supportedChainIds: [ETH_CHAIN_ID] });

const walletConnect = new WalletConnectConnector({
  rpc: {
    1: 'homestead',
  },
  bridge: 'https://bridge.walletconnect.org/',
  qrcode: true,
  pollingInterval: 12000,
});

const DESKTOP_CONNECTORS = {
  MetaMask: injected,
  'Coinbase Wallet': walletlink,
  WalletConnect: walletConnect,
};

const MOBILE_CONNECTORS = {
  MetaMask: injected,
  'Coinbase Wallet': walletlink,
  TrustWallet: trustWallet,
};

const CONNECTORS = {
  MetaMask: injected,
  'Coinbase Wallet': walletlink,
  WalletConnect: walletConnect,
  TrustWallet: trustWallet,
};

export {
  injected,
  trustWallet,
  walletlink,
  walletConnect,
  DESKTOP_CONNECTORS,
  MOBILE_CONNECTORS,
  CONNECTORS,
};
