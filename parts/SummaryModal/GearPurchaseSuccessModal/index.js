import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import TopRightArrowIcon from '@material-ui/icons/CallMade';
import { useWeb3React } from '@web3-react/core';

import { OPENSEA_URL, COLLECTION_NAME } from 'config';
import FiefDialog from 'components/FiefDialog';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import { FANTASY_AVATAR_ICON_PATH } from 'utils/constants/image-paths';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
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
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#0B0B0B',
  },
  balance: {
    fontSize: 16,
    lineHeight: 1.5,
    fontWeight: 500,
    color: '#474D66',
    marginTop: theme.spacing(1)
  },
  button: {
    fontSize: 20,
    height: theme.spacing(7),
    color: '#FFFFFF',
    background: '#0B0B0B',
    textTransform: 'uppercase',
  },
  alert: {
    color: '#797FF2',
    fontSize: theme.spacing(1.75),
    lineHeight: '24px',
    textAlign: 'center',
    marginTop: theme.spacing(1),
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  buttonContainer: {
    width: '100%'
  }
}));

const GearPurchaseSuccessModal = ({
  open,
  setOpen
}) => {
  const classes = useStyles();
  const { account } = useWeb3React();

  const closeHandler = () => {
    setOpen(false);
  };

  return (
    <FiefDialog open={open} onClose={closeHandler}>
      <div className={classes.container}>
        <Typography align='center' className={classes.title}>
          Transaction Completed
        </Typography>
        <div className={classes.balanceContainer}>
          <img alt='fief' src={FANTASY_AVATAR_ICON_PATH} className={classes.packageImage} />
          <Typography className={classes.description}>Thanks for your purchase !</Typography>
          <Typography className={classes.balance}>
            You have received the MABS Gear: Silver Dragons Helmet
          </Typography>
        </div>
        <div className={classes.buttonContainer}>
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
          <Typography className={classes.alert}>
            After you purchase your item, we will transfer it to your wallet. Please be aware that this transfer may take up to 15mins. 
          </Typography>
        </div>
      </div>
    </FiefDialog>
  );
};

export default memo(GearPurchaseSuccessModal);
