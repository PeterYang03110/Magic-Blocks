import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress } from '@material-ui/core';
import clsx from 'clsx';

import ButtonLink from 'components/UI/Buttons/ButtonLink';

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: 16,
    fontWeight: 600,
    textTransform: 'uppercase',
    color: '#FFFFFF',
    background: `linear-gradient(97.82deg, #97F6FF -148.83%, #8085EE 100.25%)`,
    boxShadow: '0px 4px 8px rgba(7, 11, 29, 0.08)',
    border: `1px solid #FFFFFF`,
    '&:hover': {
      backgroundImage:
        'linear-gradient(180deg, rgba(11, 11, 11, 0.4), rgba(11, 11, 11, 0.4)), linear-gradient(135deg, #89b0f5, #8188ef)',
      boxShadow: 'unset',
    },
  },
  disabled: {
    background: `#D8DAE5 !important`,
    color: `${theme.palette.text.primary} !important`,
    borderColor: theme.palette.text.primary,
  },
}));

const GradientButton = React.forwardRef(
  ({ loading, className, classes: propClasses = {}, disabled, children, href, ...rest }, ref) => {
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

export default memo(GradientButton);
