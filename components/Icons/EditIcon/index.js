import { memo } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: props => ({
    width: props.size,
    height: props.size,
    cursor: 'pointer',
    '& rect': {
      fill: '#e9eaf0',
    },
    '& mask': {
      fill: '#D9D9D9',
    },
    '& path': {
      fill: '#1C1B1F',
    },
    '&:hover': {
      '& rect': {
        fill: '#F97326',
        fillOpacity: 1,
      },
      '& mask': {
        fill: '#D9D9D9',
      },
      '& path': {
        fill: 'white',
      },
    },
  }),
}));

const EditIcon = ({ className, viewBox, size = 40, ...rest }) => {
  const classes = useStyles({ size });

  return (
    <SvgIcon viewBox={viewBox || '0 0 40 41'} {...rest} className={clsx(classes.root, className)}>
      <rect y='0.5' width='40' height='40' rx='4' />
      <mask
        id='mask0_374_19512'
        style={{ maskType: 'alpha' }}
        maskUnits='userSpaceOnUse'
        x='8'
        y='8'
        width='24'
        height='25'>
        <rect x='8' y='8.5' width='24' height='24' />
      </mask>
      <g mask='url(#mask0_374_19512)'>
        <path d='M27.3 17.425L23.05 13.225L24.45 11.825C24.8333 11.4417 25.3043 11.25 25.863 11.25C26.421 11.25 26.8917 11.4417 27.275 11.825L28.675 13.225C29.0583 13.6083 29.2583 14.071 29.275 14.613C29.2917 15.1543 29.1083 15.6167 28.725 16L27.3 17.425ZM12 29.5C11.7167 29.5 11.4793 29.404 11.288 29.212C11.096 29.0207 11 28.7833 11 28.5V25.675C11 25.5417 11.025 25.4127 11.075 25.288C11.125 25.1627 11.2 25.05 11.3 24.95L21.6 14.65L25.85 18.9L15.55 29.2C15.45 29.3 15.3377 29.375 15.213 29.425C15.0877 29.475 14.9583 29.5 14.825 29.5H12Z' />
      </g>
    </SvgIcon>
  );
};

export default memo(EditIcon);
