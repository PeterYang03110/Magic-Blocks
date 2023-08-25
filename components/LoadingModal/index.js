import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Typography } from '@material-ui/core';

import FiefDialog from 'components/FiefDialog';
import LoadingLogo from 'components/LoadingLogo';

const useStyles = makeStyles(theme => ({
  modal: {
    maxWidth: 450,
  },
  description: {
    marginBottom: theme.spacing(2),
    color: '#474D66',
  },
  note: {
    color: '#474D66',
    textAlign: 'center',
    '& a': {
      color: '#f6851b',
    },
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#433012',
    margin: theme.spacing(2, 0),
  },
}));

const LoadingModal = ({ open, title = '', description = '', icon = 'MABS' }) => {
  const classes = useStyles();

  return (
    <FiefDialog open={open} title={title} className={classes.modal}>
      <LoadingLogo icon={icon} />
      <Typography className={classes.description}>{description}</Typography>
      <Divider className={classes.divider} />
      <Typography className={classes.note}>
        Dont forget to install the easy to use
        <a href={'https://metamask.io/download'} target='_blank' rel='noreferrer'>
          Metamask browser extention
        </a>
      </Typography>
    </FiefDialog>
  );
};

export default memo(LoadingModal);
