import { memo, useCallback, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Divider, Typography, useMediaQuery } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import clsx from 'clsx';

import { useAuth } from 'contexts/auth-context';
import { useContracts } from 'contexts/contract-context';
import { useInfluencePoint } from 'contexts/influence-point-context';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import FiefTokenIcon from 'components/FiefTokenIcon';
import FiefCheckbox from 'components/UI/FiefCheckbox';
import BorderCardWrapper from 'parts/BorderCardWrapper';
import EthBalanceStatus from 'parts/EthBalanceStatus';
import ConnectWalletButton from 'parts/ConnectWalletButton';
import { formatNumber } from 'utils/helpers/utility';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    color: theme.palette.primary.main,
    fontFamily: 'pedestria-mvb',
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
  description: {
    fontSize: 18,
    fontWeight: 500,
    color: '#474D66',
  },
  purchaseCard: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    gap: theme.spacing(2),
    boxShadow: '0px 12px 40px rgba(70, 74, 156, 0.15)',
  },
  balanceContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',

    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
  },
  balanceContent: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3),

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  packageImage: {
    width: 199,
    [theme.breakpoints.down('sm')]: {
      width: 139,
    },
    [theme.breakpoints.down('xs')]: {
      width: 139,
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

    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
      lineHeight: '24px',
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
    borderRadius: 6,
    '& span': {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      // Prevent click events from firing on text for GA
      pointerEvents: 'none',
    },

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(2),
      lineHeight: '24px',
      height: theme.spacing(6.25),
    },
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
  editButton: {
    minWidth: 'unset',
    width: theme.spacing(5),
    height: theme.spacing(5),
    background: 'rgba(143, 149, 178, 0.2)',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

const AssetInfluencePurchaseModal = ({ setSelectedPackage, selectedPackage, onBack, onClose }) => {
  const classes = useStyles();
  const { active } = useWeb3React();
  const { accessToken } = useAuth();
  const {
    balances: { ip: ipBalance = 0, eth: ethBalance = 0 },
  } = useContracts();
  const { influencePoints, onPurchaseInfluencePoint } = useInfluencePoint();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'), { defaultMatches: true });
  const [editMode, setEditMode] = useState(false);

  const purchaseHandler = useCallback(async () => {
    try {
      await onPurchaseInfluencePoint(selectedPackage);
    } catch (error) {
      console.log('[Error] action rejected');
    }
  }, [onPurchaseInfluencePoint, selectedPackage]);

  const handleBack = () => {
    onBack();
  };

  const renderInfluencePurchaseCard = () => {
    return (
      <>
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
              <ContainedButton onClick={() => setEditMode(true)} className={classes.editButton}>
                <EditIcon />
              </ContainedButton>
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
      </>
    );
  };

  return (
    <>
      <div onClick={handleBack} className={classes.back}>
        <ArrowBackIcon />
        <Typography>Back to Buying an Asset</Typography>
      </div>
      <Typography variant='h6' align='center' className={clsx(classes.title)}>
        Purchase Influence Points
      </Typography>
      {isSm ? (
        renderInfluencePurchaseCard()
      ) : (
        <BorderCardWrapper rootClassName={classes.purchaseCard}>
          {renderInfluencePurchaseCard()}
        </BorderCardWrapper>
      )}
      <Typography onClick={onClose} className={classes.cancelPurchase}>
        Cancel and Close
      </Typography>
    </>
  );
};

export default memo(AssetInfluencePurchaseModal);
