import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import clsx from 'clsx';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
  button: ({ isMoz }) => ({
    background: 'linear-gradient(97.82deg, #97F6FF -148.83%, #8085EE 100.25%)',
    borderRadius: 6,
    color: '#fff',
    display: 'flex',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: 600,
    justifyContent: 'center',
    position: 'relative',

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: '6px',
      border: '2px solid transparent',
      background:
        'radial-gradient(96.45% 105.69% at 0.81% -12.46%, #A4D7FC 1.04%, #A8B4FE 63.02%, #CDB9FD 100%) border-box',
      WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
      WebkitMaskComposite: isMoz ? 'exclude' : 'clear',
      maskComposite: isMoz ? 'exclude' : 'clear',
    },

    '&:disabled': {
      background: theme.custom.palette.black20,
    },

    '&:hover': {
      background:
        'linear-gradient(0deg, rgba(31, 24, 42, 0.3), rgba(31, 24, 42, 0.3)), linear-gradient(97.82deg, #97F6FF -148.83%, #8085EE 100.25%)',
    },
  }),
  link: {
    textDecoration: 'none',
  },
}));

const RadialGradientBorderButton = ({ children, className, href, onClick, ...other }) => {
  const classes = useStyles({ isMoz: typeof InstallTrigger !== 'undefined' });

  return href ? (
    <Link {...other} href={href} className={classes.link}>
      <Button className={clsx(className, classes.button)}>{children}</Button>
    </Link>
  ) : (
    <Button {...other} onClick={onClick} className={clsx(className, classes.button)}>
      {children}
    </Button>
  );
};

export default memo(RadialGradientBorderButton);
