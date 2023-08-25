import { memo } from 'react';
import { Divider, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';

import { useAuth } from 'contexts/auth-context';
import { useStaking } from 'contexts/staking-context';
import GradientButton from 'components/UI/Buttons/GradientButton';
import BorderCardWrapper from 'parts/BorderCardWrapper';
import { formatNumber } from 'utils/helpers/utility';

const useStyles = makeStyles(theme => ({
  card: {
    boxShadow: '0px 12px 40px rgba(70, 74, 156, 0.15)',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    backgroundColor: '#1F182A',
  },
  title: {
    fontSize: 32,
    fontFamily: 'pedestria-mvb',
    lineHeight: 1,
    textShadow: '0px 1.5px 2px rgba(7, 11, 29, 0.15)',
    background:
      'radial-gradient(96.45% 105.69% at 0.81% -12.46%, #A4D7FC 1.04%, #A8B4FE 63.02%, #CDB9FD 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
  },
  divider: {
    height: 1,
    width: '100%',
    margin: theme.spacing(1, 0),
    background: `linear-gradient(308.42deg, #797FF2 0%, #69F2FF 50%, #FF7DFD 100%)`,
  },
  fiefBalance: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
    minHeight: 108,
    fontSize: 48,
    fontWeight: 600,
    color: '#FFFFFF',
    lineHeight: 1,
    '& span': {
      fontFamily: 'pedestria-mvb',
    },
  },
  description: {
    fontSize: 14,
    color: '#B6BAF8',
  },
  disabledText: {
    opacity: 0.4,
  },
}));

const AccruedRewards = () => {
  const classes = useStyles();
  const { account } = useWeb3React();
  const { isWrongWallet } = useAuth();
  const { userClaimable, claim } = useStaking();

  return (
    <BorderCardWrapper className={classes.card} rootClassName={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography className={classes.title}>- Accrued Rewards -</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            className={clsx(classes.fiefBalance, { [classes.disabledText]: !account })}
            align='center'>
            {!parseFloat(userClaimable) ? '-' : formatNumber(userClaimable)} <span>MBOX</span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <GradientButton
            fullWidth
            disabled={!parseFloat(userClaimable) || isWrongWallet}
            onClick={claim}>
            Claim
          </GradientButton>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.description}>
            Claim Rewards Every Thursday at 00:00 UTC
          </Typography>
        </Grid>
      </Grid>
    </BorderCardWrapper>
  );
};

export default memo(AccruedRewards);
