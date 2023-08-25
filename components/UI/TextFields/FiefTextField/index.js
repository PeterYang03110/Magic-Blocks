import React, { memo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, OutlinedInput } from '@material-ui/core';
import clsx from 'clsx';

import ContainedButton from 'components/UI/Buttons/ContainedButton';
import EyeOpenIcon from 'components/Icons/EyeOpenIcon';
import EyeCloseIcon from 'components/Icons/EyeCloseIcon';
import ErrorExclamationIcon from 'components/Icons/ErrorExclamationIcon';
import ErrorCrossIcon from 'components/Icons/ErrorCrossIcon';
import CheckedIcon from 'components/Icons/CheckedIcon';
import GreenShiledIcon from 'components/Icons/GreenShieldIcon';
import WarningShieldIcon from 'components/Icons/WarningShieldIcon';
import RefreshIcon from 'components/Icons/RefreshIcon';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    width: '100%',
  },
  darkMode: {
    color: '#FFFFFF !important',
    backgroundColor: '#474D66 !important',
    border: 'unset !important',
    '&::placeholder': {
      color: '#FFFFFF !important',
    },
    '&:-ms-input-placeholder': {
      color: '#FFFFFF !important',
    },
    '&::-ms-input-placeholder': {
      color: '#FFFFFF !important',
    },
  },
  textFieldError: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    border: `1px solid #FF3D71`,
  },
  textField: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    border: `1px solid #D8DAE5`,
  },
  input: {
    fontSize: 18,
    fontFamily: 'roboto, sans-serif',
    lineHeight: 'normal',
    borderRadius: 10,
    padding: theme.spacing(1.5),
    color: '#1F1F1F',
    backgroundColor: '#FFFFFF',
    '&::placeholder': {
      lineHeight: 'normal',
      color: '#1F1F1F',
    },
    '&:-ms-input-placeholder': {
      lineHeight: 'normal',
      color: '#1F1F1F',
    },
    '&::-ms-input-placeholder': {
      lineHeight: 'normal',
      color: '#1F1F1F',
    },
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
  multiline: {
    padding: 0,
  },
  notchedOutline: {
    border: 'none',
  },
  errorInput: {
    border: `1px solid ${theme.palette.danger.main}`,
  },
  adornedEnd: {
    backgroundColor: theme.palette.text.primary,
  },
  error: {
    color: theme.palette.danger.main,
  },
  label: {
    fontSize: 14,
    fontWeight: 600,
    color: '#D0D0D0',
  },
  description: {
    fontSize: 12,
    fontWeight: 600,
    color: '#D0D0D0',
  },
  maxButton: {
    fontSize: 12,
    minWidth: 'unset',
    padding: theme.spacing(0.5, 1),
  },
  walletErrorButton: {
    fontSize: '14px', 
    width: '60%', 
    display: 'flex', 
    justifyContent: 'flex-end'
  },
  iconButton: {
    fontSize: '14px', 
    width: '10%', 
    display: 'flex', 
    justifyContent: 'flex-end'
  }
}));

const FiefTextField = React.forwardRef(
  (
    { label, description, type = 'text', darkMode = false, smallLabel='', error, onMax, className, ...rest },
    ref,
  ) => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className={clsx(classes.root, className)}>
        {!!label && <Typography className={classes.label}>{label}</Typography>}
        <OutlinedInput
          inputRef={ref}
          variant='outlined'
          type={showPassword ? 'text' : type}
          error={!!error}
          className={clsx('form-control form-control-lg', type === 'alert' ? classes.textFieldError : classes.textField, {
            [classes.darkMode]: darkMode,
          })}
          classes={{
            input: clsx(classes.input, {
              [classes.darkMode]: darkMode,
            }),
            multiline: classes.multiline,
            error: classes.errorInput,
            notchedOutline: classes.notchedOutline,
            adornedEnd: classes.adornedEnd,
          }}
          endAdornment={
            <>
              {onMax && (
                <ContainedButton className={classes.maxButton} onClick={onMax}>
                  MAX
                </ContainedButton>
              )}

              {type === 'password' &&
                (showPassword ? (
                  <EyeCloseIcon onClick={() => setShowPassword(false)} />
                ) : (
                  <EyeOpenIcon onClick={() => setShowPassword(true)} />
                ))
              }
              {
                type === 'alert' && <ErrorExclamationIcon/>
              }
              {
                type === 'cross' && <div className={classes.walletErrorButton}>{smallLabel}<ErrorCrossIcon/></div>
              }
              {
                type === 'checked' && <div className={classes.walletErrorButton}>{smallLabel}<CheckedIcon/></div>
              }
              {
                type === 'green_shield' && <div className={classes.iconButton}><GreenShiledIcon/></div>
              }
              {
                type === 'warning_shield' && <div className={classes.iconButton}><WarningShieldIcon/></div>
              }
              {
                type === 'refresh' && <div className={classes.iconButton}><RefreshIcon/></div>
              }
            </>
          }
          {...rest}
        />
        {!!error && (
          <Typography variant='subtitle2' className={classes.error}>
            {error}
          </Typography>
        )}
        {!!description && <Typography className={classes.description}>{description}</Typography>}
      </div>
    );
  },
);

export default memo(FiefTextField);
