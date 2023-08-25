import { memo } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: props => ({
    width: props.size,
    height: props.size,
  }),
}));

const CheckedIcon = ({ className, viewBox, size = 24, ...rest }) => {
  const classes = useStyles({ size });

  return (
    <SvgIcon viewBox={viewBox || '0 0 24 25'} {...rest} className={clsx(classes.root, className)}>
      <mask
        id='mask0_982_519'
        style={{ maskType: 'alpha' }}
        maskUnits='userSpaceOnUse'
        x='0'
        y='0'
        width='24'
        height='25'>
        <rect y='0.5' width='24' height='24' fill='#D9D9D9' />
      </mask>
      <g mask='url(#mask0_1737_41662)'>
        <path
          d='M9.54961 18.0001L3.84961 12.3001L5.27461 10.8751L9.54961 15.1501L18.7246 5.9751L20.1496 7.4001L9.54961 18.0001Z'
          fill='#00D68F'
        />
      </g>
    </SvgIcon>
  );
};

export default memo(CheckedIcon);
