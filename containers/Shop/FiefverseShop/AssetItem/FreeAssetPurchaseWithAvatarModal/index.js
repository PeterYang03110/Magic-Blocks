import { memo, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Divider, Radio } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import ContainedButton from 'components/UI/Buttons/ContainedButton';
import BorderCardWrapper from 'parts/BorderCardWrapper';
import { useAsset } from 'contexts/asset-context';

const useStyles = makeStyles(theme => ({
  dialog: {
    background: 'white',
    maxWidth: theme.spacing(132.5),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),

    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(2),
    },
  },
  title: {
    textTransform: 'uppercase',
    color: '#FFB020',
    fontFamily: 'Inter-Bold',
    fontSize: theme.spacing(4),
    lineHeight: '40px',
    fontWeight: 800,

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(2.5),
      lineHeight: '24px',
    },
  },
  button: {
    fontSize: theme.spacing(2.5),
    color: '#FFFFFF',
    background: '#0B0B0B',
    textTransform: 'uppercase',
    height: theme.spacing(7),
    marginBottom: theme.spacing(1.5),
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.spacing(0.75),

    '& span': {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(2),
      lineHeight: '24px',
      height: theme.spacing(6.25),
    },
  },
  claimButton: {
    fontSize: theme.spacing(2.5),
    color: '#FFFFFF',
    background: '#0B0B0B',
    textTransform: 'uppercase',
    height: theme.spacing(7),
    borderRadius: theme.spacing(0.75),

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(2),
      lineHeight: '24px',
      height: theme.spacing(6.25),
    },
  },
  disabled: {
    color: '#8F95B2 !important',
    background: '#EDEFF5 !important',
  },
  singleItem: {
    background: '#EDEFF5',
    borderRadius: theme.spacing(0.5),
    textTransform: 'uppercase',
  },
  availableSupply: {
    background: '#4D6EFF',
    color: 'white',
    borderRadius: theme.spacing(0.5),
    textTransform: 'uppercase',
  },
  divider: {
    background: 'black',
    height: '40px',
  },
  avatarSection: {
    width: theme.spacing(50.75),

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  image: {
    width: theme.spacing(50.75),
    height: theme.spacing(50.75),
    objectFit: 'cover',
    borderRadius: theme.spacing(0.75),
    boxShadow: '0px 2px 8px rgba(7, 11, 29, 0.4)',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      maxHeight: theme.spacing(40),
    },
  },
  attributesWrapper: {
    width: theme.spacing(72.5),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  avatars: {
    color: '#1F182A',
    fontFamily: 'pedestria-mvb',
    fontWeight: 800,
    fontSize: theme.spacing(4),
    lineHeight: '45px',

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3),
      lineHeight: '34px',
    },
  },
  attributes: {
    background: '#fff',
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(2),
  },
  attributeItem: {
    marginBottom: theme.spacing(1.5),
  },
  attribute: {
    color: '#1F182A',
    fontWeight: 500,
    fontSize: theme.spacing(2),
    lineHeight: 1.5,
    fontFamily: 'Inter',
    textTransform: 'capitalize',
    display: 'flex',
    alignItems: 'center',

    '& svg': {
      marginLeft: theme.spacing(1),
      color: '#F97326',
      fontSize: theme.spacing(2.25),
      cursor: 'pointer',
    },
  },
  buyGear: {
    width: '100%',
    textTransform: 'uppercase',
  },
  connectButton: {
    height: theme.spacing(7),
    marginBottom: theme.spacing(1.5),
  },
  avatarsDescription: {
    fontSize: theme.spacing(1.75),
    lineHeight: '24px',
    fontWeight: 500,
    color: '#474D66',
    marginTop: theme.spacing(1),
  },
  header: {
    gap: theme.spacing(2),
  },
  assetDetail: {
    flexWrap: 'nowrap',
    gap: theme.spacing(3),

    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
  },
  note: {
    fontSize: theme.spacing(1.75),
    color: '#797FF2',
    lineHeight: '24px',
    marginBottom: theme.spacing(2),
  },
  lineDivider: {
    height: 1,
    width: '100%',
    marginTop: theme.spacing(1),
    background: `linear-gradient(130.42deg, #797FF2 0%, #DAF9FC 80%, #edbbfd 100%)`,
  },
  warning: {
    width: '100%',
    border: '2px solid #FF3D71',
    borderRadius: theme.spacing(0.75),
    padding: theme.spacing(2, 1),
    margin: theme.spacing(3, 0, 0),
  },
  warningTitle: {
    fontFamily: 'pedestria-mvb',
    fontWeight: 700,
    color: '#FF3D71',
    fontSize: theme.spacing(3),
    lineHeight: '34px',
    marginBottom: theme.spacing(1),
    textAlign: 'center',
  },
  warningDescription: {
    color: '#474D66',
    fontSize: theme.spacing(2),
    lineHeight: 1.5,
    fontWeight: 500,
    textAlign: 'center',

    '& span': {
      color: '#797FF2',
      cursor: 'pointer',
    },
  },
  actionDivider: {
    background: '#D8DAE5',
  },
  back: {
    display: 'flex',
    alignItems: 'center',
    color: '#1F182A',
    cursor: 'pointer',
    textDecorationLine: 'underline',

    '& svg': {
      marginRight: theme.spacing(1),
    },
  },
  description: {
    color: '#8F95B2',
    fontSize: theme.spacing(2.25),
    lineHeight: '30px',
    fontWeight: 500,
    marginTop: theme.spacing(1),

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(1.75),
      lineHeight: '24px',
    },
  },
  card: {
    padding: theme.spacing(2),
    background: '#F9FAFC',
    borderRadius: 6,
  },
  tipTitle: {
    background: 'linear-gradient(97.82deg, #97F6FF -148.83%, #8085EE 100.25%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    fontFamily: 'pedestria-mvb',
    fontSize: theme.spacing(3),
    lineHeight: '34px',
    fontWeight: 700,

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(2.5),
      lineHeight: '30px',
    },
  },
  tipDescription: {
    fontSize: theme.spacing(1.75),
    lineHeight: '24px',
    color: '#474D66',
    fontWeight: 500,
    marginTop: theme.spacing(1),

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(1.5),
    },
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
  },
  avatarImg: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    borderRadius: 2,
    marginRight: 8,
  },
  avatarName: {
    fontSize: theme.spacing(1.75),
    lineHeight: '24px',
    color: '#1F182A',
  },
  avatarTokenId: {
    fontSize: theme.spacing(1.5),
    lineHeight: '15px',
    color: '#8F95B2',
    fontWeight: 500,
  },
  avatarItem: {
    background: '#FFFFFF',
    borderRadius: 6,
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    cursor: 'pointer',
    border: '1px solid #fff',

    '&:hover': {
      border: '1px solid #D8DAE5',
    },
  },
  disabledAvatar: {
    opacity: 0.4,
  },
  avatarSelector: {
    color: '#8F95B2',
    padding: 0,

    '& .MuiSvgIcon-root': {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },

    '& .Mui-checked': {
      color: '#FBA26E',
    },
  },
  checked: {
    color: '#FBA26E !important',
  },
}));

const FreeAssetPurchaseWithAvatarModal = ({ asset, onBack, onClose }) => {
  const classes = useStyles();
  const { onPurchaseAsset, userAvatars, getUserAvatars } = useAsset();
  const [selectedAvatar, setSelectedAvatar] = useState();

  const handlePurchaseFreeAsset = async () => {
    try {
      await onPurchaseAsset(asset, selectedAvatar);
      getUserAvatars();
      onClose();
    } catch (error) {
      console.log('[Error] action rejected');
    }
  };

  const handleSelectAvatar = avatar => () => {
    if (!selectedAvatar || avatar.name !== selectedAvatar.name) {
      setSelectedAvatar(avatar);
    } else {
      setSelectedAvatar('');
    }
  };

  return (
    <>
      <div onClick={onBack} className={classes.back}>
        <ArrowBackIcon />
        <Typography>Back to Buying an Asset</Typography>
      </div>
      <div>
        <Typography variant='h6' className={classes.title}>
          {userAvatars.length > 1 ? 'Multiple Avatars Detected!' : 'You own one Avatar!'}
        </Typography>
        <Typography className={classes.description}>
          Avatar holders can claim 1 free Blueprint per wallet address. Each Avatar can only be used
          once to claim the free Blueprint.
        </Typography>
      </div>
      <Grid
        className={classes.assetDetail}
        container
        alignItems='flex-start'
        justifyContent='space-between'>
        <div className={classes.avatarSection}>
          <img alt='gear' src={asset?.metadata?.image} className={classes.image} />
        </div>
        <div className={classes.attributesWrapper}>
          <BorderCardWrapper rootClassName={classes.card}>
            <Typography className={classes.avatars}>Avatars</Typography>
            <Typography className={classes.avatarsDescription}>
              Select which Avatar to use to claim your free Blueprint
            </Typography>
            <Divider className={classes.lineDivider} />
            {userAvatars.map(avatar => {
              return (
                <Grid
                  onClick={handleSelectAvatar(avatar)}
                  className={clsx(classes.avatarItem)}
                  key={avatar.name}
                  container
                  justifyContent='space-between'
                  alignItems='center'>
                  <div className={classes.avatar}>
                    <img className={classes.avatarImg} src={avatar.image} />
                    <div>
                      <Typography className={classes.avatarName}>{avatar.name}</Typography>
                      <Typography
                        className={classes.avatarTokenId}>{`#${avatar.tokenId}`}</Typography>
                    </div>
                  </div>
                  <Radio
                    checked={!!(selectedAvatar && avatar.name === selectedAvatar.name)}
                    className={classes.avatarSelector}
                    value=''
                    classes={{
                      checked: classes.checked,
                    }}
                  />
                </Grid>
              );
            })}
          </BorderCardWrapper>
          <Divider className={classes.actionDivider} />
          <ContainedButton
            fullWidth
            disabled={!selectedAvatar}
            className={classes.claimButton}
            onClick={handlePurchaseFreeAsset}>
            Claim free asset
          </ContainedButton>
          <div className={classes.card}>
            <Typography className={classes.tipTitle}>Tip</Typography>
            <Typography className={classes.tipDescription}>
              If you would like to claim free Blueprints for your remaining Avatars, simply transfer each Avatar to separate wallets. 1 Avatar per wallet. 
            </Typography>
          </div>
        </div>
      </Grid>
    </>
  );
};

export default memo(FreeAssetPurchaseWithAvatarModal);
