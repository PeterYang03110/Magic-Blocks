import { memo } from 'react';
import { Typography, Grid, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SettingPageWrapper from 'parts/SettingPageWrapper';
import ProfileBasicForm from './ProfileBasicForm';

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 40,
    lineHeight: 1,
    fontFamily: 'pedestria-mvb',
    color: '#000000',
  },
  form: {
    display: 'flex',
    maxWidth: 563,
    width: '100%',
  },
  divider: {
    height: 1,
    width: '100%',
    background: '#D8DAE5',
  },
}));

const Profile = () => {
  const classes = useStyles();
  return (
    <SettingPageWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography className={classes.title}>Your Profile</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12}>
          <ProfileBasicForm />
        </Grid>
      </Grid>
    </SettingPageWrapper>
  );
};

export default memo(Profile);
