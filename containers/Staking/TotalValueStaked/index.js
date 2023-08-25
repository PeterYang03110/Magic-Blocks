import { memo } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useStaking } from 'contexts/staking-context';
import BorderCardWrapper from 'parts/BorderCardWrapper';
import PercentLabel from 'parts/PercentLabel';
import { formatNumber } from 'utils/helpers/utility';

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    boxShadow: '0px 12px 40px rgba(70, 74, 156, 0.15)',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    gap: theme.spacing(1),
    background: '#FFFFFF',
  },
  title: {
    fontWeight: 600,
    textTransform: 'uppercase',
    background: 'linear-gradient(102.49deg, #797FF2 0%, #B08DF2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
  },
  balance: {
    fontSize: 32,
    fontWeight: 600,
    lineHeight: 1,
    marginTop: theme.spacing(1),
    '& span': {
      fontSize: 18,
      color: '#797FF2',
    },
  },
}));

const TotalValueStaked = () => {
  const classes = useStyles();
  const {
    stakingInfo: { tvlStaked = 0, percChangedValue = 0 },
  } = useStaking();

  return (
    <BorderCardWrapper className={classes.card} rootClassName={classes.root}>
      <Typography className={classes.title}>TOTAL VALUE STAKED</Typography>
      <PercentLabel value={percChangedValue} />

      <Typography color='textSecondary' className={classes.balance}>
        ${formatNumber(tvlStaked)}
      </Typography>
    </BorderCardWrapper>
  );
};

export default memo(TotalValueStaked);
