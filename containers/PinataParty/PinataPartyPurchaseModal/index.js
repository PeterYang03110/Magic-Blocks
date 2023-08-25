import { memo, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';

import { useAuth } from 'contexts/auth-context';
import { useContracts } from 'contexts/contract-context';
import FiefDialog from 'components/FiefDialog';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import FiefTokenIcon from 'components/FiefTokenIcon';
import BorderCardWrapper from 'parts/BorderCardWrapper';
import InfluencePointsBalanceStatus from 'parts/InfluencePointsBalanceStatus';
import ConnectWalletButton from 'parts/ConnectWalletButton';
import PetImageList from '../PetImageList';
import { formatNumber } from 'utils/helpers/utility';

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
  },
  description: {
    fontSize: 18,
    fontWeight: 500,
    color: '#474D66',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#1F182A',
    '& span': {
      fontSize: 16,
    },
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    gap: theme.spacing(2),
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    padding: theme.spacing(1, 2),
    borderRadius: 4,
    background: '#F9FAFC',
  },
  divider: {
    height: 1,
    width: '100%',
    background: 'linear-gradient(102.49deg, #A4D7FC 0%, #A8B4FE 50%,  #CDB9FD 100%)',
  },
  rowContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoLabel: {
    color: '#474D66',
    '& span': {
      color: '#1F182A',
    },
  },
  totalBalance: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    background: 'linear-gradient(110.69deg, #FCB992 -31.02%, #F97326 157.88%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  alert: {
    fontSize: 14,
    fontWeight: 500,
    color: '#797FF2',
  },
  button: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 18,
    color: '#FFFFFF',
    background: '#0B0B0B',
    padding: theme.spacing(2, 3),
    '& span': {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
  },
}));

const PinataPartyPurchaseModal = ({ open, setOpen, pets }) => {
  const classes = useStyles();
  const { active } = useWeb3React();
  const { accessToken } = useAuth();
  const {
    balances: { ip: ipBalance = 0 },
  } = useContracts();

  const purchaseHandler = useCallback(async () => {
    setOpen(false);
  }, [setOpen]);

  return (
    <FiefDialog
      open={open}
      title='Purchase Details'
      onClose={() => setOpen(false)}
      titleClass={classes.title}>
      <div className={classes.container}>
        <Typography className={classes.description}>
          Please review and confirm the details below
        </Typography>

        <BorderCardWrapper rootClassName={classes.card}>
          <Typography className={classes.subTitle}>buy Bundle</Typography>

          <Typography className={classes.subTitle}>
            <span>Pinata Party</span>
          </Typography>

          <Divider className={classes.divider} />

          <PetImageList pets={pets} height={150} />

          <div className={classes.infoContainer}>
            <div className={classes.rowContainer}>
              <Typography className={classes.infoLabel}>
                <span>Bundle Amount</span>
              </Typography>
              <Typography className={classes.totalBalance}>
                <FiefTokenIcon token='IP' size={32} />
                {formatNumber(800)} IP
              </Typography>
            </div>
          </div>

          <Typography align='center' className={classes.alert}>
            After you purchase your item, we will transfer it to your wallet. Please be aware that
            this transfer may take up to 15mins.
          </Typography>
        </BorderCardWrapper>

        {active && accessToken ? (
          <ContainedButton
            fullWidth
            disabled={parseFloat(ipBalance) <= 0}
            className={classes.button}
            onClick={purchaseHandler}>
            BUY BUNDLE
            <span>
              <FiefTokenIcon token='IP' size={24} />
              {formatNumber(800)} IP
            </span>
          </ContainedButton>
        ) : (
          <ConnectWalletButton />
        )}

        <InfluencePointsBalanceStatus requiredAmount={800} />
      </div>
    </FiefDialog>
  );
};

export default memo(PinataPartyPurchaseModal);
