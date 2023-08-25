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

const InventoryIcon = ({ className, viewBox, size = 24, ...rest }) => {
  const classes = useStyles({ size });

  return (
    <SvgIcon viewBox={viewBox || '0 0 24 24'} {...rest} className={clsx(classes.root, className)}>
      <mask
        id='mask0_1405_17030'
        style={{ maskType: 'alpha' }}
        maskUnits='userSpaceOnUse'
        x='0'
        y='0'
        width='24'
        height='24'>
        <rect width='24' height='24' fill='#D9D9D9' />
      </mask>
      <g mask='url(#mask0_1405_17030)'>
        <path
          d='M5 22C4.45 22 3.979 21.8043 3.587 21.413C3.19567 21.021 3 20.55 3 20V8.7C2.71667 8.51667 2.47933 8.28333 2.288 8C2.096 7.71667 2 7.38333 2 7V4C2 3.45 2.196 2.979 2.588 2.587C2.97933 2.19567 3.45 2 4 2H20C20.55 2 21.021 2.19567 21.413 2.587C21.8043 2.979 22 3.45 22 4V7C22 7.38333 21.904 7.71667 21.712 8C21.5207 8.28333 21.2833 8.51667 21 8.7V20C21 20.55 20.8043 21.021 20.413 21.413C20.021 21.8043 19.55 22 19 22H5ZM5 9V20H19V9H5ZM20 7V4H4V7H20ZM10 14H14C14.2833 14 14.521 13.904 14.713 13.712C14.9043 13.5207 15 13.2833 15 13C15 12.7167 14.9043 12.479 14.713 12.287C14.521 12.0957 14.2833 12 14 12H10C9.71667 12 9.47933 12.0957 9.288 12.287C9.096 12.479 9 12.7167 9 13C9 13.2833 9.096 13.5207 9.288 13.712C9.47933 13.904 9.71667 14 10 14Z'
          fill='#1F182A'
        />
      </g>
    </SvgIcon>
  );
};

export default memo(InventoryIcon);
