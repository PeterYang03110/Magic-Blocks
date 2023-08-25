import { memo } from 'react';
import { AppBar, Toolbar, Hidden, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Logo from 'components/Logo';
import NavBarMenu from './NavBarMenu';
import NavDropMenu from './NavDropMenu';
import ConnectWallet from './ConnectWallet';

const useStyles = makeStyles(theme => ({
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    boxShadow: 'none',
    width: '100%',
    height: theme.custom.layout.topAppBarHeight,
    backgroundColor: theme.palette.background.primary,
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: theme.spacing(3.5, 8),
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(3.5, 3),
    },
  },
  container: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
  },
}));

const TopAppBar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'), { defaultMatches: true });

  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <NavDropMenu />

        <div className={classes.container}>
          <Logo size={48} isLabel={!isSm} />
          <NavBarMenu />
        </div>

        <Hidden smDown>
          <ConnectWallet />
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default memo(TopAppBar);
