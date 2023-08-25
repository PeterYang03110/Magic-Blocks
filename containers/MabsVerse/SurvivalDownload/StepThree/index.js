import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

import RadialGradientBorderButton from 'components/UI/Buttons/RadialGradientBorderButton';
import LinearGradientBorderButton from 'components/UI/Buttons/LinearGradientBorderButton';
import {
  FIEFVERSE_DOWNLOAD_AVATAR_ICON,
  FIEFVERSE_DOWNLOAD_COIN_GUY,
} from 'utils/constants/image-paths';
import LP_ICONS from 'utils/constants/lp-icons';

const useStyles = makeStyles(theme => ({
  root: {
    columnGap: 16,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    width: '100%',
    marginBottom: 32,

    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 40,
      rowGap: 16,
    },
  },
  box: {
    background: theme.custom.palette.black20,
    border: `1px solid ${theme.custom.palette.black30}`,
    borderRadius: 6,
    padding: 16,
  },
  imageBox: {
    padding: 0,
    background: `url(${FIEFVERSE_DOWNLOAD_COIN_GUY})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',

    [theme.breakpoints.down('sm')]: {
      minHeight: 350,
    },

    [theme.breakpoints.down('xs')]: {
      minHeight: 200,
    },
  },
  title: {
    background: 'linear-gradient(97.82deg, #97F6FF -148.83%, #8085EE 100.25%)',
    fontFamily: 'pedestria-mvb',
    fontSize: 32,
    marginBottom: 16,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',

    [theme.breakpoints.down('sm')]: {
      fontSize: 24,
      textAlign: 'center',
    },
  },
  subtitle: {
    color: theme.custom.palette.black60,
    fontSize: 16,

    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  cardsContainer: {
    columnGap: 16,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    marginTop: 16,
    marginBottom: 40,

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      rowGap: 16,
    },
  },
  card: {
    alignItems: 'center',
    background: '#fff',
    border: `1px solid ${theme.custom.palette.black30}`,
    borderRadius: 6,
    display: 'flex',
    padding: 16,
  },
  assetImage: {
    height: 48,
    width: 48,
    marginRight: 12,
  },
  ctaContainer: {
    columnGap: 16,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      rowGap: 16,
    },
  },
  cta: {
    height: 48,
    justifyContent: 'center',
    width: '100%',
  },
}));

const StepThree = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <div className={classes.box}>
        <Typography className={classes.title}>Purchase Assets</Typography>

        <Typography className={classes.subtitle}>
          {
            "You'll need an Avatar, MABS token and some Influence Points (IP) to successfully play the Avatar RPG. Other MabsVerse game titles are free-to-play with add-on purchases available."
          }
        </Typography>
        <div className={classes.cardsContainer}>
          <div className={classes.card}>
            <img
              alt='token-icon'
              src={FIEFVERSE_DOWNLOAD_AVATAR_ICON}
              className={classes.assetImage}
            />
            <Typography className={classes.subtitle}>Magic Block Avatar</Typography>
          </div>
          <div className={classes.card}>
            <img alt='token-icon' src={LP_ICONS['MABS']} className={classes.assetImage} />
            <Typography className={classes.subtitle}>MABS Token</Typography>
          </div>
          <div className={classes.card}>
            <img alt='token-icon' src={LP_ICONS['IP']} className={classes.assetImage} />
            <Typography className={classes.subtitle}>Influence Points</Typography>
          </div>
        </div>
        <div className={classes.ctaContainer}>
          <RadialGradientBorderButton className={classes.cta} href={'/shop'}>
            VISIT MABS SHOP
          </RadialGradientBorderButton>
          <LinearGradientBorderButton
            target='_blank'
            href={
              'https://app.uniswap.org/#/swap?exactField=output&exactAmount=10000&inputCurrency=ETH&outputCurrency=0xea068fba19ce95f12d252ad8cb2939225c4ea02d'
            }
            className={classes.cta}>
            BUY MABS
          </LinearGradientBorderButton>
        </div>
      </div>

      <div className={clsx(classes.imageBox, classes.box)}></div>
    </main>
  );
};

export default memo(StepThree);
