import { memo, useCallback, useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAuth } from 'contexts/auth-context';
import FiefDialog from 'components/FiefDialog';
import FiefTextField from 'components/UI/TextFields/FiefTextField';
import GradientButton from 'components/UI/Buttons/GradientButton';
import { PASSWORD_VALID, CONFIRM_PASSWORD_VALID, PASSWORD_VALID_ERRORS } from 'utils/constants/validations';
import useAuthStyles from '../useAuthStyles';
import ErrorShieldIcon from 'components/Icons/ErrorShieldIcon';
import useDebounce from 'utils/hooks/useDebounce';

const schema = yup.object().shape({
  password: PASSWORD_VALID,
  confirmPassword: CONFIRM_PASSWORD_VALID,
});

const ResetPassword = ({ open, setOpen }) => {
  const classes = useAuthStyles();
  const { resetPassword } = useAuth();

  const { control, handleSubmit, errors, watch, clearErrors, setError } = useForm({
    criteriaMode: 'all',
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async data => {
      await resetPassword(data);
      setOpen(false);
    },
    [resetPassword, setOpen],
  );

  const passwordValue = watch('password');
  const debouncedCheckPassword = useDebounce(passwordValue, 1000);

  const [lengthFailed, setLengthFailed] = useState(false);
  const [specialFailed, setSpecialFailed] = useState(false);
  const [lowerFailed, setLowerFailed] = useState(false);
  const [upperFailed, setUpperFailed] = useState(false);
  const [numberFailed, setNumberFailed] = useState(false);

  useEffect(() => {
    setSpecialFailed(false);
    setUpperFailed(false);
    setLowerFailed(false);
    setNumberFailed(false);
    setLengthFailed(false);
    if(errors.password?.types) {
      if(errors.password.types.min)
        setLengthFailed(true);
      if(errors.password.types.matches){
        if(typeof errors.password.types.matches === 'string')
          getFailedType(errors.password.types.matches);
        else{
          errors.password.types.matches.forEach(match => {
            getFailedType(match);
          });
        }
      }
    }
  }, [errors.password, debouncedCheckPassword, clearErrors, setError]);

  const getFailedType = (error) => {
    switch(error) {
      case PASSWORD_VALID_ERRORS.SPECIAL:
        setSpecialFailed(true);
        break;
      case PASSWORD_VALID_ERRORS.LOWERCASE:
        setLowerFailed(true);
        break;
      case PASSWORD_VALID_ERRORS.UPPERCASE:
        setUpperFailed(true);
        break;
      case PASSWORD_VALID_ERRORS.NUMBER:
        setNumberFailed(true);
        break;
    }
  }

  return (
    <FiefDialog open={open} onClose={() => setOpen(false)} className={classes.dialog}>
      <form noValidate className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Typography className={classes.title}>Create a New Password</Typography>

        <Typography className={classes.description}>
          Your new password must be different from the previous used passwords.
        </Typography>

        <Controller
          as={<FiefTextField />}
          type='password'
          name='password'
          placeholder='Password'
          control={control}
          defaultValue={''}
        />
        <Typography className={classes.validateContainer}>
          <Typography className={
            lengthFailed && 
            classes.validate_failed
          }>
            &bull;Passwords need to be at least 8 characters.
          </Typography>

          <Typography className={classes.validate_success}>
            &bull;Should contain:
          </Typography>

          <Typography className={classes.validate_ch_container}>

            <Typography className={
              lowerFailed && 
              classes.validate_failed
            }>
              &bull;Lower case characters (a-z)
            </Typography>

            <Typography className={
              upperFailed &&
              classes.validate_failed
            }>
              &bull;Upper case characters (A-Z)
            </Typography>
            
            <Typography className={
              specialFailed &&
              classes.validate_failed
            }>
              &bull;Special characters (i.e. !,@,#,$)
            </Typography>

            <Typography className={
              numberFailed &&
              classes.validate_failed
            }>
              &bull;Numbers (i.e. 0-9)
            </Typography>

          </Typography>
        </Typography>

        <Controller
          as={<FiefTextField />}
          type='password'
          name='confirmPassword'
          placeholder='Confirm Password'
          error={errors.confirmPassword?.message}
          control={control}
          defaultValue={''}
        />
        {
          errors.confirmPassword?.message ==  'Both passwords must be the same.' &&
          <Typography className={classes.validateConfirmContainer}>
            <ErrorShieldIcon/>Password do not match.
          </Typography>
        }
        <GradientButton fullWidth type='submit'>
          Continue
        </GradientButton>
      </form>
    </FiefDialog>
  );
};

export default memo(ResetPassword);
