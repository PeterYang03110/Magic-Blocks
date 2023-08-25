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

const GreenCheckIcon = ({ className, viewBox, size = 24, ...rest }) => {
  const classes = useStyles({ size });

  return (
    <SvgIcon
      viewBox={viewBox || '0 0 24 24'}
      fill='none'
      {...rest}
      className={clsx(classes.root, className)}>
      <mask
        id='mask0_848_12394'
        style={{ maskType: 'alpha' }}
        maskUnits='userSpaceOnUse'
        x='0'
        y='0'
        width='24'
        height='24'>
        <rect y='6.10352e-05' width='24' height='24' fill='#D9D9D9' />
      </mask>
      <g mask='url(#mask0_848_12394)'>
        <path
          d='M5 20.0001V18.0001H19V20.0001H5ZM9.55 16.0001L3.875 10.3251L5.3 8.90006L9.55 13.1501L18.7 4.00006L20.125 5.42506L9.55 16.0001Z'
          fill='#00D68F'
        />
      </g>
    </SvgIcon>
  );
};

export default memo(GreenCheckIcon);
