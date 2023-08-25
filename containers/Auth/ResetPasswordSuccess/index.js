import { memo } from 'react';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

import FiefDialog from 'components/FiefDialog';
import GradientButton from 'components/UI/Buttons/GradientButton';
import useAuthStyles from '../useAuthStyles';
import AUTH_TYPES from 'utils/constants/auth-types';

const ResetPasswordSuccess = ({ setAuthModal }) => {
  const classes = useAuthStyles();

  return (
    <FiefDialog open={true} onClose={() => setAuthModal('')} className={classes.dialog}>
      <div noValidate className={classes.form}>
        <Typography className={clsx(classes.title, classes.successTitle)}>
          Success! New Password Created
        </Typography>

        <Typography className={classes.description}>
          Your password has been successfully reset.
        </Typography>

        <GradientButton fullWidth onClick={() => setAuthModal(AUTH_TYPES.SIGN_IN)}>
          Sign in
        </GradientButton>
      </div>
    </FiefDialog>
  );
};

export default memo(ResetPasswordSuccess);
