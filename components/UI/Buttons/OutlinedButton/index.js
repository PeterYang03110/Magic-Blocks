import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';

import ButtonLink from 'components/UI/Buttons/ButtonLink';
import BorderCardWrapper from 'parts/BorderCardWrapper';

const useStyles = makeStyles(theme => ({
  border: {
    padding: 2,
    background: 'linear-gradient(to right, #b5ccf8 0%, #797FF2 100%)',
    '&:hover': {
      boxShadow: '0 0 16px 0 #8085EE',
    },
  },
  root: {
    height: '100%',
    fontSize: 16,
    fontWeight: 600,
    borderWidth: 0,
    borderRadius: 6,
    color: '#474D66',
    backgroundColor: '#FFFFFF',
    borderColor: theme.palette.primary.main,
    '&:hover': {
      borderWidth: 0,
    },
  },
  disabled: {
    borderWidth: `2px !important`,
    borderColor: '#474D66 !important',
    '& span': {
      color: '#474D66 !important',
    },
  },
  red: {
    color: theme.palette.danger.main,
    borderColor: theme.palette.danger.main,
    '&:hover': {
      borderColor: theme.custom.palette.brown,
      color: theme.custom.palette.brown,
    },
  },
}));

const OutlinedButton = React.forwardRef(
  (
    { className, classes: propClasses = {}, color, href, loading, disabled, children, ...rest },
    ref,
  ) => {
    const classes = useStyles();

    return (
      <BorderCardWrapper className={clsx(classes.border, className)}>
        <Button
          ref={ref}
          href={href}
          component={href ? ButtonLink : 'button'}
          className={clsx(classes.root, className, classes[color])}
          classes={{
            ...propClasses,
            disabled: classes.disabled,
          }}
          color={'primary'}
          variant='outlined'
          disabled={loading || disabled}
          {...rest}>
          {children}
        </Button>
      </BorderCardWrapper>
    );
  },
);

export default memo(OutlinedButton);
