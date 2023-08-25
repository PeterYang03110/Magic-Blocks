import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import clsx from 'clsx';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
  button: {
    background: '#fff',
    color: theme.custom.palette.black60,
    display: 'flex',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: 600,
    justifyContent: 'space-between',
    position: 'relative',

    '&:hover': {
      background: 'linear-gradient(97deg, #97F6FF -240.83%, #8085EE 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',

      '& svg': {
        fill: 'url(#grad)',
      },
    },

    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: '6px',
      border: '2px solid transparent',
      background: 'linear-gradient(97deg, #97F6FF -140%, #8085EE 100%)',
      WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
      WebkitMaskComposite: 'destination-out',
      maskComposite: 'clear',
    },
  },
  link: {
    textDecoration: 'none',
  },
}));

const LinearGradientBorderButton = ({ children, className, href, onClick, ...rest }) => {
  const classes = useStyles();

  return href ? (
    <Link {...rest} href={href} className={classes.link}>
      <Button className={clsx(className, classes.button)}>{children}</Button>
    </Link>
  ) : (
    <Button {...rest} onClick={onClick} className={clsx(className, classes.button)}>
      {children}
    </Button>
  );
};

export default memo(LinearGradientBorderButton);
