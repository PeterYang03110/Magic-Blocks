import { memo, useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import TopRightArrowIcon from '@material-ui/icons/CallMade';
import { useWeb3React } from '@web3-react/core';

import { OPENSEA_URL, COLLECTION_NAME } from 'config';
import * as metadataAPI from 'services/api-metadata';
import FiefDialog from 'components/FiefDialog';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import { isEmpty } from 'utils/helpers/utility';
import { FANTASY_AVATAR_ICON_PATH } from 'utils/constants/image-paths';
import FiefLoading from 'components/FiefLoading';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    background: 'linear-gradient(110.69deg, #FCB992 -31.02%, #F97326 157.88%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
  },
  balanceContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  avatarContainer: {
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 24,
    width: '100%',
    background: '#F9FAFC',
    padding: 16,
    minHeight: 150,
  },
  avatarItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  avatarImage: {
    height: 88,
    width: 77,
    borderRadius: 4,
    objectFit: 'cover',
  },
  avatarName: {
    color: '#1F182A',
    fontWeight: 600,
  },
  avatarAmount: {
    fontSize: 12,
    color: '#8F95B2',
    '& span': {
      color: '#F97326',
    },
  },
  packageImage: {
    height: 265,
    width: '100%',
    background: '#EDEFF5',
    borderRadius: 4,
    objectFit: 'contain',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  description: {
    fontSize: 18,
    lineHeight: 1.2,
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    color: '#0B0B0B',
  },
  balance: {
    fontSize: 16,
    fontFamily: 'pedestria-mvb',
    color: '#0B0B0B',
    '& span': {
      background: 'linear-gradient(110.69deg, #FCB992 -31.02%, #F97326 157.88%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textFillColor: 'transparent',
    },
  },
  button: {
    fontSize: 18,
    color: '#FFFFFF',
    background: '#0B0B0B',
    textTransform: 'uppercase',
  },
}));

const AvatarPurchaseSuccessModal = ({
  open,
  setOpen,
  contractRegistry,
  amount,
  purchaseTokenIds,
  setPurchaseTokenIds,
}) => {
  const classes = useStyles();
  const { account } = useWeb3React();
  const [avatars, setAvatars] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAvatarInfos = useCallback(async () => {
    setLoading(true);
    try {
      const { id: registryId = '' } = contractRegistry;
      const avatarInfos = await Promise.all(
        purchaseTokenIds.map(tokenId => metadataAPI.getMetadataInfo(registryId, tokenId)),
      );

      let avatarList = [];
      const names = new Set(avatarInfos.map(item => item.name));
      for (const name of names) {
        const selectedAvatar = avatarInfos.filter(item => item.name === name);
        if (!isEmpty(selectedAvatar)) {
          avatarList = [...avatarList, { ...selectedAvatar[0], amount: selectedAvatar.length }];
        }
      }
      setAvatars(avatarList);
    } catch (error) {
      console.log('getAvatarInfos Error => ', error);
    }
    setLoading(false);
  }, [contractRegistry, purchaseTokenIds, setAvatars, setLoading]);

  useEffect(() => {
    if (!isEmpty(contractRegistry)) {
      getAvatarInfos();
    }
  }, [contractRegistry, getAvatarInfos]);

  const closeHandler = useCallback(() => {
    setOpen(false);
    setPurchaseTokenIds([]);
  }, [setOpen, setPurchaseTokenIds]);

  return (
    <FiefDialog open={open} onClose={closeHandler}>
      <div className={classes.container}>
        <Typography align='center' className={classes.title}>
          Transaction Completed
        </Typography>

        <div className={classes.balanceContainer}>
          <img alt='fief' src={FANTASY_AVATAR_ICON_PATH} className={classes.packageImage} />
          <Typography className={classes.description}>Thanks for your purchase!</Typography>
          <Typography className={classes.balance}>
            You have received the following <span>{amount}</span>{' '}
            {amount > 1 ? 'Avatars' : 'Avatar'}
          </Typography>
        </div>

        <div className={classes.avatarContainer}>
          {loading && <FiefLoading size={80} height={150} />}
          {avatars.map(avatar => (
            <div key={avatar.name} className={classes.avatarItem}>
              <img alt='avatar' src={avatar.image} className={classes.avatarImage} />
              <Typography className={classes.avatarName}>{avatar.name}</Typography>
            </div>
          ))}
        </div>

        <ContainedButton
          fullWidth
          className={classes.button}
          href={
            account
              ? `${OPENSEA_URL}/${account}/${COLLECTION_NAME}`
              : `${OPENSEA_URL}/collection/${COLLECTION_NAME}`
          }
          target='_blank'
          endIcon={<TopRightArrowIcon />}>
          View On Opensea
        </ContainedButton>
      </div>
    </FiefDialog>
  );
};

export default memo(AvatarPurchaseSuccessModal);
