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

const SquareAccountIcon = ({ className, viewBox, size = 40, ...rest }) => {
  const classes = useStyles({ size });

  return (
    <SvgIcon
      viewBox={viewBox || '0 0 40 40'}
      fill='none'
      {...rest}
      className={clsx(classes.root, className)}>
      <rect x='0.5' y='0.500061' width='39' height='39' rx='5.5' fill='white' fillOpacity='0.2' />
      <mask
        id='mask0_848_12411'
        style={{ maskType: 'alpha' }}
        maskUnits='userSpaceOnUse'
        x='8'
        y='8'
        width='24'
        height='24'>
        <rect x='8' y='8.00006' width='24' height='24' fill='#D9D9D9' />
      </mask>
      <g mask='url(#mask0_848_12411)'>
        <path
          d='M20 21.0001C20.9667 21.0001 21.7917 20.6584 22.475 19.9751C23.1583 19.2917 23.5 18.4667 23.5 17.5001C23.5 16.5334 23.1583 15.7084 22.475 15.0251C21.7917 14.3417 20.9667 14.0001 20 14.0001C19.0333 14.0001 18.2083 14.3417 17.525 15.0251C16.8417 15.7084 16.5 16.5334 16.5 17.5001C16.5 18.4667 16.8417 19.2917 17.525 19.9751C18.2083 20.6584 19.0333 21.0001 20 21.0001ZM13 29.0001C12.45 29.0001 11.979 28.8044 11.587 28.4131C11.1957 28.0211 11 27.5501 11 27.0001V13.0001C11 12.4501 11.1957 11.9791 11.587 11.5871C11.979 11.1957 12.45 11.0001 13 11.0001H27C27.55 11.0001 28.021 11.1957 28.413 11.5871C28.8043 11.9791 29 12.4501 29 13.0001V27.0001C29 27.5501 28.8043 28.0211 28.413 28.4131C28.021 28.8044 27.55 29.0001 27 29.0001H13ZM13 27.0001H27V25.8501C26.1 24.9667 25.0543 24.2707 23.863 23.7621C22.671 23.2541 21.3833 23.0001 20 23.0001C18.6167 23.0001 17.3293 23.2541 16.138 23.7621C14.946 24.2707 13.9 24.9667 13 25.8501V27.0001Z'
          fill='white'
        />
      </g>
    </SvgIcon>
  );
};

export default memo(SquareAccountIcon);
