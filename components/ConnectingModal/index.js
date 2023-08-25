import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography } from '@material-ui/core';

import LoadingIcon from 'components/Icons/LoadingIcon';
import FiefDialog from 'components/FiefDialog';
import { METAMASK_IMAGE_PATH } from 'utils/constants/image-paths';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
  title: {
    fontSize: 32,
    color: '#52BD94',
    fontFamily: 'pedestria-mvb',
    lineHeight: 1.2,

    [theme.breakpoints.down('sm')]: {
      fontSize: 24,
    },
  },
  logoContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(6, 0),
  },
  logo: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    height: 72,
  },
  spinner: {
    position: 'absolute',
  },
  description: {
    fontSize: 18,
    color: '#474D66',
  },
  note: {
    color: '#474D66',
    textAlign: 'center',
    backgroundColor: 'rgba(211, 213, 251, 0.15)',
    borderRadius: 6,
    width: '100%',
    padding: theme.spacing(2),
    '& a': {
      color: '#F6851B',
    },
  },
  circle: {
    stroke: 'url(#linearColors)',
  },
}));

const size = 150;

const ConnectingModal = ({ open, title = 'Connecting...' }) => {
  const classes = useStyles();

  return (
    <FiefDialog
      open={open}
      title={
        <>
          <LoadingIcon /> {title}
        </>
      }>
      <div className={classes.container}>
        <Typography className={classes.description}>
          Please open Metamask and follow the steps required.
        </Typography>

        <div className={classes.logoContainer}>
          <CircularProgress
            classes={{
              circle: classes.circle,
            }}
            size={size}
          />
          <svg width={size} height={size} className={classes.spinner}>
            <linearGradient id='linearColors' x1='0' y1='0' x2='1' y2='1'>
              <stop offset='0%' stopColor='#c6dffa' />
              <stop offset='30%' stopColor='#8c97f4' />
              <stop offset='60%' stopColor='#d5f3fc' />
              <stop offset='90%' stopColor='#f997fe' />
            </linearGradient>
          </svg>
          <img alt='logo' src={METAMASK_IMAGE_PATH} className={classes.logo} />
        </div>

        <Typography className={classes.note}>
          Dont forget to install the easy to use{' '}
          <a href={'https://metamask.io/download'} target='_blank' rel='noreferrer'>
            Metamask browser extention
          </a>
        </Typography>
      </div>
    </FiefDialog>
  );
};

export default memo(ConnectingModal);
