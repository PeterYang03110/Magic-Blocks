import { getDayOffset } from "utils/helpers/date";

export const DATE_LISTS = [
  { label: '3 months', value: getDayOffset(new Date(), 91) },
  { label: '6 months', value: getDayOffset(new Date(), 182) },
  { label: '1 year', value: getDayOffset(new Date(), 364) },
  { label: '2 years', value: getDayOffset(new Date(), 365 * 2) },
];
