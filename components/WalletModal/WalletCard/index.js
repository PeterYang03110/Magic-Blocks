import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import BorderCardWrapper from 'parts/BorderCardWrapper';

const useStyles = makeStyles(theme => ({
  card: {
    background: '#D8DAE5',
    '&:hover': {
      background: 'linear-gradient(to right, #797FF2 0%, #DAF9FC 50.95%, #FF7DFD 100%)',
      '& p': {
        color: '#474D66',
      },
    },
  },
  selected: {
    background: '#f6f5fe',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    cursor: 'pointer',
    padding: theme.spacing(2),
    '&:hover': {
      backgroundColor: '#f6f5fe',
    },
  },
  iconBorder: {
    background: 'linear-gradient(130deg, #a5d0fd 0%, #cebafe 100%)',
  },
  iconContainer: {
    width: 40,
    height: 40,
    padding: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  label: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#8F95B2',
  },
}));

const WalletCard = ({ name, selected }) => {
  const classes = useStyles();

  return (
    <BorderCardWrapper
      className={classes.card}
      rootClassName={clsx(classes.container, { [classes.selected]: selected })}>
      <Typography color='textSecondary' className={classes.label}>
        {name}
      </Typography>
      <BorderCardWrapper className={classes.iconBorder} rootClassName={classes.iconContainer}>
        <img className={classes.icon} src={`/assets/images/wallet/${name}.svg`} alt='Logo' />
      </BorderCardWrapper>
    </BorderCardWrapper>
  );
};

export default memo(WalletCard);
