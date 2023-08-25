import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';

import TopAppBar from './TopAppBar';
import Footer from './Footer';
import ScrollTop from './ScrollTop';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    position: 'relative',
  },
  toolbar: {
    minHeight: theme.custom.layout.topAppBarHeight,
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <TopAppBar />
      <Toolbar className={classes.toolbar} />
      <div>{children}</div>
      <Footer />
      <ScrollTop />
    </main>
  );
};

export default memo(Layout);
