import { memo } from 'react';
import { useAuth } from 'contexts/auth-context';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import AUTH_TYPES from 'utils/constants/auth-types';
import {
  CHAT_HERO_IMAGE_PATH,
  CHAT_AVATAR_IMAGE_PATH,
  CHAT_HEADER_DOT_FRAME_IMAGE_PATH,
} from 'utils/constants/image-paths';
import GradientButton from 'components/UI/Buttons/GradientButton';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    background: '#F9FAFC',
    padding: theme.spacing(20, 2.5, 0),
    overflow: 'hidden',
    minHeight: 780,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 24,
      padding: theme.spacing(4, 2.5, 0),
    },
  },
  logo: {
    position: 'absolute',
    right: 0,
    objectFit: 'contain',
    height: 850,
    marginRight: -240,
    [theme.breakpoints.down('lg')]: {
      height: 650,
      marginRight: -180,
    },
    [theme.breakpoints.down('md')]: {
      height: 450,
      marginRight: -140,
    },
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
      height: '100%',
      width: '100%',
      marginRight: 'unset',
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 160,
    width: '100%',
    maxWidth: theme.custom.layout.maxDeskWidth,
    [theme.breakpoints.down('md')]: {
      gap: 56,
    },
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
    },
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: 521,
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
    },
  },
  title: {
    fontSize: 64,
    fontFamily: 'pedestria-mvb,sans-serif',
    textTransform: 'uppercase',
    color: '#1F182A',
    [theme.breakpoints.down('sm')]: {
      fontSize: 48,
      textAlign: 'center',
    },
  },
  description: {
    fontSize: 18,
    color: '#474D66',
    marginBottom: theme.spacing(7),
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  button: {
    fontSize: 20,
    textTransform: 'uppercase',
    padding: theme.spacing(1, 4),
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
      padding: theme.spacing(1),
      width: '100%',
    },
  },
  avatar: {
    position: 'relative',
    zIndex: 2,
    maxWidth: 522,
    width: '100%',
    objectFit: 'contain',
    [theme.breakpoints.down('lg')]: {
      maxWidth: 420,
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: 320,
    },
  },
  frame: {
    position: 'absolute',
    bottom: 0,
    height: 72,
    width: '100%',
    objectFit: 'cover',
    background: '#A4B258',
    [theme.breakpoints.down('sm')]: {
      height: 40,
      marginRight: -20,
    },
  },
}));

const ChatHeader = () => {
  const classes = useStyles();
  const { setAuthModal } = useAuth();
  return (
    <main className={classes.root}>
      <img alt='chat-hero' src={CHAT_HERO_IMAGE_PATH} className={classes.logo} />
      <div className={classes.container}>
        <div className={classes.infoContainer}>
          <Typography className={classes.title}>Meet Magic Blocks Chat</Typography>
          <Typography className={classes.description}>
            A forum and live messaging app built on top of Influence Points and Avatars
          </Typography>
          <GradientButton
            onClick={()=> {setAuthModal(AUTH_TYPES.SIGN_UP)}}
            className={classes.button}>
            CREATE AN ACCOUNT
          </GradientButton>
        </div>

        <img alt='chat-avatar' src={CHAT_AVATAR_IMAGE_PATH} className={classes.avatar} />
      </div>
      <img alt='bottom-frame' src={CHAT_HEADER_DOT_FRAME_IMAGE_PATH} className={classes.frame} />
    </main>
  );
};

export default memo(ChatHeader);
