import { memo } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: props => ({
    width: props.size,
    height: props.size,
    border: '1px solid #FFFFFF',
    borderRadius: 6,
  }),
}));

const SquareAvatarIcon = ({ className, viewBox, size = 40, ...rest }) => {
  const classes = useStyles({ size });

  return (
    <SvgIcon
      viewBox={viewBox || '0 0 40 40'}
      fill='none'
      {...rest}
      className={clsx(classes.root, className)}>
      <rect x='0.5' y='0.500061' width='39' height='39' rx='5.5' fill='white' fillOpacity='0.2' />
      <mask
        id='mask0_848_12387'
        style={{ maskType: 'alpha' }}
        maskUnits='userSpaceOnUse'
        x='8'
        y='8'
        width='24'
        height='24'>
        <rect x='8' y='8.00006' width='24' height='24' fill='#D9D9D9' />
      </mask>
      <g mask='url(#mask0_848_12387)'>
        <path
          d='M20 14.0001C19.45 14.0001 18.9793 13.8041 18.588 13.4121C18.196 13.0207 18 12.5501 18 12.0001C18 11.4501 18.196 10.9791 18.588 10.5871C18.9793 10.1957 19.45 10.0001 20 10.0001C20.55 10.0001 21.021 10.1957 21.413 10.5871C21.8043 10.9791 22 11.4501 22 12.0001C22 12.5501 21.8043 13.0207 21.413 13.4121C21.021 13.8041 20.55 14.0001 20 14.0001ZM17 30.0001V17.0001H11V15.0001H29V17.0001H23V30.0001H21V24.0001H19V30.0001H17Z'
          fill='white'
        />
      </g>
    </SvgIcon>
  );
};

export default memo(SquareAvatarIcon);
