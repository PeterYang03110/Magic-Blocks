import { memo, useEffect, useState } from 'react';
import { Typography, Divider, Grid } from '@material-ui/core';
import FiefDialog from 'components/FiefDialog';
import { makeStyles } from '@material-ui/core/styles';
import GradientButton from 'components/UI/Buttons/GradientButton';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import { useAuth } from 'contexts/auth-context';

const useStyles = makeStyles(() => ({
  dialog: {
    maxWidth: 500,
  },
  title: {
    fontSize: 32,
    fontWeight: 500,
    lineHeight: 1,
    fontFamily: 'pedestria-mvb',
    color: '#000000',
  },
  description: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '24px',
    fontFamily: 'Inter',
    color: '#1F182A'
  },
  form: {
    display: 'flex',
    width: '100%'
  },
  divider: {
    height: 1,
    width: '100%',
    marginTop: 24,
    marginBottom: 24,
    background: '#D8DAE5',
  },
  selectorContainer: {
    display: 'flex',
    alignContent: 'space-around',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%'
  }
}));

const UpdateProfileConfirmForm = ({ open, setOpen, params}) => {
  const classes = useStyles();
  const { userProfile, updateProfile } = useAuth();

  const [nameChanged, setNameChanged] = useState(false);
  const [emailChanged, setEmailChanged] = useState(false);
  const [addressChanged, setAddressChanged] = useState(false);
  const [guildChanged, setGuildChanged] = useState(false);

  useEffect(() => {   
    if(userProfile.userName != params.userName) setNameChanged(true);
    if(userProfile.email != params.email) setEmailChanged(true);
    if(userProfile.wallet != params.address) setAddressChanged(true);
    if(userProfile.guildName != params.guildName) setGuildChanged(true);

  }, [params, nameChanged, emailChanged, addressChanged, userProfile]);

  const saveChanges = async() => {
    let data = {userId: userProfile.userId};
    if(nameChanged) data = {...data, userName: params.userName};
    if(guildChanged) data = {...data, guildName: params.guildName};
    await updateProfile(data);
    setOpen(false);
  }

  const NewNamePopup = () => {
    return (
      <FiefDialog open={open} onClose={() => {setOpen(false)}} className={classes.dialog}>
        <form noValidate className={classes.form}>
          <Grid container className={classes.selectorContainer}>
            <div className={classes.selectorContainer}>
              <Typography className={classes.title}>Change Your Username?</Typography>
              <Divider className={classes.divider} />
              <Typography className={classes.description} style={{paddingBottom: '24px'}}>
                Are you sure to you want to change your Username from <b style={{color: '#797FF2'}}>{userProfile.userName}</b> to <b style={{color: '#797FF2'}}>{params.userName}</b>
              </Typography>
            </div>

            <div className={classes.selectorContainer} style={{paddingTop: '24px'}}>
              <GradientButton fullWidth onClick={saveChanges}>YES, SAVE THE CHANGE</GradientButton>
              <Divider className={classes.divider} />
              <ContainedButton fullWidth onClick={() => {setOpen(false)}}>No, cancel this change</ContainedButton>
            </div>
          </Grid>
        </form>
      </FiefDialog>
    )
  }

  const NewGuildNamePopup = () => {
    return (
      <FiefDialog open={open} onClose={() => {setOpen(false)}} className={classes.dialog}>
        <form noValidate className={classes.form}>
          <Grid container className={classes.selectorContainer}>
            <div className={classes.selectorContainer}>
              <Typography className={classes.title}>Change Your GuildName?</Typography>
              <Divider className={classes.divider} />
              <Typography className={classes.description} style={{paddingBottom: '24px'}}>
                Are you sure to you want to change your GuildName {userProfile.guildName && (<>from <b style={{color: '#797FF2'}}>{userProfile.guildName}</b></>)} to <b style={{color: '#797FF2'}}>{params.guildName}</b>
              </Typography>
            </div>

            <div className={classes.selectorContainer} style={{paddingTop: '24px'}}>
              <GradientButton fullWidth onClick={saveChanges}>YES, SAVE THE CHANGE</GradientButton>
              <Divider className={classes.divider} />
              <ContainedButton fullWidth onClick={() => {setOpen(false)}}>No, cancel this change</ContainedButton>
            </div>
          </Grid>
        </form>
      </FiefDialog>
    )
  }

  const SeveralChangesPopup = () => {
    return (
      <FiefDialog open={open} onClose={() => {setOpen(false)}} className={classes.dialog}>
        <form noValidate className={classes.form}>
          <Grid container className={classes.selectorContainer}>
            <div className={classes.selectorContainer}>
              <Typography className={classes.title}>Update your profile Details?</Typography>
              <Divider className={classes.divider} />
              <Typography className={classes.description} style={{paddingBottom: '24px'}}>
                You are updating your details to the following:
              </Typography>
              <Typography className={classes.description} style={{paddingBottom: '24px'}}>
                User Name: <b style={{color: '#797FF2'}}>{params.userName}</b>
              </Typography>
              <Typography className={classes.description} style={{paddingBottom: '24px'}}>
                Guild Name: <b style={{color: '#797FF2'}}>{params.guildName}</b>
              </Typography>
            </div>

            <div className={classes.selectorContainer} style={{paddingTop: '24px'}}>
              <Typography className={classes.description} style={{paddingBottom: '24px'}}>
                Are you sure you want to change these details?
              </Typography>
              <GradientButton fullWidth onClick={saveChanges}>YES, SAVE THE CHANGE</GradientButton>
              <Divider className={classes.divider} />
              <ContainedButton fullWidth onClick={() => {setOpen(false)}}>No, cancel this change</ContainedButton>
            </div>
          </Grid>
        </form>
      </FiefDialog>
    )
  }

  if(guildChanged && nameChanged) return <SeveralChangesPopup />
  else if(guildChanged) return <NewGuildNamePopup/>
  else return <NewNamePopup/>
};

export default memo(UpdateProfileConfirmForm);
