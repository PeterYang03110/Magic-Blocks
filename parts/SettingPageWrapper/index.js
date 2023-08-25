import { memo } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Divider } from '@material-ui/core';
import clsx from 'clsx';

import SETTING_BAR_MENU from 'utils/constants/setting-bar-menu';
import ButtonLink from 'components/UI/Buttons/ButtonLink';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    gap: 64,
    backgroundColor: '#ffffff',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    width: 230,
    padding: 24,
    gap: 16,
  },
  title: {
    color: '#1F182A',
  },
  divider: {
    height: 1,
    width: '100%',
    background: '#D8DAE5',
  },
  item: {
    padding: 10,
    color: '#474D66',
    justifyContent: 'flex-start',
    textTransform: 'capitalize',
  },
  selected: {
    color: '#474D66',
  },
  container: {
    padding: theme.spacing(3),
    borderLeft: `1px solid #D8DAE5`,
  },
}));

const SettingPageWrapper = ({ children }) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <main className={classes.root}>
      <div className={classes.sidebar}>
        <Typography className={classes.title}>Settings</Typography>

        <Divider className={classes.divider} />

        {SETTING_BAR_MENU.map((item, index) => (
          <Button
            key={index}
            href={item.HREF}
            target={item.IS_EXTERNAL_LINK ? '_blank' : ''}
            rel={item.IS_EXTERNAL_LINK ? 'noreferrer' : ''}
            component={ButtonLink}
            startIcon={item.ICON}
            className={clsx(classes.item, {
              [classes.selected]: router.pathname.includes(item.HREF),
            })}>
            {item.TITLE}
          </Button>
        ))}
      </div>

      <div className={classes.container}>{children}</div>
    </main>
  );
};

export default memo(SettingPageWrapper);
