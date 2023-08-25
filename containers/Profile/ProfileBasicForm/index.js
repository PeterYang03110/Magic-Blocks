import { memo, useCallback, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import { Typography, Grid, Divider, Box } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';

import { useAuth } from 'contexts/auth-context';
import { useAsset } from 'contexts/asset-context';
import { usePopup } from 'contexts/popup-context';
import * as authAPI from 'services/api-auth';
import FiefTextField from 'components/UI/TextFields/FiefTextField';
import GradientButton from 'components/UI/Buttons/GradientButton';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import LinkButton from 'components/UI/Buttons/LinkButton';
import {
  NAME_VALID,
  EMAIL_VALID,
  // PASSWORD_VALID,
  ADDRESS_VALID,
} from 'utils/constants/validations';
import useDebounce from 'utils/hooks/useDebounce';
import { isEmpty } from 'utils/helpers/utility';
import StatusBar from 'components/UI/StatusBar';
import BorderCardWrapper from 'parts/BorderCardWrapper';
import { PROFILE_AVATAR_ICON_PATH } from 'utils/constants/image-paths';
import SelectAvatarForm from '../SelectAvatarForm';
import LinkNewWalletForm from '../LinkNewWalletForm';
import AUTH_TYPES from 'utils/constants/auth-types';
import ChangePasswordForm from '../ChangePasswordForm';
import clsx from 'clsx';
import UpdateProfileConfirmForm from '../UpdateProfileConfirmForm';

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 24,
    lineHeight: 1,
    fontFamily: 'pedestria-mvb',
    color: '#000000',
  },
  divider: {
    height: 1,
    width: '100%',
    margin: '16px 0px',
    background: '#D8DAE5',
  },
  text: {
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 800,
    color: 'black',
    fontFamily: 'Inter',
  },
  description: {
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 500,
    color: '#8F95B2',
    fontFamily: 'Inter',
  },
  form: {
    display: 'flex',
    maxWidth: 800,
    width: '100%',
  },
  checking: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    color: '#77767B',
    height: '100%',
  },
  subButton: {
    display: 'flex',
    alignItems: 'center',
    color: '#4D6EFF',
    height: '100%',
  },
  statusBarContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  statusContainer: {
    display: 'flex',
    paddingBottom: '16px'
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  avatarChangeButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 16,
    width: '70%'
  },
  avatarWrapper: {
    height: 200,
    cursor: 'pointer',
    background: '#2c2c2c',
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    width: 200,
    height: 200,
    objectFit: 'cover',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
  },
  linkButton: {
    color: '#4D6EFF',
    marginTop: 24
  },
  saveButton: {
    width: 214,
    height: 48,
    borderRadius: 6,
  },
  okContainer: {
    width: 492, 
    height: 96, 
    background: '#1F182A', 
    boxShadow: '0px 12px 40px rgba(70, 74, 156, 0.15)', 
    borderRadius: 12, 
    padding: 24, 
    gap: 8, 
    display: 'flex', 
    justifyContent: 'center', 
    alignContent: 'center'
  },
  nameCheckingLabel: {
    fontSize: 14,
    lineHeight: '24px',
    fontWeight: 500,
    fontFamily: 'Inter',
    color: '#797FF2',
    paddingTop: 8
  }
}));

const schema = yup.object().shape({
  userName: NAME_VALID,
  email: EMAIL_VALID,
  address: ADDRESS_VALID,
  guild: null
});

const ProfileBasicForm = () => {
  const classes = useStyles();
  const { setPopUp } = usePopup();
  const { userAvatars } = useAsset();
  const router = useRouter();
  const { account } = useWeb3React();
  const { accessToken, userProfile, setAuthModal } = useAuth();

  useEffect(() => {
    if(!accessToken || !userProfile || !account) {
      router.push('/');
    }
  }, [accessToken, userProfile, account, router]);

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [changed1, setChanged1] = useState(false);
  const [changed2, setChanged2] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [checkingName, setCheckingName] = useState(false);
  const [checkingName1, setCheckingName1] = useState(false);

  const { control, handleSubmit, errors, setValue, setError, clearErrors, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const userNameValue = watch('userName');
  const userEmailValue = watch('email');
  const userAddressValue = watch('address');
  const userGuildValue = watch('guild');
  const debouncedCheckUserName = useDebounce(userNameValue, 1000);
  const debouncedCheckUserEmail = useDebounce(userEmailValue, 1000);
  const debouncedCheckUserAddress = useDebounce(userAddressValue, 1000);
  const debouncedCheckGuildName = useDebounce(userGuildValue, 1000);

  useEffect(() => {
    if (!isEmpty(userProfile)) {
      setValue('userName', userProfile?.userName);
      setValue('email', userProfile?.email);
      setValue('address', userProfile?.wallet);
      setValue('guild', userProfile?.guildName);
    }
  }, [userProfile, setValue]);

  useEffect(() => {
    (async () => {
      setTimeout(function() {
        if ((debouncedCheckUserName !== userProfile.userName || debouncedCheckGuildName != userProfile.guildName) && (!errors.userName && !errors.guild)) {
          setShowSave(true);
        } else {
          setShowSave(false);
        }
      }, 1000);
    })();

  }, [userProfile, errors, debouncedCheckGuildName, debouncedCheckUserName]);

  useEffect(() => {
    (async () => {
      setCheckingName(true);
      if(debouncedCheckUserName)
      {
        if (debouncedCheckUserName != userProfile.userName) {
          const { data: { isValid = false } = {} } = await authAPI.checkUserName(
            debouncedCheckUserName,
          );
  
          if(!isValid && userProfile.userName != debouncedCheckUserName) {
            setError('userName', { type: 'custom', message: 'This Username is not available' });
          } else {
            clearErrors(['userName']);
          }
  
          if(errors.name) setChanged1(false);
          else setChanged1(true);
        }
      }
      setCheckingName(false);
    })();

  }, [debouncedCheckUserName, clearErrors, setError, userProfile, errors]);

  useEffect(() => {
    (async () => {
      setCheckingName1(true);
      if(debouncedCheckGuildName) {
        if (debouncedCheckGuildName != userProfile.guildName) {
          const { data: { isValid = false } = {} } = await authAPI.checkGuildName(
            debouncedCheckGuildName,
          );
  
          if(!isValid && userProfile.guildName != debouncedCheckGuildName) {
            setError('guild', { type: 'custom', message: 'This GuildName is not available' });
          } else {
            clearErrors(['guild']);
          } 
  
          if(errors.name) setChanged2(false);
          else setChanged2(true);
        }
      }
      setCheckingName1(false);
    })();

  }, [debouncedCheckGuildName, clearErrors, setError, userProfile, errors]);

  const onSubmit = useCallback(
    async () => {
      setOpen4(true);
    },
    [setOpen4],
  );

  const resendEmail = async() => {
    try{
      await authAPI.resendVerifyEmail(userProfile?.email);
      setAuthModal(AUTH_TYPES.VERIFY_ACCOUNT);
    } catch(error) {
      setPopUp({
        title: 'Verify Email Error',
        text: ' There is an error in resend verify email.',
      });
    }
  }

  const getAvatarImage = (selectedAvatar) => {
    var img_url = PROFILE_AVATAR_ICON_PATH;
    if(selectedAvatar && selectedAvatar.split('#').length === 3) {
      const contractAddress = selectedAvatar.split('#')[0];
      const chainId = parseInt(selectedAvatar.split('#')[1]);
      const tokenId = parseInt(selectedAvatar.split('#')[2]);
      userAvatars.forEach(element => {
        if(element.contractAddress == contractAddress && element.chainId == chainId && element.tokenId == tokenId)
        img_url = element.image;
      });
    }

    return img_url;
  }

  return (
    <div>
      <form noValidate className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.statusBarContainer}>
            <Grid className={classes.statusContainer}>
              <Typography className={classes.text}>100% complete </Typography>
              {/* <Typography className={classes.description}> - Infomation missing </Typography> */}
            </Grid>
            <StatusBar status={10}/>
          </Grid>
          <Divider className={classes.divider} />
          <Grid item xs={12} className={classes.avatarContainer}>
            <BorderCardWrapper rootClassName={classes.avatarWrapper}>
              <img
                alt='profile'
                src={getAvatarImage(userProfile.selectedAvatar)}
                className={classes.avatar}
                onClick={()=> {setOpen1(true)}}
              />
            </BorderCardWrapper>
            <Grid className={classes.avatarChangeButtonContainer}>
              <Typography className={classes.title}>Your Avatar</Typography>
              <Divider className={classes.divider} />
              <GradientButton className={classes.button} style={{width: 208}} onClick={() => {setOpen1(true)}}>
                Change Default
              </GradientButton>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid item xs={12}>
            <Typography className={classes.title}>Basic Details</Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Controller
              as={<FiefTextField />}
              label='Username'
              name='userName'
              placeholder='Username'
              error={errors.userName?.message}
              control={control}
              type={errors.userName ? 'refresh' : 'checked'}
              defaultValue={''}
            />
          </Grid>
          <Grid item xs={12} sm={5}  className={classes.button} style={{paddingTop: errors.userName ? 8 : 28}}>
            <Typography fullWidth className={classes.nameCheckingLabel}>
              {
                checkingName ? 'Checking availability...' : 
                changed1 && !errors.userName && userProfile.userName != debouncedCheckUserName ?  
                'Username available' : ''}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Controller
              as={<FiefTextField />}
              label='Guild'
              name='guild'
              placeholder='Choose a name'
              control={control}
              error={errors.guild?.message}
              type={errors.guild ? 'refresh' : debouncedCheckGuildName ? 'checked' : 'text'}
              defaultValue={''}
            />
          </Grid>
          <Grid item xs={12} sm={5}  className={classes.button} style={{paddingTop: errors.guild ? 8 : 28}}>
            <Typography fullWidth className={classes.nameCheckingLabel}>
              {
                checkingName1 ? 'Checking availability...' : 
                changed2 && !errors.guild ?  debouncedCheckGuildName ? 'Guildname available' : '' : ''}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Controller
              as={<FiefTextField />}
              label='Email'
              name='email'
              placeholder='Email'
              type={userProfile.validated ? 'green_shield' : 'warning_shield'}
              error={errors.email?.message}
              control={control}
              defaultValue={''}
            />
          </Grid>
          <Grid item xs={12} sm={7}  className={classes.button}>
            {
              !userProfile.validated &&         
                <LinkButton fullWidth className={clsx(classes.button, classes.linkButton)} onClick={resendEmail}>
                  Resend Verification Email
                </LinkButton>
            }
          </Grid>
          <Grid item xs={12} sm={12} className={classes.button}>
            <LinkButton fullWidth className={clsx(classes.button, classes.linkButton)} onClick={() => {setOpen3(true)}}>
              Change Password
            </LinkButton>
            <Typography className={classes.description} style={{marginTop: 24, marginLeft: 8}}>
              {userProfile.authorizerModified && <>Recently changed {new Date(userProfile.authorizerModified).toLocaleString("en-US")}</>}
            </Typography>
          </Grid>
          {/* <Grid item xs={12} sm={5}>
            <Controller
              as={<FiefTextField />}
              label='Wallet Address'
              name='address'
              placeholder='Wallet Address'
              error={errors.address?.message}
              control={control}
              defaultValue={''}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={7}  className={classes.button}>
            <LinkButton fullWidth className={clsx(classes.button, classes.linkButton)} onClick={() => {setOpen2(true)}}>
              Link a different wallet
            </LinkButton>
          </Grid>
          <Grid item xs={12} className={classes.statusBarContainer}>
            <Grid className={classes.statusContainer}>
              <Typography className={classes.text}>Note: </Typography>
              <Typography className={classes.description}>There is a limit of changing your wallet address once per month. </Typography>
            </Grid>
          </Grid> */}
          <Divider className={classes.divider} />
          <Grid item xs={12} className={classes.statusBarContainer} style={{alignItems: 'center'}}>
            {showSave && <>
              <Box className={classes.okContainer}>
                <ContainedButton className={clsx(classes.button, classes.saveButton)} onClick={() => {router.push('/')}}>CANCEL CHANGES</ContainedButton>
                <GradientButton className={clsx(classes.button, classes.saveButton)} type='submit'>SAVE CHANGES</GradientButton>
              </Box>
            </>}
          </Grid>
        </Grid>
      </form>
      {open1 && <SelectAvatarForm open={open1} setOpen={setOpen1} selectedAvatar={userProfile.selectedAvatar} />}
      {open2 && <LinkNewWalletForm open={open2} setOpen={setOpen2} current={userProfile?.wallet} setNewWallet={setValue}/>}
      {open3 && <ChangePasswordForm open={open3} setOpen={setOpen3} setNewPassword={setValue}/>}
      {open4 && <UpdateProfileConfirmForm open={open4} setOpen={setOpen4} params={{
        userName: debouncedCheckUserName,
        email: debouncedCheckUserEmail,
        address: debouncedCheckUserAddress,
        guildName: debouncedCheckGuildName
      }}/>}
    </div>
  );
};

export default memo(ProfileBasicForm);
