import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Identicon from 'react-identicons';
import clsx from 'clsx';

import COLORS from 'utils/constants/colors';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: 4,
    border: `4px solid ${theme.custom.palette.lightYellow}`,
    boxShadow: `0px 0px 4px ${theme.palette.text.yellow}`,
  },
}));

const FiefIdenticon = React.forwardRef(({ value = 'Not found', size = 32, className }, ref) => {
  const classes = useStyles();

  return (
    <Identicon
      ref={ref}
      className={clsx(classes.root, className)}
      string={value}
      size={size}
      padding={1}
      palette={COLORS}
      count={4}
      bg='#ffb418'
    />
  );
});

export default memo(FiefIdenticon);
