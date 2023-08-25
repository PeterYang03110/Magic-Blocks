import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/CloseOutlined';

import ContainedButton from 'components/UI/Buttons/ContainedButton';

const useStyles = makeStyles(() => ({
  button: {
    fontSize: 14,
    fontWeight: 700,
    borderRadius: 50,
    backgroundColor: '#474D66',
    color: '#FFFFFF',
    border: 0,
  },
  icon: {
    color: '#EBD5B3',
  },
}));

const FilterButton = ({ children, ...rest }) => {
  const classes = useStyles();

  return (
    <ContainedButton
      endIcon={<CloseIcon className={classes.icon} />}
      className={classes.button}
      {...rest}>
      {children}
    </ContainedButton>
  );
};

export default memo(FilterButton);
