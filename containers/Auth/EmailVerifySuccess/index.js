import { memo } from 'react';
import { Typography, Divider } from '@material-ui/core';
import clsx from 'clsx';

import FiefDialog from 'components/FiefDialog';
import GradientButton from 'components/UI/Buttons/GradientButton';
import useAuthStyles from '../useAuthStyles';
import AUTH_TYPES from 'utils/constants/auth-types';

const EmailVerifySuccess = ({ setAuthModal }) => {
  const classes = useAuthStyles();

  return (
    <FiefDialog open={true} onClose={() => setAuthModal('')} className={classes.dialog}>
      <div noValidate className={classes.form}>
        <Typography className={clsx(classes.title, classes.successTitle)}>
          Email Verified!
        </Typography>

        <GradientButton fullWidth onClick={() => setAuthModal(AUTH_TYPES.SIGN_IN)}>
          Sign in
        </GradientButton>

        <Divider className={classes.divider} />

      </div>
    </FiefDialog>
  );
};

export default memo(EmailVerifySuccess);
