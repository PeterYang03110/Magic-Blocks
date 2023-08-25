import { memo, useState } from 'react';
import { Typography, Divider, Grid } from '@material-ui/core';

import FiefDialog from 'components/FiefDialog';
import { useAuth } from 'contexts/auth-context';
import { useAsset } from 'contexts/asset-context';
import { makeStyles } from '@material-ui/core/styles';
import { PROFILE_AVATAR_ICON_PATH } from 'utils/constants/image-paths';
import BorderCardWrapper from 'parts/BorderCardWrapper';
import FiefImageList from 'components/UI/FiefImageList';
import GradientButton from 'components/UI/Buttons/GradientButton';
import ContainedButton from 'components/UI/Buttons/ContainedButton';

const useStyles = makeStyles(() => ({
  dialog: {
    maxWidth: 1058,
    maxHeight: 769
  },
  title: {
    fontSize: 32,
    lineHeight: 1,
    fontFamily: 'pedestria-mvb',
    color: '#000000',
  },
  name: {
    display: 'flex',
    fontSize: 32,
    lineHeight: 1,
    fontFamily: 'pedestria-mvb',
    color: '#000000',
    paddingTop: 16
  },
  number: {
    display: 'flex',
    fontSize: 18,
    lineHeight: '30px',
    fontFamily: 'Inter',
    color: '#8F95B2',
  },
  form: {
    display: 'flex',
    maxWidth: 1058,
    maxHeight: 769,
    minHeight: 600,
    margin: '48px 24px 24px 24px'
  },
  avatarContainer: {
    display: 'flex', 
    alignItems: 'center', 
    flexDirection: 'column',
    justifyContent: 'center',
  },
  avatarWrapper: {
    cursor: 'pointer',
    background: '#0B0B0B',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  avatar: {
    width: 350,
    height: 350,
    objectFit: 'cover',
  },
  divider: {
    height: 1,
    width: '100%',
    margin: '24px 0px 24px 0px',
    background: '#D8DAE5',
  },
  selectorContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 56
  }
}));

const SelectAvatarForm = ({ open, setOpen, selectedAvatar }) => {
  const classes = useStyles();
  const { userAvatars } = useAsset();
  const { userProfile, updateProfile } = useAuth();

  const [ avatar, setAvatar] = useState(() => {
    console.log(selectedAvatar);
    let current = {contractAddress: null, chainId: 0, tokenId: 0, image: PROFILE_AVATAR_ICON_PATH, name: ''};
    if(selectedAvatar && selectedAvatar.split('#').length == 3) {
      const contractAddress = selectedAvatar.split('#')[0];
      const chainId = parseInt(selectedAvatar.split('#')[1]);
      const tokenId = parseInt(selectedAvatar.split('#')[2]);
      userAvatars.forEach(element => {
        if(element.contractAddress == contractAddress && element.chainId == chainId && element.tokenId == tokenId)
        current = element;
      });

      console.log(userAvatars, contractAddress, chainId, tokenId);
    }

    return current;
  });

  const getAvatars = () => {
    let avatars = [];
    avatars.push({contractAddress: null, chainId: 0, tokenId: 0, image: PROFILE_AVATAR_ICON_PATH, name: ''});
    userAvatars.forEach(element => {
      avatars.push(element);
    });
    return avatars;
  }

  const changeAvatar = async() => {
    let selectedAvatar = '';
    if(avatar.avatarId)
    {
      selectedAvatar = `${avatar.contractAddress}#${avatar.chainId}#${avatar.tokenId}`
    }
    await updateProfile({userId: userProfile.userId, selectedAvatar: selectedAvatar});
    setOpen(false);
  }

  return (
    <FiefDialog open={open} onClose={() => {setOpen(false)}} className={classes.dialog}>
      <form noValidate className={classes.form}>
        <Grid item xs={12} sm={4} className={classes.avatarContainer}>
          <BorderCardWrapper rootClassName={classes.avatarWrapper}>
            <img
              alt='profile'
              src={!avatar ? PROFILE_AVATAR_ICON_PATH : avatar.image}
              className={classes.avatar}
            />
          </BorderCardWrapper>
          {avatar && avatar.name.length > 0 && <>
            <Typography className={classes.name}>{avatar.name.split('#')[0]}</Typography>
            <Typography className={classes.number}>#{avatar.name.split('#')[1]}</Typography>
          </>}
        </Grid>
        <Grid container item xs={12} sm={8} className={classes.selectorContainer}>
          <div>
            <Typography className={classes.title}>Select New Avatar</Typography>
            <Divider className={classes.divider} />
            <FiefImageList items={getAvatars()} value={avatar} setValue={setAvatar}></FiefImageList>
          </div>
          <div>
          <>
            <GradientButton onClick={changeAvatar} fullWidth>CHANGE AVATAR</GradientButton>
            <Divider className={classes.divider} />
            <ContainedButton onClick={() => {setOpen(false)}} fullWidth>No, cancel this change</ContainedButton>
          </>
          </div>
        </Grid>
      </form>
    </FiefDialog>
  );
};

export default memo(SelectAvatarForm);
