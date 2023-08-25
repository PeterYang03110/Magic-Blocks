import axios from 'axios';

import { ASSETS_URL } from 'config';

const apiAxios = axios.create({
  baseURL: ASSETS_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

apiAxios.interceptors.response.use(response => {
  return response.data;
});

const getMetadataInfo = async (registryId, tokenId) => {
  return await apiAxios.get(`/nft/${registryId}/metadata/${tokenId}`);
};

export { getMetadataInfo };
