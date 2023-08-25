import { memo } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import GradientButton from 'components/UI/Buttons/GradientButton';
import OutlinedButton from 'components/UI/Buttons/OutlinedButton';

const useStyles = makeStyles(theme => ({
  paper: {
    maxWidth: 628,
    width: '100%',
    borderRadius: 4,
    padding: theme.spacing(2),
    boxShadow: '0px 12px 40px rgba(70, 74, 156, 0.15)',
    background:
      'linear-gradient(130deg, #f3f4fe 0%, #f2f2fe 15%, #FFFFFF 50%, #fff5ff 85%, #fff4ff 100%)',
    [theme.breakpoints.down('sm')]: {
      minWidth: 'unset',
      margin: theme.spacing(2),
    },
  },
  dialogTitle: {
    display: 'flex',
    padding: theme.spacing(1),
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    fontSize: 48,
    lineHeight: 1,
    color: theme.palette.primary.main,
    fontFamily: 'pedestria-mvb',
    background: 'linear-gradient(97.82deg, #97F6FF -148.83%, #8085EE 100.25%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    [theme.breakpoints.down('sm')]: {
      fontSize: 32,
    },
  },
  errorStyle: {
    color: theme.palette.danger.main,
  },
  closeIcon: {
    position: 'absolute',
    color: '#1F182A',
    top: theme.spacing(2),
    right: theme.spacing(3),
    '& svg': {
      fontSize: 26,
    },
    [theme.breakpoints.down('xs')]: {
      top: theme.spacing(1),
      right: theme.spacing(2),
    },
  },
  dialogContent: {
    width: '100%',
    minWidth: '100%',
    minHeight: 90,
    padding: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      minWidth: 'unset',
      padding: 0,
    },
  },
  dialogActions: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: theme.spacing(1),
    gap: theme.spacing(3),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  button: {
    width: '100%',
    fontSize: 18,
  },
}));

const FiefDialog = ({
  open,
  isError,
  title,
  titleClass,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  onClose,
  className,
  children,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{ paper: clsx(classes.paper, className) }}
      aria-labelledby='customized-dialog-title'
      {...rest}>
      {title && (
        <DialogTitle id='customized-dialog-title' disableTypography className={classes.dialogTitle}>
          <Typography
            variant='h6'
            align='center'
            className={clsx(classes.title, isError && classes.errorStyle, titleClass)}>
            {title}
          </Typography>
        </DialogTitle>
      )}

      {onClose && (
        <IconButton edge='end' aria-label='close' className={classes.closeIcon} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      )}

      <DialogContent className={classes.dialogContent}>{children}</DialogContent>
      {(!!cancelLabel || !!confirmLabel) && (
        <DialogActions disableSpacing className={classes.dialogActions}>
          {!!cancelLabel && (
            <OutlinedButton
              autoFocus
              color='secondary'
              onClick={onCancel}
              className={classes.button}>
              {cancelLabel}
            </OutlinedButton>
          )}
          {!!confirmLabel && (
            <GradientButton onClick={onConfirm} className={classes.button}>
              {confirmLabel}
            </GradientButton>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default memo(FiefDialog);
