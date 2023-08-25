import { memo, useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';

import { useAuth } from 'contexts/auth-context';
import { useContracts } from 'contexts/contract-context';
import { useInfluencePoint } from 'contexts/influence-point-context';
import FiefDialog from 'components/FiefDialog';
import EditIcon from 'components/Icons/EditIcon';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import FiefTokenIcon from 'components/FiefTokenIcon';
import FiefCheckbox from 'components/UI/FiefCheckbox';
import BorderCardWrapper from 'parts/BorderCardWrapper';
import EthBalanceStatus from 'parts/EthBalanceStatus';
import ConnectWalletButton from 'parts/ConnectWalletButton';
import { formatNumber, isEmpty } from 'utils/helpers/utility';

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
  card: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    gap: theme.spacing(2),
  },
  balanceContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceContent: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3),
  },
  packageImage: {
    width: 199,
    [theme.breakpoints.down('sm')]: {
      width: 90,
    },
    [theme.breakpoints.down('xs')]: {
      width: 70,
    },
  },
  balance: {
    fontFamily: 'Inter',
    color: '#8F95B2',
    '& span': {
      fontSize: 24,
      fontFamily: 'Inter-Bold',
      textTransform: 'uppercase',
      background: 'linear-gradient(110.69deg, #FCB992 -31.02%, #F97326 157.88%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textFillColor: 'transparent',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
      '& span': {
        fontSize: 18,
      },
    },
  },
  packageContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    [theme.breakpoints.down('sm')]: {
      gap: 8,
    },
  },
  priceLabel: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    color: '#8F95B2',
    fontWeight: 700,
    '&:hover': {
      color: '#1F182A',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
      gap: 4,
    },
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
    background: `rgba(31, 31, 65, 0.1)`,
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
      // Prevent click events from firing on text for GA
      pointerEvents: 'none',
    },
  },
}));

const InfluencePurchaseModal = ({ setSelectedPackage, selectedPackage }) => {
  const classes = useStyles();
  const { active } = useWeb3React();
  const { accessToken } = useAuth();
  const {
    balances: { ip: ipBalance = 0, eth: ethBalance = 0 },
  } = useContracts();
  const { influencePoints, onPurchaseInfluencePoint } = useInfluencePoint();

  const [editMode, setEditMode] = useState(false);

  const purchaseHandler = useCallback(async () => {
    try {
      await onPurchaseInfluencePoint(selectedPackage);
      setSelectedPackage({});
    } catch (error) {
      console.log('[Error] action rejected');
    }
  }, [onPurchaseInfluencePoint, selectedPackage, setSelectedPackage]);

  return (
    <FiefDialog
      open={!isEmpty(selectedPackage)}
      title='Purchase Details'
      onClose={() => setSelectedPackage({})}
      titleClass={classes.title}>
      <div className={classes.container}>
        <Typography className={classes.description}>
          Please review and confirm the details below
        </Typography>

        <BorderCardWrapper rootClassName={classes.card}>
          {editMode ? (
            <div className={classes.packageContainer}>
              {influencePoints.map(ipPackage => (
                <div key={ipPackage.amount} className={classes.rowContainer}>
                  <Typography className={classes.totalBalance}>
                    {ipPackage.amount} {ipPackage.bonus > 0 && `+ ${ipPackage.bonus}`} IP
                  </Typography>
                  <Typography
                    className={classes.priceLabel}
                    onClick={() => setSelectedPackage(ipPackage)}>
                    {formatNumber(ipPackage.price)} ETH
                    <FiefCheckbox checked={ipPackage.amount === selectedPackage.amount} />
                  </Typography>
                </div>
              ))}
            </div>
          ) : (
            <div className={classes.balanceContainer}>
              <div className={classes.balanceContent}>
                <img alt='fief' src={selectedPackage.image} className={classes.packageImage} />
                <Typography className={classes.balance}>
                  <span>{formatNumber(selectedPackage.amount)} IP</span>
                  <br />
                  Influence Points
                </Typography>
              </div>
              <EditIcon onClick={() => setEditMode(true)} />
            </div>
          )}

          <div className={classes.infoContainer}>
            <div className={classes.rowContainer}>
              <Typography className={classes.infoLabel}>Current Balance</Typography>
              <Typography className={classes.infoLabel}>{formatNumber(ipBalance)}</Typography>
            </div>
            <div className={classes.rowContainer}>
              <Typography className={classes.infoLabel}>Purchase</Typography>
              <Typography className={classes.infoLabel}>
                {formatNumber(selectedPackage.amount)}
              </Typography>
            </div>
            {selectedPackage.bonus > 0 && (
              <div className={classes.rowContainer}>
                <Typography className={classes.infoLabel}>Bonus</Typography>
                <Typography className={classes.infoLabel}>
                  {formatNumber(selectedPackage.bonus)}
                </Typography>
              </div>
            )}
            <Divider className={classes.divider} />
            <div className={classes.rowContainer}>
              <Typography className={classes.infoLabel}>
                <span>New Balance</span>
              </Typography>
              <Typography className={classes.totalBalance}>
                <FiefTokenIcon token='IP' size={32} />
                {formatNumber(
                  parseFloat(ipBalance) + selectedPackage.amount + selectedPackage.bonus,
                )}
              </Typography>
            </div>
          </div>
        </BorderCardWrapper>

        {active && accessToken ? (
          <ContainedButton
            id={`buy-ip-${selectedPackage.name}`}
            fullWidth
            disabled={parseFloat(selectedPackage.price) > parseFloat(ethBalance)}
            className={classes.button}
            onClick={purchaseHandler}>
            BUY IP
            <span>
              <FiefTokenIcon token='ETH' size={24} />
              {formatNumber(selectedPackage.price)} ETH
            </span>
          </ContainedButton>
        ) : (
          <ConnectWalletButton />
        )}

        <EthBalanceStatus requiredAmount={selectedPackage.price} />
      </div>
    </FiefDialog>
  );
};

export default memo(InfluencePurchaseModal);
