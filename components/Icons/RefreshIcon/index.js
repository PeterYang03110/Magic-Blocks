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

const RefreshIcon = ({ className, viewBox, size = 24, ...rest }) => {
  const classes = useStyles({ size });

  return (
    <SvgIcon viewBox={viewBox || '0 0 24 24'} {...rest} className={clsx(classes.root, className)}>
      <mask
        id='mask0_1405_17020'
        style={{ maskType: 'alpha' }}
        maskUnits='userSpaceOnUse'
        x='0'
        y='0'
        width='24'
        height='24'>
        <rect width='24' height='24' fill='#D9D9D9' />
      </mask>
      <g mask='url(#mask0_1405_17020)'>
        <path
          d='M11.375 15.25C11.025 15.4167 10.7083 15.404 10.425 15.212C10.1417 15.0207 10 14.7083 10 14.275C10 14.1083 10.0543 13.946 10.163 13.788C10.271 13.6293 10.4083 13.5083 10.575 13.425C11.625 12.925 12.4583 12.1833 13.075 11.2C13.6917 10.2167 14 9.13333 14 7.95C14 7.2 13.8583 6.47067 13.575 5.762C13.2917 5.054 12.85 4.4 12.25 3.8L12 3.55V5C12 5.28333 11.9043 5.52067 11.713 5.712C11.521 5.904 11.2833 6 11 6C10.7167 6 10.4793 5.904 10.288 5.712C10.096 5.52067 10 5.28333 10 5V1C10 0.716667 10.096 0.479 10.288 0.287C10.4793 0.0956668 10.7167 0 11 0H15C15.2833 0 15.5207 0.0956668 15.712 0.287C15.904 0.479 16 0.716667 16 1C16 1.28333 15.904 1.521 15.712 1.713C15.5207 1.90433 15.2833 2 15 2H13.25L13.65 2.35C14.4667 3.16667 15.0627 4.054 15.438 5.012C15.8127 5.97067 16 6.95 16 7.95C16 9.55 15.5833 11.004 14.75 12.312C13.9167 13.6207 12.7917 14.6 11.375 15.25ZM1 16C0.716667 16 0.479 15.904 0.287 15.712C0.0956668 15.5207 0 15.2833 0 15C0 14.7167 0.0956668 14.4793 0.287 14.288C0.479 14.096 0.716667 14 1 14H2.75L2.35 13.65C1.53333 12.8333 0.937333 11.946 0.562 10.988C0.187333 10.0293 0 9.05 0 8.05C0 6.45 0.416667 4.99567 1.25 3.687C2.08333 2.379 3.20833 1.4 4.625 0.75C4.975 0.583333 5.29167 0.595667 5.575 0.787C5.85833 0.979 6 1.29167 6 1.725C6 1.89167 5.946 2.054 5.838 2.212C5.72933 2.37067 5.59167 2.49167 5.425 2.575C4.375 3.075 3.54167 3.81667 2.925 4.8C2.30833 5.78333 2 6.86667 2 8.05C2 8.8 2.14167 9.529 2.425 10.237C2.70833 10.9457 3.15 11.6 3.75 12.2L4 12.45V11C4 10.7167 4.096 10.479 4.288 10.287C4.47933 10.0957 4.71667 10 5 10C5.28333 10 5.521 10.0957 5.713 10.287C5.90433 10.479 6 10.7167 6 11V15C6 15.2833 5.90433 15.5207 5.713 15.712C5.521 15.904 5.28333 16 5 16H1Z'
          fill='#A4D7FC'
        />
      </g>
    </SvgIcon>
  );
};

export default memo(RefreshIcon);
