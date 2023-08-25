import { format } from 'date-fns';

const isServer = () => typeof window === 'undefined';

const isEmpty = value => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

const delay = ms => new Promise(res => setTimeout(res, ms));

const formatDate = (date, dateFormat = 'MM.dd.yyyy') => {
  try {
    return format(date, dateFormat);
  } catch (error) {
    console.log(error);
  }
  return null;
};

const zeroPad = (num, places) => String(num).padStart(places, '0');

const formatNumber = (number, decimal = 2) => {
  if (!number) return 0;
  const numberValue = Number(number) || 0;
  return numberValue.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimal,
  });
};

export { isServer, isEmpty, delay, formatDate, formatNumber, zeroPad };
