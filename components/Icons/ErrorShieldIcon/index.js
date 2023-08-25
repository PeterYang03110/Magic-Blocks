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

const ErrorShieldIcon = ({ className, viewBox, size = 24, ...rest }) => {
  const classes = useStyles({ size });

  return (
    <SvgIcon viewBox={viewBox || '0 0 16 21'} {...rest} className={clsx(classes.root, className)}>
      <mask
        id='mask0_982_520'
        style={{ maskType: 'alpha' }}
        maskUnits='userSpaceOnUse'
        x='0'
        y='0'
        width='16'
        height='21'>
        <rect y='0.5' width='24' height='24' fill='#D9D9D9' />
      </mask>
      <g mask='url(#mask0_982_519)'>
        <path
          d='M8 10.4999C8.28333 10.4999 8.521 10.4039 8.713 10.2119C8.90433 10.0206 9 9.78324 9 9.4999V6.4999C9 6.21657 8.90433 5.9789 8.713 5.7869C8.521 5.59557 8.28333 5.4999 8 5.4999C7.71667 5.4999 7.47933 5.59557 7.288 5.7869C7.096 5.9789 7 6.21657 7 6.4999V9.4999C7 9.78324 7.096 10.0206 7.288 10.2119C7.47933 10.4039 7.71667 10.4999 8 10.4999ZM8 14.4999C8.28333 14.4999 8.521 14.4039 8.713 14.2119C8.90433 14.0206 9 13.7832 9 13.4999C9 13.2166 8.90433 12.9789 8.713 12.7869C8.521 12.5956 8.28333 12.4999 8 12.4999C7.71667 12.4999 7.47933 12.5956 7.288 12.7869C7.096 12.9789 7 13.2166 7 13.4999C7 13.7832 7.096 14.0206 7.288 14.2119C7.47933 14.4039 7.71667 14.4999 8 14.4999ZM8 20.4249H7.75C7.66667 20.4249 7.59167 20.4082 7.525 20.3749C5.34167 19.6916 3.54167 18.3372 2.125 16.3119C0.708333 14.2872 0 12.0499 0 9.5999V4.8749C0 4.45824 0.121 4.08324 0.363 3.7499C0.604333 3.41657 0.916667 3.1749 1.3 3.0249L7.3 0.774902C7.53333 0.691569 7.76667 0.649902 8 0.649902C8.23333 0.649902 8.46667 0.691569 8.7 0.774902L14.7 3.0249C15.0833 3.1749 15.396 3.41657 15.638 3.7499C15.8793 4.08324 16 4.45824 16 4.8749V9.5999C16 12.0499 15.2917 14.2872 13.875 16.3119C12.4583 18.3372 10.6583 19.6916 8.475 20.3749C8.39167 20.4082 8.23333 20.4249 8 20.4249ZM8 18.3999C9.73333 17.8499 11.1667 16.7499 12.3 15.0999C13.4333 13.4499 14 11.6166 14 9.5999V4.8749L8 2.6249L2 4.8749V9.5999C2 11.6166 2.56667 13.4499 3.7 15.0999C4.83333 16.7499 6.26667 17.8499 8 18.3999Z'
          fill='#FF3D71'
        />
      </g>
    </SvgIcon>
  );
};

export default memo(ErrorShieldIcon);