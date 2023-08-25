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

const SliderRightIcon = ({ className, viewBox, size = 16, blackBorder = false, ...rest }) => {
  const classes = useStyles({ size });

  return (
    <SvgIcon viewBox={viewBox || '0 0 56 56'} {...rest} className={clsx(classes.root, className)}>
      <rect x='0.5' y='0.5' width='55' height='55' rx='27.5' fill='white' />
      <mask
        id='mask0_126_8246'
        style={{ maskType: 'alpha' }}
        maskUnits='userSpaceOnUse'
        x='16'
        y='16'
        width='24'
        height='24'>
        <rect x='16' y='16' width='24' height='24' fill='#D9D9D9' />
      </mask>
      <g mask='url(#mask0_126_8246)'>
        <path
          d='M23.1499 37.1C22.8999 36.85 22.7749 36.554 22.7749 36.212C22.7749 35.8707 22.8999 35.575 23.1499 35.325L30.4749 28L23.1249 20.65C22.8916 20.4167 22.7749 20.125 22.7749 19.775C22.7749 19.425 22.8999 19.125 23.1499 18.875C23.3999 18.625 23.6959 18.5 24.0379 18.5C24.3792 18.5 24.6749 18.625 24.9249 18.875L33.3249 27.3C33.4249 27.4 33.4959 27.5083 33.5379 27.625C33.5792 27.7417 33.5999 27.8667 33.5999 28C33.5999 28.1333 33.5792 28.2583 33.5379 28.375C33.4959 28.4917 33.4249 28.6 33.3249 28.7L24.8999 37.125C24.6666 37.3583 24.3792 37.475 24.0379 37.475C23.6959 37.475 23.3999 37.35 23.1499 37.1Z'
          fill='#1C1B1F'
        />
      </g>
      <rect
        x='0.5'
        y='0.5'
        width='55'
        height='55'
        rx='27.5'
        stroke='url(#paint0_linear_126_8246)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_126_8246'
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

export default memo(SliderRightIcon);
