import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { use100vh } from 'react-div-100vh';
import { Button, Typography } from '@material-ui/core';
import Link from 'next/link';

import {
  FIEFVERSE_SURVIVAL_AVATARS,
  FIEFVERSE_SURVIVAL_CARD1,
  FIEFVERSE_SURVIVAL_CARD2,
  FIEFVERSE_SURVIVAL_CARD3,
  FIEFVERSE_SURVIVAL_TP,
} from 'utils/constants/image-paths';

const useStyles = makeStyles(theme => ({
  root: ({ deviceHeight }) => ({
    alignItems: 'center',
    background: '#000',
    backgroundImage: `url(${FIEFVERSE_SURVIVAL_TP})`,
    display: 'flex',
    flexDirection: 'column',
    minHeight: `calc(${deviceHeight} - ${theme.custom.layout.topAppBarHeight}px)`,
    padding: 20,
  }),
  row: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    maxWidth: 1280,
    marginBottom: 80,

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      marginBottom: 20,
    },
  },
  img: {
    width: '50%',
    height: 'fit-content',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  avatarTextContainer: {
    maxWidth: 480,

    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
      textAlign: 'center',
    },
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter',
    color: '#FFF2F2',

    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  highlightedText: {
    color: '#FF708D',
  },
  button: {
    background: '#EE2B2B',
    border: '2px solid rgba(255, 122, 126, 0.2)',
    borderRadius: 4,
    fontFamily: 'pedestria-mvb',
    fontSize: 24,
    marginTop: 40,
    width: 320,
    height: 50,

    '&:hover': {
      background: '#EE2B2B',
      boxShadow: '0px 4px 18px #BE2227, 0px 4px 124px #BE2227',
      border: '2px solid #FF7A7E',
    },
  },
  cardRow: {
    maxWidth: 1280,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: 16,
    marginTop: 40,
    marginBottom: 80,

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      gap: 24,
      marginTop: 8,
      marginBottom: 40,
    },
  },
  card: {
    background: 'rgba(11, 11, 11, 0.8)',
    borderRadius: 6,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: 16,
  },
  cardImg: {
    width: '100%',
    marginBottom: 12,
  },
  cardTitle: {
    textAlign: 'center',
    fontFamily: 'pedestria-mvb',
    fontSize: 32,
    marginBottom: 12,
    color: '#fff',
  },
  cardSubtitle: {
    textAlign: 'center',
    color: '#FFF2F2',
    fontFamily: 'Inter',
    fontSize: 16,
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
  },
}));

const SurvivalThirdPage = () => {
  const deviceHeight = use100vh();
  const classes = useStyles({
    deviceHeight: deviceHeight ? `${deviceHeight > 1080 ? 1080 : deviceHeight}px` : '100vh',
  });

  return (
    <main className={classes.root}>
      <div className={classes.row}>
        <img src={FIEFVERSE_SURVIVAL_AVATARS} className={classes.img} />
        <div className={classes.avatarTextContainer}>
          <Typography className={classes.title}>+10% Bonus IP</Typography>
          <Typography className={classes.subtitle}>
            Each High Fantasy Avatar held in your MABS account connected wallet provides a{' '}
            <span className={classes.highlightedText}>+10% bonus </span>
            on MabsVerse Survival IP rewards.
          </Typography>
          <Button className={classes.button}>
            <Link className={classes.link} href={'/shop#avatar'}>
              SHOP AVATARS
            </Link>
          </Button>
        </div>
      </div>
      <Typography className={classes.title}>Control Your Experience</Typography>
      <div className={classes.cardRow}>
        <div className={classes.card}>
          <img src={FIEFVERSE_SURVIVAL_CARD1} className={classes.cardImg} />
          <Typography className={classes.cardTitle}>Customize</Typography>
          <Typography className={classes.cardSubtitle}>
            Alter the look of your armor and weapons by purchasing skins in the MABS Shop.
          </Typography>
        </div>
        <div className={classes.card}>
          <img src={FIEFVERSE_SURVIVAL_CARD2} className={classes.cardImg} />
          <Typography className={classes.cardTitle}>Earn</Typography>
          <Typography className={classes.cardSubtitle}>
            Collect Influence Points (IP) and in-game assets as you play. Rise through the ranks of
            the stat leaderboard for additional rewards.
          </Typography>
        </div>
        <div className={classes.card}>
          <img src={FIEFVERSE_SURVIVAL_CARD3} className={classes.cardImg} />
          <Typography className={classes.cardTitle}>Unlock</Typography>
          <Typography className={classes.cardSubtitle}>
            MabsVerse Survival offers an unprecedented opportunity to earn your way into the
            MabsVerse economy.
          </Typography>
        </div>
      </div>
    </main>
  );
};

export default memo(SurvivalThirdPage);
