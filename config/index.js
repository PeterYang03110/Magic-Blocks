import { ethers } from 'ethers';

const IS_MAINNET = process.env.NETWORK === 'mainnet';

const ETH_CHAIN_ID = IS_MAINNET ? 1 : 5;

const CONTRACTS = IS_MAINNET
  ? {
      MABS: '0xeA068Fba19CE95f12d252aD8Cb2939225C4Ea02D',
      STAKING: '0xa886c732703700efcbd8438768822c8e716cb0ec',
      FEE_DISTRIBUTOR: '0xb32860c72f61db7e3c97a8db688ecf38104c43a7',
    }
  : {
      MABS: '0x993098827230A364C0F68a34218A733762e069C6',
      STAKING: '0x06731726a6e5444bf47b337a3799a161b0e07eeb',
      FEE_DISTRIBUTOR: '0x3Cd2e1e85437EC5A8cA6920F9907dA4344795441',
    };

const ETHSCAN_URL = IS_MAINNET ? 'https://etherscan.io' : 'https://goerli.etherscan.io';
const ETH_RPC_URL = IS_MAINNET ? 'homestead' : 'goerli';
const ETH_PROVIDER = new ethers.providers.getDefaultProvider(ETH_RPC_URL);

const ETHEREUM_PARAMS = {
  chainId: IS_MAINNET ? '0x1' : '0x5',
  chainName: 'Ethereum Network',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: [ETH_RPC_URL],
  blockExplorerUrls: [ETHSCAN_URL],
};

const PROXY_URL = IS_MAINNET ? 'https://api.fiefapi.net/' : 'https://dev-api.fiefapi.net/';
const ASSETS_URL = IS_MAINNET ? 'https://assets.fiefapi.net/' : 'https://dev-assets.fiefapi.net/';
const OPENSEA_URL = IS_MAINNET ? 'https://opensea.io' : 'https://testnets.opensea.io';
const COLLECTION_NAME = IS_MAINNET ? 'fief-avatars-high-fantasy' : 'fief-avatars-high-fantasy-1';
const BLUEPRINT_COLLECTION_NAME = IS_MAINNET ? 'fief-blueprints-and-recipes' : 'fief-blueprint';
const FIEF_SURVIVAL_LINK = IS_MAINNET
  ? 'https://assets.fiefapi.net/launcher/fief-launcher-setup.exe'
  : 'https://dev-assets.fiefapi.net/fief-launcher/fief-launcher-setup.exe';

export {
  IS_MAINNET,
  ETH_CHAIN_ID,
  CONTRACTS,
  ETHSCAN_URL,
  ETH_RPC_URL,
  ETH_PROVIDER,
  ETHEREUM_PARAMS,
  PROXY_URL,
  ASSETS_URL,
  OPENSEA_URL,
  COLLECTION_NAME,
  BLUEPRINT_COLLECTION_NAME,
  FIEF_SURVIVAL_LINK,
};
