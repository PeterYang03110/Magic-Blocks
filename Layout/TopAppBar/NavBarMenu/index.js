import { memo } from 'react';
import { useRouter } from 'next/router';
import { Button, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import TOP_BAR_MENU from 'utils/constants/top-bar-menu';
import ButtonLink from 'components/UI/Buttons/ButtonLink';
import GroupBarItem from './GroupBarItem';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(2),
    margin: theme.spacing(0, 4),
  },
  item: {
    fontSize: 20,
    fontWeight: 700,
    fontFamily: 'pedestria-mvb,sans-serif',
    textTransform: 'unset',
    padding: theme.spacing(0, 2),
    color: '#fff',
    borderRadius: 6,
    '&:hover': {
      color: '#FFFFFF',
      background: 'rgba(71, 77, 102, 0.2)',
    },
  },
  selected: ({ isMoz }) => ({
    color: '#FFFFFF',
    background: 'rgba(71, 77, 102, 0.2)',
    position: 'relative',

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: '6px',
      border: '1px solid transparent',
      background: 'linear-gradient(90deg, #797FF2 0%, #DAF9FC 50%, #FF7DFD 100%) border-box',
      WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
      WebkitMaskComposite: isMoz ? 'exclude' : 'clear',
      maskComposite: isMoz ? 'exclude' : 'clear',
    },
  }),
  disabled: {
    color: 'rgba(143, 149, 178, 0.3) !important',
  },
}));

const NavBarMenu = () => {
  const classes = useStyles({ isMoz: typeof InstallTrigger !== 'undefined' });
  const router = useRouter();

  return (
    <Hidden smDown>
      <div className={classes.root}>
        {TOP_BAR_MENU.map((item, index) => {
          if (item.CHILDREN) {
            return <GroupBarItem key={index} link={item} />;
          }

          return (
            <Button
              key={index}
              href={item.HREF}
              target={item.IS_EXTERNAL_LINK ? '_blank' : ''}
              rel={item.IS_EXTERNAL_LINK ? 'noreferrer' : ''}
              component={ButtonLink}
              disabled={item.DISABLED}
              className={clsx(classes.item, {
                [classes.selected]: router.pathname.includes(item.HREF),
              })}
              classes={{
                disabled: classes.disabled,
              }}>
              {item.TITLE}
            </Button>
          );
        })}
      </div>
    </Hidden>
  );
};

export default memo(NavBarMenu);
