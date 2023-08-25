import { memo, useEffect } from 'react';

import axios from 'services/axios';
import * as authAPI from 'services/api-auth';
import { useAuth } from 'contexts/auth-context';
import { usePopup } from 'contexts/popup-context';
import { isServer } from 'utils/helpers/utility';

const InterceptorProvider = () => {
  const { accessToken, onSetTokens, logout } = useAuth();
  const { setPopUp } = usePopup();

  useEffect(() => {
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response) {
          const { status } = error.response;

          if (status === 401 || status === 403) {
            getRefreshToken();
          }
          return Promise.reject(error);
        }
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRefreshToken = async () => {
    try {
      const oldRefreshToken = isServer() ? '' : localStorage.refreshToken;

      if (oldRefreshToken) {
        const {
          data: {
            authToken: { token: accessToken = '' } = {},
            refreshToken: { token: refreshToken = '' } = '',
          } = {},
        } = await authAPI.getRefreshToken({ refreshToken: oldRefreshToken });
        onSetTokens(accessToken, refreshToken);
      } else {
        logout();
      }
    } catch (error) {
      setPopUp({
        isError: true,
        title: 'Refresh Token Expired',
        text: 'Both of Auth and Refresh Tokens are expired. Please Log In again.',
      });
      logout();
    }
  };

  useEffect(() => {
    axios.interceptors.request.use(
      config => {
        const authorization = isServer() ? '' : localStorage.accessToken;
        config.headers['Authorization'] = `Bearer ${authorization}`;
        config.headers['Content-Type'] = 'application/json; charset=utf-8';
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );
  }, [accessToken]);

  return <div />;
};

export default memo(InterceptorProvider);
