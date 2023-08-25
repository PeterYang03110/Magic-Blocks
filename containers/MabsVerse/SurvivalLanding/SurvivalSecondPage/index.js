import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { use100vh } from 'react-div-100vh';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

import {
  FIEFVERSE_SURVIVAL_SCRENSHOT1,
  FIEFVERSE_SURVIVAL_SCRENSHOT2,
  FIEFVERSE_SURVIVAL_SCRENSHOT3,
  FIEFVERSE_SURVIVAL_SP,
} from 'utils/constants/image-paths';

const useStyles = makeStyles(theme => ({
  root: ({ deviceHeight }) => ({
    minHeight: `calc(${deviceHeight} - ${theme.custom.layout.topAppBarHeight}px)`,
    backgroundImage: `url(${FIEFVERSE_SURVIVAL_SP})`,
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    background: '#000',
  }),
  screenshot: {
    width: '50%',
    height: 'fit-content',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: 6,

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: 1280,
    marginBottom: 80,
    marginTop: 100,

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      marginTop: -10,
    },
  },
  secondRow: {
    maxWidth: 1280,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 628,
    textAlign: 'center',
    marginBottom: 56,

    [theme.breakpoints.down('sm')]: {
      marginBottom: 0,
    },
  },
  thirdRow: {
    maxWidth: 1280,
    display: 'flex',
    marginBottom: 100,

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      marginBottom: 45,
    },
  },
  rowText: {
    marginRight: 56,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
    },
  },
  title: {
    color: '#fff',
    fontSize: 40,
    fontFamily: 'pedestria-mvb',
    marginBottom: 16,
    textShadow:
      '0px 3.2418px 78.6136px #BE2227, 0px 3.2418px 21.8821px #FF0008, 0px 9.7254px 32.418px rgba(7, 11, 29, 0.16)',

    [theme.breakpoints.down('sm')]: {
      fontSize: 32,
      textAlign: 'center',
    },
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter',
    color: '#FFF2F2',

    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      marginBottom: 40,
    },
  },
  note: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFD079',
  },
  activeBox: {
    background: 'rgba(255, 0, 0, 0.13)',
    padding: 24,
    border: '2px solid #FFA5A8',
    borderRadius: 6,
    boxShadow: '0px 4px 18px #BE2227, 0px 4px 124px #BE2227',
    marginRight: 32,

    [theme.breakpoints.down('sm')]: {
      marginBottom: 32,
      marginRight: 0,
    },
  },
  activeBoxText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginTop: 16,
    textAlign: 'center',
  },
  bottomScreenshot: {
    maxWidth: '100%',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
  },
  inactiveBox: {
    background: 'rgba(255, 0, 0, 0.1)',
    padding: 24,
    border: '2px solid rgba(255, 165, 168, 0.2)',
    borderRadius: 6,
    position: 'relative',
    textAlign: 'center',
  },
  coomingSoonText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

const SurvivalSecondPage = () => {
  const deviceHeight = use100vh();
  const classes = useStyles({
    deviceHeight: deviceHeight ? `${deviceHeight > 1080 ? 1080 : deviceHeight}px` : '100vh',
  });

  return (
    <main className={classes.root}>
      <div className={classes.row}>
        <div className={classes.rowText}>
          <Typography className={classes.title}>
            Survive Against Waves of Ferocious Enemies
          </Typography>
          <Typography className={classes.subtitle}>
            Put your fighting ability to the test in this free-to-play wave defense game title set
            in High Fantasy World.
          </Typography>
        </div>
        <img src={FIEFVERSE_SURVIVAL_SCRENSHOT1} className={classes.screenshot} />
      </div>
      <div className={classes.secondRow}>
        <Typography className={classes.note}>MORE COMING SOON</Typography>
        <Typography className={classes.title}>Playable Maps</Typography>
        <Typography className={classes.subtitle}>
          Journey to different locations across High Fantasy World in both single player and
          multiplayer format.
        </Typography>
      </div>

      <div className={classes.thirdRow}>
        <div className={classes.activeBox}>
          <img src={FIEFVERSE_SURVIVAL_SCRENSHOT2} className={classes.bottomScreenshot} />
          <Typography className={classes.activeBoxText}>TRAPPED - SINGLE PLAYER</Typography>
        </div>
        <div className={classes.inactiveBox}>
          <img src={FIEFVERSE_SURVIVAL_SCRENSHOT3} className={classes.bottomScreenshot} />
          <Typography className={clsx(classes.coomingSoonText, classes.activeBoxText)}>
            COMING SOON
          </Typography>
        </div>
      </div>
    </main>
  );
};

export default memo(SurvivalSecondPage);
