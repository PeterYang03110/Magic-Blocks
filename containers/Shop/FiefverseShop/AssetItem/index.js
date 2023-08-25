import { memo, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
import clsx from 'clsx';

import FiefTokenIcon from 'components/FiefTokenIcon';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import { formatNumber } from 'utils/helpers/utility';
import { getAssetTypeLabel } from 'utils/helpers/assetType';
import AssetPurchaseModal from 'containers/Shop/FiefverseShop/AssetItem/AssetPurchaseModal';
import { useAsset } from 'contexts/asset-context';

const useStyles = makeStyles(theme => ({
  root: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    minHeight: 394,
    maxHeight: 394,
    borderRadius: 6,
    position: 'relative',

    '&:hover': {
      '& #info': {
        marginBottom: 0,
        transition: 'margin-bottom .3s ease-in-out',
      },
      '& #image': {
        '& img': {
          transform: 'scale(1.05)',
          transition: 'transform .3s ease-in-out',
        },
      },
    },

    '& img': {
      transform: 'scale(1)',
      transition: 'transform .3s ease-in-out',
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: 340,
      maxHeight: 340,
    },
  },
  hoveredEffect: {
    '& #info': {
      marginBottom: 0,
      transition: 'margin-bottom .3s ease-in-out',
    },
    '& #image': {
      '& img': {
        transform: 'scale(1.05)',
        transition: 'transform .3s ease-in-out',
      },
    },
  },
  header: {
    width: '100%',
    background: '#0B0B0B',
    fontSize: 18,
    fontWeight: 700,
    lineHeight: '26px',
    textTransform: 'uppercase',
    padding: theme.spacing(1),
    color: '#DAF9FC',

    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
      lineHeight: '17px',
    },
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(1),
    paddingBottom: 0,
    background: 'rgba(11, 11, 11, 0.2)',
    backdropFilter: 'blur(8px)',
    marginBottom: -64,
    transition: 'margin-bottom .5s ease-in-out',

    [theme.breakpoints.down('sm')]: {
      marginBottom: -58,
    },
  },
  tag: {
    fontSize: 14,
    textTransform: 'uppercase',
    background: 'linear-gradient(99.38deg, #DAF9FC -154.11%, #B6BAF8 224.02%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
  },
  title: {
    fontSize: theme.spacing(5),
    fontFamily: 'pedestria-mvb',
    textAlign: 'center',
    fontWeight: 700,
    lineHeight: 1.4,
    color: '#FFFFFF',
    textShadow: '0px 1.5px 2px rgba(7, 11, 29, 0.15)',
    marginTop: theme.spacing(1),

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3),
    },
  },
  price: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 20,
    fontWeight: 800,
    color: '#FFFFFF',
    marginBottom: theme.spacing(2),

    '& span': {
      fontSize: 18,
      color: 'rgba(255, 255, 255, 0.6)',
      textDecoration: 'line-through',

      [theme.breakpoints.down('sm')]: {
        fontSize: theme.spacing(2.5),
      },
    },

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(2.5),
    },
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 'calc(100% - 42px)',
    background: 'rgb(222 242 255)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& img': {
      maxWidth: 'calc(100% - 48px)',
      maxHeight: 'calc(100% - 48px)',
      objectFit: 'cover',
    },

    [theme.breakpoints.down('sm')]: {
      height: 'calc(100% - 33px)',
    },
  },
  freeImageWrapper: {
    background: '#fde3d4',
  },
  amount: {
    position: 'absolute',
    top: 8,
    left: 8,
    fontSize: 14,
    lineHeight: '24px',
    fontWeight: 500,
    textTransform: 'uppercase',
    color: '#FFFFFF',
    background: 'rgba(11, 11, 11, 0.8)',
    borderRadius: 4,
    padding: theme.spacing(0.5, 1),
    boxShadow: '0px 12px 40px rgba(70, 74, 156, 0.15)',

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(1.5),
      lineHeight: '15px',
      top: 8,
    },
  },
  button: {
    fontSize: 20,
    lineHeight: '24px',
    textTransform: 'uppercase',
    color: '#FFFFFF',
    background: '#0B0B0B',
    padding: theme.spacing(2, 4),
    borderRadius: 6,
    height: 56,
    marginBottom: theme.spacing(1),

    '& span': {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      // Prevent click events from firing on text for GA
      pointerEvents: 'none',
    },

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(2),
      height: 50,
    },
  },
  claimed: {
    [theme.breakpoints.down('md')]: {
      fontSize: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(1.75),
    },
  },
  esPrice: {
    fontSize: 18,
    textDecoration: 'line-through',

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(2),
    },
  },
  disabled: {
    backgroundColor: '#EDEFF5 !important',
    color: '#8F95B2 !important',
  },
  soldOut: {
    fontSize: '16px !important',
    background: '#FF3D71',
    border: '1px solid white',
    padding: theme.spacing(0.25, 1),
    borderRadius: 6,
    color: 'white !important',
    textDecoration: 'unset !important',
    marginLeft: theme.spacing(1),

    [theme.breakpoints.down('sm')]: {
      fontSize: '14px !important',
    },
  },
}));

const AssetItem = ({ asset }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const cardRef = useRef();
  const { rewardAvailableWallet } = useAsset();
  const price = asset?.prices.length ? parseFloat(asset?.prices[0].price) : 0;
  const discountedPrice = asset.discountPercentage
    ? price - (price * parseFloat(asset.discountPercentage)) / 100
    : price;

  const handleOpenPurchaseModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    cardRef.current.focus(null);
  };

  return (
    <Card className={classes.root}>
      <Typography id='header' ref={cardRef} align='center' className={classes.header}>
        {getAssetTypeLabel(asset?.nft?.nftType || '')}
      </Typography>
      <div
        id='image'
        className={clsx(classes.imageWrapper, {
          [classes.freeImageWrapper]: discountedPrice === 0,
        })}>
        <img alt='pinata-party' src={asset?.metadata?.image} className={classes.image} />
        <Typography id='amount' className={classes.amount}>
          {formatNumber(asset.available || 0)} / {formatNumber(asset.maxAvailable || 0)}
        </Typography>
        <div id='info' className={classes.infoContainer}>
          <Typography className={classes.title}>{asset.name}</Typography>
          <Typography className={classes.price}>
            <FiefTokenIcon size={32} token='IP' />
            {asset.discountPercentage ? (
              <>
                <span>{formatNumber(price)}</span>
                {discountedPrice === 0 ? 'Free' : formatNumber(price)}
              </>
            ) : (
              formatNumber(price)
            )}
            {asset.available === 0 && <span className={classes.soldOut}>Sold Out</span>}
          </Typography>
          <ContainedButton
            id={`buy-asset-${asset.name}`}
            fullWidth
            disabled={discountedPrice === 0 && !rewardAvailableWallet}
            className={clsx(classes.button, {
              [classes.claimed]: discountedPrice === 0 && !rewardAvailableWallet,
            })}
            classes={{
              disabled: classes.disabled,
            }}
            onClick={handleOpenPurchaseModal}>
            {discountedPrice === 0
              ? rewardAvailableWallet
                ? 'Claim Asset'
                : 'You have already claimed'
              : 'Buy Asset'}
          </ContainedButton>
        </div>
      </div>
      {open && <AssetPurchaseModal asset={asset} open={open} setOpen={handleCloseModal} />}
    </Card>
  );
};

export default memo(AssetItem);
