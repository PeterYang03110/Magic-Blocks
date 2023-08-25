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

const DiscordIcon = ({ className, viewBox, size = 24, isDisabledLink = false, ...rest }) => {
  const classes = useStyles({ size });

  const svgIcon = () => {
    return (
      <SvgIcon viewBox={viewBox || '0 0 32 24'} {...rest} className={clsx(classes.root, className)}>
        <path
          d='M27.107 2.00996C25.0046 1.05745 22.7851 0.381713 20.5052 0C20.1932 0.551901 19.9109 1.11973 19.6595 1.70112C17.231 1.33898 14.7613 1.33898 12.3328 1.70112C12.0813 1.11979 11.799 0.551968 11.4871 0C9.20578 0.384937 6.9848 1.06228 4.88026 2.01494C0.702192 8.132 -0.430415 14.0971 0.135889 19.9776C2.58267 21.7665 5.32131 23.127 8.23277 24C8.88835 23.1275 9.46845 22.2018 9.96692 21.2329C9.02015 20.883 8.10634 20.4512 7.23608 19.9427C7.46512 19.7783 7.68912 19.609 7.90558 19.4446C10.4378 20.623 13.2017 21.234 15.9999 21.234C18.7982 21.234 21.5621 20.623 24.0943 19.4446C24.3133 19.6214 24.5373 19.7908 24.7638 19.9427C23.8919 20.4521 22.9764 20.8846 22.0279 21.2354C22.5258 22.2039 23.1059 23.1287 23.7621 24C26.676 23.1305 29.4168 21.7707 31.864 19.9801C32.5285 13.1606 30.7289 7.25031 27.107 2.00996ZM10.6842 16.3611C9.10614 16.3611 7.80238 14.944 7.80238 13.2005C7.80238 11.457 9.06084 10.0274 10.6792 10.0274C12.2976 10.0274 13.5913 11.457 13.5636 13.2005C13.5359 14.944 12.2925 16.3611 10.6842 16.3611ZM21.3156 16.3611C19.735 16.3611 18.4363 14.944 18.4363 13.2005C18.4363 11.457 19.6948 10.0274 21.3156 10.0274C22.9365 10.0274 24.2202 11.457 24.1925 13.2005C24.1648 14.944 22.924 16.3611 21.3156 16.3611Z'
          fill='#D8DAE5'
        />
      </SvgIcon>
    );
  };

  if (isDisabledLink) {
    return svgIcon();
  }

  return (
    <Link href={SOCIALS.DISCORD.HREF} legacyBehavior>
      <a
        aria-label={SOCIALS.DISCORD.LABEL}
        target='_blank'
        rel='noreferrer'
        className={classes.link}>
        {svgIcon()}
      </a>
    </Link>
  );
};

export default memo(DiscordIcon);
