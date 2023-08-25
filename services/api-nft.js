import axios from 'services/axios';

const getAllNFTs = async (chainId, params = {}) => {
  return await axios.get(`/chain/${chainId}/nft`, { params });
};

const getNFTById = async id => {
  return await axios.get(`/nft/${id}`);
};

const getNFTTypes = async () => {
  return await axios.get('/nft/types');
};

export { getAllNFTs, getNFTById, getNFTTypes };
