import { memo, useMemo, useState } from 'react';
import { Typography, Grid, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';

import { useContracts } from 'contexts/contract-context';
import { useStaking } from 'contexts/staking-context';
import { formatDate } from 'utils/helpers/utility';
import QuestionIcon from 'components/Icons/QuestionIcon';
import SFiefInfoModal from 'parts/SFiefInfoModal';
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
    height: '100%',
    backgroundImage: `url(${STAKING_BACKGROUND_IMAGE_PATH})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    backdropFilter: 'blur(141.5px)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 32,
    fontFamily: 'pedestria-mvb',
    color: '#1F182A',
    '& span': {
      color: '#797FF2',
    },
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(31, 31, 65, 0.1)',
  },
  fiefBalance: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
    fontSize: 48,
    fontWeight: 600,
    color: '#1F182A',
    lineHeight: 1,
    minHeight: 108,
    '& span': {
      fontFamily: 'pedestria-mvb',
    },
  },
  balanceContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#EDEFF5',
    border: '1px solid #EDEFF5',
    borderRadius: 4,
    padding: theme.spacing(1),
  },
  balanceDivider: {
    width: 1,
    height: 64,
    margin: theme.spacing(0, 1),
    backgroundColor: 'rgba(31, 31, 65, 0.1)',
  },
  balance: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    color: '#474D66',
    '& span': {
      fontSize: 28,
      fontWeight: 600,
      color: '#797FF2',
    },
  },
  disabledText: {
    opacity: 0.4,
  },
}));

const WalletSFiefBalance = () => {
  const classes = useStyles();
  const { account } = useWeb3React();
  const {
    balances: { sFief = 0 },
  } = useContracts();
  const { totalSupply = 0, unlockTime } = useStaking();

  const [openModal, setOpenModal] = useState(false);

  const fiefPercent = useMemo(
    () => (totalSupply && sFief ? (sFief * 1000) / (totalSupply * 10) : 0),
    [sFief, totalSupply],
  );

  return (
    <BorderCardWrapper className={classes.card} rootClassName={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <div className={classes.header}>
            <Typography className={classes.title}>
              Wallet <span>s</span>MABS Balance
            </Typography>
            <QuestionIcon onClick={() => setOpenModal(true)} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            className={clsx(classes.fiefBalance, { [classes.disabledText]: !account })}
            align='center'>
            {!parseFloat(sFief) ? '-' : formatNumber(sFief)} <span>sMABS</span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.balanceContainer}>
            <Typography className={classes.balance} align='center'>
              <span>{fiefPercent ? formatNumber(fiefPercent) : '-'}</span>% of Total sMABS
            </Typography>
            <Divider orientation='vertical' className={classes.balanceDivider} />
            <Typography className={classes.balance} align='center'>
              <span>{unlockTime ? formatDate(unlockTime) : '-'}</span>
              Next Unlock Date
            </Typography>
          </div>
        </Grid>
      </Grid>
      {openModal && <SFiefInfoModal open={openModal} setOpen={setOpenModal} />}
    </BorderCardWrapper>
  );
};

export default memo(WalletSFiefBalance);
