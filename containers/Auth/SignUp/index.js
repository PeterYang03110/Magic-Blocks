import { memo, useCallback, useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Typography, FormControlLabel, Grid } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAuth } from 'contexts/auth-context';
import { useWallets } from 'contexts/wallet-context';
import * as authAPI from 'services/api-auth';
import FiefDialog from 'components/FiefDialog';
import FiefCheckbox from 'components/UI/FiefCheckbox';
import GradientButton from 'components/UI/Buttons/GradientButton';
import FiefTextField from 'components/UI/TextFields/FiefTextField';
import LinkButton from 'components/UI/Buttons/LinkButton';
import {
  NAME_VALID,
  EMAIL_VALID,
  PASSWORD_VALID,
  ADDRESS_VALID,
} from 'utils/constants/validations';
import LINKS from 'utils/constants/links';
import AUTH_TYPES from 'utils/constants/auth-types';
import API_SIGN_TYPE from 'utils/constants/api-sign-type';
import useDebounce from 'utils/hooks/useDebounce';
import useAuthStyles from '../useAuthStyles';

const schema = yup.object().shape({
  userName: NAME_VALID,
  email: EMAIL_VALID,
  password: PASSWORD_VALID,
  address: ADDRESS_VALID,
});

const SignUp = ({ setAuthModal }) => {
  const classes = useAuthStyles();
  const { account } = useWeb3React();
  const { register } = useAuth();
  const { setIsWalletDialog } = useWallets();

  const [agree, setAgree] = useState(false);

  const { control, handleSubmit, errors, setValue, setError, clearErrors, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const userNameValue = watch('userName');
  const debouncedCheckUserName = useDebounce(userNameValue, 1000);

  useEffect(() => {
    (async () => {
      if (debouncedCheckUserName) {
        const { data: { isValid = false } = {} } = await authAPI.checkUserName(
          debouncedCheckUserName,
        );

        if (isValid) {
          clearErrors(['userName']);
        } else {
          setError('userName', { type: 'custom', message: 'This Username is not available' });
        }
      }
    })();
  }, [debouncedCheckUserName, clearErrors, setError]);

  const agreeHandler = useCallback(
    event => {
      setAgree(event.target.checked);
    },
    [setAgree],
  );

  const onSubmit = useCallback(
    async data => {
      if (!agree) {
        return;
      }

      await register({ ...data, type: API_SIGN_TYPE.CREDENTIAL });
    },
    [agree, register],
  );

  const connectButtonHandler = useCallback(() => {
    if (account) {
      setValue('address', account);
    } else {
      setIsWalletDialog(true);
    }
  }, [account, setValue, setIsWalletDialog]);

  return (
    <FiefDialog open={true} onClose={() => setAuthModal('')} className={classes.dialog}>
      <form noValidate className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Typography className={classes.title}>Create An Account</Typography>

        <Controller
          as={<FiefTextField />}
          name='userName'
          placeholder='Username'
          error={errors.userName?.message}
          control={control}
          defaultValue={''}
        />

        <Controller
          as={<FiefTextField />}
          name='email'
          placeholder='Email'
          error={errors.email?.message}
          control={control}
          defaultValue={''}
        />

        <Controller
          as={<FiefTextField />}
          type='password'
          name='password'
          placeholder='Password'
          error={errors.password?.message}
          control={control}
          defaultValue={''}
        />

        <Grid container spacing={1} className={classes.container}>
          <Grid item xs={7}>
            <Controller
              as={<FiefTextField />}
              name='address'
              disabled
              placeholder='Wallet Address'
              error={errors.address?.message}
              control={control}
              defaultValue={''}
            />
          </Grid>
          <Grid item xs={5}>
            <LinkButton className={classes.subButton} onClick={connectButtonHandler}>
              {account ? 'Link connected Wallet' : 'Link Wallet'}
            </LinkButton>
          </Grid>
        </Grid>

        <FormControlLabel
          control={<FiefCheckbox checked={agree} onChange={agreeHandler} />}
          label={
            <>
              Confirm you have read and agree with our{' '}
              <a target='_blank' rel='noreferrer' href={LINKS.TERMS_AND_CONDITIONS.HREF}>
                Terms & Conditions
              </a>
            </>
          }
          className={classes.check}
        />

        <GradientButton fullWidth type='submit' disabled={!agree}>
          Create An Account
        </GradientButton>

        <Typography align='center' className={classes.footerDescription}>
          Already have an account?{' '}
          <span onClick={() => setAuthModal(AUTH_TYPES.SIGN_IN)}>Sign In</span>
        </Typography>
      </form>
    </FiefDialog>
  );
};

export default memo(SignUp);
