import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';

import { useAuth } from 'contexts/auth-context';
import FiefDialog from 'components/FiefDialog';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import FiefTokenIcon from 'components/FiefTokenIcon';
import BorderCardWrapper from 'parts/BorderCardWrapper';
import ConnectWalletButton from 'parts/ConnectWalletButton';
import { formatNumber } from 'utils/helpers/utility';
import { useGear } from 'contexts/gear-context';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  title: {
    textTransform: 'uppercase',
    background: 'linear-gradient(110.69deg, #FCB992 -31.02%, #F97326 157.88%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    fontFamily: 'Inter-Bold',
    fontSize: theme.spacing(4)
  },
  description: {
    fontSize: 18,
    fontWeight: 500,
    color: '#474D66',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    gap: theme.spacing(2),
  },
  rowContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoLabel: {
    color: '#1F182A',
    fontWeight: 500,
    fontSize: theme.spacing(2),
  },
  ipValue: {
    color: '#FBA26E',
    fontWeight: 800,
    fontSize: theme.spacing(2.5),
    lineHeight: '24px',
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Inter-Bold',
    '& img': {
      marginRight: theme.spacing(1)
    }
  },
  button: {
    fontSize: theme.spacing(2.5),
    color: '#FFFFFF',
    background: '#0B0B0B',
    height: theme.spacing(7),
    textTransform: 'uppercase'
  },
  buyLabel: {
    fontSize: theme.spacing(2.25),
    fontWeight: 700,
    color: '#1F182A'
  },
  gearName: {
    fontSize: theme.spacing(2),
    fontWeight: 500,
    color: '#1F182A',
    marginTop: theme.spacing(1)
  },
  purchaseContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    padding: theme.spacing(1, 2),
    borderRadius: 6,
    background: '#F9FAFC',
  },
  alert: {
    color: '#797FF2',
    textAlign: 'center',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: theme.spacing(1.75),
    lineHeight: '24px',
    fontWeight: 500
  }
}));

const GearPurchaseConfirmModal = ({ gear, open, setOpen }) => {
  const classes = useStyles();
  const { active } = useWeb3React();
  const { accessToken } = useAuth();

  const { onPurchaseGear } = useGear();

  const handleBuy = () => {
    onPurchaseGear();
    setOpen(false);
  }

  return (
    <FiefDialog
      open={open}
      onClose={() => setOpen(false)}
      title='Payment Details'
      titleClass={classes.title}>
      <div className={classes.container}>
        <Typography className={classes.description}>
          Please review and confirm the details below
        </Typography>
        <BorderCardWrapper rootClassName={classes.card}>
          <div>
            <Typography className={classes.buyLabel}>BUY MABS Gear</Typography>
            <Typography className={classes.gearName}>{gear.name}</Typography>
          </div>
          <Divider />
          <div className={classes.purchaseContainer}>
            <div className={classes.rowContainer}>
              <Typography className={classes.infoLabel}>Payment Amount</Typography>
              <Typography className={classes.ipValue}>
                <FiefTokenIcon token='IP' size={24} />
                {formatNumber(gear.price, 3)} IP
              </Typography>
            </div>
          </div>
          <Typography className={classes.alert}>After you purchase your item, we will transfer it to your wallet.    Please be aware that this transfer may take up to 15mins.</Typography>
        </BorderCardWrapper>
        {active && accessToken ? (
          <ContainedButton
            fullWidth
            onClick={handleBuy}
            className={classes.button}>
            BUY MABS Gear
          </ContainedButton>
        ) : (
          <ConnectWalletButton />
        )}
      </div>
    </FiefDialog>
  );
};

export default memo(GearPurchaseConfirmModal);
