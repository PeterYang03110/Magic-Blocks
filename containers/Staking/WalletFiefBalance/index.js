import { memo } from 'react';
import { Typography, Grid, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';

import GradientButton from 'components/UI/Buttons/GradientButton';
import LINKS from 'utils/constants/links';
import { FIEF_COIN_ICON_PATH } from 'utils/constants/image-paths';
import { useContracts } from 'contexts/contract-context';
import { useStaking } from 'contexts/staking-context';
import { usePrices } from 'contexts/price-context';
import BorderCardWrapper from 'parts/BorderCardWrapper';
import { STAKING_BACKGROUND_IMAGE_PATH } from 'utils/constants/image-paths';
import { formatNumber } from 'utils/helpers/utility';

const useStyles = makeStyles(theme => ({
  card: {
    boxShadow: '0px 12px 40px rgba(70, 74, 156, 0.15)',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    backgroundImage: `url(${STAKING_BACKGROUND_IMAGE_PATH})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    backdropFilter: 'blur(141.5px)',
  },
  title: {
    fontSize: 32,
    fontFamily: 'pedestria-mvb',
    color: '#1F182A',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(31, 31, 65, 0.1)',
  },
  fiefBalance: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#474D66',
  },
  fiefUSDBalance: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'linear-gradient(102.49deg, #797FF2 0%, #B08DF2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(8),
  },
  needFief: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    color: '#4D6EFF',
    fontWeight: 600,
    textDecoration: 'underline',
  },
  disabledText: {
    opacity: 0.4,
  },
}));

const WalletFiefBalance = () => {
  const classes = useStyles();
  const { account } = useWeb3React();
  const {
    balances: { fief = 0 },
  } = useContracts();
  const { prices: { fief: fiefPrice = 0 } = {} } = usePrices();
  const { lockedAmount } = useStaking();

  return (
    <BorderCardWrapper className={classes.card} rootClassName={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography className={classes.title}>Wallet MABS Balance</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12}>
          <Typography className={clsx(classes.fiefBalance, { [classes.disabledText]: !account })}>
            Available MABS <span>{formatNumber(fief)}</span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={clsx(classes.fiefBalance, { [classes.disabledText]: !account })}>
            Locked MABS
            <span>{!parseFloat(lockedAmount) ? '-' : formatNumber(lockedAmount)}</span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            className={clsx(classes.fiefUSDBalance, { [classes.disabledText]: !account })}>
            Total MABS Value{' '}
            <span>${formatNumber((parseFloat(fief) + parseFloat(lockedAmount)) * fiefPrice)}</span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.buttonContainer}>
            <Typography className={classes.needFief}>
              <img alt='token-icon' src={FIEF_COIN_ICON_PATH} width={42} />
              Need MBOX?
            </Typography>
            <GradientButton href={LINKS.BUY_FIEF_UNISWAP.HREF} target='_blank'>
              BUY HERE
            </GradientButton>
          </div>
        </Grid>
      </Grid>
    </BorderCardWrapper>
  );
};

export default memo(WalletFiefBalance);
