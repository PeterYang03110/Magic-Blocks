import React, { memo, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from 'contexts/auth-context';
import { useWallets } from 'contexts/wallet-context';
import { useContracts } from 'contexts/contract-context';
import BorderCardWrapper from 'parts/BorderCardWrapper';
import FiefTokenIcon from 'components/FiefTokenIcon';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import ProfileDropMenu from '../ProfileDropMenu';
import getEllipsis from 'utils/helpers/getEllipsis';
import numberFormat from 'utils/helpers/numberFormat';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  tokenBalance: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(0, 1),
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  account: {
    fontSize: 16,
    fontWeight: 600,
    color: '#FFFFFF',
    padding: theme.spacing(1, 2),
    borderRadius: 6,
    background: '#2c2c2c',
  },
  button: {
    width: '100%',
  },
}));

const ConnectWallet = () => {
  const classes = useStyles();
  const { account, active } = useWeb3React();
  const { accessToken } = useAuth();
  const { setIsWalletDialog } = useWallets();
  const {
    balances: { fief: fiefBalance = 0, ip: ipBalance = 0 },
  } = useContracts();

  const connectWalletHandler = useCallback(async () => {
    setIsWalletDialog(true);
  }, [setIsWalletDialog]);

  return (
    <div className={classes.root}>
      {accessToken && (
        <Typography className={classes.tokenBalance}>
          <FiefTokenIcon token='IP' size={32} />
          {numberFormat(ipBalance)}
        </Typography>
      )}

      {active ? (
        <>
          <Typography className={classes.tokenBalance}>
            <FiefTokenIcon token='MABS' size={32} />
            {numberFormat(fiefBalance)}
          </Typography>
          <BorderCardWrapper>
            <Typography className={classes.account}>{getEllipsis(account || '')}</Typography>
          </BorderCardWrapper>
        </>
      ) : (
        <ContainedButton color='secondary' onClick={connectWalletHandler}>
          Connect Wallet
        </ContainedButton>
      )}

      <ProfileDropMenu />
    </div>
  );
};

export default memo(ConnectWallet);
