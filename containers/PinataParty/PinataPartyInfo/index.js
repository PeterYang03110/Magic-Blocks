import { memo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider, Typography, Card } from '@material-ui/core';

import ContainedButton from 'components/UI/Buttons/ContainedButton';
import FiefTokenIcon from 'components/FiefTokenIcon';
import InfluencePointsBalanceStatus from 'parts/InfluencePointsBalanceStatus';
import PetImageList from '../PetImageList';
import PinataPartyPurchaseModal from '../PinataPartyPurchaseModal';
import { formatNumber } from 'utils/helpers/utility';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(5),
    background: '#FFFFFF',
    boxShadow: '0px 12px 40px rgba(70, 74, 156, 0.15)',
    borderRadius: 6,
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
  tagContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    height: '100%',
    flexFlow: 'wrap',
  },
  tag: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 1,
    textTransform: 'uppercase',
    color: '#1F182A',
    background: '#EDEFF5',
    borderRadius: 4,
    padding: theme.spacing(1, 2),
  },
  divider: {
    height: '100%',
    width: 2,
    background: '#000000',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  leftBalance: {
    width: 'fit-content',
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 1,
    padding: theme.spacing(1, 2),
    borderRadius: 4,
    background: '#4D6EFF',
    color: '#FFFFFF',
    textShadow: '0px 1.5px 2px rgba(7, 11, 29, 0.15)',
  },
  title: {
    fontSize: 56,
    fontFamily: 'Inter-Bold',
    fontWeight: 800,
    lineHeight: 1,
    background: 'linear-gradient(110.69deg, #FCB992 -31.02%, #F97326 157.88%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
  },
  amount: {
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: 700,
    color: '#1F182A',
    textShadow: '0px 1.5px 2px rgba(7, 11, 29, 0.15)',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: theme.spacing(2),
    background: '#EDEFF5',
    borderRadius: 6,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    textTransform: 'uppercase',
    lineHeight: 1,
    background: 'linear-gradient(102.49deg, #797FF2 0%, #B08DF2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
  },
  infoDetailContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: theme.spacing(2),
    background: '#FFFFFF',
    borderRadius: 4,
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 500,
    color: '#474D66',
    '& span': {
      color: '#070B1D',
    },
  },
  button: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 18,
    textTransform: 'uppercase',
    color: '#FFFFFF',
    background: '#0B0B0B',
    padding: theme.spacing(2),
    '& span': {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
  },
}));

const PinataPartyInfo = ({ pets, selectedPet, setSelectedPet }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <Card className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className={classes.tagContainer}>
            <Typography className={classes.tag}>Bundle</Typography>
            <Divider orientation='vertical' className={classes.divider} />
            <Typography className={classes.leftBalance}>Available Supply | 12 / 500</Typography>
          </div>
        </Grid>

        <Grid item xs={12}>
          <Typography className={classes.title}>Pinata Party</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography className={classes.amount}>2 Items</Typography>
        </Grid>

        <Grid item xs={12}>
          <PetImageList
            percentShow
            pets={pets}
            selectedPet={selectedPet}
            setSelectedPet={setSelectedPet}
          />
        </Grid>

        <Grid item xs={12}>
          <div className={classes.infoContainer}>
            <Typography className={classes.name}>{selectedPet.name}</Typography>
            <div className={classes.infoDetailContainer}>
              <Typography className={classes.info}>
                Rarity <span>{selectedPet.rarity}</span>
              </Typography>
              <Typography className={classes.info}>
                Type <span>Pet</span>
              </Typography>
              <Typography className={classes.info}>
                Gear Score <span>{formatNumber(selectedPet.gearScore)}</span>
              </Typography>
              <Typography className={classes.info}>
                IP Score <span>{formatNumber(selectedPet.ipScore)}</span>
              </Typography>
            </div>
          </div>
        </Grid>

        <Grid item xs={12}>
          <ContainedButton fullWidth className={classes.button} onClick={() => setOpen(true)}>
            BUY bundle
            <span>
              <FiefTokenIcon token='IP' size={32} />
              800 IP
            </span>
          </ContainedButton>
        </Grid>
        <Grid item xs={12}>
          <InfluencePointsBalanceStatus requiredAmount={800} />
        </Grid>
      </Grid>

      {open && <PinataPartyPurchaseModal open={open} setOpen={setOpen} pets={pets} />}
    </Card>
  );
};

export default memo(PinataPartyInfo);
