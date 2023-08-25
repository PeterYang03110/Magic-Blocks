import { memo } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: props => ({
    width: props.size,
    height: props.size,
    fill: 'none',
  }),
}));

const HighBidIcon = ({ className, viewBox, size = 24, ...rest }) => {
  const classes = useStyles({ size });

  return (
    <SvgIcon viewBox={viewBox || '0 0 24 25'} {...rest} className={clsx(classes.root, className)}>
      <mask
        id='mask0_1078_17488'
        style={{ maskType: 'alpha' }}
        maskUnits='userSpaceOnUse'
        x='0'
        y='0'
        width='24'
        height='25'>
        <rect y='0.5' width='24' height='24' fill='#D9D9D9' />
      </mask>
      <g mask='url(#mask0_1078_17488)'>
        <path
          d='M4.975 21.5007C4.69167 21.5007 4.45833 21.4047 4.275 21.2127C4.09167 21.0214 4 20.7841 4 20.5007C4 20.2174 4.09567 19.9801 4.287 19.7887C4.479 19.5967 4.71667 19.5007 5 19.5007H15.025C15.3083 19.5007 15.5417 19.5967 15.725 19.7887C15.9083 19.9801 16 20.2174 16 20.5007C16 20.7841 15.9043 21.0214 15.713 21.2127C15.521 21.4047 15.2833 21.5007 15 21.5007H4.975ZM8.225 15.2257L5.4 12.4007C5.01667 12.0174 4.82067 11.5464 4.812 10.9877C4.804 10.4297 4.99167 9.95908 5.375 9.57575L6.1 8.85075L11.8 14.5007L11.075 15.2257C10.6917 15.6091 10.2167 15.8007 9.65 15.8007C9.08333 15.8007 8.60833 15.6091 8.225 15.2257ZM16 10.3007L10.35 4.60075L11.075 3.87575C11.4583 3.49241 11.9293 3.30475 12.488 3.31275C13.046 3.32141 13.5167 3.51741 13.9 3.90075L16.725 6.72575C17.1083 7.10908 17.3 7.58408 17.3 8.15075C17.3 8.71741 17.1083 9.19241 16.725 9.57575L16 10.3007ZM19.9 19.8007L7.55 7.45075L8.95 6.05075L21.325 18.4257C21.5083 18.6091 21.596 18.8381 21.588 19.1127C21.5793 19.3881 21.4833 19.6174 21.3 19.8007C21.1167 19.9841 20.8833 20.0757 20.6 20.0757C20.3167 20.0757 20.0833 19.9841 19.9 19.8007Z'
          fill='url(#paint0_linear_1078_17488)'
        />
      </g>
      <defs>
        <linearGradient
          id='paint0_linear_1078_17488'
          x1='-0.33431'
          y1='-5.4027'
          x2='40.0519'
          y2='9.34637'
          gradientUnits='userSpaceOnUse'>
          <stop stopColor='#FCB992' />
          <stop offset='1' stopColor='#F97326' />
        </linearGradient>
      </defs>
    </SvgIcon>
  );
};

export default memo(HighBidIcon);
