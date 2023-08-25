import { memo } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: ({ size }) => ({
    width: size,
    height: size,
    fill: 'none',
  }),
}));

const SliderLeftIcon = ({ className, viewBox, size = 16, blackBorder = false, ...rest }) => {
  const classes = useStyles({ size });

  return (
    <SvgIcon viewBox={viewBox || '0 0 56 56'} {...rest} className={clsx(classes.root, className)}>
      <rect
        x='-0.5'
        y='0.5'
        width='55'
        height='55'
        rx='27.5'
        transform='matrix(-1 0 0 1 55 0)'
        fill='white'
      />
      <mask
        id='mask0_126_8242'
        style={{ maskType: 'alpha' }}
        maskUnits='userSpaceOnUse'
        x='16'
        y='16'
        width='24'
        height='24'>
        <rect width='24' height='24' transform='matrix(-1 0 0 1 40 16)' fill='#D9D9D9' />
      </mask>
      <g mask='url(#mask0_126_8242)'>
        <path
          d='M32.8501 37.1C33.1001 36.85 33.2251 36.554 33.2251 36.212C33.2251 35.8707 33.1001 35.575 32.8501 35.325L25.5251 28L32.8751 20.65C33.1084 20.4167 33.2251 20.125 33.2251 19.775C33.2251 19.425 33.1001 19.125 32.8501 18.875C32.6001 18.625 32.3041 18.5 31.9621 18.5C31.6208 18.5 31.3251 18.625 31.0751 18.875L22.6751 27.3C22.5751 27.4 22.5041 27.5083 22.4621 27.625C22.4208 27.7417 22.4001 27.8667 22.4001 28C22.4001 28.1333 22.4208 28.2583 22.4621 28.375C22.5041 28.4917 22.5751 28.6 22.6751 28.7L31.1001 37.125C31.3334 37.3583 31.6208 37.475 31.9621 37.475C32.3041 37.475 32.6001 37.35 32.8501 37.1Z'
          fill='#1C1B1F'
        />
      </g>
      <rect
        x='-0.5'
        y='0.5'
        width='55'
        height='55'
        rx='27.5'
        transform='matrix(-1 0 0 1 55 0)'
        stroke='url(#paint0_linear_126_8242)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_126_8242'
          x1='0'
          y1='0'
          x2='65.2037'
          y2='14.4396'
          gradientUnits='userSpaceOnUse'>
          <stop stopColor={blackBorder ? '#0B0B0B' : '#797FF2'} />
          <stop offset='0.509469' stopColor={blackBorder ? '#0B0B0B' : '#DAF9FC'} />
          <stop offset='1' stopColor={blackBorder ? '#0B0B0B' : '#FF7DFD'} />
        </linearGradient>
      </defs>
    </SvgIcon>
  );
};

export default memo(SliderLeftIcon);
