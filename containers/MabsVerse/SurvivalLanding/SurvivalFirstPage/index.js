import { memo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { use100vh } from 'react-div-100vh';
import { Button, Typography, useMediaQuery, useTheme } from '@material-ui/core';

import {
  FIEFVERSE_SURVIVAL_BG_VIDEO,
  FIEFVERSE_SURVIVAL_FP,
  FIEFVERSE_SURVIVAL_LOGO,
  FIEFVERSE_SURVIVAL_SPLASH,
} from 'utils/constants/image-paths';
import DownloadIcon from 'components/Icons/DownloadIcon';
import Link from 'next/link';
import YoutubeEmbed from 'parts/YoutubeEmbed';

const useStyles = makeStyles(theme => ({
  root: ({ deviceHeight }) => ({
    background: '#000',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    minHeight: `calc(${deviceHeight} - ${theme.custom.layout.topAppBarHeight}px)`,

    [theme.breakpoints.down('sm')]: {
      backgroundImage: `url(${FIEFVERSE_SURVIVAL_FP})`,
    },
  }),
  video: {
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  videoWrapper: {
    position: 'relative',
    width: '100%',
    height: `100%`,
    overflow: 'hidden',
  },
  mainContainer: ({ deviceHeight }) => ({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: `calc(${deviceHeight} - ${theme.custom.layout.topAppBarHeight}px)`,
    justifyContent: 'flex-end',
    paddingBottom: 80,

    [theme.breakpoints.down('sm')]: {
      paddingBottom: 40,
    },
  }),
  logo: {
    height: '80%',
    marginLeft: 22,
    width: '100%',

    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  logoContainer: {
    zIndex: 1,
  },
  splash: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  splashContainer: {
    alignItems: 'center',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    top: -90,

    [theme.breakpoints.down('xs')]: {
      top: -60,
    },
  },
  splashText: {
    marginLeft: 16,
    fontSize: 72,
    fontFamily: 'Rajdhani-Bold',
    left: '50%',
    top: '50%',
    position: 'absolute',
    textShadow:
      '0px 1.00715px 24.4235px #BE2227, 0px 1.00715px 6.79829px #AA3E41, 0px 3.02146px 10.0715px rgba(7, 11, 29, 0.16)',
    transform: 'translate(-50%, -50%)',

    [theme.breakpoints.down('sm')]: {
      fontSize: 50,
    },
  },
  button: {
    background: '#EE2B2B',
    border: '2px solid rgba(255, 122, 126, 0.2)',
    borderRadius: 4,
    fontFamily: 'pedestria-mvb',
    fontSize: 24,
    position: 'relative',
    height: 56,
    top: -60,
    width: 320,

    '&:hover': {
      background: '#EE2B2B',
      boxShadow: '0px 4px 18px #BE2227, 0px 4px 124px #BE2227',
      border: '2px solid #FF7A7E',
    },

    '&:disabled': {
      color: '#fff',
      opacity: 0.4,
      background: '#1E1E1E',
      border: '2px solid #1E1E1E',
    },
  },
  secondaryButton: {
    height: 56,
    top: -60,
    width: 320,
    fontFamily: 'pedestria-mvb',
    fontSize: 24,
    position: 'relative',
    background: theme.palette.background.primary,
    border: '2px solid rgba(255, 122, 126, 0.2)',
    textShadow: '0px 3.2418px 21.8821px #AA3E41, 0px 9.7254px 32.418px rgba(7, 11, 29, 0.16)',

    '&:hover': {
      boxShadow: '0px 4px 18px #BE2227, 0px 4px 124px #BE2227',
      border: '2px solid #FF7A7E',
      background: theme.palette.background.primary,
    },
  },
  link: {
    textDecoration: 'none',
  },
  downloadIcon: {
    marginLeft: 18,
    height: 25,
    width: 20,
  },
  ctaContainer: {
    zIndex: 2,
    display: 'flex',
    gap: 32,

    [theme.breakpoints.down('sm')]: {
      marginTop: 20,
      flexDirection: 'column',
      gap: 24,
    },
  },
  shadowBox: {
    position: 'absolute',
    height: 300,
    width: '100%',
    background: 'linear-gradient(0deg, rgba(0,0,0,1) 35%, rgba(230,230,230,0) 100%)',
    bottom: 0,
  },
}));

const SurvivalFirstPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const [showTrailer, setShowTrailer] = useState(false);
  const deviceHeight = use100vh();
  const classes = useStyles({
    deviceHeight: deviceHeight ? `${deviceHeight > 1080 ? 1080 : deviceHeight}px` : '100vh',
  });

  const handleWatchTrailer = () => {
    setShowTrailer(prevShow => !prevShow);
  };

  const handleOutsideClick = () => {
    setShowTrailer(false);
  };

  return showTrailer ? (
    <YoutubeEmbed
      embedId={'CvXb_wUc5vM'}
      className={classes.root}
      handleOutsideClick={handleOutsideClick}
    />
  ) : (
    <main className={classes.root}>
      <div className={classes.videoWrapper}>
        {matches && (
          <video autoPlay muted loop className={classes.video}>
            <source src={FIEFVERSE_SURVIVAL_BG_VIDEO} type='video/mp4' />
          </video>
        )}
        <div className={classes.mainContainer}>
          <div className={classes.logoContainer}>
            <img src={FIEFVERSE_SURVIVAL_LOGO} className={classes.logo} />
          </div>
          <div className={classes.splashContainer}>
            <img src={FIEFVERSE_SURVIVAL_SPLASH} className={classes.splash} />
            <Typography className={classes.splashText}>SURVIVAL</Typography>
          </div>
          <div className={classes.ctaContainer}>
            <Link className={classes.link} href={'/fiefverse/launcher'}>
              <Button className={classes.button}>
                PLAY NOW <DownloadIcon className={classes.downloadIcon} />
              </Button>
            </Link>
            <Button onClick={handleWatchTrailer} className={classes.secondaryButton}>
              WATCH TRAILER
            </Button>
          </div>
          <div className={classes.shadowBox}></div>
        </div>
      </div>
    </main>
  );
};

export default memo(SurvivalFirstPage);
