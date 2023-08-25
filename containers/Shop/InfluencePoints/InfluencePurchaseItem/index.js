import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Divider, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { useAuth } from 'contexts/auth-context';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import FiefTokenIcon from 'components/FiefTokenIcon';
import { formatNumber, isEmpty } from 'utils/helpers/utility';
import { INFLUENCE_PACKAGE_HEADER_FRAME_IMAGE_PATH } from 'utils/constants/image-paths';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    borderRadius: 6,
  },
  headerContainer: {
    width: '100%',
    background: '#797FF2',
  },
  extra: {
    fontSize: 18,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#FFFFFF',
    lineHeight: 1.2,
    padding: theme.spacing(2, 3),
    backgroundImage: `url(${INFLUENCE_PACKAGE_HEADER_FRAME_IMAGE_PATH})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    width: '100%',
    height: 58,
  },
  extraEmpty: {
    background: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: 377,
    objectFit: 'contain',
  },
  divider: {
    height: 1,
    width: '100%',
    background: 'linear-gradient(102.49deg, #797FF2 0%, #B08DF2 100%)',
  },
  balanceContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3),
    gap: 20,
    height: 112,
  },
  balance: {
    fontSize: 40,
    fontFamily: 'Inter-Bold',
    fontWeight: 800,
    textTransform: 'uppercase',
    lineHeight: '40px',
    color: '#1F182A',
    [theme.breakpoints.down('lg')]: {
      fontSize: 30,
      lineHeight: '30px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 40,
      lineHeight: '40px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 28,
      lineHeight: '28px',
    },
  },
  bonus: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    fontSize: 40,
    fontFamily: 'Inter-Bold',
    fontWeight: 800,
    textTransform: 'uppercase',
    lineHeight: '48px',
    color: '#F97326',
    '& span': {
      fontSize: 16,
      lineHeight: '16px',
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: 30,
      lineHeight: '30px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 40,
      lineHeight: '40px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 28,
      lineHeight: '28px',
    },
  },
  button: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 18,
    color: '#FFFFFF',
    background: '#0B0B0B',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    padding: theme.spacing(3),
    height: 74,
    '& span': {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      // Prevent click events from firing on text for GA
      pointerEvents: 'none',
    },
  },
}));

const InfluencePurchaseItem = ({ item, onSelect }) => {
  const classes = useStyles();
  const { isWrongWallet } = useAuth();

  return (
    <Card className={classes.root}>
      {item.bonusPercent > 0 ? (
        <div className={classes.headerContainer}>
          <Typography align='center' className={classes.extra}>
            ({item.bonusPercent * 100}% EXTRA!)
          </Typography>
        </div>
      ) : (
        <Typography align='center' className={clsx(classes.extra, classes.extraEmpty)} />
      )}

      <img alt='purchase-item' src={item.image} className={classes.image} />

      <Divider className={classes.divider} />

      <div className={classes.balanceContainer}>
        <Typography align='center' className={classes.balance}>
          {formatNumber(item.amount)}
        </Typography>

        {item.bonus > 0 && (
          <>
            <Typography align='center' className={classes.bonus}>
              +
            </Typography>
            <Typography align='center' className={classes.bonus}>
              {formatNumber(item.bonus)} <span>Bonus</span>
            </Typography>
          </>
        )}
      </div>

      <ContainedButton
        id={`buy-ip-${item.name}`}
        fullWidth
        className={classes.button}
        disabled={isEmpty(item.prices) || isWrongWallet}
        onClick={() => onSelect(item)}>
        BUY IP
        <span>
          <FiefTokenIcon token='ETH' size={24} />
          {formatNumber(item.price)} ETH
        </span>
      </ContainedButton>
    </Card>
  );
};

export default memo(InfluencePurchaseItem);
