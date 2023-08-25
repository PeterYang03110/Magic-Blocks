import { memo, useCallback, useMemo } from 'react';
import { UnsupportedChainIdError } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';

import FiefDialog from 'components/FiefDialog';
import WalletCard from 'components/WalletModal/WalletCard';
import { DESKTOP_CONNECTORS, MOBILE_CONNECTORS } from 'utils/constants/connectors';
import MESSAGES from 'utils/constants/messages';

const getErrorMessage = error => {
  if (error instanceof NoEthereumProviderError) {
    return MESSAGES.CONNECT_NO_ETHEREUM_PROVIDER_ERROR;
  } else if (error instanceof UnsupportedChainIdError) {
    return MESSAGES.CONNECT_UNSUPPORTED_CHAIN_ID_ERROR;
  } else if (error instanceof UserRejectedRequestErrorInjected) {
    return MESSAGES.CONNECT_ACCESS_BINANCE_ERROR;
  } else {
    return MESSAGES.CONNECT_UNKNOWN_ERROR;
  }
};

const useStyles = makeStyles(theme => ({
  installContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  description: {
    fontWeight: 500,
    color: '#474D66',
    marginBottom: theme.spacing(6),
  },
}));

const WalletModal = ({ open, onClose, onConnectWallet }) => {
  const { connector, error } = useWeb3React();
  const classes = useStyles();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'), { defaultMatches: true });

  const walletConnectors = useMemo(() => (isSm ? MOBILE_CONNECTORS : DESKTOP_CONNECTORS), [isSm]);

  const walletSelectHandler = useCallback(
    connectorName => {
      onConnectWallet(connectorName);
      onClose();
    },
    [onConnectWallet, onClose],
  );

  return (
    <FiefDialog open={open} onClose={onClose} title='Connect your wallet'>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12}>
          <Typography className={classes.description}>
            Please select your wallet provider below
          </Typography>
        </Grid>

        {Object.keys(walletConnectors).map(connectorName => {
          const currentConnector = walletConnectors[connectorName];
          return (
            <Grid
              key={connectorName}
              item
              xs={12}
              onClick={() => walletSelectHandler(connectorName)}>
              <WalletCard selected={currentConnector === connector} name={connectorName} />
            </Grid>
          );
        })}

        {error instanceof NoEthereumProviderError && (
          <Grid item xs={12} className={classes.installContainer}>
            <Typography align='center' className={classes.description}>
              Don’t have a wallet? <br />
              <a href={'https://metamask.io/download'} target='_blank' rel='noreferrer'>
                Click here to learn more
              </a>
            </Typography>
          </Grid>
        )}

        {!!error && (
          <Grid item xs={12}>
            <Typography color='error' variant='body2' align='center'>
              {getErrorMessage(error)}
            </Typography>
          </Grid>
        )}
      </Grid>
    </FiefDialog>
  );
};

export default memo(WalletModal);
