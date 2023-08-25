import { memo, useState } from 'react';
import { Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TableCell, TableRow } from '@material-ui/core';

import { useStaking } from 'contexts/staking-context';
import TableContainer from 'parts/Table/TableContainer';
import TablePagination from 'parts/Table/TablePagination';
import { formatDate, formatNumber } from 'utils/helpers/utility';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 6,
    gap: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: 700,
    fontFamily: 'pedestria-mvb',
    lineHeight: '56px',
    color: '#1F182A',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(4),
    padding: theme.spacing(3, 2),
    boxShadow: '0px 12px 40px rgba(70, 74, 156, 0.15)',
  },
  label: {
    fontWeight: 500,
    color: '#1F182A',
    borderColor: '#eff1f7',
    borderWidth: 1,
    '& span': {
      fontWeight: 700,
      color: '#8F95B2',
    },
  },
}));

const columns = [
  { id: 'weekStart', label: 'Reward Distribution Date', width: '50%', align: 'left' },
  { id: 'fiefReward', label: 'MABS reward', width: '50%', align: 'left' },
];
const ROWS_PER_PAGE = 7;

const RewardsDistributionTable = () => {
  const classes = useStyles();
  const {
    stakingInfo: { weeklyDistribution = [] },
  } = useStaking();

  const [page, setPage] = useState(0);

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Weekly Staking Rewards</Typography>

      <Card className={classes.card}>
        <TableContainer columns={columns}>
          {weeklyDistribution
            .sort((a, b) => b.epoch - a.epoch)
            .slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE)
            .map((reward, index) => {
              const rewardDate = formatDate(new Date(reward.epoch * 1000), 'EEE, dd MMM yyyy');

              return (
                <TableRow key={index}>
                  <TableCell>
                    <Typography className={classes.label}>{rewardDate}</Typography>
                  </TableCell>

                  <TableCell>
                    {reward.epoch === weeklyDistribution[0].epoch ?
                      <Typography className={classes.label}>
                        In Progress
                      </Typography>
                      : <Typography className={classes.label}>
                        {formatNumber(reward.weeklyAmount)} <span>MABS</span>
                      </Typography>
                    }
                  </TableCell>
                </TableRow>
              );
            })}
        </TableContainer>
        <TablePagination
          page={page}
          setPage={setPage}
          total={weeklyDistribution.length}
          rowsPerPage={ROWS_PER_PAGE}
        />
      </Card>
    </div>
  );
};

export default memo(RewardsDistributionTable);
