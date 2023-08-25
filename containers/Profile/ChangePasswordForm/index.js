import { memo, useCallback } from 'react';
import { Typography, Divider, Grid } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import FiefDialog from 'components/FiefDialog';
import { makeStyles } from '@material-ui/core/styles';
import GradientButton from 'components/UI/Buttons/GradientButton';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import FiefTextField from 'components/UI/TextFields/FiefTextField';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { PASSWORD_VALID, CONFIRM_PASSWORD_VALID } from 'utils/constants/validations';
import API_SIGN_TYPE from 'utils/constants/api-sign-type';
import * as authAPI from 'services/api-auth';
import { useAuth } from 'contexts/auth-context';
import { usePopup } from 'contexts/popup-context';


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
    marginTop: 16,
    marginBottom: 16,
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

const schema = yup.object().shape({
  current: PASSWORD_VALID,
  password: PASSWORD_VALID,
  confirm: CONFIRM_PASSWORD_VALID
});

const ChangePasswordForm = ({ open, setOpen}) => {
  const classes = useStyles();
  const { userProfile, updatePassword } = useAuth();
  const { setPopUp } = usePopup();
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = useCallback(
    async data => {
      const params = {
        type: API_SIGN_TYPE.CREDENTIAL,
        email: userProfile.email,
        password: data.current
      };

      try{
        const result = await authAPI.login(params);
        if(result.success) {
          await updatePassword({userId: userProfile.userId, email: userProfile.email, password: data.password})
          setOpen(false);
        }
      } catch (error) {
        setPopUp({
          isError: true,
          title: 'Wrong Password',
          text: 'Current password is not correct.',
        });
      }
    },
    [updatePassword, setOpen, setPopUp, userProfile],
  );

  return (
    <FiefDialog open={open} onClose={() => {setOpen(false)}} className={classes.dialog}>
      <form noValidate className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Grid container className={classes.selectorContainer}>
          <div className={classes.selectorContainer}>
            <Typography className={classes.title}>Change Your Password?</Typography>
            <Divider className={classes.divider} />
            <Typography className={classes.description} style={{paddingBottom: '24px'}}>Change Your Password?</Typography>
          </div>
          <div className={classes.selectorContainer}>
            <Controller
              as={<FiefTextField />}
              label='Current Password'
              name='current'
              type='password'
              placeholder='Current Password'
              error={errors.current?.message}
              control={control}
              defaultValue={''}
            />
            <Controller
              as={<FiefTextField />}
              label='New Password'
              name='password'
              type='password'
              placeholder='New Password'
              error={errors.password?.message}
              control={control}
              defaultValue={''}
            />
            <Controller
              as={<FiefTextField />}
              label='Retype New Password'
              name='confirm'
              type='password'
              placeholder='Retype New Password'
              error={errors.confirm?.message}
              control={control}
              defaultValue={''}
            />
          </div>
          <Typography className={classes.description} style={{paddingTop: '24px'}}>Are you sure want to change your password?</Typography>
          <div className={classes.selectorContainer} style={{paddingTop: '32px'}}>
            <GradientButton fullWidth type='submit'>YES, SAVE THE CHANGE</GradientButton>
            <Divider className={classes.divider} />
            <ContainedButton fullWidth onClick={() => {setOpen(false)}}>No, cancel this change</ContainedButton>
          </div>
        </Grid>
      </form>
    </FiefDialog>
  );
};

export default memo(ChangePasswordForm);
