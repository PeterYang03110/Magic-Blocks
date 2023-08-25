import { memo, useCallback } from 'react';
import { Typography, Divider, Grid } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import FiefDialog from 'components/FiefDialog';
import { makeStyles } from '@material-ui/core/styles';
import GradientButton from 'components/UI/Buttons/GradientButton';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import FiefTextField from 'components/UI/TextFields/FiefTextField';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ADDRESS_VALID } from 'utils/constants/validations';
import getEllipsis from 'utils/helpers/getEllipsis';
import { isAddress } from 'web3-utils';

const useStyles = makeStyles(() => ({
  dialog: {
    maxWidth: 500,
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 1,
    fontFamily: 'pedestria-mvb',
    color: '#000000',
  },
  form: {
    display: 'flex',
    padding: '24px',
  },
  divider: {
    height: 1,
    width: '100%',
    marginTop: 16,
    marginBottom: 16,
    background: '#D8DAE5',
  },
  selectorContainer: {
    display: 'flex',
    alignContent: 'space-around',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%'
  }
}));

const schema = yup.object().shape({
  current: ADDRESS_VALID,
  new: ADDRESS_VALID,
});

const LinkNewWalletForm = ({ open, setOpen, current, setNewWallet}) => {
  const classes = useStyles();
  const { control, handleSubmit, errors, setError } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = useCallback(
    async data => {
      if(!errors.new?.message)
      {
        if(!isAddress(data.new))
        {
          setError('new', {type: 'custom', message: 'address is note valid.'});
        } else {
          setNewWallet('address', data.new);
          setOpen(false);
        }
      }
    },
    [errors, setError, setNewWallet, setOpen],
  );

  return (
    <FiefDialog open={open} onClose={() => {setOpen(false)}} className={classes.dialog}>
      <form noValidate className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Grid container className={classes.selectorContainer}>
          <div>
            <Typography className={classes.title}>Link a different wallet to your account?</Typography>
            <Divider className={classes.divider} />
          </div>
          <div>
            <Controller
              as={<FiefTextField />}
              label='Your currently linked wallet address'
              name='current'
              placeholder='Current Wallet Address'
              error={errors.current?.message}
              control={control}
              defaultValue={current ? getEllipsis(current, 15) : ''}
              disabled
            />
            <Controller
              as={<FiefTextField />}
              label='Your new address'
              name='new'
              placeholder='New Wallet Address'
              error={errors.new?.message}
              control={control}
              defaultValue={''}
            />
          </div>
          <div style={{paddingTop: '32px'}}>
            <GradientButton fullWidth type='submit'>SAVE NEW WALLET ADDRESS</GradientButton>
            <Divider className={classes.divider} />
            <ContainedButton fullWidth onClick={() => {setOpen(false)}}>No, cancel this change</ContainedButton>
          </div>
        </Grid>
      </form>
    </FiefDialog>
  );
};

export default memo(LinkNewWalletForm);
