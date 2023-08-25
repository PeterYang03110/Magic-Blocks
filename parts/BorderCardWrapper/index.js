import { memo } from 'react';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    borderRadius: 6,
    background: 'linear-gradient(to right, #797FF2 0%, #DAF9FC 50.95%, #FF7DFD 100%)',
  },
  children: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
}));

const BorderCardWrapper = ({ className, rootClassName, children }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.card, className)}>
      <div className={clsx(classes.children, rootClassName)}>{children}</div>
    </Card>
  );
};

export default memo(BorderCardWrapper);
