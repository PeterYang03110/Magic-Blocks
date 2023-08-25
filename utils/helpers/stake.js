import { getEpochSecondForDay } from './date';
import { DATE_LISTS } from 'utils/constants/staking';

const WEEK = 7 * 86400;
const MAXTIME = 2 * 365 * 86400;

export const estimateSFiefForDate = (amount, unlockDate, oldDate = new Date()) => {
  const rounded = Math.floor(getEpochSecondForDay(unlockDate) / WEEK) * WEEK;
  return ((rounded - +oldDate / 1000) / MAXTIME) * amount;
};

export const getTursday = (duration = DATE_LISTS[0]) => {
  const selectedDay = duration.value.getDay();
  const diffDays =
    duration.value.getDate() - (selectedDay >= 4 ? selectedDay - 4 : 3 + selectedDay);
  const tursdayDay = new Date(duration.value.setDate(diffDays));
  return tursdayDay;
};
