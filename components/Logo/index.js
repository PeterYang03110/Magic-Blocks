import { memo } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import LINKS from 'utils/constants/links';
import { LOGO_IMAGE_PATH, LOGO_LABEL_IMAGE_PATH } from 'utils/constants/image-paths';

const useStyles = makeStyles(() => ({
  picture: {
    display: 'flex',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'unset',
  },
  img: ({ size }) => ({
    height: size,
    objectFit: 'contain',
  }),
}));

const Logo = ({ className, size = 65, isLabel = false, ...rest }) => {
  const classes = useStyles({ size });

  const logoImagePath = isLabel ? LOGO_LABEL_IMAGE_PATH : LOGO_IMAGE_PATH;

  return (
    <Link href={LINKS.HOME.HREF} legacyBehavior>
      <a className={clsx(classes.container, className)}>
        <picture className={classes.picture} {...rest}>
          <source srcSet={logoImagePath} />
          <img className={classes.img} src={logoImagePath} alt='logo' />
        </picture>
      </a>
    </Link>
  );
};

export default memo(Logo);
