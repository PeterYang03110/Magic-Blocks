import { memo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Typography } from '@material-ui/core';
import clsx from 'clsx';

import LINKS from 'utils/constants/links';
import GradientButton from 'components/UI/Buttons/GradientButton';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(3),
    background: '#1F182A',
    boxShadow: '0px 12px 40px rgba(70, 74, 156, 0.15)',
    borderRadius: 6,
  },
  extended: {
    // position: 'absolute',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    fontSize: 18,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
  content: {
    margin: 0,
    listStyleType: 'decimal',
    paddingLeft: 20,
    '& li': {
      fontSize: 14,
      color: '#FFFFFF',
      marginBottom: theme.spacing(3),
    },
    '& a': {
      color: '#FFFFFF',
      textDecoration: 'unset',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
}));

const StakeHelper = () => {
  const classes = useStyles();
  const [showMore, setShowMore] = useState(true);

  const showHandler = () => {
    setShowMore(prev => !prev);
  };

  return (
    <main className={classes.root}>
      <div className={clsx(classes.container, { [classes.extended]: showMore })}>
        <Typography className={classes.title} onClick={showHandler}>
          How to Stake and Earn
        </Typography>

        <Divider className={classes.divider} />

        <ul className={classes.content} role='list'>
          <li>
            Acquire MABS by{' '}
            <a href={LINKS.BUY_FIEF_UNISWAP.HREF} rel='noreferrer' target='_blank'>
              purchasing on Uniswap V3.
            </a>
          </li>
          <li>
            Choose the amount of MABS you want to stake and your desired duration. The longer you
            stake (2 year max), the more MABS you get.
          </li>
          {showMore && (
            <>
              <li>
                By holding sMABS, you earn weekly MABS distributions and will soon be able to vote
                on the distribution of dapp fees across Loot Farms. Your percentage of the total
                sMABS supply determines your share of the MABS distributions and voting power.
              </li>
              <li>
                Your sMABS balance decays linearly over time as you approach your stake unlock date
                - to acquire more sMABS, simply stake more MABS.
              </li>
              <li>A 0.5% fee is applied to all MABS reward claims.</li>
              <li>
                By locking your MABS in the staking app, you also earn a daily reward of Influence
                Points (IP) that can be used in the Magic Blocks Shop and across the broader platform. Each
                locked MABS generates 0.03 IP daily with distribution at around 02:30. This value is
                subject to change.
              </li>
            </>
          )}
        </ul>

        {false && (
          <GradientButton fullWidth onClick={showHandler}>
            {!showMore ? 'Show More' : 'Show Less'}
          </GradientButton>
        )}
      </div>
    </main>
  );
};

export default memo(StakeHelper);
