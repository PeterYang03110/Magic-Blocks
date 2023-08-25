import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { NO_IMAGE_PATH } from 'utils/constants/image-paths';
import LP_ICONS from 'utils/constants/lp-icons';

const useStyles = makeStyles(theme => ({
  secondTokenIcon: {
    marginLeft: theme.spacing(-2),
  },
  tokenImage: props => ({
    width: props.size,
    height: props.size,
    borderRadius: '50%',
    objectFit: 'contain',
  }),
}));

const FiefPairsIcon = ({ pairs, size = 44, className }) => {
  const classes = useStyles({ size });

  return pairs.map((pair, index) => (
    <img
      key={pair}
      alt='token'
      src={LP_ICONS[pair || 'NoIcon']}
      className={clsx(classes.tokenImage, className, { [classes.secondTokenIcon]: index > 0 })}
      onError={e => {
        e.target.onerror = null;
        e.target.src = NO_IMAGE_PATH;
      }}
    />
  ));
};

export default memo(FiefPairsIcon);
