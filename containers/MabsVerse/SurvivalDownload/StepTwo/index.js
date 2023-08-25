import { memo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { useAuth } from 'contexts/auth-context';
import RadialGradientBorderButton from 'components/UI/Buttons/RadialGradientBorderButton';
import AUTH_TYPES from 'utils/constants/auth-types';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
    background: 'linear-gradient(97.82deg, #97F6FF -148.83%, #8085EE 100.25%)',
    fontFamily: 'pedestria-mvb',
    fontSize: 32,
    marginBottom: 8,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',

    [theme.breakpoints.down('sm')]: {
      fontSize: 24,
    },
  },
  subtitle: {
    textAlign: 'center',
    color: theme.custom.palette.black60,
    fontSize: 18,
    marginBottom: 32,

    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
      marginBottom: 40,
    },
  },
  cta: {
    height: 48,
    padding: '12px 32px',
    marginBottom: 32,

    [theme.breakpoints.down('sm')]: {
      marginBottom: 40,
    },
  },
  ctaDisabled: {
    display: 'flex',
    alignItems: 'center',
    background: theme.custom.palette.black30,
    borderRadius: 6,
    color: theme.custom.palette.whitePurple,
    fontWeight: 600,
    height: 48,
    padding: '12px 32px',
    marginBottom: 32,

    [theme.breakpoints.down('sm')]: {
      marginBottom: 40,
    },
  },
}));

const StepTwo = () => {
  const classes = useStyles();
  const { userProfile: { email = '' } = {}, setAuthModal } = useAuth();

  return (
    <main className={classes.root}>
      <Typography className={classes.title}>Create a Magic Blocks Account</Typography>
      <Typography className={classes.subtitle}>
        You will need a Magic Blocks account to play any MabsVerse games
      </Typography>
      {email ? (
        <div className={classes.ctaDisabled}>ACCOUNT CREATED</div>
      ) : (
        <RadialGradientBorderButton
          className={classes.cta}
          onClick={() => {
            setAuthModal(AUTH_TYPES.SIGN_UP);
          }}>
          CREATE AN ACCOUNT
        </RadialGradientBorderButton>
      )}
      <Typography className={classes.subtitle}>
        Already have an account? Simply skip to the next step
      </Typography>
    </main>
  );
  2;
};

export default memo(StepTwo);
