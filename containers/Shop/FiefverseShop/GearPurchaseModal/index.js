import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Divider } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';

import { useAuth } from 'contexts/auth-context';
import { useContracts } from 'contexts/contract-context';
import FiefDialog from 'components/FiefDialog';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import FiefTokenIcon from 'components/FiefTokenIcon';
import InfluencePointsBalanceStatus from 'parts/InfluencePointsBalanceStatus';
import ConnectWalletButton from 'parts/ConnectWalletButton';
import { formatNumber } from 'utils/helpers/utility';

const useStyles = makeStyles(theme => ({
  dialog: {
    background: 'white',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
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

    '& span': {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
  },
  disabled: {
    color: '#8F95B2 !important',
    background: '#EDEFF5 !important',
  },
  singleItem: {
    background: '#EDEFF5',
    borderRadius: theme.spacing(0.5),
  },
  availableSupply: {
    background: '#4D6EFF',
    color: 'white',
    borderRadius: theme.spacing(0.5),
  },
  divider: {
    margin: theme.spacing(0, 2),
    background: 'black',
    height: '40px',
  },
  image: {
    width: '100%',
    height: theme.spacing(27.5),
    objectFit: 'cover',
  },
  attributesCard: {
    background: '#EDEFF5',
    borderRadius: theme.spacing(0.75),
    padding: theme.spacing(2),
  },
  gearName: {
    color: '#1F182A',
    fontFamily: 'Inter-Bold',
    fontWeight: 800,
    fontSize: theme.spacing(3),
    lineHeight: '40px',
    marginBottom: theme.spacing(1),
    textTransform: 'uppercase',
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
  },
  buyGear: {
    width: '100%',
    textTransform: 'uppercase',
  },
  connectButton: {
    height: theme.spacing(7),
    marginBottom: theme.spacing(1.5),
  },
  infoLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    fontSize: theme.spacing(2.5),
    lineHeight: '26px',
    fontWeight: 700,
    color: '#fff',
    '& span': {
      color: '#1F182A',
    },
  },
  disabledInfoLabel: {
    color: '#8F95B2',
    '& img': {
      opacity: 0.4,
    },
  },
}));

const GearPurchaseModal = ({ gear, open, setOpen, onBuyGear }) => {
  const classes = useStyles();
  const { active } = useWeb3React();
  const { accessToken } = useAuth();
  const {
    balances: { ip: ipBalance = 0 },
  } = useContracts();

  return (
    <FiefDialog
      open={open}
      onClose={() => setOpen(false)}
      className={classes.dialog}
      titleClass={classes.title}>
      <div className={classes.container}>
        <Grid container>
          <ContainedButton className={classes.singleItem}>Single Item</ContainedButton>
          <Divider className={classes.divider} orientation='vertical' />
          <ContainedButton className={classes.availableSupply}>
            Available Supply | 12 / 500
          </ContainedButton>
        </Grid>
        <Typography className={classes.title}>MABS Gear</Typography>
        <img alt='gear' src={'/assets/images/gears/gear-common.png'} className={classes.image} />
        <div className={classes.attributesCard}>
          <Typography className={classes.gearName}>{gear.name}</Typography>
          <div className={classes.attributes}>
            <Grid className={classes.attributeItem} container justifyContent='space-between'>
              <Typography className={classes.attribute}>Rarity</Typography>
              <Typography className={classes.attribute}>{gear.rarity}</Typography>
            </Grid>
            <Grid className={classes.attributeItem} container justifyContent='space-between'>
              <Typography className={classes.attribute}>Type</Typography>
              <Typography className={classes.attribute}>{gear.type}</Typography>
            </Grid>
            <Grid className={classes.attributeItem} container justifyContent='space-between'>
              <Typography className={classes.attribute}>Gear Score</Typography>
              <Typography className={classes.attribute}>{gear.gearScore}</Typography>
            </Grid>
            <Grid container justifyContent='space-between'>
              <Typography className={classes.attribute}>IP Score</Typography>
              <Typography className={classes.attribute}>{gear.ipScore}</Typography>
            </Grid>
          </div>
        </div>
        <div className={classes.buyGear}>
          {active && accessToken ? (
            <ContainedButton
              fullWidth
              className={classes.button}
              classes={{
                disabled: classes.disabled,
              }}
              onClick={onBuyGear}
              disabled={parseFloat(gear.price) > parseFloat(ipBalance)}>
              Buy Gear
              <span>
                <FiefTokenIcon token='IP' size={32} />
                {formatNumber(gear.price)} IP
              </span>
            </ContainedButton>
          ) : (
            <ConnectWalletButton fullWidth className={classes.connectButton} />
          )}
          <InfluencePointsBalanceStatus requiredAmount={gear.price} />
        </div>
      </div>
    </FiefDialog>
  );
};

export default memo(GearPurchaseModal);
