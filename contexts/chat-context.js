import { createContext, useState, useContext, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';

import * as chatAPI from 'services/api-chat';
import { usePopup } from 'contexts/popup-context';
import { useAuth } from 'contexts/auth-context';

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const { library, account } = useWeb3React();
  const { accessToken } = useAuth();
  const { setPopUp } = usePopup();

  const [loading, setLoading] = useState(false);

  const onChatSignUp = useCallback(
    async ({ email, address }) => {
      if (!accessToken || !account || !library) {
        setPopUp({
          isError: true,
          title: 'Wallet Error',
          text: `Please connect to Ethereum chain.`,
        });
        return null;
      }

      setLoading(true);
      try {
        const params = {
          email,
          address,
        };
        console.log('params => ', params);
        const response = await chatAPI.chatSignUp(params);
        console.log('response => ', response);
      } catch (error) {
        console.log('onChatSignUp => ', error);
        setPopUp({
          isError: true,
          title: 'Chat Sign Up Error',
          text: 'There is an error in Sign Up',
        });
        setLoading(false);
      }
      setLoading(false);
    },
    [accessToken, account, library, setLoading, setPopUp],
  );

  return (
    <ChatContext.Provider
      value={{
        loading,
        onChatSignUp,
      }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('Context not initialized yet!');
  }

  return context;
}
