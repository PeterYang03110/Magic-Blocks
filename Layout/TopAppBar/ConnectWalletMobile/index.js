import React, { memo, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from 'contexts/auth-context';
import { useWallets } from 'contexts/wallet-context';
import BorderCardWrapper from 'parts/BorderCardWrapper';
import ContainedButton from 'components/UI/Buttons/ContainedButton';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  },
  account: {
    fontSize: 16,
    lineHeight: 1.5,
    fontWeight: 600,
    color: '#FFFFFF',
    textShadow: '0px 12px 40px rgba(7, 11, 29, 0.16)',
    padding: theme.spacing(2),
    borderRadius: 8,
    width: '100%',
    textAlign: 'center',
    background: 'rgba(143, 149, 178, 0.2)',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    letterSpacing: '0.5px'
  },
  button: {
    width: '100%',
  },
  accountButton: {
    background: '#26282e',
    color: 'white',
    width: '100%'
  }
}));

const ConnectWalletMobile = ({ className }) => {
  const classes = useStyles();
  const { account, active } = useWeb3React();
  const { accessToken, logout } = useAuth();
  const { setIsWalletDialog } = useWallets();

  const connectWalletHandler = useCallback(async () => {
    setIsWalletDialog(true);
  }, [setIsWalletDialog]);

  return (
    <div className={classes.root}>
      {active && accessToken ? (
        <BorderCardWrapper className={classes.button} rootClassName={classes.accountButton}>
          <Typography className={classes.account} onClick={logout}>
            {account}
          </Typography>
        </BorderCardWrapper>
      ) : (
        <ContainedButton className={className} color='secondary' onClick={connectWalletHandler}>
          Connect Wallet
        </ContainedButton>
      )}
    </div>
  );
};

export default memo(ConnectWalletMobile);
