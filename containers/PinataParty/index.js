import { memo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import PinataPartyInfo from './PinataPartyInfo';
import PinataPartyDetail from './PinataPartyDetail';
import { PINATA_PARTY_PET_ICON_PATH, PURCHASE_AVATAR_ICON_PATH } from 'utils/constants/image-paths';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    background: `linear-gradient(110.69deg, #FCB992 -31.02%, #F97326 157.88%)`,
    padding: theme.spacing(8, 3),
  },
  container: {
    maxWidth: 1800,
    width: '100%',
  },
}));

const PETS = [
  {
    id: 'pet1',
    name: 'pinata Boar',
    image: PINATA_PARTY_PET_ICON_PATH,
    discountPercent: 15,
    rarity: 'legendary',
    gearScore: 231,
    ipScore: 12.5,
  },
  {
    id: 'pet2',
    name: 'pinata Boar',
    image: PURCHASE_AVATAR_ICON_PATH,
    discountPercent: 15,
    rarity: 'legendary',
    gearScore: 231,
    ipScore: 12.5,
  },
];

const PinataParty = () => {
  const classes = useStyles();
  const [selectedPet, setSelectedPet] = useState(PETS[0]);

  return (
    <main className={classes.root}>
      <div className={classes.container}>
        <Grid container spacing={8}>
          <Grid item xs={12} md={6} lg={5}>
            <PinataPartyInfo
              pets={PETS}
              selectedPet={selectedPet}
              setSelectedPet={setSelectedPet}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={7}>
            <PinataPartyDetail selectedPet={selectedPet} />
          </Grid>
        </Grid>
      </div>
    </main>
  );
};

export default memo(PinataParty);
