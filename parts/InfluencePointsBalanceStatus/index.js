import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

import { useWeb3React } from '@web3-react/core';
import { useAuth } from 'contexts/auth-context';
import { useContracts } from 'contexts/contract-context';
import FiefTokenIcon from 'components/FiefTokenIcon';
import ErrorAlertIcon from 'components/Icons/ErrorAlertIcon';
import { formatNumber } from 'utils/helpers/utility';
import ContainedButton from 'components/UI/Buttons/ContainedButton';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    padding: theme.spacing(1, 2),
    borderRadius: 6,
    background: '#F9FAFC',
  },
  errorContainer: {
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
    textTransform: 'none',
    gap: 8,
    color: '#474D66',
    '& span': {
      color: '#1F182A',
    },

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(1.75),
      lineHeight: '24px',
    },
  },
  errorLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: '#FF3D71',
    textTransform: 'none',

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(1.75),
      lineHeight: '24px',
    },
  },
  getIPButton: {
    background: 'linear-gradient(110.69deg, #FCB992 -31.02%, #F97326 157.88%)',
    height: theme.spacing(7),
    borderRadius: theme.spacing(0.75),
    color: 'white',
    textTransform: 'uppercase',
    fontSize: theme.spacing(2.5),
    fontWeight: 700,

    [theme.breakpoints.down('md')]: {
      fontSize: theme.spacing(2),
      lineHeight: '26px',
      padding: theme.spacing(1.5, 3),
      height: 'unset',
    },

    '& span': {
      // Prevent click events from firing on text for GA
      pointerEvents: 'none',
    },
  },
  note: {
    color: '#8F95B2',
    fontSize: theme.spacing(1.75),
    lineHeight: '24px',
    fontWeight: 400,
    marginTop: theme.spacing(1.5),
    textTransform: 'none',
  },
}));

const InfluencePointsBalanceStatus = ({
  note,
  showOnlyBalance,
  requiredAmount = 0,
  onGetInfluencePoints,
}) => {
  const classes = useStyles();
  const { active } = useWeb3React();
  const { accessToken } = useAuth();
  const {
    balances: { ip: ipBalance = 0 },
  } = useContracts();

  const isRequired = parseFloat(requiredAmount) > parseFloat(ipBalance);

  if (!active || !accessToken) {
    return (
      <div className={clsx(classes.container, classes.disabled)}>
        <div className={classes.rowContainer}>
          <Typography className={classes.infoLabel}>Your Influence Points balance</Typography>
          <Typography className={classes.infoLabel}>
            <FiefTokenIcon token='IP' size={24} />-
          </Typography>
        </div>
      </div>
    );
  }

  if (showOnlyBalance) {
    return (
      <div className={clsx(classes.container)}>
        <div className={classes.rowContainer}>
          <Typography className={classes.infoLabel}>Your Influence Points Balance</Typography>
          <Typography className={classes.infoLabel}>
            <FiefTokenIcon token='IP' size={24} />
            {formatNumber(ipBalance, 3)}
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <div>
        <div className={clsx(classes.container, { [classes.errorContainer]: isRequired })}>
          <div className={classes.rowContainer}>
            <Typography className={classes.infoLabel}>Your Influence Points Balance</Typography>
            <Typography className={classes.infoLabel}>
              <FiefTokenIcon token='IP' size={24} />
              {formatNumber(ipBalance, 3)}
            </Typography>
          </div>
          {isRequired && (
            <div className={classes.rowContainer}>
              <Typography className={classes.infoLabel}>You Need</Typography>
              <Typography className={classes.infoLabel}>
                <FiefTokenIcon token='IP' size={24} />
                {formatNumber(parseFloat(requiredAmount) - parseFloat(ipBalance), 3)}
              </Typography>
            </div>
          )}
          {isRequired && (
            <Typography className={classes.errorLabel}>
              <ErrorAlertIcon /> Insufficient Funds
            </Typography>
          )}
        </div>
        {note && <Typography className={classes.note}>{note}</Typography>}
      </div>
      <ContainedButton
        id='buy-ip-button'
        fullWidth
        className={classes.getIPButton}
        onClick={onGetInfluencePoints}>
        {isRequired
          ? `Buy ${formatNumber(
              parseFloat(requiredAmount) - parseFloat(ipBalance),
            )} Influence Points`
          : 'Get Influence points!'}
      </ContainedButton>
    </div>
  );
};

export default memo(InfluencePointsBalanceStatus);
