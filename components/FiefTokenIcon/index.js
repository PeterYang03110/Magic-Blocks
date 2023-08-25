import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import LP_ICONS from 'utils/constants/lp-icons';

const useStyles = makeStyles(() => ({
  tokenImage: props => ({
    height: props.size,
    borderRadius: 50,
    objectFit: 'contain',
  }),
}));

const FiefTokenIcon = ({ token, size = 50, className }) => {
  const classes = useStyles({ size });

  return (
    <img
      alt='token-icon'
      src={LP_ICONS[token || 'BLUE']}
      className={clsx(classes.tokenImage, className)}
    />
  );
};

export default memo(FiefTokenIcon);
