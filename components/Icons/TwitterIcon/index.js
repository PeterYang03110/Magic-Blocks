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

const TwitterIcon = ({ className, viewBox, size = 24, isDisabledLink = false, ...rest }) => {
  const classes = useStyles({ size });

  const svgIcon = () => {
    return (
      <SvgIcon viewBox={viewBox || '0 0 32 26'} {...rest} className={clsx(classes.root, className)}>
        <path
          d='M32 3.08247C30.8 3.61856 29.6 4.02062 28.2667 4.15464C29.6 3.35052 30.6667 2.01031 31.2 0.536083C29.8667 1.34021 28.5333 1.87629 27.0667 2.14433C25.8667 0.804124 24.1333 0 22.2667 0C18.6667 0 15.7333 2.94845 15.7333 6.56701C15.7333 7.10309 15.7333 7.63917 15.8667 8.04124C10.2667 7.77319 5.46667 5.09278 2.26667 1.07216C1.6 2.14433 1.33333 3.21649 1.33333 4.42268C1.33333 6.70103 2.53333 8.71134 4.26667 9.91752C3.2 9.91752 2.13333 9.64948 1.33333 9.1134C1.33333 9.1134 1.33333 9.1134 1.33333 9.24742C1.33333 12.4639 3.6 15.1443 6.53333 15.6804C6 15.8144 5.46667 15.9485 4.8 15.9485C4.4 15.9485 4 15.9485 3.6 15.8144C4.4 18.4948 6.8 20.3711 9.73333 20.3711C7.46667 22.1134 4.66667 23.1856 1.6 23.1856C1.06667 23.1856 0.533333 23.1856 0 23.0515C2.93333 24.9278 6.4 26 10 26C22.1333 26 28.6667 15.9485 28.6667 7.23711C28.6667 6.96907 28.6667 6.70103 28.6667 6.43299C30 5.49484 31.0667 4.28866 32 3.08247Z'
          fill='#D8DAE5'
        />
      </SvgIcon>
    );
  };

  if (isDisabledLink) {
    return svgIcon();
  }

  return (
    <Link href={SOCIALS.TWITTER.HREF} legacyBehavior>
      <a
        aria-label={SOCIALS.TWITTER.LABEL}
        target='_blank'
        rel='noreferrer'
        className={classes.link}>
        {svgIcon()}
      </a>
    </Link>
  );
};

export default memo(TwitterIcon);
