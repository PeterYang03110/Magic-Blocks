import { memo } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: props => ({
    width: props.size,
    height: props.size,
    border: '1px solid #FFFFFF',
    borderRadius: 6,
  }),
}));

const SquareAlertIcon = ({ className, viewBox, size = 40, ...rest }) => {
  const classes = useStyles({ size });

  return (
    <SvgIcon
      viewBox={viewBox || '0 0 40 40'}
      fill='none'
      {...rest}
      className={clsx(classes.root, className)}>
      <rect x='0.5' y='0.500061' width='39' height='39' rx='5.5' fill='white' fillOpacity='0.2' />
      <mask
        id='mask0_848_12399'
        style={{ maskType: 'alpha' }}
        maskUnits='userSpaceOnUse'
        x='8'
        y='8'
        width='24'
        height='24'>
        <rect x='8' y='8.00006' width='24' height='24' fill='#D9D9D9' />
      </mask>
      <g mask='url(#mask0_848_12399)'>
        <path
          d='M10 18.0001C10 16.5334 10.296 15.1461 10.888 13.8381C11.4793 12.5294 12.325 11.4001 13.425 10.4501L14.85 11.8501C13.95 12.6334 13.25 13.5541 12.75 14.6121C12.25 15.6707 12 16.8001 12 18.0001H10ZM28 18.0001C28 16.8001 27.75 15.6707 27.25 14.6121C26.75 13.5541 26.05 12.6334 25.15 11.8501L26.575 10.4501C27.675 11.4001 28.521 12.5294 29.113 13.8381C29.7043 15.1461 30 16.5334 30 18.0001H28ZM12 27.0001V25.0001H14V18.0001C14 16.6167 14.4167 15.3874 15.25 14.3121C16.0833 13.2374 17.1667 12.5334 18.5 12.2001V11.5001C18.5 11.0834 18.646 10.7294 18.938 10.4381C19.2293 10.1461 19.5833 10.0001 20 10.0001C20.4167 10.0001 20.7707 10.1461 21.062 10.4381C21.354 10.7294 21.5 11.0834 21.5 11.5001V12.2001C22.8333 12.5334 23.9167 13.2374 24.75 14.3121C25.5833 15.3874 26 16.6167 26 18.0001V25.0001H28V27.0001H12ZM20 30.0001C19.45 30.0001 18.9793 29.8044 18.588 29.4131C18.196 29.0211 18 28.5501 18 28.0001H22C22 28.5501 21.8043 29.0211 21.413 29.4131C21.021 29.8044 20.55 30.0001 20 30.0001Z'
          fill='white'
        />
      </g>
    </SvgIcon>
  );
};

export default memo(SquareAlertIcon);
