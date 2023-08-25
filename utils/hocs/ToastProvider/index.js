import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles(theme => ({
  toastContainer: {
    maxWidth: 510,
    width: '100%',
    padding: 0,
    top: 130,
    right: 24,
    '& .Toastify__toast-body': {
      margin: 0,
      padding: 0,
      marginRight: -44,
    },
    '& .header-container': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 20,
      fontWeight: 500,
      height: 48,
      width: '100%',
      color: '#FFFFFF',
      backgroundColor: '#52BD94',
    },
    '& .content': {
      color: '#433012',
      backgroundColor: '#FFFFFF',
      fontSize: 20,
      fontWeight: 500,
      padding: theme.spacing(1),
      '& a': {
        color: '#433012',
      },
    },
    '& .Toastify__zoom-enter': {
      display: 'none',
    },
    '& .Toastify__toast--success': {
      color: '#433012',
      backgroundColor: '#FFFFFF',
    },
    '& .Toastify__close-button': {
      opacity: 1,
      margin: 15,
      '& svg': {
        color: '#FFFFFF',
      },
    },
  },
  toast: {
    borderRadius: 4,
    boxShadow: '0px 4px 8px rgba(7, 11, 29, 0.08)',
    padding: 0,
  },
}));

const ToastProvider = () => {
  const classes = useStyles();

  return (
    <ToastContainer
      pauseOnFocusLoss={false}
      className={classes.toastContainer}
      toastClassName={classes.toast}
      hideProgressBar
    />
  );
};

export default memo(ToastProvider);
