import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  petItem: ({ height }) => ({
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height,
    background: `radial-gradient(138.85% 70.89% at 53.59% 50%, #FFEFD2 0%, #FFB020 100%)`,
    border: '1px solid #D8DAE5',
    borderRadius: 6,
  }),
  selectedPetItem: {
    border: '2px solid #fb9052',
  },
  petImageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  petImage: {
    width: 100,
    height: 90,
    objectFit: 'contain',
  },
  discountPercent: {
    width: '100%',
    fontSize: 14,
    fontWeight: 600,
    color: '#ffffff',
    background: '#0B0B0B',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    padding: theme.spacing(1),
    '&:hover': {
      color: '#FBA26E',
    },
  },
  selectedDiscountPercent: {
    color: '#FBA26E',
  },
  comingItem: ({ height }) => ({
    width: '100%',
    height,
    background: `radial-gradient(138.85% 70.89% at 53.59% 50%, rgba(255, 255, 255, 0.4) 0%, rgba(217, 217, 217, 0.4) 100%)`,
    border: '1px solid #D8DAE5',
    borderRadius: 6,
  }),
}));

const PetImageList = ({
  pets,
  selectedPet = {},
  setSelectedPet = () => {},
  percentShow = false,
  height = 184,
}) => {
  const classes = useStyles({ height });

  return (
    <Grid container spacing={2}>
      {pets.map(pet => (
        <Grid key={pet.id} item xs={6} sm={3}>
          <div
            className={clsx(classes.petItem, {
              [classes.selectedPetItem]: pet.id === selectedPet.id,
            })}
            onClick={() => setSelectedPet(pet)}>
            <div className={classes.petImageContainer}>
              <img alt='pet' src={pet.image} className={classes.petImage} />
            </div>
            {percentShow && (
              <Typography
                align='center'
                className={clsx(classes.discountPercent, {
                  [classes.selectedDiscountPercent]: pet.id === selectedPet.id,
                })}>
                {selectedPet.discountPercent}% OFF
              </Typography>
            )}
          </div>
        </Grid>
      ))}
      {Array.from(Array(2).keys()).map(index => (
        <Grid key={index} item xs={6} sm={3}>
          <div className={classes.comingItem} />
        </Grid>
      ))}
    </Grid>
  );
};

export default memo(PetImageList);
