import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { use100vh } from 'react-div-100vh';

import {
  FIEFVERSE_HEADER_BACKGROUND_IMAGE_PATH,
  FIEFVERSE_LOGO_ICON_PATH,
} from 'utils/constants/image-paths';
import ContainedButton from 'components/UI/Buttons/ContainedButton';

const useStyles = makeStyles(theme => ({
  root: ({ deviceHeight }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(4),
    backgroundImage: `url(${FIEFVERSE_HEADER_BACKGROUND_IMAGE_PATH})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    minHeight: `calc(${deviceHeight} - ${theme.custom.layout.topAppBarHeight}px)`,
    height: '100%',
    width: '100%',
    padding: theme.spacing(10, 2.5),
  }),
  logo: {
    maxWidth: 700,
    width: '100%',
    objectFit: 'contain',
  },
  title: {
    fontSize: 56,
    lineHeight: '78px',
    fontFamily: 'pedestria-mvb,sans-serif',
    textTransform: 'uppercase',
    color: '#FFFFFF',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      fontSize: 48,
      lineHeight: '68px',
    },
  },
  launchButton: {
    fontSize: 20,
    textTransform: 'uppercase',
    padding: theme.spacing(1, 4),
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
      width: '100%',
    },
  },
  description: {
    fontSize: 32,
    lineHeight: '45px',
    fontFamily: 'pedestria-mvb,sans-serif',
    color: '#FFFFFF',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      fontSize: 24,
      lineHeight: '34px',
    },
  },
}));

const FiefverseHeader = () => {
  const deviceHeight = use100vh();
  const classes = useStyles({
    deviceHeight: deviceHeight ? `${deviceHeight > 1080 ? 1080 : deviceHeight}px` : '100vh',
  });

  return (
    <main className={classes.root}>
      <Typography className={classes.title}>Journey to the</Typography>
      <img alt='fiefverse-logo' src={FIEFVERSE_LOGO_ICON_PATH} className={classes.logo} />
      <Typography className={classes.description}>
        An open-world RPG full of limitless possibilities
      </Typography>
      <ContainedButton disabled className={classes.launchButton}>
        Launch Alpha
      </ContainedButton>
    </main>
  );
};

export default memo(FiefverseHeader);
