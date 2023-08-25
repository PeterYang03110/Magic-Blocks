import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import FantasyAvatar from './FantasyAvatar';
import { FANTASY_AVATAR_ICON_PATH } from 'utils/constants/image-paths';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: theme.custom.layout.maxDeskWidth,
    padding: theme.spacing(10, 0),
  },
  title: {
    fontSize: 64,
    fontFamily: 'pedestria-mvb',
    fontWeight: 700,
    lineHeight: '56px',
    textTransform: 'uppercase',
    color: '#1F182A',
    lineHeight: 1.2,
    textShadow: '0px 2.5px 2px rgba(7, 11, 29, 0.3)',
    marginBottom: theme.spacing(6),
  },
  container: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  image: {
    width: '100%',
  },
}));

const AvatarShop = () => {
  const classes = useStyles();

  return (
    <div id='avatar' className={classes.root}>
      <Typography variant='h3' align='center' className={classes.title}>
        Mint Avatars
      </Typography>
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={12} sm={6} lg={6}>
          <FantasyAvatar />
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <div className={classes.imageContainer}>
            <img alt='fantasy-avatar' src={FANTASY_AVATAR_ICON_PATH} className={classes.image} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default memo(AvatarShop);
