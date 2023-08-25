import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SurvivalFirstPage from './SurvivalFirstPage';
import SurvivalSecondPage from './SurvivalSecondPage';
import SurvivalThirdPage from './SurvivalThirdPage';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    scrollBehavior: 'smooth !important',
  },
}));

const SurvivalLanding = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <SurvivalFirstPage />
      <SurvivalSecondPage />
      <SurvivalThirdPage />
    </main>
  );
};

export default memo(SurvivalLanding);
