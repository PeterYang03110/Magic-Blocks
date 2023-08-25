import axios from 'services/axios';

const getStakingLatestInfo = async chainId => {
  return await axios.post('/staking/latest', { chainId });
};

export { getStakingLatestInfo };
