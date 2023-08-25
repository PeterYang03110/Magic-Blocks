import { memo, useCallback } from 'react';
import { Typography } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import * as yup from 'yup';

import { useAuth } from 'contexts/auth-context';
import FiefDialog from 'components/FiefDialog';
import FiefTextField from 'components/UI/TextFields/FiefTextField';
import GradientButton from 'components/UI/Buttons/GradientButton';
import GreenCheckCircleIcon from 'components/Icons/GreenCheckCircleIcon';
import AUTH_TYPES from 'utils/constants/auth-types';
import { EMAIL_VALID } from 'utils/constants/validations';
import useAuthStyles from '../useAuthStyles';

const schema = yup.object().shape({
  email: EMAIL_VALID,
});

const ForgetPassword = ({ setAuthModal }) => {
  const classes = useAuthStyles();
  const { resetPasswordEmail } = useAuth();

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async data => {
      await resetPasswordEmail(data);
    },
    [resetPasswordEmail],
  );

  return (
    <FiefDialog open={true} className={classes.dialog}>
      <form noValidate className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Typography className={classes.back} onClick={() => setAuthModal(AUTH_TYPES.SIGN_IN)}>
          <ArrowBackIcon />
          Back to Sign In To Your Account
        </Typography>

        <Typography className={classes.title}>Password Reset</Typography>

        <Typography className={classes.description}>
          Enter your email address to receive a link to reset your password.
        </Typography>

        <Controller
          as={<FiefTextField />}
          name='email'
          placeholder='Email'
          error={errors.email?.message}
          control={control}
          defaultValue={''}
        />

        <GradientButton fullWidth type='submit'>
          Send Reset link
        </GradientButton>

        <div className={classes.alertContainer}>
          <GreenCheckCircleIcon />
          <Typography className={classes.alert}>
            If there is an account associated with this email address, a message with instructions
            on how to reset the password will be sent shortly.
          </Typography>
        </div>
      </form>
    </FiefDialog>
  );
};

export default memo(ForgetPassword);
