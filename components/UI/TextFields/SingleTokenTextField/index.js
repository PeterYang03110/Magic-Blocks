import React, { memo, useCallback } from 'react';
import { OutlinedInput, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import FiefTokenIcon from 'components/FiefTokenIcon';
import GradientButton from 'components/UI/Buttons/GradientButton';
import { formatNumber } from 'utils/helpers/utility';

const useStyles = makeStyles(theme => {
  return {
    label: {
      fontSize: 16,
      color: '#070B1D',
      marginBottom: theme.spacing(1),
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      background: '#EDEFF5',
      borderRadius: 4,
      padding: theme.spacing(1),
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      borderBottom: `1px solid rgba(31, 31, 65, 0.1)`,
      paddingBottom: theme.spacing(1.5),
      gap: theme.spacing(1),
    },
    errorInput: {
      border: `1px solid ${theme.palette.danger.main}`,
    },
    inputContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    tokenContainer: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(1, 1.5),
      backgroundColor: '#FFFFFF',
      borderRadius: 6,
    },
    tokenIcon: {
      marginRight: theme.spacing(1),
    },
    tokenName: {
      fontWeight: 600,
      color: '#0B0B0B',
      lineHeight: 1,
    },
    textField: {
      border: 'none',
    },
    balance: {
      color: '#474D66',
    },
    input: {
      textAlign: 'right',
      fontSize: 20,
      fontWeight: 'bold',
      padding: theme.spacing(0),
      color: '#070B1D',
      '&[type=number]': {
        '&::-webkit-outer-spin-button': {
          WebkitAppearance: 'none',
          margin: 0,
        },
        '&::-webkit-inner-spin-button': {
          WebkitAppearance: 'none',
          margin: 0,
        },
        MozAppearance: 'textfield',
      },
    },
    notchedOutline: {
      border: 'none',
      padding: 0,
    },
    buttonContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      marginTop: theme.spacing(1.5),
      [theme.breakpoints.down('xs')]: {
        gap: 8,
      },
    },
    rangeButton: {
      fontSize: 16,
      textTransform: 'unset',
      fontFamily: 'Inter',
      borderColor: '#FFFFFF',
      width: 'fit-content',
      padding: theme.spacing(0.5, 1),
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
        minWidth: 'unset',
        width: '100%',
        padding: theme.spacing(0.5),
      },
    },
    unselectedButton: {
      color: '#474D66',
      background: '#FFFFFF',
    },
  };
});

const RANGE_LISTS = [
  { label: '25%', value: 0.25 },
  { label: '50%', value: 0.5 },
  { label: '75%', value: 0.75 },
  { label: 'max', value: 1 },
];

const SingleTokenTextField = React.forwardRef(
  ({ label, token, balance = 0, error, value, onChange, ...rest }, ref) => {
    const classes = useStyles();

    const rangeHandler = useCallback(
      range => () => {
        if (range.value === 1) {
          onChange(balance);
          return;
        }

        onChange(range.value * balance);
      },
      [onChange, balance],
    );

    return (
      <>
        {!!label && (
          <Typography color='textPrimary' className={classes.label}>
            {label}
          </Typography>
        )}
        <div className={classes.root}>
          <div className={clsx(classes.container)}>
            <div className={classes.inputContainer}>
              <div className={classes.tokenContainer}>
                <FiefTokenIcon token={token} size={24} className={classes.tokenIcon} />
                <Typography className={classes.tokenName}>{token}</Typography>
              </div>
              <OutlinedInput
                inputRef={ref}
                variant='outlined'
                type='text'
                error={!!error}
                value={value}
                className={clsx('form-control form-control-lg', classes.textField)}
                classes={{
                  input: classes.input,
                  notchedOutline: classes.notchedOutline,
                }}
                onChange={onChange}
                {...rest}
              />
            </div>
            <Typography align='right' className={classes.balance}>
              {formatNumber(balance)}
            </Typography>
          </div>
          {!!error && (
            <Typography variant='subtitle2' color='error'>
              {error}
            </Typography>
          )}
          <div className={classes.buttonContainer}>
            {RANGE_LISTS.map(item => {
              const isSelect =
                item.value === 1 ? value === balance : item.value * balance === value;

              return (
                <GradientButton
                  fullWidth
                  key={item.label}
                  disabled={!balance}
                  className={clsx(classes.rangeButton, {
                    [classes.unselectedButton]: !isSelect,
                  })}
                  onClick={rangeHandler(item)}>
                  {item.label}
                </GradientButton>
              );
            })}
          </div>
        </div>
      </>
    );
  },
);

export default memo(SingleTokenTextField);
