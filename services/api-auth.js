import axios from 'services/axios';

const getNonce = async address => {
  return await axios.get(`/auth/${address.toLowerCase()}`);
};

const login = async params => {
  const { type = '' } = params;
  return await axios.post(`/auth/login?type=${type}`, params);
};

const register = async params => {
  const { type = '' } = params;
  return await axios.post(`/auth/register?type=${type}`, params);
};

const resendVerifyEmail = async email => {
  return await axios.post(`/auth/verify/resend/${email}`);
};

const verifyAccount = async token => {
  return await axios.get(`/auth/verify/${token}`);
};

const resetPasswordEmail = async email => {
  return await axios.get(`/auth/reset-pwd-email/${email}`);
};

const resetPassword = async (token, params) => {
  return await axios.post(`/auth/reset-pwd/${token}`, params);
};

const getRefreshToken = async params => {
  return await axios.post('/auth/refresh', params);
};

const checkUserName = async userName => {
  return await axios.get(`/auth/username-check/?userName=${userName}`);
};

const checkGuildName = async guildName => {
  return await axios.get(`/guild/guildname-check?guildName=${guildName}`);
}

const getUser = async address => {
  return await axios.get(`/user/${address.toLowerCase()}`);
};

const getProfile = async id => {
  return await axios.get(`/user/${id}/profile`);
};

const updateProfile = async params => {
  return await axios.put(`/user/${params.userId}/update`, params);
};

const updatePassword = async params => {
  return await axios.put(`/user/${params.userId}/update-password`, params);
};

export {
  getNonce,
  login,
  register,
  resendVerifyEmail,
  verifyAccount,
  resetPasswordEmail,
  resetPassword,
  getRefreshToken,
  checkUserName,
  checkGuildName,
  getUser,
  getProfile,
  updateProfile,
  updatePassword,
};
