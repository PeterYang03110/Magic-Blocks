import { memo, useCallback } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAuth } from 'contexts/auth-context';
import FiefDialog from 'components/FiefDialog';
import GradientButton from 'components/UI/Buttons/GradientButton';
import LinkButton from 'components/UI/Buttons/LinkButton';
import FiefTextField from 'components/UI/TextFields/FiefTextField';
import { EMAIL_VALID } from 'utils/constants/validations';
import useAuthStyles from '../useAuthStyles';

const schema = yup.object().shape({
  email: EMAIL_VALID,
});

const VerifyAccount = ({ email, setAuthModal }) => {
  const classes = useAuthStyles();
  const { resendVerifyEmail } = useAuth();
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async data => {
      await resendVerifyEmail(data);
    },
    [resendVerifyEmail],
  );

  return (
    <FiefDialog open={true} onClose={() => setAuthModal('')} className={classes.dialog}>
      <form noValidate className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Typography className={classes.title}>Verify Your Email</Typography>

        <Typography className={classes.description}>
          We have sent you an email. Verify your email address when you get a chance.
        </Typography>

        <Grid container spacing={1} className={classes.container}>
          <Grid item xs={8} sm={9}>
            <Controller
              as={<FiefTextField />}
              name='email'
              placeholder='Email'
              error={errors.email?.message}
              control={control}
              defaultValue={email}
            />
          </Grid>
          <Grid item xs={4} sm={3}>
            <button type='submit' className={classes.subButton}>
              Resend email
            </button>
          </Grid>
        </Grid>

        <LinkButton className={classes.subButton}>{`Still didn’t receive an email?`}</LinkButton>

        <GradientButton fullWidth onClick={() => setAuthModal('')}>
          Close
        </GradientButton>
      </form>
    </FiefDialog>
  );
};

export default memo(VerifyAccount);
