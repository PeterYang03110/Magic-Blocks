import React, { memo } from 'react';
import clsx from 'clsx';
import { Grid, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useContracts } from 'contexts/contract-context';
import FiefTokenIcon from 'components/FiefTokenIcon';
import ProfileDropMenu from '../ProfileDropMenu';
import numberFormat from 'utils/helpers/numberFormat';

const useStyles = makeStyles(theme => ({
  root: {
    background: 'rgba(143, 149, 178, 0.1)',
    border: '1px solid #474D66',
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  accountWrapper: {
    padding: theme.spacing(1),
  },
  label: {
    fontFamily: 'pedestria-mvb',
    fontWeight: 700,
    fontSize: theme.spacing(2.5),
    marginLeft: theme.spacing(2),
    letterSpacing: '0.01em',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#474D66',
    margin: theme.spacing(1, 0, 2),
  },
  coinsWrapper: {
    padding: theme.spacing(0, 1, 1),
  },
  coinsLabel: {
    fontFamily: 'pedestria-mvb',
    fontWeight: 700,
    fontSize: theme.spacing(2.5),
    lineHeight: 1.2,
  },
  tokenBalance: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(0, 1),
    fontSize: theme.spacing(1.75),
    fontFamily: 'Inter',
    fontWeight: 500,
  },
  coins: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const AccountCard = ({ className }) => {
  const classes = useStyles();
  const {
    balances: { fief: fiefBalance = 0, ip: ipBalance = 0 },
  } = useContracts();

  return (
    <div className={clsx(classes.root, className)}>
      <Grid className={classes.accountWrapper} container alignItems='center'>
        <ProfileDropMenu />
        <Typography className={classes.label}>ACCOUNT</Typography>
      </Grid>
      <Divider className={classes.divider} />
      <Grid
        className={classes.coinsWrapper}
        container
        justifyContent='space-between'
        alignItems='center'>
        <Typography className={classes.coinsLabel}>COINS:</Typography>
        <div className={classes.coins}>
          <Typography className={classes.tokenBalance}>
            <FiefTokenIcon token='IP' size={32} />
            {numberFormat(ipBalance)}
          </Typography>
          <Typography className={classes.tokenBalance}>
            <FiefTokenIcon token='MABS' size={32} />
            {numberFormat(fiefBalance)}
          </Typography>
        </div>
      </Grid>
    </div>
  );
};

export default memo(AccountCard);
