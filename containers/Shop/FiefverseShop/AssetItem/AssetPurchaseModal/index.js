import { memo, useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Grid, Divider, useMediaQuery } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/HelpOutline';

import { useAuth } from 'contexts/auth-context';
import { useContracts } from 'contexts/contract-context';
import FiefDialog from 'components/FiefDialog';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import FiefTokenIcon from 'components/FiefTokenIcon';
import InfluencePointsBalanceStatus from 'parts/InfluencePointsBalanceStatus';
import ConnectWalletButton from 'parts/ConnectWalletButton';
import { formatNumber } from 'utils/helpers/utility';
import AssetInfluencePurchaseModal from 'containers/Shop/FiefverseShop/AssetItem/AssetInfluencePurchaseModal';
import FreeAssetPurchaseWithAvatarModal from 'containers/Shop/FiefverseShop/AssetItem/FreeAssetPurchaseWithAvatarModal';
import { useInfluencePoint } from 'contexts/influence-point-context';
import { useAsset } from 'contexts/asset-context';
import { getAssetTypeLabel } from 'utils/helpers/assetType';
import { BLUEPRINT_ATTRIBUTES } from 'utils/constants/asset-types';

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
    background: 'linear-gradient(102.49deg, #797FF2 0%, #B08DF2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
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

    [theme.breakpoints.down('md')]: {
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

    [theme.breakpoints.down('md')]: {
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

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginTop: theme.spacing(3.5),
      lineHeight: '26px',
      height: 42,
    },

    '&:hover': {
      background: '#EDEFF5',
      boxShadow: 'none',
      color: 'rgba(0, 0, 0, 0.87)'
    }
  },
  availableSupply: {
    background: '#4D6EFF',
    color: 'white',
    borderRadius: theme.spacing(0.5),
    textTransform: 'uppercase',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      lineHeight: '26px',
      height: 42,
    },
    '&:hover': {
      background: '#4D6EFF',
      boxShadow: 'none',
      color: 'white'
    }
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
  imageWrapper: {
    background: '#DEF2FF',
    width: theme.spacing(50.75),
    height: theme.spacing(50.75),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    overflow: 'hidden',

    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(22),
      width: '100%',
      padding: theme.spacing(1),
      boxShadow: 'none',
    },
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',

    [theme.breakpoints.down('sm')]: {
      width: 'unset',
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
  attributesCard: {
    background: '#EDEFF5',
    borderRadius: theme.spacing(0.75),
    padding: theme.spacing(2),
    width: '100%',
  },
  gearName: {
    color: '#1F182A',
    fontFamily: 'pedestria-mvb',
    fontWeight: 800,
    fontSize: theme.spacing(4),
    lineHeight: '45px',
    textTransform: 'uppercase',

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

    '&:last-child': {
      marginBottom: 0
    }
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

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(1.75),
      lineHeight: '24px',
    },

    [theme.breakpoints.down('xs')]: {
      maxWidth: theme.spacing(14),

      '&:last-child': {
        textAlign: 'right',
      },
    },
  },
  buyGear: {
    width: '100%',
    textTransform: 'uppercase',
  },
  connectButton: {
    height: theme.spacing(7),
    marginBottom: theme.spacing(1.5),
    borderRadius: theme.spacing(0.75),

    [theme.breakpoints.down('md')]: {
      fontSize: theme.spacing(2),
      lineHeight: '24px',
      height: theme.spacing(6.25),
    },
  },
  description: {
    fontSize: theme.spacing(1.75),
    lineHeight: '24px',
    fontWeight: 500,
    color: '#8F95B2',
    marginTop: theme.spacing(1),
  },
  cancelPurchase: {
    color: '#8F95B2',
    textDecorationLine: 'underline',
    fontSize: theme.spacing(2),
    lineHeight: '19px',
    fontWeight: 500,
    textAlign: 'center',
    cursor: 'pointer',

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(1.75),
    },
  },
  header: {
    gap: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(1),
    },
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
    margin: theme.spacing(1, 0),
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

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(2.5),
      lineHeight: '28px',
    },
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

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(1.75),
      lineHeight: '24px',
    },
  },
  actionDivider: {
    background: '#D8DAE5',
  },
  getIPButton: {
    background: 'linear-gradient(110.69deg, #FCB992 -31.02%, #F97326 157.88%)',
    height: theme.spacing(7),
    borderRadius: theme.spacing(0.75),
    color: 'white',
    textTransform: 'uppercase',
    fontSize: theme.spacing(2.5),
    fontWeight: 700,

    [theme.breakpoints.down('md')]: {
      fontSize: theme.spacing(2),
      lineHeight: '24px',
      height: theme.spacing(6.25),
    },
  },
  claimButtons: {
    display: 'flex',
    gap: theme.spacing(2),
    flexWrap: 'nowrap',
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(0.75),

    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
  },
  limitedWarning: {
    fontSize: theme.spacing(1.75),
    fontWeight: 500,
    lineHeight: '24px',
    color: '#F97326',
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
}));

const useStylesBootstrap = makeStyles(theme => ({
  arrow: {
    color: 'black',
  },
  tooltip: {
    fontSize: theme.spacing(1.5),
    minWidth: theme.spacing(38),
    padding: theme.spacing(1, 1.5),
    lineHeight: '15px',
    backgroundColor: 'black',
  },
}));

const FiefTooltip = props => {
  const classes = useStylesBootstrap();

  return <Tooltip placement='top' arrow classes={classes} {...props} />;
}

const AssetPurchaseModal = ({ asset, open, setOpen }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'), { defaultMatches: true });
  const { active } = useWeb3React();
  const { accessToken } = useAuth();
  const {
    balances: { ip: ipBalance = 0 },
  } = useContracts();
  const [showIpPurchaseModal, setShowIpPurchaseModal] = useState(false);
  const [showFreeAssetPurchaseModal, setShowFreeAssetPurchaseModal] = useState(false);
  const { influencePoints } = useInfluencePoint();
  const [selectedPackage, setSelectedPackage] = useState({});
  const { onPurchaseAsset, userAvatars } = useAsset();
  const router = useRouter();

  const price = asset?.prices.length ? parseFloat(asset?.prices[0].price) : 0;
  const discountedPrice = asset.discountPercentage
    ? price - (price * parseFloat(asset.discountPercentage)) / 100
    : price;
  
  const handleGetInfluencePoints = () => {
    setShowIpPurchaseModal(true);
    if (influencePoints.length) {
      const sortedIpPackages = [...influencePoints];
      sortedIpPackages.sort((pack1, pack2) => (pack1.amount + pack1.bonus) > (pack2.amount + pack2.bonus) ? 1 : -1);
      const requiredAmount = parseFloat(discountedPrice) - parseFloat(ipBalance);
      const ipPackage = sortedIpPackages.find(ipPackage => (ipPackage.amount + ipPackage.bonus) > requiredAmount); 
      setSelectedPackage(ipPackage);
    }
  };

  const handleBack = () => {
    if (showIpPurchaseModal) {
      setShowIpPurchaseModal(false);
      setSelectedPackage({});
    }

    if (showFreeAssetPurchaseModal) {
      setShowFreeAssetPurchaseModal(false);
    }
  };

  const handlePurchaseAsset = async () => {
    try {
      await onPurchaseAsset(asset);
      setOpen(false);
    } catch (error) {
      console.log('[Error] action rejected');
    }
  };

  const handleVisitAvatars = () => {
    router.push('#avatar');
    setOpen(false);
  };

  const handlePurchaseFreeAsset = () => {
    setShowFreeAssetPurchaseModal(true);
  };

  return (
    <FiefDialog
      open={open}
      onClose={() => setOpen(false)}
      className={classes.dialog}
      titleClass={classes.title}
      disableRestoreFocus>
      <div className={classes.container}>
        {showFreeAssetPurchaseModal && (
          <FreeAssetPurchaseWithAvatarModal
            asset={asset}
            onBack={handleBack}
            onClose={() => setOpen(false)}
          />
        )}
        {showIpPurchaseModal && (
          <AssetInfluencePurchaseModal
            onBack={handleBack}
            onClose={() => setOpen(false)}
            setSelectedPackage={setSelectedPackage}
            selectedPackage={selectedPackage}
          />
        )}
        {!showFreeAssetPurchaseModal && !showIpPurchaseModal && (
          <>
            <Grid container className={classes.header}>
              <ContainedButton className={classes.singleItem}>
                {getAssetTypeLabel(asset.nft?.nftType || '')}
              </ContainedButton>
              {!isSm && <Divider className={classes.divider} orientation='vertical' />}
              <ContainedButton className={classes.availableSupply}>
                {`Available Supply | ${formatNumber(asset.available || 0)} /
            ${formatNumber(asset.maxAvailable || 0)}`}
              </ContainedButton>
            </Grid>
            <Typography className={classes.title}>Avatar Asset</Typography>
            <Grid
              className={classes.assetDetail}
              container
              alignItems='flex-start'
              justifyContent='space-between'>
              <div className={classes.avatarSection}>
                <div className={classes.imageWrapper}>
                  <img alt='gear' src={asset?.metadata?.image} className={classes.image} />
                </div>
                {active && accessToken && userAvatars.length === 0 && discountedPrice === 0 && (
                  <div className={classes.warning}>
                    <Typography className={classes.warningTitle}>
                      Looks like you don’t own an avatar!
                    </Typography>
                    <Typography className={classes.warningDescription}>
                      This free mint is available to anyone owning an Avatar.{' '}
                      <span onClick={handleVisitAvatars}>Visit Avatars</span>
                    </Typography>
                  </div>
                )}
              </div>
              <div className={classes.attributesWrapper}>
                <div className={classes.attributesCard}>
                  <Typography className={classes.gearName}>{asset.name}</Typography>
                  <Typography className={classes.description}>
                    {asset.metadata.description}
                  </Typography>
                  <Divider className={classes.lineDivider} />
                  <Typography className={classes.note}>
                    You can only purchase and mint 1 Blueprint at a time
                  </Typography>
                  <div className={classes.attributes}>
                    {asset.metadata?.attributes.map((attribute, index) => {
                      const attributeHelper = BLUEPRINT_ATTRIBUTES.find(att => att.trait_type === attribute.trait_type);
                      return (
                        <Grid
                          key={`${asset.metadata.id}-${index}`}
                          className={classes.attributeItem}
                          container
                          justifyContent='space-between'
                          alignItems='flex-start'>
                          <Typography className={classes.attribute}>
                            {attribute.trait_type}
                            {attributeHelper && 
                              <FiefTooltip 
                                title={attributeHelper.description}
                                arrow>
                                <HelpIcon />
                              </FiefTooltip>
                            }
                          </Typography>
                          <Typography className={classes.attribute}>{attribute.value}</Typography>
                        </Grid>
                      )
                    })}
                  </div>
                </div>
                {discountedPrice === 0 && <Divider className={classes.actionDivider} />}
                {discountedPrice === 0 ? (
                  <div>
                    {active && accessToken ? (
                      <Grid container className={classes.claimButtons}>
                        <ContainedButton
                          fullWidth
                          className={classes.getIPButton}
                          onClick={handleGetInfluencePoints}>
                          Get Influence points!
                        </ContainedButton>
                        <ContainedButton
                          fullWidth
                          disabled={userAvatars.length === 0}
                          className={classes.claimButton}
                          onClick={handlePurchaseFreeAsset}>
                          Claim free asset
                        </ContainedButton>
                      </Grid>
                    ) : (
                      <ConnectWalletButton fullWidth className={classes.connectButton} />
                    )}
                    <InfluencePointsBalanceStatus
                      requiredAmount={discountedPrice}
                      showOnlyBalance
                    />
                    <Typography className={classes.limitedWarning}>
                      Limited to 1 free Blueprint per Avatar and 1 per account (wallet address).
                    </Typography>
                  </div>
                ) : (
                  <div className={classes.buyGear}>
                    {active && accessToken ? (
                      <ContainedButton
                        fullWidth
                        className={classes.button}
                        classes={{
                          disabled: classes.disabled,
                        }}
                        onClick={handlePurchaseAsset}
                        disabled={discountedPrice > parseFloat(ipBalance)}>
                        Buy Asset
                        <span>
                          <FiefTokenIcon token='IP' size={32} />
                          {formatNumber(discountedPrice)}
                        </span>
                      </ContainedButton>
                    ) : (
                      <ConnectWalletButton fullWidth className={classes.connectButton} />
                    )}
                    <InfluencePointsBalanceStatus
                      requiredAmount={discountedPrice}
                      onGetInfluencePoints={handleGetInfluencePoints}
                    />
                  </div>
                )}
                <Typography onClick={() => setOpen(false)} className={classes.cancelPurchase}>
                  Cancel Purchase
                </Typography>
              </div>
            </Grid>
          </>
        )}
      </div>
    </FiefDialog>
  );
};

export default memo(AssetPurchaseModal);
