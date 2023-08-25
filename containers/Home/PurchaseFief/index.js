import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { use100vh } from 'react-div-100vh';

import GradientButton from 'components/UI/Buttons/GradientButton';
import OutlinedButton from 'components/UI/Buttons/OutlinedButton';
import LINKS from 'utils/constants/links';
import {
  HOME_PURCHASE_BACKGROUND_IMAGE_PATH,
  HOME_PURCHASE_BACKGROUND_INNER_IMAGE_PATH,
  PURCHASE_AVATAR_ICON_PATH,
  WHITE_DOT_FRAME_IMAGE_PATH,
} from 'utils/constants/image-paths';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    zIndex: 2,
    backgroundImage: `url(${HOME_PURCHASE_BACKGROUND_IMAGE_PATH})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center right',
  },
  backgroundContainer: ({ deviceHeight }) => ({
    position: 'relative',
    zIndex: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(20, 3, 10),
    minHeight: `calc(${deviceHeight} - ${theme.custom.layout.topAppBarHeight}px)`,
    height: '100%',
    backgroundImage: `url(${HOME_PURCHASE_BACKGROUND_INNER_IMAGE_PATH})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom center',
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(10, 3),
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(8, 3),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(6, 3),
    },
    [theme.breakpoints.down('xs')]: {
      minHeight: theme.custom.layout.minMobileHeight,
    },
  }),
  container: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: theme.custom.layout.maxDeskWidth,
    width: '100%',
    borderRadius: 12,
  },
  title: {
    fontSize: 88,
    lineHeight: '92px',
    fontFamily: 'pedestria-mvb,sans-serif',
    textTransform: 'uppercase',
    color: '#FFFFFF',
    textShadow: '0px 1.5px 2px rgba(7, 11, 29, 0.15)',
    marginBottom: 56,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 64,
      lineHeight: '66px',
      textAlign: 'center',
      marginBottom: 40,
    },
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(4),
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      gap: theme.spacing(2),
    },
  },
  button: {
    fontSize: 20,
    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
      width: '100%',
    },
  },
  frame: {
    position: 'absolute',
    zIndex: 4,
    bottom: -32,
    height: 72,
    width: '100%',
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
      bottom: -23,
      height: 40,
    },
  },
  avatar: {
    position: 'absolute',
    zIndex: 2,
    bottom: 80,
    right: 280,
    maxWidth: 380,
    width: '100%',
    [theme.breakpoints.down('lg')]: {
      right: 180,
      maxWidth: 320,
    },
    [theme.breakpoints.down('md')]: {
      right: 120,
      maxWidth: 220,
      bottom: 50,
    },
    [theme.breakpoints.down('sm')]: {
      right: 180,
      maxWidth: 280,
      bottom: 50,
    },
    [theme.breakpoints.down('xs')]: {
      right: 100,
      maxWidth: 152,
      bottom: 50,
    },
  },
}));

const PurchaseFief = () => {
  const deviceHeight = use100vh();
  const classes = useStyles({
    deviceHeight: deviceHeight ? `${deviceHeight > 950 ? 950 : deviceHeight}px` : '100vh',
  });

  return (
    <main className={classes.root}>
      <div className={classes.backgroundContainer}>
        <div className={classes.container}>
          <Typography className={classes.title}>
            Don’t own any <span>MABS</span>?
          </Typography>

          <div className={classes.buttonContainer}>
            <GradientButton target='_blank' href={LINKS.BUY_FIEF_UNISWAP.HREF} className={classes.button}>
              purchase mabs
            </GradientButton>
            <OutlinedButton
              target='_blank'
              href={`${LINKS.DOCUMENTATION.HREF}/fief-token/basics`}
              endIcon={<ArrowForwardIcon />}
              className={classes.button}>
              Learn More About MABS
            </OutlinedButton>
          </div>
        </div>
      </div>

      <img alt='fiefverse-avatar' src={PURCHASE_AVATAR_ICON_PATH} className={classes.avatar} />

      <img alt='bottom-frame' src={WHITE_DOT_FRAME_IMAGE_PATH} className={classes.frame} />
    </main>
  );
};

export default memo(PurchaseFief);
