import axios from 'services/axios';

const getAllSales = async (params = {}) => {
  return await axios.get('/sale', { params });
};

const checkRewardAvailableFreeBlueprint = async (nftId, tokenId, blueprintId) => {
  return await axios.get(`/reward?nftId=${nftId}&nftTokenId=${tokenId}&rewardId=${blueprintId}`);
};

const checkRewardAvailablePerUser = async (userId, nftId, blueprintId) => {
  return await axios.get(`/reward?userId=${userId}&nftId=${nftId}&rewardId=${blueprintId}`);
};

const checkRewardAvailablePerAccount = async (wallet, nftId, blueprintId, saleId) => {
  return await axios.get(`/reward?wallet=${wallet}&nftId=${nftId}&rewardId=${blueprintId}&saleId=${saleId}`);
};


export { getAllSales, checkRewardAvailableFreeBlueprint, checkRewardAvailablePerUser, checkRewardAvailablePerAccount };
