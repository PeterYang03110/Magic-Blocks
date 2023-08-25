import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  checkbox: {
    padding: 4,
    color: theme.palette.text.default,
    '&.Mui-checked': {
      color: '#F97326 !important',
    },
    '& svg': {
      height: 30,
      width: 30,
    },
  },
  checked: {
    color: '#8F95B2',
  },
  yellow: {
    color: theme.palette.text.yellow,
  },
}));

const FiefCheckbox = React.forwardRef(({ color = 'primary', className, ...rest }, ref) => {
  const classes = useStyles();

  return (
    <Checkbox
      inputRef={ref}
      color={color}
      className={clsx(classes.checkbox, className, classes[color])}
      inputProps={{
        'aria-label': 'checkbox',
      }}
      classes={{
        colorPrimary: classes.checked,
      }}
      {...rest}
    />
  );
});

export default memo(FiefCheckbox);
