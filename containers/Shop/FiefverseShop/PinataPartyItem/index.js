import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';

import FiefTokenIcon from 'components/FiefTokenIcon';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import { PINATA_PARTY_ICON_PATH } from 'utils/constants/image-paths';
import { formatNumber } from 'utils/helpers/utility';
import LINKS from 'utils/constants/links';

const useStyles = makeStyles(theme => ({
  root: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    minHeight: 385,
    borderRadius: 6,
    background: 'linear-gradient(110.69deg, #FCB992 -31.02%, #F97326 157.88%)',
    '&:hover': {
      '& #info': {
        display: 'none',
      },
      '& #header': {
        display: 'none',
      },
      '& a': {
        display: 'flex',
      },
    },
  },
  header: {
    width: '100%',
    background: '#F97326',
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
    minWidth: 240,
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
  amountContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
  },
  amount: {
    fontSize: 18,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#1F182A',
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 6,
    padding: theme.spacing(0.5, 1),
    '& span': {
      color: '#474D66',
    },
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

const PinataPartyItem = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Typography id='header' align='center' className={classes.header}>
        mixed rarity
      </Typography>
      <div className={classes.container}>
        <div id='info' className={classes.infoContainer}>
          <div className={classes.infoColContainer}>
            <Typography className={classes.tag}>bundle</Typography>
            <Typography className={classes.title}>Pinata Party</Typography>
          </div>

          <div className={classes.infoColContainer}>
            <Typography className={classes.amount}>
              50 <span>/ 1200 Left</span>
            </Typography>
            <Typography className={classes.price}>
              <FiefTokenIcon size={24} token='IP' />
              {formatNumber(1000)}
            </Typography>
          </div>
        </div>
        <div className={classes.image}>
          <img alt='pinata-party' src={PINATA_PARTY_ICON_PATH} />
        </div>
      </div>
      <ContainedButton fullWidth href={LINKS.SHOP_PINATA_PARTY.HREF} className={classes.button}>
        view Bundle
      </ContainedButton>
    </Card>
  );
};

export default memo(PinataPartyItem);
