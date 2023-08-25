import { memo, useCallback, useState, useMemo } from 'react';
import { Typography, Grid, Divider } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAuth } from 'contexts/auth-context';
import { useContracts } from 'contexts/contract-context';
import { useStaking } from 'contexts/staking-context';
import GradientButton from 'components/UI/Buttons/GradientButton';
import SingleTokenTextField from 'components/UI/TextFields/SingleTokenTextField';
import StakeSummaryModal from '../StakeSummaryModal';
import useFormStyles from '../useFormStyles';
import { BALANCE_VALID } from 'utils/constants/validations';
import { estimateSFiefForDate } from 'utils/helpers/stake';
import { formatNumber } from 'utils/helpers/utility';

const IncreaseAmountForm = () => {
  const classes = useFormStyles();
  const { isWrongWallet } = useAuth();
  const {
    balances: { fief: fiefBalance = 0, sFief: sFiefBalance = 0 },
  } = useContracts();
  const { increaseAmount, lockedAmount, unlockTime } = useStaking();

  const [openModal, setOpenModal] = useState(false);

  const schema = yup.object().shape({
    balance: BALANCE_VALID.test(
      'maxBalance',
      fiefBalance > 0 ? `This field should be less than ${fiefBalance}.` : 'Your balance is 0',
      value => parseFloat(value) <= parseFloat(fiefBalance),
    ),
  });

  const { control, handleSubmit, errors, setValue, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const watchAllFields = watch();

  const onSubmit = useCallback(() => {
    setOpenModal(true);
  }, [setOpenModal]);

  const onConfirm = useCallback(async () => {
    try {
      setOpenModal(false);
      await increaseAmount(watchAllFields);
      setValue('balance', 0);
    } catch (error) {
      console.log(error);
    }
  }, [watchAllFields, setValue, setOpenModal, increaseAmount]);

  const estimateSFief = useMemo(
    () =>
      watchAllFields.balance
        ? estimateSFiefForDate(+watchAllFields.balance, new Date(unlockTime)).toFixed(4)
        : 0,
    [watchAllFields, unlockTime],
  );

  return (
    <>
      <form noValidate className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              as={<SingleTokenTextField />}
              type='number'
              token={'MABS'}
              name='balance'
              label={`Choose Amount of MABS to Stake`}
              placeholder='Balance'
              error={errors.balance?.message}
              control={control}
              defaultValue={0.0}
              balance={fiefBalance}
            />
          </Grid>
          <Grid item xs={12}>
            <GradientButton fullWidth disabled={isWrongWallet} type='submit'>
              Increase Stake Amount
            </GradientButton>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.receiveContainer}>
              <Typography className={classes.sFiefBalance}>
                sMABS to Receive
                <span>{formatNumber(estimateSFief)} sMABS</span>
              </Typography>
              <Divider className={classes.horizontalDivider} />
              <Typography className={classes.sFiefBalance}>
                Total after update
                <span>
                  {formatNumber(parseFloat(estimateSFief) + parseFloat(sFiefBalance))} sMABS
                </span>
              </Typography>
              <Divider className={classes.horizontalDivider} />
              <Typography className={classes.sFiefBalance}>
                Daily IP to Receive{' '}
                <span>
                  {formatNumber(
                    (parseFloat(lockedAmount) + parseFloat(watchAllFields.balance)) * 0.03,
                  )}{' '}
                  IP
                </span>
              </Typography>
            </div>
          </Grid>
        </Grid>
      </form>
      {openModal && (
        <StakeSummaryModal
          open={openModal}
          setOpen={setOpenModal}
          type='AMOUNT'
          balance={watchAllFields.balance}
          date={new Date(unlockTime)}
          onConfirm={onConfirm}
        />
      )}
    </>
  );
};

export default memo(IncreaseAmountForm);
