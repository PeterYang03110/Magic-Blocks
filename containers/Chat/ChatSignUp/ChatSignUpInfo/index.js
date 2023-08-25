import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Typography } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexFlow: 'wrap',
    gap: 24,
    fontSize: 88,
    fontFamily: 'pedestria-mvb',
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#FFFFFF',
    textAlign: 'right',
    [theme.breakpoints.down('md')]: {
      fontSize: 82,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 88,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 56,
    },
  },
  alert: {
    background: '#FF3D71',
    transform: 'rotate(-2deg)',
    padding: theme.spacing(0, 2),
  },
  divider: {
    height: 1,
    width: '100%',
    maxWidth: 521,
    background: '#FFFFFF',
    margin: theme.spacing(4, 0),
  },
  description: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'right',
  },
}));

const ChatSignUpInfo = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>Sign Up</div>
      <div className={classes.title}>
        For <div className={clsx(classes.title, classes.alert)}>Alerts.</div>
      </div>
      <Divider className={classes.divider} />
      <Typography className={classes.description}>
        Be the first to know when Magic Blocks Chat is live
      </Typography>
    </div>
  );
};

export default memo(ChatSignUpInfo);
