import { memo } from 'react';
import { Divider, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useStaking } from 'contexts/staking-context';
import BorderCardWrapper from 'parts/BorderCardWrapper';
import CreateLockForm from './CreateLockForm';
import IncreaseAmountForm from './IncreaseAmountForm';
import IncreaseTimeForm from './IncreaseTimeForm';

const useStyles = makeStyles(theme => ({
  card: {
    boxShadow: '0px 12px 40px rgba(70, 74, 156, 0.15)',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  chain: {
    fontSize: 14,
    color: '#797FF2',
    textShadow: '0px 1.5px 2px rgba(7, 11, 29, 0.15)',
    lineHeight: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    fontFamily: 'pedestria-mvb',
    lineHeight: 1,
    color: '#1F182A',
    '& span': {
      color: '#797FF2',
    },
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(31, 31, 65, 0.1)',
    margin: theme.spacing(1, 0),
  },
}));

const StakeForm = () => {
  const classes = useStyles();
  const { lockedAmount, isExpired } = useStaking();

  return (
    <BorderCardWrapper className={classes.card} rootClassName={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography className={classes.chain}>Ethereum</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.title}>
            Stake for <span>s</span>MABS
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
        {parseFloat(lockedAmount) > 0 && !isExpired ? (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <IncreaseAmountForm />
            </Grid>
            <Grid item xs={12}>
              <IncreaseTimeForm />
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <CreateLockForm />
          </Grid>
        )}
      </Grid>
    </BorderCardWrapper>
  );
};

export default memo(StakeForm);
