import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider } from '@material-ui/core';
import TopRightArrowIcon from '@material-ui/icons/CallMade';
import { useWeb3React } from '@web3-react/core';

import { OPENSEA_URL, BLUEPRINT_COLLECTION_NAME } from 'config';
import FiefDialog from 'components/FiefDialog';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import { getAssetTypeLabel } from 'utils/helpers/assetType';

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
    background: 'linear-gradient(97.82deg, #97F6FF -148.83%, #8085EE 100.25%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    textAlign: 'center',

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(2.5),
      lineHeight: '40px',
      textAlign: 'left'
    }
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
    height: '100%',
    objectFit: 'cover',
  },
  description: {
    fontSize: 18,
    lineHeight: '26px',
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#0B0B0B',

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(2),
      textAlign: 'center'
    }
  },
  balance: {
    fontSize: 16,
    lineHeight: 1.5,
    fontWeight: 500,
    color: '#474D66',
    marginTop: theme.spacing(1),

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(1.75),
      textAlign: 'center'
    }
  },
  button: {
    fontSize: 20,
    height: theme.spacing(7),
    color: '#FFFFFF',
    background: '#0B0B0B',
    textTransform: 'uppercase',
    borderRadius: 6,

    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(6.25),
      fontSize: theme.spacing(2)
    }
  },
  alert: {
    color: '#797FF2',
    fontSize: theme.spacing(1.75),
    lineHeight: '24px',
    marginBottom: theme.spacing(4),

    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    }
  },
  buttonContainer: {
    width: '100%'
  },
  lineDivider: {
    height: 1,
    width: '100%',
    background: `linear-gradient(130.42deg, #797FF2 0%, #DAF9FC 80%, #edbbfd 100%)`,
  },
  imageWrapper: {
    background: '#DEF2FF',
    height: theme.spacing(29.5),
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginBottom: theme.spacing(4),

    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(22)
    }
  }
}));

const AssetPurchaseSuccessModal = ({
  open,
  closeModal,
  purchasedAsset
}) => {
  const classes = useStyles();
  const { account } = useWeb3React();

  return (
    <FiefDialog open={open} onClose={closeModal}>
      <div className={classes.container}>
        <Typography className={classes.title}>
          Transaction Completed
        </Typography>
        <div className={classes.balanceContainer}>
          <div className={classes.imageWrapper}>
            <img alt='fief' src={purchasedAsset.metadata?.image} className={classes.packageImage} />
          </div>
          <Typography className={classes.description}>Thanks for your purchase !</Typography>
          <Typography className={classes.balance}>
            You have received the MABS Avatar Asset: {getAssetTypeLabel(purchasedAsset.nft.nftType)} | {purchasedAsset.name}
          </Typography>
        </div>
        <Divider className={classes.lineDivider} />
        <div className={classes.buttonContainer}>
          <Typography className={classes.alert}>
            We will mint your item and transfer it to your wallet. Please be aware that this transfer may take up to 15mins. 
          </Typography>
          <ContainedButton
            fullWidth
            className={classes.button}
            href={
              account
                ? `${OPENSEA_URL}/${account}/${BLUEPRINT_COLLECTION_NAME}`
                : `${OPENSEA_URL}/collection/${BLUEPRINT_COLLECTION_NAME}`
            }
            target='_blank'
            endIcon={<TopRightArrowIcon />}>
            View On Opensea
          </ContainedButton>
        </div>
      </div>
    </FiefDialog>
  );
};

export default memo(AssetPurchaseSuccessModal);
