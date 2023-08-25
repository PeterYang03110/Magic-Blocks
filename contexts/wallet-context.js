import { createContext, useContext, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';

import WalletModal from 'components/WalletModal';
import useInactiveListener from 'utils/hooks/useInactiveListener';
import { CONNECTORS } from 'utils/constants/connectors';
import { isServer } from 'utils/helpers/utility';

const ContractContext = createContext(null);

export function WalletProvider({ children }) {
  const { connector, activate } = useWeb3React();

  const [isWalletDialog, setIsWalletDialog] = useState(false);
  const [activatingConnector, setActivatingConnector] = useState();

  useEffect(() => {
    const connectorId = isServer() ? '' : localStorage.connectorId;
    const walletConnector = CONNECTORS[connectorId];

    if (walletConnector) {
      activate(walletConnector);
    }
  }, [activate]);

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  useInactiveListener(!!activatingConnector);

  const onConnectWallet = connectorName => {
    const walletConnector = CONNECTORS[connectorName];

    if (walletConnector) {
      localStorage.setItem('connectorId', connectorName);
      setActivatingConnector(walletConnector);
      activate(walletConnector);
    }
  };

  return (
    <ContractContext.Provider
      value={{
        setIsWalletDialog,
        onConnectWallet,
      }}>
      {children}
      {isWalletDialog && (
        <WalletModal
          open={isWalletDialog}
          onClose={() => setIsWalletDialog(false)}
          onConnectWallet={onConnectWallet}
        />
      )}
    </ContractContext.Provider>
  );
}

export function useWallets() {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error('Missing stats context');
  }

  return context;
}
