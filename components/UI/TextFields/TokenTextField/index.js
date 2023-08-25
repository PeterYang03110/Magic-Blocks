import React, { memo, useCallback } from 'react';
import { OutlinedInput, Select, MenuItem, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => {
  return {
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: theme.spacing(3),
      width: '100%',
    },
    inputContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    label: {
      fontSize: 20,
      color: '#433012',
    },
    control: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    tokenIcon: {
      marginRight: theme.spacing(1),
    },
    select: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 60,
      width: 120,
      fontSize: 20,
      fontFamily: 'pedestria-mvb',
      color: '#433012',
      textShadow: '0px 1.5px 2px rgba(7, 11, 29, 0.15)',
      border: '2px solid #433012',
      borderRadius: 4,
      '&::before': {
        borderBottom: 0,
      },
    },
    selectMenu: {
      backgroundColor: theme.palette.background.primary,
    },
    selectInput: {
      padding: `0 !important`,
      display: 'flex',
      justifyContent: 'center',
    },
    maxButton: {
      fontSize: 16,
      fontWeight: 'bold',
      textTransform: 'lowercase',
      minWidth: 'unset',
      padding: theme.spacing(0.5, 1),
      color: '#433012',
      border: '2px solid #433012',
    },
    textField: {
      border: '2px solid #EDDABC',
      borderRadius: 4,
      padding: theme.spacing(1, 1, 1, 2),
    },
    input: {
      fontSize: 20,
      fontWeight: 500,
      padding: theme.spacing(1),
      color: '#000000',
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
    },
    error: {
      fontSize: 12,
    },
  };
});

const TokenTextField = React.forwardRef(
  (
    {
      label,
      isTokenSelect = false,
      disabledMax = false,
      token,
      setToken,
      tokens,
      error,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const classes = useStyles();

    const maxHandler = useCallback(() => {
      onChange(token.balance);
    }, [token, onChange]);

    const selectHandler = useCallback(
      event => {
        setToken(event.target.value);
      },
      [setToken],
    );

    return (
      <div className={classes.root}>
        <div className={classes.inputContainer}>
          <Typography className={classes.label}>{label}</Typography>
          <OutlinedInput
            inputRef={ref}
            variant='outlined'
            type='number'
            error={!!error}
            className={clsx('form-control form-control-lg', classes.textField)}
            classes={{
              input: classes.input,
              notchedOutline: classes.notchedOutline,
            }}
            onChange={onChange}
            endAdornment={
              !disabledMax && (
                <Button className={classes.maxButton} onClick={maxHandler}>
                  MAX
                </Button>
              )
            }
            {...rest}
          />
          {!!error && (
            <Typography color='error' className={classes.error}>
              {error}
            </Typography>
          )}
        </div>
        <div className={classes.control}>
          <Typography className={classes.label}>
            Balance: {(token?.balance || 0).toLocaleString()}
          </Typography>
          {isTokenSelect ? (
            <Select
              displayEmpty
              inputProps={{ 'aria-label': 'available tokens' }}
              value={token}
              onChange={selectHandler}
              className={classes.select}
              classes={{
                select: classes.selectInput,
              }}
              MenuProps={{
                classes: {
                  paper: classes.selectMenu,
                },
              }}>
              {tokens.map((token, index) => (
                <MenuItem key={index} value={token}>
                  {token.name}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <Typography className={classes.select}>{token.name}</Typography>
          )}
        </div>
      </div>
    );
  },
);

export default memo(TokenTextField);
