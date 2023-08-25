import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { DISCOVER_NEW_WAY_EARN_ICON_PATH } from 'utils/constants/image-paths';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    gap: 16,
    background: `radial-gradient(59.94% 59.94% at 50% 76.81%, #FFDF56 0%, #FFB327 100%)`,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    gap: 16,
    padding: theme.spacing(10, 2.5, 0),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(5, 2.5, 0),
    },
  },
  title: {
    fontSize: 64,
    lineHeight: '90px',
    fontFamily: 'pedestria-mvb,sans-serif',
    textTransform: 'uppercase',
    color: '#FFFFFF',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      fontSize: 40,
      lineHeight: '56px',
    },
  },
  description: {
    fontSize: 18,
    fontWeight: 700,
    textAlign: 'center',
    color: '#1F182A',
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },
  image: {
    position: 'relative',
    zIndex: 2,
    maxWidth: 789,
    width: '100%',
    marginBottom: -130,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 450,
      marginBottom: -80,
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: 340,
      marginBottom: -65,
    },
  },
  footer: {
    width: '100%',
    height: 130,
    background: '#0B0B0B',
    [theme.breakpoints.down('sm')]: {
      height: 80,
    },
    [theme.breakpoints.down('xs')]: {
      height: 65,
    },
  },
}));

const DiscoverNewWayEarn = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <div className={classes.container}>
        <Typography className={classes.title}>Discover New Ways To Earn</Typography>
        <Typography className={classes.description}>
          {`The MabsVerse is built around sustainable economics supported by the Magic Blocks Protocol's
          growing application layer`}
        </Typography>
      </div>

      <img alt='discover-new-way' src={DISCOVER_NEW_WAY_EARN_ICON_PATH} className={classes.image} />
      <div className={classes.footer} />
    </main>
  );
};

export default memo(DiscoverNewWayEarn);
