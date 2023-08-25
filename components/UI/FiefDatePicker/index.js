import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import clsx from 'clsx';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';

import CalendarIcon from 'components/Icons/CalendarIcon';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    background: '#EDEFF5',
    borderRadius: 4,
    padding: theme.spacing(1),
  },
  textField: {
    width: '100%',
    borderBottom: `1px solid rgba(31, 31, 65, 0.1)`,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  input: {
    fontSize: 16,
    fontFamily: 'roboto, sans-serif',
    lineHeight: 'normal',
    padding: theme.spacing(1),
    color: '#232A5C',
    '&::placeholder': {
      lineHeight: 'normal',
      color: '#232A5C',
    },
    '&:-ms-input-placeholder': {
      lineHeight: 'normal',
      color: '#232A5C',
    },
    '&::-ms-input-placeholder': {
      lineHeight: 'normal',
      color: '#232A5C',
    },
    '&::-webkit-calendar-picker-indicator:focus': {
      display: 'none',
    },
  },
  notchedOutline: {
    border: 'none',
  },
  label: {
    fontSize: 16,
    color: '#070B1D',
    marginBottom: theme.spacing(1),
  },
  error: {
    border: `1px solid ${theme.palette.danger.main}`,
  },
}));

const FiefDatePicker = React.forwardRef(({ label, error, className, children, ...rest }, ref) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      {!!label && (
        <Typography color='textPrimary' className={classes.label}>
          {label}
        </Typography>
      )}

      <div className={classes.container}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            {...rest}
            inputRef={ref}
            helperText={null}
            error={false}
            variant='inline'
            inputVariant='outlined'
            format='MM/dd/yyyy'
            className={clsx('form-control form-control-lg', classes.textField)}
            InputProps={{
              classes: {
                input: classes.input,
                error: classes.error,
                notchedOutline: classes.notchedOutline,
              },
              endAdornment: <CalendarIcon />,
            }}
          />
        </MuiPickersUtilsProvider>
        {!!error && (
          <Typography variant='subtitle2' color='error'>
            {error}
          </Typography>
        )}

        {children}
      </div>
    </div>
  );
});

export default memo(FiefDatePicker);
