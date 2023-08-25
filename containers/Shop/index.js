import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useInfluencePoint } from 'contexts/influence-point-context';
import FiefLoading from 'components/FiefLoading';
import InfluencePoints from './InfluencePoints';
import AvatarShop from './AvatarShop';
import FiefverseShop from './FiefverseShop';
import { SHOP_BACKGROUND_IMAGE_PATH } from 'utils/constants/image-paths';
import { useAvatar } from 'contexts/avatar-context';
import { useAsset } from 'contexts/asset-context';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundImage: `url(${SHOP_BACKGROUND_IMAGE_PATH})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    padding: theme.spacing(0, 3),
  },
}));

const Shop = () => {
  const classes = useStyles();
  const { loading: influenceLoading } = useInfluencePoint();
  const { loading: avatarLoading } = useAvatar();
  const { loading: assetLoading } = useAsset();

  return (
    <main className={classes.root}>
      {(influenceLoading || avatarLoading || assetLoading) && <FiefLoading />}
      <InfluencePoints />
      <AvatarShop />
      <FiefverseShop />
    </main>
  );
};

export default memo(Shop);
