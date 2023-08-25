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

const AlertIcon = ({ className, viewBox, size = 20, ...rest }) => {
  const classes = useStyles({ size });

  return (
    <SvgIcon
      viewBox={viewBox || '0 0 16 20'}
      {...rest}
      fill='none'
      className={clsx(classes.root, className)}>
      <path
        d='M8 9.9999C8.28333 9.9999 8.521 9.9039 8.713 9.7119C8.90433 9.52057 9 9.28324 9 8.9999V5.9999C9 5.71657 8.90433 5.4789 8.713 5.2869C8.521 5.09557 8.28333 4.9999 8 4.9999C7.71667 4.9999 7.47933 5.09557 7.288 5.2869C7.096 5.4789 7 5.71657 7 5.9999V8.9999C7 9.28324 7.096 9.52057 7.288 9.7119C7.47933 9.9039 7.71667 9.9999 8 9.9999ZM8 13.9999C8.28333 13.9999 8.521 13.9039 8.713 13.7119C8.90433 13.5206 9 13.2832 9 12.9999C9 12.7166 8.90433 12.4789 8.713 12.2869C8.521 12.0956 8.28333 11.9999 8 11.9999C7.71667 11.9999 7.47933 12.0956 7.288 12.2869C7.096 12.4789 7 12.7166 7 12.9999C7 13.2832 7.096 13.5206 7.288 13.7119C7.47933 13.9039 7.71667 13.9999 8 13.9999ZM8 19.9249H7.75C7.66667 19.9249 7.59167 19.9082 7.525 19.8749C5.34167 19.1916 3.54167 17.8372 2.125 15.8119C0.708333 13.7872 0 11.5499 0 9.0999V4.3749C0 3.95824 0.121 3.58324 0.363 3.2499C0.604333 2.91657 0.916667 2.6749 1.3 2.5249L7.3 0.274902C7.53333 0.191569 7.76667 0.149902 8 0.149902C8.23333 0.149902 8.46667 0.191569 8.7 0.274902L14.7 2.5249C15.0833 2.6749 15.396 2.91657 15.638 3.2499C15.8793 3.58324 16 3.95824 16 4.3749V9.0999C16 11.5499 15.2917 13.7872 13.875 15.8119C12.4583 17.8372 10.6583 19.1916 8.475 19.8749C8.39167 19.9082 8.23333 19.9249 8 19.9249ZM8 17.8999C9.73333 17.3499 11.1667 16.2499 12.3 14.5999C13.4333 12.9499 14 11.1166 14 9.0999V4.3749L8 2.1249L2 4.3749V9.0999C2 11.1166 2.56667 12.9499 3.7 14.5999C4.83333 16.2499 6.26667 17.3499 8 17.8999Z'
        fill='#996A13'
      />
    </SvgIcon>
  );
};

export default memo(AlertIcon);