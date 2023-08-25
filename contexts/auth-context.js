import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { useRouter } from 'next/router';

import { usePopup } from 'contexts/popup-context';
import * as authAPI from 'services/api-auth';
import SignUp from 'containers/Auth/SignUp';
import SignIn from 'containers/Auth/SignIn';
import VerifyAccount from 'containers/Auth/VerifyAccount';
import ForgetPassword from 'containers/Auth/ForgetPassword';
import ResetPassword from 'containers/Auth/ResetPassword';
import ResetPasswordSuccess from 'containers/Auth/ResetPasswordSuccess';
import EmailVerifySuccess from 'containers/Auth/EmailVerifySuccess';
import ConnectCorrectWallet from 'containers/Auth/ConnectCorrectWallet';
import ConnectingModal from 'components/ConnectingModal';
import { isServer } from 'utils/helpers/utility';
import scrollToTop from 'utils/helpers/scrollToTop';
import { handleConnectionError } from 'utils/helpers/network';
import usePreviousValue from 'utils/hooks/usePreviousValue';
import AUTH_TYPES from 'utils/constants/auth-types';
import API_SIGN_TYPE from 'utils/constants/api-sign-type';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { account, library, deactivate, error } = useWeb3React();
  const router = useRouter();
  const { setPopUp, setOpen } = usePopup();

  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [userProfile, setUserProfile] = useState({});
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [authModal, setAuthModal] = useState('');
  const prevAccount = usePreviousValue(account);

  const isWrongWallet = useMemo(() => {
    const { wallet = '' } = userProfile;
    return wallet.toLowerCase() !== account?.toLowerCase();
  }, [account, userProfile]);

  const getUser = useCallback(async () => {
    try {
      const { data: { contacts = [], ...rest } = {} } = await authAPI.getProfile(userId);
      let profile = { ...rest };
      for (const contact of contacts) {
        const { contactType, data, validated, contactPrimary, contactModified, authorizerModified } = contact;
        if(contactType == 'Email' && contactPrimary) {
          if(validated)
          {
            profile = { ...profile, validated: true };
          } else {
            profile = { ...profile, validated: false };
          }
        }
        profile = { ...profile, contactModified, authorizerModified, [contactType.toLowerCase()]: data };
      }

      setUserProfile(profile);
    } catch (error) {
      console.error(error);
    }
  }, [userId, setUserProfile]);

  const onSetTokens = useCallback(
    (accessToken, refreshToken, userId) => {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUserId(setUserId);
      localStorage.setItem('userId', userId);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    },
    [setAccessToken, setRefreshToken, setUserId],
  );

  const logout = useCallback(() => {
    localStorage.clear();
    setUserId('');
    setUserProfile({});
    setAccessToken(null);
    setRefreshToken(null);
    deactivate();
  }, [setAccessToken, setRefreshToken, setUserId, setUserProfile, deactivate]);

  useEffect(() => {
    if (userId && accessToken) {
      getUser();
    }
  }, [userId, accessToken, getUser]);

  useEffect(() => {
    const accessToken = isServer() ? '' : localStorage.accessToken;
    const refreshToken = isServer() ? '' : localStorage.refreshToken;
    const userId = isServer() ? '' : localStorage.userId;

    if (!!accessToken) {
      setUserId(userId === 'undefined' ? '' : userId);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    } else if (!!account && !authModal) {
      onAuthorize();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  useEffect(() => {
    if (prevAccount && account && prevAccount !== account) {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevAccount, account]);

  useEffect(() => {
    if (error) {
      const accessToken = isServer() ? '' : localStorage.accessToken;
      if (accessToken && error instanceof UnsupportedChainIdError) {
        logout();
      } else {
        const connectionError = handleConnectionError(error);
        setPopUp({
          isError: true,
          title: 'Wrong Network',
          text: connectionError.message,
          cancelLabel: connectionError.button,
          confirmAction: connectionError.confirmAction,
          closeAction: logout,
        });
      }
    } else {
      setOpen(false);
    }
  }, [error, setPopUp, setOpen, logout]);

  useEffect(() => {
    scrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const register = useCallback(
    async params => {
      setLoading(true);
      try {
        await authAPI.register(params);
        setAuthModal(AUTH_TYPES.VERIFY_ACCOUNT);
      } catch (error) {
        console.error('register Error => ', error);
        setAuthModal('');
        const { status } = error.response;
        if (status === 408) {
          setPopUp({
            isError: true,
            title: 'SignUp Error',
            text: 'Email already existed. Please use other email address',
          });
        } else {
          setPopUp({
            isError: true,
            title: 'SignUp Error',
            text: 'There is a problem in SignUp',
          });  
        }
      }
      setLoading(false);
    },
    [setLoading, setAuthModal, setPopUp],
  );

  const login = useCallback(
    async params => {
      setLoading(true);
      try {
        const { type = API_SIGN_TYPE.WALLET, remember } = params;
        if (type === API_SIGN_TYPE.WALLET) {
          const { nonce } = params;
          const signer = library.getSigner();
          const signature = await signer.signMessage(`sign this message: ${nonce}`);
          params = { ...params, signature };
        }

        const {
          data: {
            user: { userId = '' } = {},
            authToken: { token: accessToken = '' } = {},
            refreshToken: { token: refreshToken = '' } = '',
          } = {},
        } = await authAPI.login(params);
        setUserId(userId);
        onSetTokens(accessToken, remember ? refreshToken : '', userId);
        setAuthModal('');
      } catch (error) {
        console.error('login Error => ', error);
        const { status } = error.response;
        if (status === 409) {
          setAuthModal(AUTH_TYPES.VERIFY_ACCOUNT);
        } else {
          setPopUp({
            isError: true,

            title: 'SignIn Error',
            text: 'Your credential is wrong. Please try again.',
          });
          logout();
        }
      }
      setLoading(false);
    },
    [library, setUserId, onSetTokens, logout, setAuthModal, setLoading, setPopUp],
  );

  useEffect(() => {
    const { email } = userProfile;
    if(account && accessToken && isWrongWallet && email) {
      setAuthModal(AUTH_TYPES.CONNECT_CORRECT_WALLET);
    } else {
      if(authModal === AUTH_TYPES.CONNECT_CORRECT_WALLET)
        setAuthModal('');
      else setAuthModal(authModal);
    }
  }, [isWrongWallet, account, accessToken, userProfile, authModal]);

  const onAuthorize = useCallback(async () => {
    setLoading(true);
    const address = account.toLowerCase();
    try {
      const { data: { nonce = '' } = {} } = await authAPI.getNonce(address);
      await login({ address, nonce, type: API_SIGN_TYPE.WALLET });
    } catch (error) {
      setAuthModal(AUTH_TYPES.SIGN_IN);
    }
    setLoading(false);
  }, [account, login, setLoading, setAuthModal]);

  const updateProfile = useCallback(
    async params => {
      setLoading(true);
      try {
        const { data: { contacts = [], ...rest } = {} } = await authAPI.updateProfile(params);
        let profile = { ...rest };
        for (const contact of contacts) {
          const { contactType, data, validated, contactPrimary } = contact;
          if(contactType == 'Email' && contactPrimary) {
            if(validated)
            {
              profile = { ...profile, validated: true };
            } else {
              profile = { ...profile, validated: false };
            }
          }
          profile = { ...profile, [contactType.toLowerCase()]: data };
        }
        setUserProfile(profile);
      } catch (error) {
        console.error('updateProfile Error => ', error);
      }
      setLoading(false);
    },
    [setLoading, setUserProfile],
  );

  const updatePassword = useCallback(
    async params => {
      setLoading(true);
      try {
        await authAPI.updatePassword(params);
      } catch (error) {
        console.error('updatePassword Error => ', error);
      }
      setLoading(false);
    },
    [setLoading],
  );  

  const resendVerifyEmail = useCallback(
    async params => {
      setLoading(true);
      try {
        await authAPI.resendVerifyEmail(params.email);
        setAuthModal('');
      } catch (error) {
        setPopUp({
          title: 'Verify Email Error',
          text: ' There is an error in resend verify email.',
        });
        setAuthModal('');
      }
      setLoading(false);
    },
    [setLoading, setAuthModal, setPopUp],
  );

  const verifyAccount = useCallback(
    async verifyToken => {
      setLoading(true);
      try {
        await authAPI.verifyAccount(verifyToken);
        setAuthModal(AUTH_TYPES.EMAIL_VERIFY_SUCCESS);
      } catch (error) {
        const { status } = error.response;
        if (status === 409) {
          router.push('/');
          setPopUp({
            title: 'Verify',
            text: 'Your account is already verified.',
          });
        }

        setAuthModal(AUTH_TYPES.VERIFY_ACCOUNT);
      }
      setLoading(false);
    },
    [router, setLoading, setAuthModal, setPopUp],
  );

  const resetPasswordEmail = useCallback(
    async params => {
      setLoading(true);
      try {
        await authAPI.resetPasswordEmail(params.email);
        setAuthModal('');
      } catch (error) {
        setPopUp({
          title: 'Reset Password',
          text: 'Your email is not registered. Please try again with correct email.',
        });
      }
      setLoading(false);
    },
    [setLoading, setAuthModal, setPopUp],
  );

  const resetPassword = useCallback(
    async params => {
      setLoading(true);
      try {
        const verifyToken = router.query?.verifyToken || '';
        await authAPI.resetPassword(verifyToken, params);
        setAuthModal(AUTH_TYPES.RESET_PASSWORD_SUCCESS);
        router.push('/');
      } catch (error) {
        setPopUp({
          title: 'Reset Password Error',
          text: 'There is an error in reset password',
        });
      }
      setLoading(false);
    },
    [router, setLoading, setAuthModal, setPopUp],
  );

  const authModalRender = () => {
    switch (authModal) {
      case AUTH_TYPES.SIGN_UP:
        return <SignUp setAuthModal={setAuthModal} />;
      case AUTH_TYPES.SIGN_IN:
        return <SignIn setAuthModal={setAuthModal} />;
      case AUTH_TYPES.VERIFY_ACCOUNT:
        return <VerifyAccount setAuthModal={setAuthModal} email={router.query?.email || ''} />;
      case AUTH_TYPES.FORGET_PASSWORD:
        return <ForgetPassword setAuthModal={setAuthModal} />;
      case AUTH_TYPES.RESET_PASSWORD:
        return <ResetPassword setAuthModal={setAuthModal} />;
      case AUTH_TYPES.RESET_PASSWORD_SUCCESS:
        return <ResetPasswordSuccess setAuthModal={setAuthModal} />;
      case AUTH_TYPES.EMAIL_VERIFY_SUCCESS:
        return <EmailVerifySuccess setAuthModal={setAuthModal} />;
      case AUTH_TYPES.CONNECT_CORRECT_WALLET:
        return <ConnectCorrectWallet setAuthModal={setAuthModal} />;
      default:
        return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        userProfile,
        accessToken,
        refreshToken,
        isWrongWallet,
        login,
        register,
        updateProfile,
        updatePassword,
        resetPassword,
        logout,
        resendVerifyEmail,
        verifyAccount,
        resetPasswordEmail,
        onSetTokens,
        setAuthModal,
      }}>
      {loading && <ConnectingModal open={true} />}
      {authModalRender()}
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Missing stats context');
  }

  return context;
}
