import { memo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';

import FiefTokenIcon from 'components/FiefTokenIcon';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import { formatNumber } from 'utils/helpers/utility';
import GearPurchaseModal from 'containers/Shop/FiefverseShop/GearPurchaseModal';
import GearPurchaseConfirmModal from 'containers/Shop/FiefverseShop/GearPurchaseConfirmModal';

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
    '&:hover': {
      '& #amount': {
        display: 'none',
      },
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
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: 'rgba(11, 11, 11, 0.9)',
    gap: 8,
    width: '100%',
    padding: theme.spacing(2),
  },
  tag: {
    fontSize: 14,
    textTransform: 'uppercase',
    background: 'linear-gradient(99.38deg, #DAF9FC -154.11%, #B6BAF8 224.02%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
  },
  title: {
    fontSize: 24,
    fontFamily: 'pedestria-mvb',
    fontWeight: 700,
    lineHeight: 1,
    color: '#FFFFFF',
    textShadow: '0px 1.5px 2px rgba(7, 11, 29, 0.15)',
  },
  price: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    fontWeight: 700,
    color: '#FFFFFF',
  },
  image: {
    position: 'relative',
    width: '100%',
    height: '100%',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  amount: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    fontSize: 14,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#FFFFFF',
    background: 'rgba(11, 11, 11, 0.4)',
    borderRadius: 6,
    padding: theme.spacing(0.5, 1),
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
    height: 56,
  },
}));

const SingleGearItem = ({ item }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openPurchaseConfirmModal, setPurchaseConfirmModal] = useState(false);

  const handleBuyGear = () => {
    setOpen(false);
    setPurchaseConfirmModal(true);
  };

  return (
    <Card className={classes.root}>
      <Typography id='header' align='center' className={classes.header}>
        {item?.rarity || ''}
      </Typography>
      <div className={classes.container}>
        <div className={classes.image}>
          <img alt='pinata-party' src={item?.imageUrl} className={classes.image} />
          <Typography id='amount' className={classes.amount}>
            {formatNumber(item?.sale?.available || 0)} /{' '}
            {formatNumber(item?.sale?.maxAvailable || 0)}
          </Typography>
        </div>
        <div id='info' className={classes.infoContainer}>
          <Typography className={classes.tag}>{item.type}</Typography>
          <Typography className={classes.title}>{item.name}</Typography>
          <Typography className={classes.price}>
            <FiefTokenIcon size={24} token='IP' />
            {formatNumber(item.price)}
          </Typography>
        </div>
      </div>
      <ContainedButton id='button' fullWidth className={classes.button} onClick={() => setOpen(true)}>
        Buy Gear
      </ContainedButton>
      {open && 
        <GearPurchaseModal 
          gear={item} 
          open={open}
          onBuyGear={handleBuyGear}
          setOpen={setOpen} />
      }
      {openPurchaseConfirmModal && 
        <GearPurchaseConfirmModal
          gear={item}
          open={openPurchaseConfirmModal}
          setOpen={setPurchaseConfirmModal}
        />
      }
    </Card>
  );
};

export default memo(SingleGearItem);
