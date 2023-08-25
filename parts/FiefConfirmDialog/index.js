import { memo } from 'react';
import { Typography } from '@material-ui/core';

import FiefDialog from 'components/FiefDialog';

const DEFAULT_DESCRIPTION = 'Are you sure to proceed this operation?';

const FiefConfirmDialog = ({ text = DEFAULT_DESCRIPTION, ...rest }) => {
  return (
    <FiefDialog {...rest}>
      <Typography color='textSecondary' variant='h5' align='center'>
        {text}
      </Typography>
    </FiefDialog>
  );
};

export default memo(FiefConfirmDialog);
