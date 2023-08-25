import axios from 'services/axios';

const purchaseNFT = async params => {
  return await axios.post('/purchase', params);
};

const createPurchase = async (id, params) => {
  return await axios.put(`/purchase/${id}`, params);
};

const updatePurchase = async (id, params) => {
  return await axios.put(`/purchase/${id}/tx`, params);
};

export { purchaseNFT, createPurchase, updatePurchase };
