import { memo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { use100vh } from 'react-div-100vh';
import clsx from 'clsx';

import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import {
  FIEFVERSE_SURVIVAL_LOGO,
  FIEFVERSE_SURVIVAL_AVATARS,
  FIEFVERSE_GEAR_AVATAR_PATH,
  METAMASK_IMAGE_PATH,
  FIEFVERSE_SURVIVAL_LOGO_BLACK,
} from 'utils/constants/image-paths';
import StepCard from './StepCard';
import WalletIconSecondary from 'components/Icons/WalletIconSecondary';
import ProfileNoBorderIcon from 'components/Icons/ProfileNoBorderIcon';
import SmileIcon from 'components/Icons/SmileIcon';
import DownloadIconSecondary from 'components/Icons/DownloadIconSecondary';
import RightArrowIcon from 'components/Icons/RightArrowIcon';
import LeftLongerArrowIcon from 'components/Icons/LeftLongerArrowIcon';

const useStyles = makeStyles(theme => ({
  root: ({ deviceHeight }) => ({
    alignItems: 'center',
    background: theme.custom.palette.black30,
    display: 'flex',
    flexDirection: 'column',
    minHeight: `calc(${deviceHeight} - ${theme.custom.layout.topAppBarHeight}px)`,
    scrollBehavior: 'smooth !important',
  }),
  container: {
    alignItems: 'center',
    borderRadius: 6,
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
    margin: '40px 0',
    padding: 24,
    maxWidth: 1280,
    width: '100%',
  },
  logo: {
    height: '100%',
    width: 300,
    marginBottom: 8,
  },
  title: {
    textAlign: 'center',
    color: theme.custom.palette.whitePurple,
    fontFamily: 'pedestria-mvb',
    fontSize: 24,
    marginBottom: 32,

    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
  },
  subtitle: {
    fontFamily: 'pedestria-mvb',
    fontSize: 40,
    marginBottom: 16,
    background: 'linear-gradient(97.82deg, #97F6FF -148.83%, #8085EE 100.25%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',

    [theme.breakpoints.down('sm')]: {
      fontSize: 32,
    },
  },
  stepDisplayContainer: {
    background: theme.custom.palette.black30,
    borderRadius: 6,
    columnGap: 16,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    marginBottom: 32,
    padding: 16,
    textAlign: 'center',
    width: '100%',

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr 1fr',
      rowGap: 16,
      marginBottom: 40,
    },
  },
  cardIcon: {
    width: 20,
    height: 20,
  },
  footerContainer: {
    display: 'flex',
  },
  divider: {
    width: 1,
    background: theme.custom.palette.whitePurple,
    margin: '0 22px',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  linkButton: {
    color: theme.custom.palette.blueLink,
    fontSize: 16,
    margin: '0 10px',
    WebkitUserSelect: 'none',
    MsUserSelect: 'none',
    userSelect: 'none',
  },
  linkDisabled: {
    color: theme.custom.palette.whitePurple,
  },
  arrowIcon: {
    width: 20,
    height: 13,
  },
}));

const SurvivalDownload = () => {
  const deviceHeight = use100vh();
  const classes = useStyles({
    deviceHeight: deviceHeight ? `${deviceHeight > 1080 ? 1080 : deviceHeight}px` : '100vh',
  });
  const [step, setStep] = useState(1);

  const getStep = () => {
    switch (step) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      case 4:
        return <StepFour />;
    }
  };

  const backHandler = () => {
    setStep(currStep => currStep - 1);
  };

  const nextHandler = () => {
    setStep(currStep => currStep + 1);
  };

  const handleCardClick = step => {
    setStep(step);
  };

  return (
    <main className={classes.root}>
      <div className={classes.container}>
        <img src={FIEFVERSE_SURVIVAL_LOGO_BLACK} className={classes.logo} />
        <Typography className={classes.title}>
          An open-world RPG full of limitless possibilities
        </Typography>
        <Typography className={classes.subtitle}>Get Started</Typography>
        <div className={classes.stepDisplayContainer}>
          <StepCard
            onClick={() => handleCardClick(1)}
            text='1. Have a Wallet Address'
            selected={step === 1}
            iconUrl={METAMASK_IMAGE_PATH}>
            <WalletIconSecondary
              className={classes.cardIcon}
              color={step === 1 ? '#fff' : '#EDEFF5'}
            />
          </StepCard>
          <StepCard
            onClick={() => handleCardClick(2)}
            text='2. Create an account'
            selected={step === 2}
            iconUrl={FIEFVERSE_SURVIVAL_AVATARS}>
            <ProfileNoBorderIcon
              className={classes.cardIcon}
              color={step === 2 ? '#fff' : '#EDEFF5'}
            />
          </StepCard>
          <StepCard
            onClick={() => handleCardClick(3)}
            text='3. Purchase Assets'
            selected={step === 3}
            iconUrl={FIEFVERSE_GEAR_AVATAR_PATH}>
            <SmileIcon className={classes.cardIcon} color={step === 3 ? '#fff' : '#EDEFF5'} />
          </StepCard>
          <StepCard
            onClick={() => handleCardClick(4)}
            text='4. Download Launcher'
            selected={step === 4}
            iconUrl={FIEFVERSE_SURVIVAL_LOGO}>
            <DownloadIconSecondary
              className={classes.cardIcon}
              color={step === 4 ? '#fff' : '#EDEFF5'}
            />
          </StepCard>
        </div>
        {getStep()}

        <div className={classes.footerContainer}>
          <div className={classes.buttonContainer} onClick={step === 1 ? null : backHandler}>
            <LeftLongerArrowIcon
              className={classes.arrowIcon}
              color={step === 1 ? '#8F95B2' : '#4D6EFF'}
            />
            <Typography className={clsx(step === 1 && classes.linkDisabled, classes.linkButton)}>
              Back
            </Typography>
          </div>
          {step !== 4 && (
            <>
              <div className={classes.divider} />
              <div className={classes.buttonContainer} onClick={step === 4 ? null : nextHandler}>
                (
                <Typography
                  className={clsx(step === 4 && classes.linkDisabled, classes.linkButton)}>
                  Next
                </Typography>
                )
                <RightArrowIcon
                  className={classes.arrowIcon}
                  color={step === 4 ? '#8F95B2' : '#4D6EFF'}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default memo(SurvivalDownload);
