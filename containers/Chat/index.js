import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useChat } from 'contexts/chat-context';
import ChatHeader from './ChatHeader';
import ChatGuide from './ChatGuide';
import FiefLoading from 'components/FiefLoading';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    scrollBehavior: 'smooth !important',
  },
}));

const Chat = () => {
  const classes = useStyles();
  const { loading } = useChat();

  return (
    <main className={classes.root}>
      {loading && <FiefLoading />}
      <ChatHeader />
      <ChatGuide />
    </main>
  );
};

export default memo(Chat);
