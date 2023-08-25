import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

import RadialGradientBorderButton from 'components/UI/Buttons/RadialGradientBorderButton';
import Link from 'next/link';
import { FIEF_SURVIVAL_LINK } from 'config';

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    scrollBehavior: 'smooth !important',
  },
  title: {
    background: 'linear-gradient(97.82deg, #97F6FF -148.83%, #8085EE 100.25%)',
    fontFamily: 'pedestria-mvb',
    fontSize: 32,
    marginBottom: 8,
    textAlign: 'center',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',

    [theme.breakpoints.down('sm')]: {
      fontSize: 24,
    },
  },
  titleWindows: {
    marginBottom: 40,
    textAlign: 'left',

    [theme.breakpoints.down('sm')]: {
      marginBottom: 32,
    },
  },
  titleMac: {
    color: theme.custom.palette.whitePurple,
    fontSize: 32,
    fontFamily: 'pedestria-mvb',
    marginBottom: 16,

    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      fontSize: 24,
    },
  },
  subtitle: {
    color: theme.custom.palette.black60,
    fontSize: 18,
    marginBottom: 32,
    textAlign: 'center',

    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  subtitleMac: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'left',

    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
      textAlign: 'center',
    },
  },
  boxContainer: {
    columnGap: 16,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    marginBottom: 36,
    width: '100%',

    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 40,
    },

    '&>div:first-child': {
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 40,
      },
    },
  },
  box: {
    background: theme.custom.palette.black20,
    border: `1px solid ${theme.custom.palette.black30}`,
    borderRadius: 6,
    padding: 16,
  },
  cta: {
    height: 48,
    justifyContent: 'center',
    padding: '12px 32px',

    [theme.breakpoints.down('sm')]: {
      height: 72,
      padding: '12px 32px',
    },
  },
  linksContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    background: '#fff',
    border: `1px solid ${theme.custom.palette.black40}`,
    borderRadius: 6,

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  linkCard: {
    padding: 16,
  },
  linkTitle: {
    color: theme.custom.palette.blueLink,
    fontSize: 16,
    marginBottom: 8,
    textDecoration: 'underline',

    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  linkSubtitle: {
    color: theme.custom.palette.whitePurple,
    fontSize: 14,

    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
}));

const StepFour = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Typography className={classes.title}>Download the Magic Blocks Launcher</Typography>
      <Typography className={classes.subtitle}>
        This will be your access point for MabsVerse game titles. Simply download the launcher and
        select the game you want to play.
      </Typography>
      <div className={classes.boxContainer}>
        <div className={classes.box}>
          <Typography className={clsx(classes.title, classes.titleWindows)}>
            Windows (.exe)
          </Typography>
          <RadialGradientBorderButton className={classes.cta} href={FIEF_SURVIVAL_LINK}>
            Download MabsVerse Launcher
          </RadialGradientBorderButton>
        </div>
        <div className={classes.box}>
          <Typography className={classes.titleMac}>Mac (.dmg)</Typography>
          <Typography className={clsx(classes.subtitleMac, classes.subtitle)}>
            Unfortunately we don’t have a Mac Launcher yet!
          </Typography>
          <Typography className={clsx(classes.subtitleMac, classes.subtitle)}>
            Below are a few steps you can take to run Windows OS on your Mac.
          </Typography>

          <div className={classes.linksContainer}>
            <div className={classes.linkCard}>
              <Link href={'https://www.parallels.com/products/desktop/'} target='_blank'>
                <Typography className={classes.linkTitle}>Run a Virtual Machine</Typography>
              </Link>
              <Typography className={classes.linkSubtitle}>E.g: Parrallels</Typography>
            </div>
            <div className={classes.linkCard}>
              <Link href={'https://support.apple.com/en-us/HT201468/'} target='_blank'>
                <Typography className={classes.linkTitle}>Setup Bootcamp</Typography>
              </Link>
              <Typography className={classes.linkSubtitle}>This comes free on your Mac</Typography>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default memo(StepFour);
