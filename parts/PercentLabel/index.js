import { memo } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { formatNumber } from 'utils/helpers/utility';

const useStyles = makeStyles(() => ({
  label: ({ value }) => ({
    fontSize: 14,
    fontWeight: 600,
    color: '#ffffff',
    textShadow: '0px 1.5px 2px rgba(7, 11, 29, 0.15)',
    background: Number(value) >= 0 ? '#00D68F' : '#FF3D71',
    borderRadius: 4,
    padding: `2px 6px`,
    width: 'fit-content',
  }),
}));

const PercentLabel = ({ value, className }) => {
  const classes = useStyles({ value });

  return (
    <Typography className={clsx(classes.label, className)}>
      {`${Number(value) > 0 ? '+' : ''}${formatNumber(value)}%`}
    </Typography>
  );
};

export default memo(PercentLabel);
