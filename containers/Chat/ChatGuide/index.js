import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import {
  CHAT_BUILD_YOUR_BRAND_IMAGE_PATH,
  CHAT_GET_REWARDED_IMAGE_PATH,
  CHAT_IMMERSE_YOURSELF_IMAGE_PATH,
} from 'utils/constants/image-paths';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(10, 2.5),
    backgroundColor: '#EDEFF5',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(4, 2.5),
    },
  },
  container: {
    width: '100%',
    maxWidth: theme.custom.layout.maxDeskWidth,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(4, 0),
    },
  },
  image: {
    width: '100%',
    objectFit: 'cover',
    borderRadius: 6,
  },
  title: {
    fontSize: 40,
    fontFamily: 'pedestria-mvb,sans-serif',
    color: '#1F182A',
    marginTop: 40,
    [theme.breakpoints.down('xs')]: {
      fontSize: 32,
      marginTop: 24,
    },
  },
  description: {
    fontSize: 18,
    fontWeight: 500,
    color: '#1F182A',
    marginTop: 8,
  },
}));

const CHAT_GUIDE = [
  {
    id: 1,
    title: 'Immerse Yourself',
    description: 'Dive into Magic Blocks Protocol and the MabsVerse with a unified messaging layer',
    imageUrl: CHAT_IMMERSE_YOURSELF_IMAGE_PATH,
  },
  {
    id: 2,
    title: 'Build Your Brand',
    description:
      'Find friends, grow your following and become a known player within Magic Blocks and beyond',
    imageUrl: CHAT_BUILD_YOUR_BRAND_IMAGE_PATH,
  },
  {
    id: 3,
    title: 'Get Rewarded',
    description: 'Earn Influence Points for being an active community member',
    imageUrl: CHAT_GET_REWARDED_IMAGE_PATH,
  },
];

const ChatGuide = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Grid container spacing={3}>
          {CHAT_GUIDE.map(guide => (
            <Grid key={guide.id} item xs={12} sm={6} md={4}>
              <div className={classes.itemContainer}>
                <img alt='chat-guide' src={guide.imageUrl} className={classes.image} />
                <Typography align='center' className={classes.title}>
                  {guide.title}
                </Typography>
                <Typography align='center' className={classes.description}>
                  {guide.description}
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default memo(ChatGuide);
