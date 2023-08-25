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

const ErrorCrossIcon = ({ className, viewBox, size = 24, ...rest }) => {
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
          d='M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z'
          fill='#FF3D71'
        />
      </g>
    </SvgIcon>
  );
};

export default memo(ErrorCrossIcon);
