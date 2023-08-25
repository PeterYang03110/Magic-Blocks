import { memo, useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';

import { useAuth } from 'contexts/auth-context';
import { useAvatar } from 'contexts/avatar-context';
import { useContracts } from 'contexts/contract-context';
import FiefDialog from 'components/FiefDialog';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import FiefTokenIcon from 'components/FiefTokenIcon';
import BorderCardWrapper from 'parts/BorderCardWrapper';
import EthBalanceStatus from 'parts/EthBalanceStatus';
import ConnectWalletButton from 'parts/ConnectWalletButton';
import { formatNumber } from 'utils/helpers/utility';
import { FANTASY_AVATAR_ICON_PATH } from 'utils/constants/image-paths';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
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
    alignItems: 'center',
    gap: theme.spacing(3),
  },
  packageImage: {
    width: 199,
    background: '#EDEFF5',
    borderRadius: 4,
    [theme.breakpoints.down('sm')]: {
      width: 90,
    },
  },
  balance: {
    fontSize: 14,
    fontFamily: 'Inter',
    color: '#8F95B2',
    '& span': {
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      textTransform: 'uppercase',
      color: '#1F182A',
    },
  },
  available: {
    fontSize: 12,
    color: '#00997A',
    textShadow: '0px 1.5px 2px rgba(7, 11, 29, 0.15)',
    background: '#CCFCE3',
    borderRadius: 4,
    padding: `4px 6px`,
    width: 'fit-content',
  },
  control: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    width: '100%',
    marginTop: 16,
  },
  controlLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1F182A',
  },
  controlButton: {
    fontWeight: 'bold',
    borderRadius: 4,
    fontSize: 20,
    height: 24,
    width: 24,
    minWidth: 'unset',
    padding: 8,
    '&:hover': {
      color: '#FFFFFF',
      background: '#f97326',
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
  rowContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  colContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  infoLabel: {
    color: '#1F182A',
  },
  totalBalance: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    color: '#1F182A',
    textShadow: '0px 1.5px 2px rgba(7, 11, 29, 0.15)',
  },
  alert: {
    fontSize: 14,
    color: '#797FF2',
  },
  button: {
    fontSize: 18,
    color: '#FFFFFF',
    background: '#0B0B0B',
    textTransform: 'uppercase',
  },
}));

const MAX_BUY_LIMIT = 20;

const AvatarPurchaseModal = ({ open, setOpen }) => {
  const classes = useStyles();
  const { active } = useWeb3React();
  const { accessToken } = useAuth();
  const {
    balances: { eth: ethBalance = 0 },
  } = useContracts();
  const { avatar, onPurchaseAvatar } = useAvatar();

  const [count, setCount] = useState(1);

  const purchaseHandler = useCallback(async () => {
    await onPurchaseAvatar(count);
    setOpen(false);
  }, [onPurchaseAvatar, count, setOpen]);

  const countHandler = useCallback(
    value => () => {
      if (value > 0 && value <= MAX_BUY_LIMIT) {
        setCount(value);
      }
    },
    [setCount],
  );

  const totalPrice = (avatar?.price || 0) * count;

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
          <div className={classes.balanceContainer}>
            <img alt='fief' src={FANTASY_AVATAR_ICON_PATH} className={classes.packageImage} />

            <div className={classes.colContainer}>
              <Typography className={classes.balance}>
                High Fantasy
                <br />
                <span>Avatars</span>
              </Typography>
              <Typography className={classes.available}>Available</Typography>

              <div className={classes.control}>
                <ContainedButton
                  disabled={count === 1}
                  className={classes.controlButton}
                  onClick={countHandler(count - 1)}>
                  -
                </ContainedButton>
                <Typography className={classes.controlLabel} color='secondary'>
                  {count}
                </Typography>
                <ContainedButton
                  disabled={count === MAX_BUY_LIMIT}
                  className={classes.controlButton}
                  onClick={countHandler(count + 1)}>
                  +
                </ContainedButton>
              </div>
            </div>
          </div>

          <div className={classes.infoContainer}>
            <div className={classes.rowContainer}>
              <Typography className={classes.infoLabel}>Total</Typography>
              <Typography className={classes.totalBalance}>
                <FiefTokenIcon token='ETH' size={24} />
                <span>{formatNumber(totalPrice)} ETH</span>
              </Typography>
            </div>
          </div>

          <Typography align='center' className={classes.alert}>
            Please note: You can only purchase twenty ({MAX_BUY_LIMIT}) avatars at a time.
          </Typography>
        </BorderCardWrapper>

        {active && accessToken ? (
          <ContainedButton
            fullWidth
            className={classes.button}
            disabled={parseFloat(totalPrice) > parseFloat(ethBalance)}
            onClick={purchaseHandler}>
            Buy Now
          </ContainedButton>
        ) : (
          <ConnectWalletButton />
        )}

        <EthBalanceStatus requiredAmount={totalPrice} />
      </div>
    </FiefDialog>
  );
};

export default memo(AvatarPurchaseModal);
