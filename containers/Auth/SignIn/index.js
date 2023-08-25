import { memo, useCallback, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Typography, FormControlLabel, Divider } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAuth } from 'contexts/auth-context';
import { useWallets } from 'contexts/wallet-context';
import FiefDialog from 'components/FiefDialog';
import FiefCheckbox from 'components/UI/FiefCheckbox';
import FiefTextField from 'components/UI/TextFields/FiefTextField';
import GradientButton from 'components/UI/Buttons/GradientButton';
import AUTH_TYPES from 'utils/constants/auth-types';
import API_SIGN_TYPE from 'utils/constants/api-sign-type';
import { EMAIL_VALID, PASSWORD_VALID } from 'utils/constants/validations';
import useAuthStyles from '../useAuthStyles';

const schema = yup.object().shape({
  email: EMAIL_VALID,
  password: PASSWORD_VALID,
});

const SignIn = ({ setAuthModal }) => {
  const { account } = useWeb3React();
  const { setIsWalletDialog } = useWallets();
  const classes = useAuthStyles();
  const { login } = useAuth();

  const [remember, setRemember] = useState(false);

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const rememberHandler = useCallback(
    event => {
      setRemember(event.target.checked);
    },
    [setRemember],
  );

  const onSubmit = useCallback(
    async data => {
      await login({ ...data, type: API_SIGN_TYPE.CREDENTIAL, remember });
    },
    [remember, login],
  );

  const connectWalletHandler = useCallback(async () => {
    setIsWalletDialog(true);
  }, [setIsWalletDialog]);

  return (
    <FiefDialog open={true} onClose={() => setAuthModal('')} className={classes.dialog}>
      <form noValidate className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Typography className={classes.title}>Sign In To Your Account</Typography>

        {
          !account && 
          <GradientButton onClick={connectWalletHandler} fullWidth type='button'>
            Connect a wallet
          </GradientButton>
        }

        <Controller
          as={<FiefTextField />}
          name='email'
          placeholder='Email'
          error={errors.email?.message}
          control={control}
          defaultValue={''}
          disabled={!account}
        />

        <Controller
          as={<FiefTextField />}
          type='password'
          name='password'
          placeholder='Password'
          error={errors.password?.message}
          control={control}
          defaultValue={''}
          disabled={!account}
        />

        <FormControlLabel
          control={<FiefCheckbox checked={remember} onChange={rememberHandler} />}
          label='Remember me'
          className={classes.check}
        />

        <button
          type='submit'
          className={classes.subButton}
          onClick={() => setAuthModal(AUTH_TYPES.FORGET_PASSWORD)}>
          Forgot your password?
        </button>

        <GradientButton fullWidth type='submit' disabled={!account}>
          Sign In
        </GradientButton>

        <Divider className={classes.divider} />

        <Typography align='center' className={classes.footerDescription}>
          {`Don’t have an account? `}
          <span onClick={() => setAuthModal(AUTH_TYPES.SIGN_UP)}>Sign Up</span>
        </Typography>
      </form>
    </FiefDialog>
  );
};

export default memo(SignIn);
