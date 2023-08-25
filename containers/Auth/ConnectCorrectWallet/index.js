import { memo, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Typography, Divider } from '@material-ui/core';

import { useAuth } from 'contexts/auth-context';
import { useWallets } from 'contexts/wallet-context';
import FiefDialog from 'components/FiefDialog';
import FiefTextField from 'components/UI/TextFields/FiefTextField';
import AUTH_TYPES from 'utils/constants/auth-types';
import getEllipsis from 'utils/helpers/getEllipsis';
import useAuthStyles from '../useAuthStyles';

const ConnectCorrectWallet = ({ setAuthModal }) => {
  const { account } = useWeb3React();
  const { setIsWalletDialog } = useWallets();
  const classes = useAuthStyles();
  const {
    userProfile: { email = '', wallet = '' } = {},
    logout
  } = useAuth();

  const connectWalletHandler = useCallback(async () => {
    setIsWalletDialog(true);
  }, [setIsWalletDialog]);


  return (
    <FiefDialog open={true} onClose={() => {
      setAuthModal('');
      logout();
    }} className={classes.dialog}>
      <form noValidate className={classes.form}>
        <Typography className={classes.title}>Sign In To Your Account</Typography>

        <FiefTextField disabled value={email} type='alert'></FiefTextField>

        <Typography className={classes.errorSubDescription}>An account with this email is linked to a different wallet</Typography>

        <Typography className={classes.title}>Connect a Different Wallet</Typography>

        <Typography className={classes.errorSubDescription}>Incorrect wallet connected</Typography>

        <FiefTextField disabled value={getEllipsis(wallet, 15)} type='cross' smallLabel='Connected Wallet'></FiefTextField>

        <FiefTextField disabled value={getEllipsis(account, 15)} type='checked' smallLabel='Correct Wallet'></FiefTextField>

        <Typography className={classes.subButton} onClick={connectWalletHandler}>
          Link a different wallet
        </Typography>

        <Divider className={classes.divider} />

        <Typography align='center' className={classes.footerDescription}>
          {`Don’t have an account? `}
          <span onClick={() => setAuthModal(AUTH_TYPES.SIGN_UP)}>Sign Up</span>
        </Typography>
      </form>
    </FiefDialog>
  );
};

export default memo(ConnectCorrectWallet);
