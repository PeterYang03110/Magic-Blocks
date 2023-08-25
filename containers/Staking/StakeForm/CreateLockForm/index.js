import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Typography, Grid, Divider } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';

import { useContracts } from 'contexts/contract-context';
import { useStaking } from 'contexts/staking-context';
import { useAuth } from 'contexts/auth-context';
import { useWallets } from 'contexts/wallet-context';
import GradientButton from 'components/UI/Buttons/GradientButton';
import ContainedButton from 'components/UI/Buttons/ContainedButton';
import FiefDatePicker from 'components/UI/FiefDatePicker';
import SingleTokenTextField from 'components/UI/TextFields/SingleTokenTextField';
import StakeSummaryModal from '../StakeSummaryModal';
import useFormStyles from '../useFormStyles';
import { BALANCE_VALID, DATE_VALID } from 'utils/constants/validations';
import { DATE_LISTS } from 'utils/constants/staking';
import { estimateSFiefForDate, getTursday } from 'utils/helpers/stake';
import { enableOnlyThursday } from 'utils/helpers/date';
import { formatNumber } from 'utils/helpers/utility';

const CreateLockForm = () => {
  const classes = useFormStyles();
  const { account } = useWeb3React();
  const { accessToken, isWrongWallet } = useAuth();
  const { setIsWalletDialog } = useWallets();
  const { createLock } = useStaking();
  const {
    balances: { fief: fiefBalance = 0 },
  } = useContracts();

  const [duration, setDuration] = useState(DATE_LISTS[0].value);
  const [openModal, setOpenModal] = useState(false);

  const schema = yup.object().shape({
    balance: BALANCE_VALID.test(
      'maxBalance',
      fiefBalance > 0 ? `This field should be less than ${fiefBalance}.` : 'Your balance is 0',
      value => parseFloat(value) <= parseFloat(fiefBalance),
    ),
    date: DATE_VALID.test(
      'date',
      'Date should be in 2 years',
      value => new Date(value) <= DATE_LISTS[3].value,
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
      await createLock(watchAllFields);
      setValue('balance', 0);
    } catch (error) {
      console.log(error);
    }
  }, [watchAllFields, setValue, setOpenModal, createLock]);

  const durationHandler = useCallback(
    duration => () => {
      setDuration(duration.value);
      const tursdayDay = getTursday(duration);
      setValue('date', tursdayDay);
    },
    [setDuration, setValue],
  );

  useEffect(() => {
    if (durationHandler) {
      durationHandler(DATE_LISTS[0]);
    }
  }, [durationHandler]);

  const estimateSFief = useMemo(
    () =>
      watchAllFields.balance
        ? estimateSFiefForDate(+watchAllFields.balance, watchAllFields.date).toFixed(4)
        : 0,
    [watchAllFields],
  );

  return (
    <>
      <form noValidate className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
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
            <Controller
              as={
                <FiefDatePicker>
                  <Divider className={classes.horizontalDivider} />
                  <div className={classes.dateButtonContainer}>
                    {DATE_LISTS.map((item, index) => (
                      <GradientButton
                        fullWidth
                        key={index}
                        className={clsx(classes.dateButton, {
                          [classes.unselectedButton]: item.value !== duration,
                        })}
                        disabled={!account}
                        onClick={durationHandler(item)}>
                        {item.label}
                      </GradientButton>
                    ))}
                  </div>
                </FiefDatePicker>
              }
              name='date'
              label={`Stake Until`}
              placeholder='Date'
              minDate={new Date()}
              shouldDisableDate={enableOnlyThursday}
              error={errors.date?.message}
              control={control}
              defaultValue={getTursday()}
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.receiveContainer}>
              <Typography className={classes.sFiefBalance}>
                Total to Receive <span>{estimateSFief} sMABS</span>
              </Typography>
              <Divider className={classes.horizontalDivider} />
              <Typography className={classes.sFiefBalance}>
                Daily IP to Receive <span>{formatNumber(watchAllFields.balance * 0.03)} IP</span>
              </Typography>
            </div>
          </Grid>
          {(!account) && (
            <Grid item xs={12}>
              <ContainedButton fullWidth color='secondary' onClick={() => setIsWalletDialog(true)}>
                Please connect your wallet
              </ContainedButton>
            </Grid>
          )}
          <Grid item xs={12}>
            <GradientButton fullWidth type='submit' disabled={!account}>
              Stake MABS
            </GradientButton>
          </Grid>
        </Grid>
      </form>
      {openModal && (
        <StakeSummaryModal
          open={openModal}
          setOpen={setOpenModal}
          type='CREATE'
          balance={watchAllFields.balance}
          date={watchAllFields.date}
          onConfirm={onConfirm}
        />
      )}
    </>
  );
};

export default memo(CreateLockForm);
