import { memo } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import BorderCardWrapper from 'parts/BorderCardWrapper';
import PercentLabel from 'parts/PercentLabel';
import { ESTIMATED_APR_BACKGROUND_IMAGE_PATH } from 'utils/constants/image-paths';
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
    backgroundImage: `url(${ESTIMATED_APR_BACKGROUND_IMAGE_PATH})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'bottom right',
    [theme.breakpoints.down('xs')]: {
      backgroundImage: 'unset',
    },
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

const EstimatedAPR = () => {
  const classes = useStyles();
  return (
    <BorderCardWrapper className={classes.card} rootClassName={classes.root}>
      <Typography className={classes.title}>Weekly Global Rewards</Typography>
      <PercentLabel value={0} />

      <Typography color='textSecondary' className={classes.balance}>
        {formatNumber(80000.00)} <span>MABS</span>
      </Typography>
    </BorderCardWrapper>
  );
};

export default memo(EstimatedAPR);
