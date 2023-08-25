import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { use100vh } from 'react-div-100vh';

import { FIEFVERSE_CONNECT_WITH_FRIENDS_AND_PLAY_PATH } from 'utils/constants/image-paths';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(7.75),
    marginBottom: theme.spacing(7.5),
    width: '100%',
    minHeight: theme.spacing(88),

    [theme.breakpoints.down('md')]: {
      minHeight: 'unset',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5)
    }
  }
}));

const ConnectWithFriendsAndPlay = () => {
  const deviceHeight = use100vh();
  const classes = useStyles({
    deviceHeight: deviceHeight ? `${deviceHeight > 950 ? 950 : deviceHeight}px` : '100vh',
  });

  return (
    <Container maxWidth='lg'>
      <img className={classes.root} src={FIEFVERSE_CONNECT_WITH_FRIENDS_AND_PLAY_PATH} alt='connect-with-friends-and-play' />
    </Container>
  );
};

export default memo(ConnectWithFriendsAndPlay);
