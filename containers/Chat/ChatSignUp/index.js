import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import ChatSignUpInfo from './ChatSignUpInfo';
import ChatSignUpForm from './ChatSignUpForm';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(24, 3),
    backgroundColor: '#1F182A',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(12, 3),
    },
  },
  container: {
    width: '100%',
    maxWidth: theme.custom.layout.maxDeskWidth,
  },
}));

const ChatSignUp = () => {
  const classes = useStyles();

  return (
    <div id='chat-signup' className={classes.root}>
      <div className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <ChatSignUpInfo />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChatSignUpForm />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default memo(ChatSignUp);
