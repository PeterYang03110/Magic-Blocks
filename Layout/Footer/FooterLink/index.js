import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import ButtonLink from 'components/UI/Buttons/ButtonLink';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    paddingRight: theme.spacing(3),
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    fontFamily: 'pedestria-mvb,sans-serif',
    color: '#FFFFFF',
    marginBottom: 24,
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 16,
    },
  },
  linkContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  link: {
    color: '#8F95B2',
    display: 'flex',
    justifyContent: 'flex-start',
    padding: 0,
    whiteSpace: 'nowrap',
    textTransform: 'capitalize',
    textDecoration: 'unset',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  disalbledLink: {
    color: '#8F95B2',
    pointerEvents: 'none',
    cursor: 'not-allowed',
    textDecoration: 'unset',
  }
}));

const FooterLink = ({ item }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>{item.title}</Typography>
      {
        item.title !=='Privacy' ?
      <div className={classes.linkContainer}>
        {item.links.map((link, index) => (

          <ButtonLink
            key={index}
            href={link.HREF}
            target={link.IS_EXTERNAL_LINK ? '_blank' : ''}
            rel={link.IS_EXTERNAL_LINK ? 'noreferrer' : ''}
            className={classes.link}>
            {link.TITLE}
          </ButtonLink>
        ))}
      </div> :
      <div className={classes.linkContainer}>
      {item.links.map((link, index) => (

        <ButtonLink
          key={index}
          href={link.HREF}
          target={link.IS_EXTERNAL_LINK ? '_blank' : ''}
          rel={link.IS_EXTERNAL_LINK ? 'noreferrer' : ''}
          className={classes.disalbledLink}>
          {link.TITLE}
        </ButtonLink>
      ))}
    </div>
      }

    </div>
  );
};

export default memo(FooterLink);
