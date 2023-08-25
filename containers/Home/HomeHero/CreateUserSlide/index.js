import { memo } from 'react';
import { useAuth } from 'contexts/auth-context';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { use100vh } from 'react-div-100vh';

import GradientButton from 'components/UI/Buttons/GradientButton';
import {
  HOME_CREATE_USER_BACKGROUND_IMAGE_PATH,
} from 'utils/constants/image-paths';
import AUTH_TYPES from 'utils/constants/auth-types';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${HOME_CREATE_USER_BACKGROUND_IMAGE_PATH})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  },
  backgroundContainer: ({ deviceHeight }) => ({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(20, 3, 0),
    minHeight: `calc(${deviceHeight} - ${theme.custom.layout.topAppBarHeight}px)`,
    height: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom center',
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(10, 0, 0, 18),
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(8, 0, 0, 18),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(6, 3, 0),
    },
    [theme.breakpoints.down('xs')]: {
      minHeight: 730,
    },
  }),
  content: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 4,
    width: '100%',
    maxWidth: theme.custom.layout.maxDeskWidth,
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
    },
  },
  comingSoon: {
    fontSize: 26,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#797FF2',
    background: '#FFFFFF',
    borderRadius: 6,
    padding: theme.spacing(0.5, 1),
    width: 'fit-content',
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
    },
  },
  title: {
    fontFamily: 'pedestria-mvb,sans-serif',
    fontSize: 120,
    lineHeight: '122px',
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#797FF2',
    marginBottom: theme.spacing(4),
    '& span': {
      color: '#FFFFFF',
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: 85,
      lineHeight: '92px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 72,
      lineHeight: '72px',
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 64,
      lineHeight: '66px',
      marginBottom: theme.spacing(2),
    },
  },
  description: {
    fontSize: '22px',
    lineHeight: '32px',
    fontWeight: 500,
    color: '#B6BAF8',
    maxWidth: 650,
    borderLeft: `3px solid #0b0b0b`,
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(7),
    [theme.breakpoints.down('md')]: {
      fontSize: 18,
      lineHeight: '24px',
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      borderLeft: 0,
      paddingLeft: 0,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
      lineHeight: '18px',
      marginBottom: theme.spacing(2),
    },
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing(2),
  },
  button: {
    fontSize: 20,
    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
      width: '100%',
    },
  },
}));

const CreateUserSlide = () => {
  const { setAuthModal } = useAuth();
  const deviceHeight = use100vh();
  const classes = useStyles({
    deviceHeight: deviceHeight ? `${deviceHeight > 950 ? 950 : deviceHeight}px` : '100vh',
  });

  return (
    <div className={classes.root}>
      <div className={classes.backgroundContainer}>
        <div className={classes.content}>
          <Typography className={classes.title}>
            Level Up Your Experience <br />  With A Magic Blocks <span> Account</span>
          </Typography>

          <Typography className={classes.description}>
            Create a Magic Blocks Account today and claim your very own username! <br/><br/>
            With a Magic Blocks Account, you can fully access Magic Blocks Protocol dapps and play in the MabsVerse.
          </Typography>

          <div className={classes.buttonContainer}>
            <GradientButton className={classes.button} onClick={()=> {setAuthModal(AUTH_TYPES.SIGN_UP)}}>
              CREATE AN ACCOUNT
            </GradientButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CreateUserSlide);
