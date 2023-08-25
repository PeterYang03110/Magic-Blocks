import { memo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider, Typography } from '@material-ui/core';

import { OPENSEA_URL, COLLECTION_NAME } from 'config';
import { useAuth } from 'contexts/auth-context';
import { useAvatar } from 'contexts/avatar-context';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import FiefTokenIcon from 'components/FiefTokenIcon';
import AvatarPurchaseModal from '../AvatarPurchaseModal';
import { isEmpty } from 'utils/helpers/utility';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
    background: '#FFFFFF',
    boxShadow: '0px 12px 40px rgba(70, 74, 156, 0.15)',
    borderRadius: 6,
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
  divider: {
    height: 5,
    width: 55,
    background: 'linear-gradient(102.49deg, #A4D7FC 0%, #A8B4FE 50%,  #CDB9FD 100%)',
  },
  title: {
    fontSize: 40,
    fontFamily: 'pedestria-mvb',
    fontWeight: 800,
    lineHeight: 1,
    color: '#0B0B0B',
    textShadow: '0px 1.5px 2px rgba(7, 11, 29, 0.15)',
    '& span': {
      color: '#F97326',
    },
  },
  soldOut: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase',
    fontSize: 20,
    fontWeight: 700,
    color: '#FF3D71',
    border: '2px solid #FF3D71',
    borderRadius: 6,
    padding: theme.spacing(1, 2),
  },
  leftBalance: {
    width: 'fit-content',
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 1,
    padding: theme.spacing(1, 2),
    borderRadius: 6,
    background: '#797FF2',
    color: '#D3D5FB',
    '& span': {
      color: '#0B0B0B',
    },
  },
  content: {
    margin: 0,
    paddingLeft: 20,
    '& li': {
      fontSize: 18,
      color: '#1F182A',
      textShadow: '0px 1.5px 2px rgba(7, 11, 29, 0.15)',
      padding: theme.spacing(1, 0),
    },
  },
  description: {
    fontSize: 18,
    color: '#474d66',
    textShadow: '0px 1.5px 2px rgba(7, 11, 29, 0.15)',
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
      // Prevent click events from firing on text for GA
      pointerEvents: 'none',
    },
  },
  openseaButton: {
    fontSize: 18,
    textTransform: 'uppercase',
    color: '#FFFFFF',
    background: '#0B0B0B',
    padding: theme.spacing(2),
  },
}));

const FantasyAvatar = () => {
  const classes = useStyles();
  const { account } = useWeb3React();
  const { isWrongWallet } = useAuth();
  const { avatar } = useAvatar();
  const [open, setOpen] = useState(false);

  return (
    <main className={classes.root}>
      <div className={classes.container}>
        <Grid container spacing={7}>
          {avatar?.isSoldOut && (
            <Grid item xs={12}>
              <Typography align='center' className={classes.soldOut}>
                Sold Out here
              </Typography>
            </Grid>
          )}

          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography className={classes.title}>
                  <span>High Fantasy</span> Avatars
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider className={classes.divider} />
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.leftBalance}>
                  <span>{avatar?.available || 1200}</span> of {avatar?.maxAvailable || 1200} Left
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <ul className={classes.content} role='list'>
                  <li>1,200 Limited-Edition MABS Avatars</li>
                  <li>4 Different Types: Humans, Orcs, Elves, Dwarves</li>
                  <li>8 Underwear Variants</li>
                  <li>10 Power Levels</li>
                  <li>Grants automatic access to the High Fantasy World</li>
                </ul>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography className={classes.title}>
                  <span>Randomized</span> Mint
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.description}>
                  Upon purchase, you will mint an Avatar with randomized traits directly to your
                  connected wallet.
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            {avatar?.isSoldOut ? (
              <ContainedButton
                fullWidth
                className={classes.openseaButton}
                href={
                  account
                    ? `${OPENSEA_URL}/${account}/${COLLECTION_NAME}`
                    : `${OPENSEA_URL}/collection/${COLLECTION_NAME}`
                }
                target='_blank'>
                Try Opensea
              </ContainedButton>
            ) : (
              <ContainedButton
                id='AVATAR'
                fullWidth
                className={classes.button}
                disabled={isEmpty(avatar.prices) || isWrongWallet}
                onClick={() => setOpen(true)}>
                Mint Avatar
                <span>
                  <FiefTokenIcon token='ETH' size={24} />
                  {avatar?.price || 0.04} ETH
                </span>
              </ContainedButton>
            )}
          </Grid>
        </Grid>
      </div>

      {open && <AvatarPurchaseModal open={open} setOpen={setOpen} />}
    </main>
  );
};

export default memo(FantasyAvatar);
