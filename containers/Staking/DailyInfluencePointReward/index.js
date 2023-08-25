import { memo } from 'react';
import { Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { INFLUENCE_POINT_ICON_PATH } from 'utils/constants/image-paths';
import { useContracts } from 'contexts/contract-context';
import { formatNumber } from 'utils/helpers/utility';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 6,
    boxShadow: '0px 12px 40px rgba(70, 74, 156, 0.15)',
    border: `1px solid #464a9c`,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: 36,
    padding: theme.spacing(3),
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  image: {
    maxWidth: 356,
    width: '100%',
    objectFit: 'container',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    gap: theme.spacing(1),
  },
  title: {
    fontSize: 32,
    fontFamily: 'pedestria-mvb',
    fontWeight: 700,
    lineHeight: 1,
    color: '#0B0B0B',
    '& span': {
      background: 'linear-gradient(110.69deg, #FCB992 -31.02%, #F97326 157.88%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textFillColor: 'transparent',
    },
  },
  divider: {
    height: 1,
    width: '100%',
    margin: theme.spacing(1, 0),
    background: 'linear-gradient(110.69deg, #FCB992 -31.02%, #F97326 157.88%)',
  },
  balanceContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    padding: theme.spacing(2),
    borderRadius: 4,
    background: 'rgba(254, 227, 212, 0.3)',
  },
  balance: {
    fontSize: 48,
    fontFamily: 'pedestria-mvb',
    fontWeight: 800,
    textTransform: 'uppercase',
    color: '#0B0B0B',
    lineHeight: 1.2,
    textShadow: '0px 1.5px 2px rgba(7, 11, 29, 0.15)',
    WebkitTextStroke: '1px #FFFFFF',
    '& span': {
      color: '#F97326',
    },
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  description: {
    fontSize: 18,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#0B0B0B',
    textShadow: '0px 12px 40px rgba(7, 11, 29, 0.16)',
    '& span': {
      color: '#F97326',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
  },
  footer: {
    fontWeight: 700,
    fontSize: 18,
    textTransform: 'uppercase',
    color: '#FFFFFF',
    textShadow: '0px 1.5px 2px rgba(7, 11, 29, 0.15)',
    background: 'linear-gradient(110.69deg, #FCB992 -31.02%, #F97326 157.88%)',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    padding: theme.spacing(2),
  },
}));

const DailyInfluencePointReward = () => {
  const classes = useStyles();
  const {
    balances: { ip: ipBalance = 0 },
    influenceStats: { estimatedPerDay = 0 },
  } = useContracts();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <img alt='influence-point' src={INFLUENCE_POINT_ICON_PATH} className={classes.image} />

        <div className={classes.infoContainer}>
          <Typography className={classes.title}>
            Daily <span>Influence Point</span> Reward
          </Typography>
          <Divider className={classes.divider} />

          <div className={classes.balanceContainer}>
            <Typography className={classes.balance}>
              {formatNumber(estimatedPerDay)} <span>Influence Points</span>
            </Typography>
            <Typography className={classes.description}>
              Account balance: <span>{formatNumber(ipBalance)} Influence points</span>
            </Typography>
          </div>
        </div>
      </div>

      <Typography align='center' className={classes.footer}>
        Influence Points are distributed daily. Your amount of Locked MABS determines your reward.
      </Typography>
    </div>
  );
};

export default memo(DailyInfluencePointReward);
