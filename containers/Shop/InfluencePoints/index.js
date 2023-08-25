import { memo, useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import { useInfluencePoint } from 'contexts/influence-point-context';
import InfluencePurchaseItem from './InfluencePurchaseItem';
import InfluencePurchaseModal from './InfluencePurchaseModal';
import { isEmpty } from 'utils/helpers/utility';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: 1800,
    padding: theme.spacing(10, 0),
  },
  title: {
    fontSize: 64,
    fontFamily: 'pedestria-mvb',
    fontWeight: 700,
    lineHeight: '56px',
    textTransform: 'uppercase',
    color: '#FFFFFF',
    lineHeight: 1.2,
    textShadow: '0px 2.5px 2px rgba(7, 11, 29, 0.3)',
    marginBottom: theme.spacing(6),
    '& span': {
      color: '#1F182A',
    },
  },
}));

const InfluencePoints = () => {
  const classes = useStyles();

  const { influencePoints } = useInfluencePoint();
  const [selectedPackage, setSelectedPackage] = useState({});

  const selectHandler = useCallback(
    item => {
      setSelectedPackage(item);
    },
    [setSelectedPackage],
  );

  return (
    <div className={classes.root}>
      <Typography variant='h3' align='center' className={classes.title}>
        Purchase Influence <span>Points</span>
      </Typography>

      <Grid container spacing={3}>
        {influencePoints.map(item => (
          <Grid item key={item.amount} xs={12} sm={6} md={6} lg={3}>
            <InfluencePurchaseItem item={item} onSelect={selectHandler} />
          </Grid>
        ))}
      </Grid>

      {!isEmpty(selectedPackage) && (
        <InfluencePurchaseModal
          setSelectedPackage={setSelectedPackage}
          selectedPackage={selectedPackage}
        />
      )}
    </div>
  );
};

export default memo(InfluencePoints);
