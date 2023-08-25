import { memo } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, Grid, Container, useMediaQuery } from '@material-ui/core';
import { use100vh } from 'react-div-100vh';

import {
  FIEFVERSE_JOURNEY_BACKGROUND_IMAGE_PATH,
  FIEFVERSE_FEATURED_GAME_MODE_PATH,
  FIEFVERSE_NATIVE_AVATAR_COUNT_PATH,
  FIEFVERSE_STATUS_PATH,
  FIEFVERSE_WORLD_HEX_COUNT_PATH,
  FIEFVERSE_HIGH_FANTASY_WORLD_PATH,
  FIEFVERSE_JOURNEY_MOBILE_IMAGE_PATH
} from 'utils/constants/image-paths';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${FIEFVERSE_JOURNEY_BACKGROUND_IMAGE_PATH})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
    minHeight: '1080px',
    height: '100%',
    width: '100%',
    padding: theme.spacing(9.5, 3),

    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3.5),
      backgroundImage: 'unset',
      height: 'unset',
      minHeight: 'unset',
      padding: theme.spacing(5, 2.5),
      background: '#F7F4EE'
    }
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    minHeight: '920px',

    [theme.breakpoints.down('sm')]: {
      minHeight: 'unset',
      padding: 0
    }
  },
  title: {
    fontFamily: 'pedestria-mvb',
    fontWeight: 700,
    fontSize: theme.spacing(5),
    lineHeight: 1.4,
    maxWidth: theme.spacing(105),
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(1.5),
    color: '#1F182A',
    textTransform: 'uppercase',

    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
      marginTop: 0,
    }
  },
  description: {
    fontSize: theme.spacing(2.25),
    lineHeight: '30px',
    fontWeight: 500,
    color: '#1F182A',
    maxWidth: theme.spacing(65),

    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(2),
      lineHeight: '20px',
    }
  },
  card: {
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #8F95B2',
    borderRadius: theme.spacing(0.75),
    padding: theme.spacing(2),
    gap: theme.spacing(1.5),
    marginTop: theme.spacing(3),
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  featureLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.spacing(2),
    lineHeight: 1.5,
    color: 'white',

    '& img': {
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginRight: theme.spacing(1)
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(1.75),
      
      '& img': {
        width: theme.spacing(2.25),
        height: theme.spacing(2.25),
        marginRight: theme.spacing(1)
      },
    }
  },
  cardContent: {
    background: 'rgba(11, 11, 11, 0.8)',
    padding: theme.spacing(2),
    border: '2px solid #fff',
    borderRadius: theme.spacing(0.75),
    marginTop: theme.spacing(5),
    marginLeft: 'auto',
    // marginRight: 'auto',
    width: theme.spacing(52),

    [theme.breakpoints.down('sm')]: {
      marginRight: 'auto'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      background: 'rgba(11, 11, 11, 0.9)',
      marginTop: 0
    }
  },
  fantasyWorld: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginRight: theme.spacing(2),

    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(8),
      height: theme.spacing(8)
    }
  },
  fantasyWorldTitle: {
    fontFamily: 'pedestria-mvb',
    fontWeight: 700,
    fontSize: theme.spacing(4),
    lineHeight: '45px',
    display: 'flex',
    alignItems: 'center',

    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3),
      lineHeight: '34px',
    }
  },
  unexplored: {
    color: '#FFDFA6',
    fontSize: theme.spacing(2.25),
    fontWeight: 500,

    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(2)
    }
  },
  journeyImg: {
    width: '100%',
    margin: theme.spacing(3, 0)
  }
}));

const FEATURES = [
  {
    label: 'Status',
    value: 'Seeding',
    imageUrl: FIEFVERSE_STATUS_PATH
  },
  {
    label: 'Native Avatar Count',
    value: '1,200',
    imageUrl: FIEFVERSE_NATIVE_AVATAR_COUNT_PATH
  },
  {
    label: 'World Hex Count',
    value: '???',
    imageUrl: FIEFVERSE_WORLD_HEX_COUNT_PATH
  },
  {
    label: 'Featured Game Mode',
    value: 'Gauntlet',
    imageUrl: FIEFVERSE_FEATURED_GAME_MODE_PATH
  },
]

const FiefverseHeader = () => {
  const deviceHeight = use100vh();
  const classes = useStyles({
    deviceHeight: deviceHeight ? `${deviceHeight > 950 ? 950 : deviceHeight}px` : '100vh',
  });
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'), { defaultMatches: true });

  return (
    <main className={classes.root}>
      <Container className={classes.container} maxWidth='lg'>
        <div>
          <Typography className={classes.title}>Visit an ever-expanding collection of multiplayer Worlds as you level up your Avatar</Typography>
          <Typography className={classes.description}>Each World within the MabsVerse features its own unique resources, experiences and inhabitants</Typography>
        </div>
        {isSm && 
          <img className={classes.journeyImg} src={FIEFVERSE_JOURNEY_MOBILE_IMAGE_PATH} />
        }
        <div className={classes.cardContent}>
          <Grid container alignItems='center'>
            <img className={classes.fantasyWorld} src={FIEFVERSE_HIGH_FANTASY_WORLD_PATH} alt='high-fantasy-world' />
            <div>
              <Typography className={classes.fantasyWorldTitle}>High Fantasy World</Typography>
              <Typography className={classes.unexplored}>Unexplored</Typography>
            </div>
          </Grid>
          <div className={classes.features}>
            {FEATURES.map(feature => {
              return (
                <div key={feature.label} className={classes.featureItem}>
                  <Typography className={classes.featureLabel}>
                    <img src={feature.imageUrl} alt={feature.label} />
                    {feature.label}
                  </Typography>
                  <Typography className={classes.featureLabel}>{feature.value}</Typography>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </main>
  );
};

export default memo(FiefverseHeader);
