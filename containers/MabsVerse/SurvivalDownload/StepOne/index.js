import { memo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import {
  COINBASE_IMAGE_PATH,
  METAMASK_IMAGE_PATH,
  WALLETCONNECT_IMAGE_PATH,
  ZENGO_IMAGE_PATH,
} from 'utils/constants/image-paths';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    background: 'linear-gradient(97.82deg, #97F6FF -148.83%, #8085EE 100.25%)',
    fontFamily: 'pedestria-mvb',
    fontSize: 32,
    marginBottom: 8,
    textAlign: 'center',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',

    [theme.breakpoints.down('sm')]: {
      fontSize: 24,
    },
  },
  subtitle: {
    color: theme.custom.palette.black60,
    fontSize: 18,
    marginBottom: 32,
    textAlign: 'center',

    [theme.breakpoints.down('sm')]: {
      marginBottom: 40,
      fontSize: 16,
    },
  },
  card: {
    alignItems: 'center',
    background: theme.custom.palette.black30,
    borderRadius: 6,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 32,
    padding: 16,

    [theme.breakpoints.down('sm')]: {
      marginBottom: 40,
    },
  },
  cardTitle: {
    textAlign: 'center',
    background: 'linear-gradient(97.82deg, #97F6FF -148.83%, #8085EE 100.25%)',
    fontFamily: 'pedestria-mvb',
    fontSize: 24,
    marginBottom: 8,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',

    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
  },
  cardSubtitle: {
    textAlign: 'center',
    color: theme.custom.palette.black60,
    fontSize: 16,
    marginBottom: 24,

    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  walletIcon: {
    width: 40,
    height: 40,
  },
  walletLink: {
    marginRight: 24,
  },
  walletIconsContainer: {
    background: '#fff',
    borderRadius: 6,
    display: 'flex',
    justifyContent: 'center',
    padding: 16,
    width: '100%',

    '& a:last-child': {
      marginRight: 0,
    },
  },
}));

const StepOne = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Typography className={classes.title}>Ensure You Have a Wallet Address</Typography>
      <Typography className={classes.subtitle}>
        Simply connect your existing wallet or visit your favorite provider to create a wallet
      </Typography>

      <div className={classes.card}>
        <Typography className={classes.cardTitle}>Most popular wallet providers</Typography>
        <Typography className={classes.cardSubtitle}>
          Don’t have a wallet address? Select a provider below to start creating a new wallet
        </Typography>
        <div className={classes.walletIconsContainer}>
          <Link
            className={classes.walletLink}
            href={'https://metamask.io/download/'}
            target={'_blank'}>
            <img className={classes.walletIcon} src={METAMASK_IMAGE_PATH} />
          </Link>
          <Link
            className={classes.walletLink}
            href={'https://explorer.walletconnect.com/?type=wallet'}
            target={'_blank'}>
            <img className={classes.walletIcon} src={WALLETCONNECT_IMAGE_PATH} />
          </Link>
          <Link className={classes.walletLink} href={'https://zengo.com/'} target={'_blank'}>
            <img className={classes.walletIcon} src={ZENGO_IMAGE_PATH} />
          </Link>
          <Link
            className={classes.walletLink}
            href={'https://www.coinbase.com/wallet/'}
            target={'_blank'}>
            <img className={classes.walletIcon} src={COINBASE_IMAGE_PATH} />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default memo(StepOne);
