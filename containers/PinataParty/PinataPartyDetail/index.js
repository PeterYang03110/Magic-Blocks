import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 30,
    width: '100%',
    height: '100%',
  },
  image: {
    height: 540,
    width: 'fit-content',
    objectFit: 'contain',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  rarity: {
    width: 'fit-content',
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: 700,
    padding: theme.spacing(1, 2),
    borderRadius: 4,
    background: '#1F182A',
    color: '#FFFFFF',
    textShadow: '0px 1.5px 2px rgba(7, 11, 29, 0.15)',
    '& span': {
      color: '#B6BAF8',
    },
  },
  name: {
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    fontSize: 72,
    color: '#FFFFFF',
    textShadow: '0px 1.5px 2px rgba(7, 11, 29, 0.15)',
    [theme.breakpoints.down('xs')]: {
      fontSize: 48,
    },
  },
}));

const PinataPartyDetail = ({ selectedPet }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img alt='pinata-party' src={selectedPet.image} className={classes.image} />
      <div className={classes.infoContainer}>
        <Typography className={classes.rarity}>
          Pet | <span>{selectedPet.rarity}</span>
        </Typography>
        <Typography className={classes.name}>{selectedPet.name}</Typography>
      </div>
    </div>
  );
};

export default memo(PinataPartyDetail);
