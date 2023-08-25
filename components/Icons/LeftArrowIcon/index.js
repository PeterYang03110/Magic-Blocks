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

const LeftArrowIcon = ({ className, viewBox, size = 48, ...rest }) => {
  const classes = useStyles({ size });

  return (
    <SvgIcon viewBox={viewBox || '0 0 48 48'} {...rest} className={clsx(classes.root, className)}>
      <mask
        id='mask0_440_5522'
        style={{ maskType: 'alpha' }}
        maskUnits='userSpaceOnUse'
        x='0'
        y='0'
        width='48'
        height='48'>
        <rect width='48' height='48' fill='#D9D9D9' />
      </mask>
      <g mask='url(#mask0_440_5522)'>
        <path
          d='M22.35 38.9516L8.45 25.0516C8.28333 24.8849 8.16667 24.7182 8.1 24.5516C8.03333 24.3849 8 24.2016 8 24.0016C8 23.8016 8.03333 23.6182 8.1 23.4516C8.16667 23.2849 8.28333 23.1182 8.45 22.9516L22.4 9.00156C22.6667 8.7349 23 8.60156 23.4 8.60156C23.8 8.60156 24.15 8.75156 24.45 9.05156C24.75 9.35156 24.9 9.70156 24.9 10.1016C24.9 10.5016 24.75 10.8516 24.45 11.1516L13.1 22.5016H37.9C38.3333 22.5016 38.6917 22.6432 38.975 22.9266C39.2583 23.2099 39.4 23.5682 39.4 24.0016C39.4 24.4349 39.2583 24.7932 38.975 25.0766C38.6917 25.3599 38.3333 25.5016 37.9 25.5016H13.1L24.5 36.9016C24.7667 37.1682 24.9 37.5016 24.9 37.9016C24.9 38.3016 24.75 38.6516 24.45 38.9516C24.15 39.2516 23.8 39.4016 23.4 39.4016C23 39.4016 22.65 39.2516 22.35 38.9516Z'
          fill='#1C1B1F'
        />
      </g>
    </SvgIcon>
  );
};

export default memo(LeftArrowIcon);
