import axios from 'services/axios';

const getAllContractRegistries = async chainId => {
  return await axios.get(`/contract-registry/${chainId}`);
};

const getContractRegistryByAddress = async (chainId, address) => {
  return await axios.get(`/contract-registry/${chainId}/${address}`);
};

export { getAllContractRegistries, getContractRegistryByAddress };
