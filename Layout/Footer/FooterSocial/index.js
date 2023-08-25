import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import TwitterIcon from 'components/Icons/TwitterIcon';
import MediumIcon from 'components/Icons/MediumIcon';
// import CoingeckoIcon from 'components/Icons/CoingeckoIcon';
// import DiscordIcon from 'components/Icons/DiscordIcon';
import TelegramIcon from 'components/Icons/TelegramIcon';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    fontFamily: 'pedestria-mvb,sans-serif',
    color: '#FFFFFF',
    marginBottom: 24,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 16,
    },
  },
  socialContainer: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gap: 40,
  },
}));

const FooterSocial = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Socials</Typography>

      <div className={classes.socialContainer}>
        <TwitterIcon size={32} />
        <MediumIcon size={32} />
        <TelegramIcon size={32}/>
        {/* <DiscordIcon size={32} /> */}
        {/* <CoingeckoIcon size={32} /> */}
      </div>
    </div>
  );
};

export default memo(FooterSocial);
