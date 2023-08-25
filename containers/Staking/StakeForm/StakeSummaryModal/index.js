import { memo, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Typography } from '@material-ui/core';

import FiefDialog from 'components/FiefDialog';
import { getWeekDiff } from 'utils/helpers/date';
import BorderCardWrapper from 'parts/BorderCardWrapper';
import { FIEF_GROUP_ICON_PATH } from 'utils/constants/image-paths';
import EditIcon from 'components/Icons/EditIcon';
import { formatNumber } from 'utils/helpers/utility';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  description: {
    fontSize: 18,
    fontWeight: 500,
    color: '#474D66',
    '& span': {
      color: '#8F95B2',
    },
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    gap: theme.spacing(2),
  },
  period: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#1F182A',
    '& span': {
      fontSize: 32,
      fontFamily: 'pedestria-mvb',
      fontWeight: 700,
    },
  },
  divider: {
    height: 1,
    width: '100%',
    background: `linear-gradient(130.42deg, #797FF2 0%, #69F2FF 50%, #FF7DFD 100%)`,
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
  fiefIcon: {
    width: 169,
    [theme.breakpoints.down('sm')]: {
      width: 90,
    },
  },
  balance: {
    color: '#8F95B2',
    '& span': {
      color: '#1F182A',
      fontSize: 32,
      fontFamily: 'pedestria-mvb',
      fontWeight: 700,
    },
  },
  subDescription: {
    fontSize: 16,
    fontWeight: 500,
    color: '#474D66',
  },
  alert: {
    fontWeight: 500,
    color: '#797FF2',
    borderRadius: 6,
    padding: theme.spacing(1),
    border: `1px solid #797FF2`,
    background: '#F0F1FE',
    width: '100%',
  },
}));

const TYPES = {
  CREATE: {
    title: 'Confirm Stake',
    confirmLabel: 'Stake MABS',
  },
  AMOUNT: {
    title: 'Increase Stake Amount',
    confirmLabel: 'Increase Stake Amount',
  },
  TIME: {
    title: 'Increase Stake Period',
    confirmLabel: 'Increase Stake Period',
  },
};

const StakeSummaryModal = ({
  open,
  setOpen,
  type = 'CREATE',
  balance,
  oldDate,
  date,
  onConfirm,
}) => {
  const classes = useStyles();

  const displayOldLockTime = useMemo(() => {
    const startDate = oldDate ? new Date(oldDate) : new Date();
    const lockingWeeks = getWeekDiff(startDate, date);

    if (lockingWeeks < 52) {
      return `${lockingWeeks} week${lockingWeeks > 1 ? 's' : ''}`;
    } else {
      const years = Number((+date - +startDate) / 365 / 1000 / 3600 / 24).toFixed(0);
      return `${years} ${years === '1' ? 'year' : 'years'}`;
    }
  }, [date, oldDate]);

  const displayLockTime = useMemo(() => {
    const lockingWeeks = getWeekDiff(new Date(), date);

    if (lockingWeeks < 52) {
      return `${lockingWeeks} week${lockingWeeks > 1 ? 's' : ''}`;
    } else {
      const years = Number((+date - +new Date()) / 365 / 1000 / 3600 / 24).toFixed(0);
      return `${years} ${years === '1' ? 'year' : 'years'}`;
    }
  }, [date]);

  const contentRender = useMemo(() => {
    switch (type) {
      case 'CREATE':
        return (
          <>
            <div className={classes.balanceContainer}>
              <div className={classes.balanceContent}>
                <img alt='fief' src={FIEF_GROUP_ICON_PATH} className={classes.fiefIcon} />
                <Typography className={classes.balance}>
                  <span>{formatNumber(balance)} MABS</span>
                  <br />
                  Stake
                </Typography>
              </div>
              <EditIcon onClick={() => setOpen(false)} />
            </div>

            <Divider className={classes.divider} />

            <Typography align='center' className={classes.period}>
              Period to stake
              <span>{displayLockTime}</span>
            </Typography>
          </>
        );
      case 'AMOUNT':
        return (
          <div className={classes.balanceContainer}>
            <div className={classes.balanceContent}>
              <img alt='fief' src={FIEF_GROUP_ICON_PATH} className={classes.fiefIcon} />
              <Typography className={classes.balance}>
                <span>{formatNumber(balance)} MABS</span>
                <br />
                Stake
              </Typography>
            </div>
            <EditIcon onClick={() => setOpen(false)} />
          </div>
        );
      case 'TIME':
        return (
          <>
            <Typography align='center' className={classes.period}>
              Period to stake
              <span>{displayLockTime}</span>
            </Typography>

            <Divider className={classes.divider} />

            <Typography className={classes.subDescription}>
              Your staking period time will reset and start from 0 if you choose to increase the
              period.
            </Typography>
          </>
        );
      default:
        return null;
    }
  }, [type, balance, displayLockTime, classes, setOpen]);

  return (
    <FiefDialog
      open={open}
      title={TYPES[type].title}
      onClose={() => setOpen(false)}
      confirmLabel={TYPES[type].confirmLabel}
      onConfirm={onConfirm}>
      <div className={classes.container}>
        <Typography className={classes.description}>
          Please review and confirm the details below
        </Typography>

        {type === 'TIME' && (
          <Typography className={classes.description}>
            <span>You have chosen to increase your staking time from {displayOldLockTime}</span>
          </Typography>
        )}

        <BorderCardWrapper rootClassName={classes.card}>{contentRender}</BorderCardWrapper>

        {type === 'TIME' && (
          <Typography align='center' className={classes.alert}>
            Note: You can’t decrease your stake period.
          </Typography>
        )}
      </div>
    </FiefDialog>
  );
};

export default memo(StakeSummaryModal);
