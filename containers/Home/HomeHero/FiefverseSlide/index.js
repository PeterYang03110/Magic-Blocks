import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { use100vh } from 'react-div-100vh';

import GradientButton from 'components/UI/Buttons/GradientButton';
import OutlinedButton from 'components/UI/Buttons/OutlinedButton';
import {
  HOME_FIEFVERSE_BACKGROUND_IMAGE_PATH,
  HOME_FIEFVERSE_BACKGROUND_INNER_IMAGE_PATH,
  FIEFVERSE_AVATAR_ICON_PATH,
} from 'utils/constants/image-paths';
import LINKS from 'utils/constants/links';
import SOCIALS from 'utils/constants/social';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${HOME_FIEFVERSE_BACKGROUND_IMAGE_PATH})`,
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
    backgroundImage: `url(${HOME_FIEFVERSE_BACKGROUND_INNER_IMAGE_PATH})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom left',
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
      minHeight: theme.custom.layout.minMobileHeight,
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
  tag: {
    fontSize: 26,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#FFFFFF',
    background: '#00da89',
    borderRadius: 6,
    padding: theme.spacing(0.5, 1),
    width: 'fit-content',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
    },
  },
  title: {
    fontFamily: 'pedestria-mvb,sans-serif',
    fontSize: 100,
    lineHeight: '92px',
    fontWeight: 700,
    maxWidth: 1120,
    textTransform: 'uppercase',
    textShadow: '0px 1.5px 2px rgba(7, 11, 29, 0.15)',
    color: '#1F182A',
    '& span': {
      color: '#FFFFFF',
    },
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('lg')]: {
      fontSize: 75,
      lineHeight: '75px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 62,
      lineHeight: '72px',
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 48,
      lineHeight: '52px',
      marginBottom: theme.spacing(2),
    },
  },
  description: {
    fontSize: 22,
    lineHeight: '32px',
    fontWeight: 600,
    color: '#232a5d',
    maxWidth: 616,
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
      marginBottom: theme.spacing(5),
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
  avatar: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    right: 120,
    maxWidth: 600,
    width: '100%',
    [theme.breakpoints.down('lg')]: {
      maxWidth: 550,
      right: 80,
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: 500,
      right: 30,
      bottom: 50,
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: 450,
      right: 30,
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: 280,
      right: 30,
    },
  },
}));

const FiefverseSlide = () => {
  const deviceHeight = use100vh();
  const classes = useStyles({
    deviceHeight: deviceHeight ? `${deviceHeight > 950 ? 950 : deviceHeight}px` : '100vh',
  });

  return (
    <div className={classes.root}>
      <div className={classes.backgroundContainer}>
        <div className={classes.content}>
          <Typography className={classes.tag}>Now Available</Typography>

          <Typography className={classes.title}>
            Enter The MabsVerse With <br />
            <span>Avatars</span>
          </Typography>

          <Typography className={classes.description}>
            The first collection of 1,200 Avatars have come to the High Fantasy World. Mint yours
            today!
          </Typography>

          <div className={classes.buttonContainer}>
            <GradientButton href={`${LINKS.SHOP.HREF}/#avatar`} className={classes.button}>
              VISIT Shop
            </GradientButton>
            <OutlinedButton
              href={`${SOCIALS.MEDIUM.HREF}/fief-avatars-99a78d081332`}
              color='primary'
              target='_blank'
              endIcon={<ArrowForwardIcon />}
              className={classes.button}>
              learn more about avatars
            </OutlinedButton>
          </div>
        </div>
        <img alt='fiefverse-avatar' src={FIEFVERSE_AVATAR_ICON_PATH} className={classes.avatar} />
      </div>
    </div>
  );
};

export default memo(FiefverseSlide);
