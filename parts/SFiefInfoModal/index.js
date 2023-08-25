import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import FiefDialog from 'components/FiefDialog';
import GradientButton from 'components/UI/Buttons/GradientButton';

const useStyles = makeStyles(theme => ({
  modal: {
    maxWidth: 438,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(4),
  },
  description: {
    fontSize: 16,
    color: '#433012',
  },
}));

const SFiefInfoModal = ({ open, setOpen }) => {
  const classes = useStyles();

  return (
    <FiefDialog
      open={open}
      onClose={() => setOpen(false)}
      title='What is sMABS?'
      className={classes.modal}>
      <div className={classes.container}>
        <Typography align='center' className={classes.description}>
          Staked Magic Blocks (sMABS) is the receipt token you receive upon staking Magic Blocks (MABS). sMABS is
          non-transferrable but boasts a variety of use cases within the Magic Blocks platform.
        </Typography>

        <GradientButton onClick={() => setOpen(false)}>Close</GradientButton>
      </div>
    </FiefDialog>
  );
};

export default memo(SFiefInfoModal);
