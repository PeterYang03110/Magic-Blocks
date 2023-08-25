import { memo } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: props => ({
    width: props.size,
    height: props.size,
    fill: 'none',
    cursor: 'pointer',
  }),
}));

const AvatarPlaceholderIcon = ({ className, viewBox, size = 40, ...rest }) => {
  const classes = useStyles({ size });

  return (
    <SvgIcon viewBox={viewBox || '0 0 40 40'} {...rest} className={clsx(classes.root, className)}>
      <rect x='0.5' y='0.5' width='39' height='39' rx='7.5' fill='#8F95B2' fillOpacity='0.2' />
      <mask
        id='mask0_1405_16082'
        style={{ maskType: 'alpha' }}
        maskUnits='userSpaceOnUse'
        x='8'
        y='8'
        width='24'
        height='24'>
        <rect x='8' y='8' width='24' height='24' fill='#D9D9D9' />
      </mask>
      <g mask='url(#mask0_1405_16082)'>
        <path
          d='M20 20C18.9 20 17.9583 19.6083 17.175 18.825C16.3917 18.0417 16 17.1 16 16C16 14.9 16.3917 13.9583 17.175 13.175C17.9583 12.3917 18.9 12 20 12C21.1 12 22.0417 12.3917 22.825 13.175C23.6083 13.9583 24 14.9 24 16C24 17.1 23.6083 18.0417 22.825 18.825C22.0417 19.6083 21.1 20 20 20ZM12 28V25.2C12 24.6333 12.146 24.1123 12.438 23.637C12.7293 23.1623 13.1167 22.8 13.6 22.55C14.6333 22.0333 15.6833 21.6457 16.75 21.387C17.8167 21.129 18.9 21 20 21C21.1 21 22.1833 21.129 23.25 21.387C24.3167 21.6457 25.3667 22.0333 26.4 22.55C26.8833 22.8 27.2707 23.1623 27.562 23.637C27.854 24.1123 28 24.6333 28 25.2V28H12ZM14 26H26V25.2C26 25.0167 25.9543 24.85 25.863 24.7C25.771 24.55 25.65 24.4333 25.5 24.35C24.6 23.9 23.6917 23.5623 22.775 23.337C21.8583 23.1123 20.9333 23 20 23C19.0667 23 18.1417 23.1123 17.225 23.337C16.3083 23.5623 15.4 23.9 14.5 24.35C14.35 24.4333 14.2293 24.55 14.138 24.7C14.046 24.85 14 25.0167 14 25.2V26ZM20 18C20.55 18 21.021 17.804 21.413 17.412C21.8043 17.0207 22 16.55 22 16C22 15.45 21.8043 14.9793 21.413 14.588C21.021 14.196 20.55 14 20 14C19.45 14 18.9793 14.196 18.588 14.588C18.196 14.9793 18 15.45 18 16C18 16.55 18.196 17.0207 18.588 17.412C18.9793 17.804 19.45 18 20 18Z'
          fill='white'
        />
      </g>
      <rect
        x='0.5'
        y='0.5'
        width='39'
        height='39'
        rx='7.5'
        stroke='white'
        strokeMiterlimit='2.9987'
        strokeLinecap='round'
      />
    </SvgIcon>
  );
};

export default memo(AvatarPlaceholderIcon);
