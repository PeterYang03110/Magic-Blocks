import { memo } from 'react';
import { Divider, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from 'contexts/auth-context';
import { useStaking } from 'contexts/staking-context';
import GradientButton from 'components/UI/Buttons/GradientButton';
import BorderCardWrapper from 'parts/BorderCardWrapper';
import { STAKING_BACKGROUND_IMAGE_PATH } from 'utils/constants/image-paths';
import { formatNumber } from 'utils/helpers/utility';

const useStyles = makeStyles(theme => ({
  card: {
    boxShadow: '0px 12px 40px rgba(70, 74, 156, 0.15)',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    backgroundImage: `url(${STAKING_BACKGROUND_IMAGE_PATH})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    backdropFilter: 'blur(141.5px)',
  },
  title: {
    fontSize: 32,
    fontFamily: 'pedestria-mvb',
    color: '#1F182A',
    '& span': {
      color: '#797FF2',
    },
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(31, 31, 65, 0.1)',
  },
  fiefBalance: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
    fontSize: 48,
    fontWeight: 600,
    color: '#1F182A',
    lineHeight: 1,
    minHeight: 108,
    '& span': {
      fontFamily: 'pedestria-mvb',
    },
  },
}));

const WithdrawForm = () => {
  const classes = useStyles();
  const { isWrongWallet } = useAuth();
  const { lockedAmount, withdraw, isExpired } = useStaking();

  return (
    <BorderCardWrapper className={classes.card} rootClassName={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography className={classes.title}>Your MBOX is Locked</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.fiefBalance} align='center'>
            {!parseFloat(lockedAmount) ? '-' : formatNumber(lockedAmount)}
            <span>MBOX</span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <GradientButton fullWidth disabled={!isExpired || isWrongWallet} onClick={withdraw}>
            withdraw unlocked fief
          </GradientButton>
        </Grid>
      </Grid>
    </BorderCardWrapper>
  );
};

export default memo(WithdrawForm);
