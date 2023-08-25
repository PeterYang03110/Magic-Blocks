import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Typography } from '@material-ui/core';
import clsx from 'clsx';

import FooterSocial from './FooterSocial';
import { useCommonStyles } from 'styles/use-styles';
import LINKS from 'utils/constants/links';
import FooterLink from './FooterLink';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(10, 0),
    backgroundColor: theme.palette.background.primary,
    flex: 1,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4, 0),
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: theme.custom.layout.maxDeskWidth,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  divider: {
    height: 1,
    width: '100%',
    margin: theme.spacing(7, 0),
    backgroundColor: theme.custom.palette.border,
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(5, 0),
    },
  },
  linkContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: theme.spacing(5),
    width: '100%',
  },
  menuContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 40,
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },
  linkContent: {
    width: '100%',
  },
  copyRight: {
    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
}));

const FOOTER_LINKS = [
  // {
  //   title: 'Contact Us',
  //   links: [LINKS.SUBMIT_A_REQUEST],
  // },
  {
    title: 'Applications',
    links: [LINKS.STAKING, LINKS.CHAT],
  },
  {
    title: 'Discover',
    links: [LINKS.DOCUMENTATION],
  },
  {
    title: 'Privacy',
    links: [LINKS.TERMS_AND_CONDITIONS, LINKS.PRIVACY_POLICY, LINKS.COOKIE_POLICY],
  },
  {
    title: 'Buy MABS',
    links: [
      LINKS.BUY_FIEF_UNISWAP,
      // LINKS.BUY_FIEF_PANCAKESWAP,
      // LINKS.BUY_FIEF_LBANK,
      // LINKS.BUY_FIEF_COINSTORE,
    ],
  },
];

const Footer = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <footer className={classes.root}>
      <div className={clsx(commonClasses.containerWidth, classes.container)}>
        <div className={classes.linkContainer}>
          <div className={classes.menuContainer}>
            {FOOTER_LINKS.map(item => (
              <FooterLink key={item.title} item={item} />
            ))}
          </div>
          <FooterSocial />
        </div>
        <Divider className={classes.divider} />
        <Typography align='center' className={classes.copyRight}>
          Copyright © 2022-2023 Magic Blocks. <span>All Rights Reserved.</span>
        </Typography>
      </div>
    </footer>
  );
};

export default memo(Footer);
