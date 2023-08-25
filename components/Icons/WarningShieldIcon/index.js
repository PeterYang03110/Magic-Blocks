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

const WarningShieldIcon = ({ className, viewBox, size = 24, ...rest }) => {
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
          d='M6.95 13.55L12.6 7.9L11.175 6.475L6.95 10.7L4.85 8.6L3.425 10.025L6.95 13.55ZM8 20C5.68333 19.4167 3.771 18.0873 2.263 16.012C0.754333 13.9373 0 11.6333 0 9.1V3L8 0L16 3V9.1C16 11.6333 15.246 13.9373 13.738 16.012C12.2293 18.0873 10.3167 19.4167 8 20ZM8 17.9C9.73333 17.35 11.1667 16.25 12.3 14.6C13.4333 12.95 14 11.1167 14 9.1V4.375L8 2.125L2 4.375V9.1C2 11.1167 2.56667 12.95 3.7 14.6C4.83333 16.25 6.26667 17.35 8 17.9Z'
          fill='#FFB020'
        />
      </g>
    </SvgIcon>
  );
};

export default memo(WarningShieldIcon);
