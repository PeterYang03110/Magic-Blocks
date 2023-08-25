import { memo } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AlertIcon from 'components/Icons/AlertIcon';

const useStyles = makeStyles(theme => ({
  alertContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    gap: 24,
    background: '#FFEFD2',
    border: '1px solid #FFEFD2',
    borderRadius: 6,
  },
  alert: {
    fontSize: 14,
    color: '#996A13',
    '& span': {
      cursor: 'pointer',
      color: '#4D6EFF',
      '&:hover': {
        color: '#0B0B0B',
      },
    },
  },
}));

const AlertCard = ({ alert }) => {
  const classes = useStyles();

  if (!alert) {
    return;
  }

  return (
    <div className={classes.alertContainer}>
      <Typography className={classes.alert}>{alert}</Typography>
      <AlertIcon />
    </div>
  );
};

export default memo(AlertCard);
