import axios from 'services/axios';

const getInfluence = async address => {
  return await axios.get(`/influence/${address.toLowerCase()}`);
};

const getInfluenceStats = async address => {
  return await axios.get(`/influence/${address.toLowerCase()}/stats`);
};

const increaseInfluence = async address => {
  return await axios.post(`/influence/${address.toLowerCase()}/stakenotice`);
};

export { getInfluence, getInfluenceStats, increaseInfluence };
