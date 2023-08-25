import { memo, useCallback, useEffect, useState, useMemo } from 'react';
import { Typography, Grid, Divider } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';

import { useAuth } from 'contexts/auth-context';
import { useStaking } from 'contexts/staking-context';
import GradientButton from 'components/UI/Buttons/GradientButton';
import FiefDatePicker from 'components/UI/FiefDatePicker';
import StakeSummaryModal from '../StakeSummaryModal';
import useFormStyles from '../useFormStyles';
import { DATE_VALID } from 'utils/constants/validations';
import { DATE_LISTS } from 'utils/constants/staking';
import { enableOnlyThursday } from 'utils/helpers/date';
import { estimateSFiefForDate, getTursday } from 'utils/helpers/stake';
import { formatNumber } from 'utils/helpers/utility';

const IncreaseTimeForm = () => {
  const classes = useFormStyles();
  const { isWrongWallet } = useAuth();
  const { increaseTime, lockedAmount = 0, unlockTime } = useStaking();

  const [duration, setDuration] = useState();
  const [openModal, setOpenModal] = useState(false);

  const schema = yup.object().shape({
    date: DATE_VALID.test(
      'date',
      'Date should be in 2 years',
      value => new Date(value) <= DATE_LISTS[3].value,
    ).test('date', "Can't decrease your lockout", value => new Date(value) > new Date(unlockTime)),
  });

  const { control, handleSubmit, errors, setValue, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const watchAllFields = watch();

  useEffect(() => {
    setValue('date', new Date(unlockTime));
  }, [unlockTime, setValue]);

  const onSubmit = useCallback(() => {
    setOpenModal(true);
  }, [setOpenModal]);

  const onConfirm = useCallback(async () => {
    try {
      setOpenModal(false);
      await increaseTime(watchAllFields);
    } catch (error) {
      console.log(error);
    }
  }, [watchAllFields, setOpenModal, increaseTime]);

  const durationHandler = useCallback(
    duration => () => {
      setDuration(duration.value);
      const tursdayDay = getTursday(duration);
      setValue('date', tursdayDay);
    },
    [setDuration, setValue],
  );

  const estimateSFief = useMemo(
    () =>
      lockedAmount
        ? estimateSFiefForDate(
            lockedAmount,
            new Date(watchAllFields.date),
            new Date(unlockTime),
          ).toFixed(4)
        : 0,
    [watchAllFields, lockedAmount, unlockTime],
  );

  return (
    <>
      <form noValidate className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              as={
                <FiefDatePicker>
                  <div className={classes.dateContainer}>
                    <Divider className={classes.horizontalDivider} />
                    <div className={classes.dateButtonContainer}>
                      {DATE_LISTS.map((item, index) => (
                        <GradientButton
                          fullWidth
                          key={index}
                          className={clsx(classes.dateButton, {
                            [classes.unselectedButton]: item.value !== duration,
                          })}
                          onClick={durationHandler(item)}>
                          {item.label}
                        </GradientButton>
                      ))}
                    </div>
                    <Typography className={classes.alert}>
                      Please note: You can’t decrease your staking period.
                    </Typography>
                  </div>
                </FiefDatePicker>
              }
              name='date'
              label={`Stake Until`}
              placeholder='Date'
              minDate={new Date(unlockTime)}
              shouldDisableDate={enableOnlyThursday}
              error={errors.date?.message}
              control={control}
              defaultValue={DATE_LISTS[0].value}
            />
          </Grid>
          <Grid item xs={12}>
            <GradientButton fullWidth disabled={isWrongWallet} type='submit'>
              Increase Stake Period
            </GradientButton>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.receiveContainer}>
              <Typography className={classes.sFiefBalance}>
                sMABS to Receive
                <span>{formatNumber(estimateSFief)} sMABS</span>
              </Typography>
            </div>
          </Grid>
        </Grid>
      </form>
      {openModal && (
        <StakeSummaryModal
          open={openModal}
          setOpen={setOpenModal}
          type='TIME'
          balance={lockedAmount}
          oldDate={unlockTime}
          date={watchAllFields.date}
          onConfirm={onConfirm}
        />
      )}
    </>
  );
};

export default memo(IncreaseTimeForm);
