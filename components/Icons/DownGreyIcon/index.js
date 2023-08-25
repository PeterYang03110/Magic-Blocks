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

const COLORS = {
  default: '#FFFFFF',
  brown: '#433012',
  disabled: '#474D66',
};

const DownGreyIcon = ({ className, viewBox, color = 'default', size = 16, ...rest }) => {
  const classes = useStyles({ size });

  return (
    <SvgIcon viewBox={viewBox || '0 0 16 12'} {...rest} className={clsx(classes.root, className)}>
      <path
        d='M8.23301 11.2704L5.70521 8.49551C4.11651 6.37724 0.550751 1.54052 0.416594 1.43461L0 0.728515L1.41218 0.728515L1.89938 1.1098C3.77052 2.59259 5.81818 4.49198 8.25419 6.51845L10.3513 4.87326C12.4695 3.25632 13.5711 3.10098 16 1.27927C16 1.27927 12.0459 6.92799 10.8385 8.56612L8.23301 11.2704Z'
        fill={COLORS[color]}
      />
    </SvgIcon>
  );
};

export default memo(DownGreyIcon);
