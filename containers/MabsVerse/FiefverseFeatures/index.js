import { memo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { use100vh } from 'react-div-100vh';
import clsx from 'clsx';

import ConnectWithFriendsAndPlay from 'containers/MabsVerse/FiefverseFeatures/ConnectWithFriendsAndPlay';
import GearUp from 'containers/MabsVerse/FiefverseFeatures/GearUp';
import BuyAvatar from 'containers/MabsVerse/FiefverseFeatures/BuyAvatar';

const useStyles = makeStyles(theme => ({
  root: ({ deviceHeight }) => ({
    minHeight: `calc(${deviceHeight} - ${theme.custom.layout.topAppBarHeight}px)`,
    height: '100%',
    width: '100%',
    background: 'white',

    [theme.breakpoints.down('sm')]: {
      height: 'unset',
      minHeight: 'unset'
    }
  }),
  header: {
    padding: theme.spacing(6, 0, 2),
    borderBottom: '2px solid #EDEFF5',

    [theme.breakpoints.down('sm')]: {
      height: 'unset',
      minHeight: 'unset',
      padding: theme.spacing(5, 0, 2),
      margin: theme.spacing(0, 2.5)
    }
  },
  title: {
    fontFamily: 'pedestria-mvb',
    fontWeight: 700,
    fontSize: theme.spacing(7),
    lineHeight: 1.4,
    textTransform: 'uppercase',
    color: '#1F182A',
    textAlign: 'center',

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(5)
    }
  },
  menuDivider: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    background: '#FFE6FF',
    border: '1px solid #474D66',
    boxShadow: '0px 12px 40px rgba(70, 74, 156, 0.15)',
    borderRadius: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  menus: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(4),
    marginTop: theme.spacing(4),

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: theme.spacing(1),
      marginTop: theme.spacing(2)
    }
  },
  menuItem: {
    color: '#8F95B2',
    fontSize: theme.spacing(5),
    lineHeight: 1.4,
    fontFamily: 'pedestria-mvb',
    fontWeight: 700,
    cursor: 'pointer',

    [theme.breakpoints.down('md')]: {
      fontSize: theme.spacing(4.5)
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3)
    }
  },
  active: {
    color: '#1F182A'
  }
}));

const FiefverseFeatures = () => {
  const deviceHeight = use100vh();
  const [activeMenu, setActiveMenu] = useState('avatar');
  const classes = useStyles({
    deviceHeight: deviceHeight ? `${deviceHeight > 950 ? 950 : deviceHeight}px` : '100vh',
  });

  const handleSetMenu = menu => () => {
    setActiveMenu(menu);
  };

  return (
    <main className={classes.root}>
      <div className={classes.header}>
        <Typography className={classes.title}>Getting started</Typography>
      </div>
      <div className={classes.menus}>
        <Typography 
          onClick={handleSetMenu('avatar')}
          className={clsx(classes.menuItem, {
            [classes.active]: activeMenu === 'avatar'
          })}>
          Buy an Avatar
        </Typography>
        <div className={classes.menuDivider} />
        <Typography 
          onClick={handleSetMenu('gear-up')}
          className={clsx(classes.menuItem, {
            [classes.active]: activeMenu === 'gear-up'
          })}>
          Gear up
        </Typography>
        <div className={classes.menuDivider} />
        <Typography 
          onClick={handleSetMenu('connect-friends')}
          className={clsx(classes.menuItem, {
            [classes.active]: activeMenu === 'connect-friends'
          })}>
          Connect with friends and play
        </Typography>
      </div>
      {activeMenu === 'connect-friends' && 
        <ConnectWithFriendsAndPlay />
      }
      {activeMenu === 'gear-up' && 
        <GearUp />
      }
      {activeMenu === 'avatar' && 
        <BuyAvatar />
      }
    </main>
  );
};

export default memo(FiefverseFeatures);
