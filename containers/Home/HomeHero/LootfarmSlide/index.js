import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { use100vh } from 'react-div-100vh';

import {
  HOME_LOOTFARM_BACKGROUND_IMAGE_PATH,
  HOME_LOOTFARM_BACKGROUND_INNER_IMAGE_PATH,
  LOOTFARM_AVATAR_ICON_PATH,
} from 'utils/constants/image-paths';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${HOME_LOOTFARM_BACKGROUND_IMAGE_PATH})`,
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
    backgroundImage: `url(${HOME_LOOTFARM_BACKGROUND_INNER_IMAGE_PATH})`,
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
  comingSoon: {
    fontSize: 26,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#797FF2',
    background: '#FFFFFF',
    borderRadius: 6,
    padding: theme.spacing(0.5, 1),
    width: 'fit-content',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
    },
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontFamily: 'pedestria-mvb,sans-serif',
    fontSize: 130,
    lineHeight: '122px',
    fontWeight: 700,
    color: '#1F182A',
    '& span': {
      color: '#FFFFFF',
    },
    textTransform: 'uppercase',
    textShadow: '0px 1.5px 2px rgba(7, 11, 29, 0.15)',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('lg')]: {
      fontSize: 85,
      lineHeight: '92px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 72,
      lineHeight: '72px',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      gap: 16,
      textAlign: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 64,
      lineHeight: '66px',
      marginBottom: theme.spacing(2),
    },
  },
  description: {
    fontSize: 22,
    lineHeight: '32px',
    fontWeight: 600,
    color: '#232a5d',
    maxWidth: 495,
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
  avatar: {
    position: 'absolute',
    zIndex: 1,
    bottom: 180,
    right: 200,
    maxWidth: 480,
    width: '100%',
    [theme.breakpoints.down('lg')]: {
      maxWidth: 420,
      right: 90,
      bottom: 150,
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: 400,
      right: 50,
      bottom: 100,
    },
    [theme.breakpoints.down('sm')]: {
      bottom: 150,
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: 280,
      right: 30,
      bottom: 80,
    },
  },
}));

const LootfarmSlide = () => {
  const deviceHeight = use100vh();
  const classes = useStyles({
    deviceHeight: deviceHeight ? `${deviceHeight > 950 ? 950 : deviceHeight}px` : '100vh',
  });

  return (
    <div className={classes.root}>
      <div className={classes.backgroundContainer}>
        <div className={classes.content}>
          <Typography className={classes.comingSoon}>Coming Soon</Typography>

          <Typography className={classes.title}>
            <span>loot</span> Farms
          </Typography>

          <Typography className={classes.description}>
            {`Earn rewards on your favorite metaverse assets without them ever leaving your wallet.
            It's as easy as killing boars in the forest.`}
          </Typography>
        </div>
        <img alt='lootfarm-avatar' src={LOOTFARM_AVATAR_ICON_PATH} className={classes.avatar} />
      </div>
    </div>
  );
};

export default memo(LootfarmSlide);
