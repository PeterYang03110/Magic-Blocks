import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress } from '@material-ui/core';
import clsx from 'clsx';

import ButtonLink from 'components/UI/Buttons/ButtonLink';

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 8,
    textTransform: 'unset',
    boxShadow: 'none',
    '&:hover': {
      color: '#F97326',
      background: '#0B0B0B'
    },
  },
  disabled: {
    color: `${theme.palette.text.third} !important`,
    backgroundColor: `${theme.palette.background.default} !important`,
  },
}));

const ContainedButton = React.forwardRef(
  ({ className, classes: propClasses = {}, href, loading, disabled, children, ...rest }, ref) => {
    const classes = useStyles();

    return (
      <Button
        ref={ref}
        href={href}
        component={href ? ButtonLink : 'button'}
        className={clsx(className, classes.root)}
        classes={{
          disabled: classes.disabled,
          ...propClasses,
        }}
        variant='contained'
        disabled={loading || disabled}
        startIcon={loading && <CircularProgress size={24} />}
        {...rest}>
        {children}
      </Button>
    );
  },
);

export default memo(ContainedButton);
