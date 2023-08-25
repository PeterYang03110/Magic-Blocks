import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';

import FiefTokenIcon from 'components/FiefTokenIcon';
import HighBidIcon from 'components/Icons/HighBidIcon';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import { GOLDEN_GOBLET_ICON_PATH } from 'utils/constants/image-paths';
import { formatNumber } from 'utils/helpers/utility';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    minHeight: 385,
    borderRadius: 6,
    background: '#1F182A',
    '&:hover': {
      '& #info': {
        display: 'none',
      },
      '& #header': {
        display: 'none',
      },
      '& #button': {
        display: 'flex',
      },
    },
  },
  header: {
    width: '100%',
    background: '#4D6EFF',
    fontSize: 14,
    textTransform: 'uppercase',
    padding: theme.spacing(1),
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 40,
    height: '100%',
    minWidth: 255,
  },
  infoColContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
  },
  tag: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#1F182A',
    background: '#ffffff',
    borderRadius: 4,
    padding: theme.spacing(0.5, 1),
  },
  title: {
    fontSize: 48,
    fontFamily: 'pedestria-mvb',
    fontWeight: 700,
    lineHeight: 1,
    color: '#FFFFFF',
  },
  category: {
    fontSize: 14,
    textTransform: 'uppercase',
    background: 'linear-gradient(99.38deg, #DAF9FC -154.11%, #B6BAF8 224.02%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
  },
  amountContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
  },
  amount: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 32,
    fontFamily: 'pedestria-mvb',
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
  price: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 32,
    fontFamily: 'pedestria-mvb',
    fontWeight: 700,
    color: '#FFFFFF',
  },
  image: {
    width: '100%',
    '& img': {
      width: '100%',
      maxHeight: 230,
      objectFit: 'contain',
    },
  },
  button: {
    display: 'none',
    fontSize: 20,
    textTransform: 'uppercase',
    color: '#FFFFFF',
    background: '#0B0B0B',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    padding: theme.spacing(3),
    height: 74,
  },
}));

const GoldenGobletItem = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Typography id='header' align='center' className={classes.header}>
        Legendary
      </Typography>

      <div className={classes.container}>
        <div id='info' className={classes.infoContainer}>
          <div className={classes.infoColContainer}>
            <Typography className={classes.tag}>Auction</Typography>
            <Typography className={classes.title}>Golden Goblet</Typography>
            <Typography className={classes.category}>equipment</Typography>
          </div>

          <div className={classes.infoColContainer}>
            <Typography className={classes.amount}>
              Highest Bid <HighBidIcon />
            </Typography>
            <Typography className={classes.price}>
              <FiefTokenIcon size={24} token='IP' />
              {formatNumber(800)}
            </Typography>
          </div>
        </div>

        <div className={classes.image}>
          <img alt='golden-goblet' src={GOLDEN_GOBLET_ICON_PATH} />
        </div>
      </div>

      <ContainedButton id='button' fullWidth className={classes.button}>
        view Auction
      </ContainedButton>
    </Card>
  );
};

export default memo(GoldenGobletItem);
