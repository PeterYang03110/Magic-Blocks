import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

import { useWeb3React } from '@web3-react/core';
import { useAuth } from 'contexts/auth-context';
import { useContracts } from 'contexts/contract-context';
import FiefTokenIcon from 'components/FiefTokenIcon';
import ErrorAlertIcon from 'components/Icons/ErrorAlertIcon';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import { formatNumber } from 'utils/helpers/utility';
import LINKS from 'utils/constants/links';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    padding: theme.spacing(1, 2),
    borderRadius: 6,
    background: '#F9FAFC',
  },
  errorRoot: {
    border: `1px solid #FF3D71`,
  },
  disabled: {
    opacity: 0.4,
  },
  rowContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: '#474D66',
    '& span': {
      color: '#1F182A',
    },

    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
      lineHeight: '24px'
    },
  },
  errorLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: '#FF3D71',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  needMore: {
    color: '#4D6EFF',
    textDecoration: 'underline',
  },
  buyButton: {
    fontSize: 18,
    color: '#FFFFFF',
    background: '#0B0B0B',
    padding: theme.spacing(1, 3),
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },
}));

const EthBalanceStatus = ({ requiredAmount = 0 }) => {
  const classes = useStyles();
  const { active } = useWeb3React();
  const { accessToken } = useAuth();
  const {
    balances: { eth: ethBalance = 0 },
  } = useContracts();

  const isRequired = parseFloat(requiredAmount) > parseFloat(ethBalance);

  if (!active || !accessToken) {
    return (
      <div className={clsx(classes.root, classes.disabled)}>
        <div className={classes.rowContainer}>
          <Typography className={classes.infoLabel}>Your ETH balance</Typography>
          <Typography className={classes.infoLabel}>
            <FiefTokenIcon token='ETH' size={24} />-
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={clsx(classes.root, { [classes.errorRoot]: isRequired })}>
        <div className={classes.rowContainer}>
          <Typography className={classes.infoLabel}>Your ETH balance</Typography>
          <Typography className={classes.infoLabel}>
            <FiefTokenIcon token='ETH' size={24} />
            {formatNumber(ethBalance, 3)} ETH
          </Typography>
        </div>
        {isRequired && (
          <Typography className={classes.errorLabel}>
            <ErrorAlertIcon /> Insufficient Funds
          </Typography>
        )}
      </div>

      {isRequired && (
        <div className={classes.buttonContainer}>
          <Typography className={classes.needMore}>Need more ETH?</Typography>
          <ContainedButton
            href={LINKS.BUY_ETH.HREF}
            target='_blank'
            className={classes.buyButton}
            startIcon={<FiefTokenIcon token='ETH' size={24} />}>
            BUY ETH
          </ContainedButton>
        </div>
      )}
    </>
  );
};

export default memo(EthBalanceStatus);
