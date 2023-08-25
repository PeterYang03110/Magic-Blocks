import { memo } from 'react';
import { useRouter } from 'next/router';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container, Typography, useMediaQuery } from '@material-ui/core';
import { use100vh } from 'react-div-100vh';

import { 
  FIEFVERSE_GEAR1_PATH,
  FIEFVERSE_GEAR2_PATH,
  FIEFVERSE_GEAR3_PATH,
  FIEFVERSE_GEAR4_PATH,
  FIEFVERSE_GEAR5_PATH,
  FIEFVERSE_GEAR6_PATH,
  FIEFVERSE_LEGENDARY_PATH,
  FIEFVERSE_GEAR_ID_PATH,
  FIEFVERSE_GEAR_AVATAR_PATH,
  FIEFVERSE_GEAR_UP_BACKGROUND_IMAGE_PATH 
} from 'utils/constants/image-paths';
import GradientButton from 'components/UI/Buttons/GradientButton';
import BorderCardWrapper from 'parts/BorderCardWrapper';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${FIEFVERSE_GEAR_UP_BACKGROUND_IMAGE_PATH})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    width: '100%',
    minHeight: theme.spacing(104),
    marginTop: theme.spacing(2),

    [theme.breakpoints.down('md')]: {
      minHeight: 'unset'
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(4)
    }
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(10, 0, 4.5),

    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(3)
    }
  },
  gears: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: theme.spacing(3.75)
  },
  gear: {
    margin: theme.spacing(0, 13),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(0, 6),
    },
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      padding: theme.spacing(0, 2.5),
      width: '100%'
    }
  },
  gearHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(12),

    '& img': {
      width: theme.spacing(7),
      height: theme.spacing(7)
    },

    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(8),
      '& img': {
        width: theme.spacing(5),
        height: theme.spacing(5)
      }
    }
  },
  gearName: {
    fontFamily: 'pedestria-mvb',
    fontSize: theme.spacing(4),
    lineHeight: 1.4,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
    marginLeft: theme.spacing(2),

    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
    }
  },
  gearAvatar: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: theme.spacing(10),

    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2)
    }
  },
  avatar: {
    marginRight: -theme.spacing(5),
    width: theme.spacing(45),

    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(40),
    }
  },
  legendary: {
    marginLeft: -theme.spacing(5),
    width: theme.spacing(24.25),

    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(20),
      marginLeft: -theme.spacing(8)
    }
  },
  buttonWrapper: {
    height: theme.spacing(7),
    width: theme.spacing(22),

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      maxWidth: theme.spacing(50),
      height: theme.spacing(6)
    },
  },
  visitShopButton: {
    borderRadius: theme.spacing(0.5),
    width: '100%',
    height: '100%',
    fontSize: theme.spacing(2.5),
    fontWeight: 600,

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(2)
    },

    '&:hover': {
      background: 'linear-gradient(0deg, rgba(31, 24, 42, 0.3), rgba(31, 24, 42, 0.3)), linear-gradient(97.82deg, #97F6FF -148.83%, #8085EE 100.25%)',
      color: 'white'
    }
  },
}));

const GearUp = () => {
  const deviceHeight = use100vh();
  const router = useRouter();
  const classes = useStyles({
    deviceHeight: deviceHeight ? `${deviceHeight > 950 ? 950 : deviceHeight}px` : '100vh',
  });
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'), { defaultMatches: true });

  const handleVisitShop = () => {
    router.push('/shop');
  };

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth='lg'>
        {!isSm && 
          <div className={classes.gears}>
            <img src={FIEFVERSE_GEAR1_PATH} alt='fief-verse-gear1' />
            <img src={FIEFVERSE_GEAR2_PATH} alt='fief-verse-gear2' />
            <img src={FIEFVERSE_GEAR3_PATH} alt='fief-verse-gear3' />
            <img src={FIEFVERSE_GEAR4_PATH} alt='fief-verse-gear4' />
          </div>
        }
        <div className={classes.gear}>
          <div className={classes.gearHeader}>
            <img src={FIEFVERSE_GEAR_ID_PATH} alt='gear-id' />
            <Typography className={classes.gearName}>Raiden</Typography>
          </div>
          <div className={classes.gearAvatar}>
            <img className={classes.avatar} src={FIEFVERSE_GEAR_AVATAR_PATH} alt='avatar' />
            <img className={classes.legendary} src={FIEFVERSE_LEGENDARY_PATH} alt='legendary' />
          </div>
          <BorderCardWrapper className={classes.buttonWrapper}>
            <GradientButton onClick={handleVisitShop} className={classes.visitShopButton}>
              Visit Shop
            </GradientButton>
          </BorderCardWrapper>
        </div>
        {!isSm && 
          <div className={classes.gears}>
            <img src={FIEFVERSE_GEAR5_PATH} alt='fief-verse-gear5' />
            <img src={FIEFVERSE_GEAR5_PATH} alt='fief-verse-gear5' />
            <img src={FIEFVERSE_GEAR6_PATH} alt='fief-verse-gear6' />
          </div>
        }
      </Container>
    </div>
  );
};

export default memo(GearUp);
