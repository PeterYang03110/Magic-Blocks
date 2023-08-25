import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { use100vh } from 'react-div-100vh';

import GradientButton from 'components/UI/Buttons/GradientButton';
import OutlinedButton from 'components/UI/Buttons/OutlinedButton';
import {
  HOME_STAKING_BACKGROUND_IMAGE_PATH,
  HOME_STAKING_BACKGROUND_INNER_IMAGE_PATH,
  STAKING_AVATAR_ICON_PATH,
} from 'utils/constants/image-paths';
import LINKS from 'utils/constants/links';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${HOME_STAKING_BACKGROUND_IMAGE_PATH})`,
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
    backgroundImage: `url(${HOME_STAKING_BACKGROUND_INNER_IMAGE_PATH})`,
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
    fontSize: 130,
    lineHeight: '122px',
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#1F182A',
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
    fontSize: 22,
    lineHeight: '32px',
    fontWeight: 600,
    color: '#232a5d',
    maxWidth: 556,
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
  avatar: {
    position: 'absolute',
    zIndex: 1,
    bottom: 50,
    right: 100,
    maxWidth: 600,
    width: '100%',
    [theme.breakpoints.down('lg')]: {
      right: 0,
      maxWidth: 600,
      bottom: 40,
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: 600,
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: 110,
      right: 0,
      bottom: 40,
    },
  },
}));

const StakingSlide = () => {
  const deviceHeight = use100vh();
  const classes = useStyles({
    deviceHeight: deviceHeight ? `${deviceHeight > 950 ? 950 : deviceHeight}px` : '100vh',
  });

  return (
    <div className={classes.root}>
      <div className={classes.backgroundContainer}>
        <div className={classes.content}>
          <Typography className={classes.title}>
            Staking <br /> <span>Is Live</span>
          </Typography>

          <Typography className={classes.description}>
            Lock your tokens to earn weekly MABS rewards and daily Influence Point distributions to
            fuel your platform experience.
          </Typography>

          <div className={classes.buttonContainer}>
            <GradientButton href={LINKS.STAKING.HREF} className={classes.button}>
              Stake MABS
            </GradientButton>
            <OutlinedButton
              href={`${LINKS.DOCUMENTATION.HREF}/fief-applications/fief-staking`}
              color='primary'
              target='_blank'
              endIcon={<ArrowForwardIcon />}
              className={classes.button}>
              learn more about staking
            </OutlinedButton>
          </div>
        </div>
        <img alt='staking-avatar' src={STAKING_AVATAR_ICON_PATH} className={classes.avatar}/>
      </div>
    </div>
  );
};

export default memo(StakingSlide);
