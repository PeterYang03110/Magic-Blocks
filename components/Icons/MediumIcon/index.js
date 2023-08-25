import { memo } from 'react';
import Link from 'next/link';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import SOCIALS from 'utils/constants/social';

const useStyles = makeStyles(() => ({
  root: ({ size }) => ({
    width: size,
    height: size,
  }),
  link: ({ size }) => ({
    height: size,
  }),
}));

const MediumIcon = ({ className, viewBox, size = 24, isDisabledLink = false, ...rest }) => {
  const classes = useStyles({ size });

  const svgIcon = () => {
    return (
      <SvgIcon viewBox={viewBox || '0 0 32 32'} {...rest} className={clsx(classes.root, className)}>
        <path
          d='M30.6667 0H1.33333C0.979711 0 0.640573 0.140476 0.390524 0.390524C0.140476 0.640573 0 0.979711 0 1.33333L0 30.6667C0 31.0203 0.140476 31.3594 0.390524 31.6095C0.640573 31.8595 0.979711 32 1.33333 32H30.6667C31.0203 32 31.3594 31.8595 31.6095 31.6095C31.8595 31.3594 32 31.0203 32 30.6667V1.33333C32 0.979711 31.8595 0.640573 31.6095 0.390524C31.3594 0.140476 31.0203 0 30.6667 0V0ZM26.584 7.58133L24.868 9.22667C24.7954 9.28196 24.7393 9.356 24.7057 9.44082C24.6721 9.52564 24.6623 9.61802 24.6773 9.708V21.7987C24.6623 21.8887 24.6721 21.981 24.7057 22.0658C24.7393 22.1507 24.7954 22.2247 24.868 22.28L26.544 23.9253V24.2867H18.1147V23.9253L19.848 22.24C20.0187 22.0693 20.0187 22.0187 20.0187 21.7587V11.9867L15.1907 24.2533H14.5387L8.92133 11.9867V20.204C8.89821 20.3744 8.91416 20.5478 8.96799 20.7112C9.02181 20.8745 9.11209 21.0234 9.232 21.1467L11.4907 23.8853V24.2467H5.09067V23.8853L7.34533 21.1467C7.46426 21.0233 7.55253 20.8737 7.60302 20.71C7.65351 20.5462 7.66481 20.3729 7.636 20.204V10.7027C7.6497 10.5728 7.6327 10.4416 7.58638 10.3196C7.54006 10.1975 7.46571 10.0881 7.36933 10L5.35867 7.58133V7.22H11.5907L16.408 17.7853L20.6427 7.22H26.584V7.58133Z'
          fill='#D8DAE5'
        />
      </SvgIcon>
    );
  };

  if (isDisabledLink) {
    return svgIcon();
  }

  return (
    <Link href={SOCIALS.MEDIUM.HREF} legacyBehavior>
      <a
        aria-label={SOCIALS.MEDIUM.LABEL}
        target='_blank'
        rel='noreferrer'
        className={classes.link}>
        {svgIcon()}
      </a>
    </Link>
  );
};

export default memo(MediumIcon);
