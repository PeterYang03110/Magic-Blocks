import { memo } from 'react';
import Link from 'next/link';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import TelIcon from "../../../public/assets/images/icons/telegram-svgrepo-com.svg"

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

const TelegramIcon = ({ className, viewBox, size = 24, isDisabledLink = false, ...rest }) => {
  const classes = useStyles({ size });

  const svgIcon = () => {
    return (
      <TelIcon className={clsx(classes.root, className)} width="32px" fill='#D8DAE5'/>
    );
  };

  if (isDisabledLink) {
    return svgIcon();
  }

  return (
    <Link href={SOCIALS.TELEGRAM.HREF} legacyBehavior>
      <a
        aria-label={SOCIALS.TELEGRAM.LABEL}
        target='_blank'
        rel='noreferrer'
        className={classes.link}>
        {svgIcon()}
      </a>
    </Link>
  );
};

export default memo(TelegramIcon);
