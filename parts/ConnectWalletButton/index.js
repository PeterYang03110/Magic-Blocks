import { memo, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { useWallets } from 'contexts/wallet-context';
import ContainedButton from 'components/UI/Buttons/ContainedButton';

const useStyles = makeStyles(theme => ({
  connectButton: {
    fontSize: 18,
    color: '#FFFFFF',
    background: '#0B0B0B',
    padding: theme.spacing(2, 3),
    textTransform: 'uppercase',
  },
}));

const ConnectWalletButton = ({ className, ...rest }) => {
  const classes = useStyles();
  const { setIsWalletDialog } = useWallets();

  const connectWalletHandler = useCallback(async () => {
    setIsWalletDialog(true);
  }, [setIsWalletDialog]);

  return (
    <ContainedButton
      className={clsx(classes.connectButton, className)}
      {...rest}
      onClick={connectWalletHandler}>
      Connect Wallet
    </ContainedButton>
  );
};

export default memo(ConnectWalletButton);
