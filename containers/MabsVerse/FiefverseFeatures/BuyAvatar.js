import { memo, useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import { use100vh } from 'react-div-100vh';

import {
  FIEFVERSE_FANTASY_DWARF_AVATAR_PATH,
  FIEFVERSE_FANTASY_DWARF_CUT_AVATAR_PATH,
  FIEFVERSE_FANTASY_ELF_AVATAR_PATH,
  FIEFVERSE_FANTASY_ELF_CUT_AVATAR_PATH,
  FIEFVERSE_FANTASY_HUMAN_AVATAR_PATH,
  FIEFVERSE_FANTASY_HUMAN_CUT_AVATAR_PATH,
  FIEFVERSE_FANTASY_ORC_AVATAR_PATH,
  FIEFVERSE_FANTASY_ORC_CUT_AVATAR_PATH,
  FIEFVERSE_GEAR_AVATAR_PATTERN_PATH,
} from 'utils/constants/image-paths';
import GradientButton from 'components/UI/Buttons/GradientButton';
import BorderCardWrapper from 'parts/BorderCardWrapper';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: theme.spacing(3, 0, 12.5),

    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(6, 0, 5),
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(4, 2.5),
    },
  },
  buttonWrapper: {
    height: theme.spacing(7),
    width: theme.spacing(22),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(7),

    [theme.breakpoints.down('md')]: {
      height: theme.spacing(6),
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      maxWidth: theme.spacing(50),
      height: theme.spacing(6),
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
  },
  visitShopButton: {
    borderRadius: theme.spacing(0.5),
    width: '100%',
    height: '100%',
    fontSize: theme.spacing(2.5),
    fontWeight: 600,

    [theme.breakpoints.down('md')]: {
      fontSize: theme.spacing(2)
    },

    '&:hover': {
      background: 'linear-gradient(0deg, rgba(31, 24, 42, 0.3), rgba(31, 24, 42, 0.3)), linear-gradient(97.82deg, #97F6FF -148.83%, #8085EE 100.25%)',
      color: 'white'
    }
  },
  avatarPattern: {
    width: theme.spacing(48.5),

    [theme.breakpoints.down('md')]: {
      width: theme.spacing(40),
    },
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(19.5),
    },
  },
  avatar: {
    width: theme.spacing(50),
    marginTop: -theme.spacing(37.5),

    [theme.breakpoints.down('md')]: {
      width: theme.spacing(37),
    },
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(20.5),
      marginTop: -theme.spacing(15),
    },
  },
  avatarsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(3),
    paddingBottom: theme.spacing(5),

    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      marginLeft: 0,
      width: '100%',
      paddingBottom: 0,
    },
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatarLabel: {
    fontWeight: 700,
    fontFamily: 'pedestria-mvb',
    fontSize: theme.spacing(5),
    lineHeight: 1.4,
    color: '#1F182A',

    [theme.breakpoints.down('md')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(4),
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(3),
    },
  },
  avatarDescription: {
    fontWeight: 500,
    fontSize: theme.spacing(2.25),
    color: '#1F182A',

    [theme.breakpoints.down('md')]: {
      fontSize: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(2),
    },
  },
  avatars: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  avatarItem: {
    width: 172,
    height: 262,
    background: '#EDEFF5',
    borderRadius: theme.spacing(0.75),
    border: '1px solid #EDEFF5',
    display: 'flex',
    alignItems: 'flex-end',

    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      objectPosition: 'bottom',
      filter: 'grayscale(100%)',
    },

    [theme.breakpoints.down('md')]: {
      width: 122,
      height: 182,
    },
    [theme.breakpoints.down('sm')]: {
      width: 74,
      height: 114,
      borderRadius: 0,
    },
  },
  selectedAvatar: {
    width: 170,
    height: 260,
    background: 'white',
    borderRadius: theme.spacing(0.75),
    display: 'flex',
    alignItems: 'flex-end',

    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      objectPosition: 'bottom',
    },

    [theme.breakpoints.down('md')]: {
      width: 120,
      height: 180,
    },
    [theme.breakpoints.down('sm')]: {
      width: 72,
      height: 112,
      borderRadius: 0,
    },
  },
  borderWrapper: {
    [theme.breakpoints.down('sm')]: {
      borderRadius: 0,
    },
  },
}));

const AVATARS = [
  {
    name: 'orc',
    imageUrl: FIEFVERSE_FANTASY_ORC_AVATAR_PATH,
    smallImageUrl: FIEFVERSE_FANTASY_ORC_CUT_AVATAR_PATH,
  },
  {
    name: 'human',
    imageUrl: FIEFVERSE_FANTASY_HUMAN_AVATAR_PATH,
    smallImageUrl: FIEFVERSE_FANTASY_HUMAN_CUT_AVATAR_PATH,
  },
  {
    name: 'dwarf',
    imageUrl: FIEFVERSE_FANTASY_DWARF_AVATAR_PATH,
    smallImageUrl: FIEFVERSE_FANTASY_DWARF_CUT_AVATAR_PATH,
  },
  {
    name: 'elf',
    imageUrl: FIEFVERSE_FANTASY_ELF_AVATAR_PATH,
    smallImageUrl: FIEFVERSE_FANTASY_ELF_CUT_AVATAR_PATH,
  },
];

const BuyAvatar = () => {
  const deviceHeight = use100vh();
  const router = useRouter();
  const classes = useStyles({
    deviceHeight: deviceHeight ? `${deviceHeight > 950 ? 950 : deviceHeight}px` : '100vh',
  });
  const [selectedAvatar, setAvatar] = useState(AVATARS[0]);

  const handleVisitShop = () => {
    router.push('/shop');
  };

  const handleSelectAvatar = avatar => () => {
    setAvatar(avatar);
  };

  return (
    <Container className={classes.container} maxWidth='lg'>
      <div className={classes.avatarContainer}>
        <img
          className={classes.avatarPattern}
          src={FIEFVERSE_GEAR_AVATAR_PATTERN_PATH}
          alt='avatar-pattern'
        />
        <img className={classes.avatar} src={selectedAvatar.imageUrl} alt='fantasy-avatar' />
      </div>
      <div className={classes.avatarsContainer}>
        <Typography className={classes.avatarLabel}>Find Your Identity</Typography>
        <Typography className={classes.avatarDescription}>
          High Fantasy Avatars are now available!
        </Typography>
        <BorderCardWrapper className={classes.buttonWrapper}>
          <GradientButton onClick={handleVisitShop} className={classes.visitShopButton}>
            Visit Shop
          </GradientButton>
        </BorderCardWrapper>
        <div className={classes.avatars}>
          {AVATARS.map(avatar => {
            return avatar.name === selectedAvatar.name ? (
              <BorderCardWrapper
                key={avatar.name}
                className={classes.borderWrapper}
                rootClassName={classes.borderWrapper}>
                <div className={classes.selectedAvatar}>
                  <img src={avatar.smallImageUrl} alt={avatar.name} />
                </div>
              </BorderCardWrapper>
            ) : (
              <div
                onClick={handleSelectAvatar(avatar)}
                key={avatar.name}
                className={classes.avatarItem}>
                <img src={avatar.smallImageUrl} alt={avatar.name} />
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default memo(BuyAvatar);
