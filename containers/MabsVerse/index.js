import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import FiefverseHeader from './FiefverseHeader';
import FiefverseGuide from './FiefverseGuide';
import FiefverseJourney from './FiefverseJourney';
import FiefverseFeatures from './FiefverseFeatures';
import DiscoverNewWayEarn from './DiscoverNewWayEarn';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    scrollBehavior: 'smooth !important',
  },
}));

const MabsVerse = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <FiefverseHeader />
      <FiefverseGuide />
      <FiefverseFeatures />
      <FiefverseJourney />
      <DiscoverNewWayEarn />
    </main>
  );
};

export default memo(MabsVerse);
