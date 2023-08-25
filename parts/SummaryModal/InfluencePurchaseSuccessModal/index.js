import { memo, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { useContracts } from 'contexts/contract-context';
import FiefDialog from 'components/FiefDialog';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import FiefTokenIcon from 'components/FiefTokenIcon';
import { formatNumber } from 'utils/helpers/utility';

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
    alignItems: 'center',
    gap: 16,
    padding: theme.spacing(2, 0),
  },
  packageImage: {
    maxWidth: 281,
    width: '100%',
  },
  balance: {
    fontSize: 32,
    lineHeight: '40px',
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    color: '#0B0B0B',
    '& span': {
      background: 'linear-gradient(110.69deg, #FCB992 -31.02%, #F97326 157.88%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textFillColor: 'transparent',
    },
  },
  bonus: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#8f95b5',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    padding: theme.spacing(1, 2),
    borderRadius: 4,
    background: '#F9FAFC',
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
  },
  button: {
    fontSize: 18,
    color: '#FFFFFF',
    background: '#0B0B0B',
  },
}));

const InfluencePurchaseSuccessModal = ({ open, setOpen, selectedPackage, setSelectedPackage }) => {
  const classes = useStyles();
  const {
    balances: { ip: ipBalance = 0 },
  } = useContracts();

  const closeHandler = useCallback(() => {
    setSelectedPackage({});
    setOpen(false);
  }, [setOpen, setSelectedPackage]);

  return (
    <FiefDialog open={open}>
      <div className={classes.container}>
        <Typography align='center' className={classes.title}>
          Transaction Completed
        </Typography>

        <div className={classes.balanceContainer}>
          <img alt='fief' src={selectedPackage.image} className={classes.packageImage} />
          <Typography align='center' className={classes.balance}>
            <span>{formatNumber(selectedPackage.amount)} IP</span>
            <br />
            Purchased
          </Typography>

          {selectedPackage.bonus > 0 && (
            <Typography align='center' className={classes.bonus}>
              + {formatNumber(selectedPackage.bonus)} BONUS
            </Typography>
          )}
        </div>

        <div className={classes.infoContainer}>
          <div className={classes.rowContainer}>
            <Typography className={classes.infoLabel}>
              <span>New Balance</span>
            </Typography>
            <Typography className={classes.totalBalance}>
              <FiefTokenIcon token='IP' size={32} />
              {formatNumber(ipBalance)}
            </Typography>
          </div>
        </div>

        <ContainedButton fullWidth className={classes.button} onClick={closeHandler}>
          Close
        </ContainedButton>
      </div>
    </FiefDialog>
  );
};

export default memo(InfluencePurchaseSuccessModal);
