import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Grid, Typography } from '@material-ui/core';

import { useStaking } from 'contexts/staking-context';
import FiefLoading from 'components/FiefLoading';
import TotalFiefStaked from './TotalFiefStaked';
import TotalValueStaked from './TotalValueStaked';
import EstimatedAPR from './EstimatedAPR';
import WalletFiefBalance from './WalletFiefBalance';
import StakeHelper from './StakeHelper';
import StakeForm from './StakeForm';
import WalletSFiefBalance from './WalletSFiefBalance';
import AccruedRewards from './AccruedRewards';
import WithdrawForm from './WithdrawForm';
import DailyInfluencePointReward from './DailyInfluencePointReward';
import RewardsDistributionTable from './RewardsDistributionTable';
import { STAKING_BACKGROUND_IMAGE_PATH } from 'utils/constants/image-paths';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(5),
    width: '100%',
    backgroundImage: `url(${STAKING_BACKGROUND_IMAGE_PATH})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    backdropFilter: 'blur(141.5px)',
    padding: theme.spacing(13, 0),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: theme.custom.layout.maxDeskWidth,
    padding: theme.spacing(0, 3),
  },
  title: {
    fontSize: 48,
    fontFamily: 'pedestria-mvb,sans-serif',
    lineHeight: 1,
  },
  description: {
    fontWeight: 500,
    color: '#474D66',
    maxWidth: 620,
  },
  stakeContainer: {
    position: 'relative',
  },
  divider: {
    height: 1,
    width: '100%',
    margin: theme.spacing(1, 0),
    background: `linear-gradient(308.42deg, #797FF2 0%, #69F2FF 50%, #FF7DFD 100%)`,
  },
}));

const Staking = () => {
  const classes = useStyles();
  const { loading } = useStaking();

  return (
    <main className={classes.root}>
      {loading && <FiefLoading />}

      <div className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography variant='h3' className={classes.title} color='textSecondary'>
              Stake MABS
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.description} color='textSecondary'>
              Lock your tokens to earn weekly MABS rewards and daily Influence Point distributions
              to fuel your platform experience.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <TotalFiefStaked />
          </Grid>
          <Grid item xs={12} md={4}>
            <TotalValueStaked />
          </Grid>
          <Grid item xs={12} md={4}>
            <EstimatedAPR />
          </Grid>
        </Grid>
      </div>

      <Divider className={classes.divider} />

      <div className={classes.container}>
        <Grid container spacing={5} className={classes.stakeContainer}>
          <Grid item xs={12} md={4}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <WalletFiefBalance />
              </Grid>
              <Grid item xs={12}>
                <StakeHelper />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <StakeForm />
          </Grid>

          <Grid item xs={12} md={4}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <WalletSFiefBalance />
              </Grid>
              <Grid item xs={12}>
                <WithdrawForm />
              </Grid>
              <Grid item xs={12}>
                <AccruedRewards />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>

      <div className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <DailyInfluencePointReward />
          </Grid>
          <Grid item xs={12}>
            <RewardsDistributionTable />
          </Grid>
        </Grid>
      </div>
    </main>
  );
};

export default memo(Staking);
