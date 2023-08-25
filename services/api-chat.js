import axios from 'services/axios';

const chatSignUp = async params => {
  return await axios.post('/chat/register', params);
};

export { chatSignUp };
