export const MINUTE_TO_SECOND = 60;
export const HOUR_TO_SECOND = MINUTE_TO_SECOND * 60;
export const DAY_TO_SECOND = HOUR_TO_SECOND * 24;
export const WEEK_TO_SECOND = DAY_TO_SECOND * 7;
export const MONTH_TO_SECOND = DAY_TO_SECOND * 30;
export const YEAR_TO_SECOND = DAY_TO_SECOND * 365;

export function formatTimeDistance(time) {
  if (!time || typeof time !== 'number') {
    return time;
  }
  const timeUnits = [
    { postFix: 'year', value: YEAR_TO_SECOND },
    { postFix: 'month', value: MONTH_TO_SECOND },
    { postFix: 'week', value: WEEK_TO_SECOND },
    { postFix: 'day', value: DAY_TO_SECOND },
    { postFix: 'hour', value: HOUR_TO_SECOND },
    { postFix: 'minute', value: MINUTE_TO_SECOND },
    { postFix: 'second', value: 1 },
  ];

  const seconds =
    time.toString().length > 10
      ? Math.floor((Date.now() - time) / 1000)
      : Math.floor(Date.now() / 1000 - time);

  for (let i = 0; i < timeUnits.length; i += 1) {
    const unit = timeUnits[i];
    const value = Math.floor(seconds / unit.value);
    if (value > 0) {
      return `${value} ${unit.postFix} ago`;
    }
  }
  return `1 minute ago`;
}

/**
 * add date
 * @param {Date} date instance of Date
 * @param {number} value number of day
 * @returns
 */
export function addDate(date, value) {
  if (!(date instanceof Date)) {
    date = new Date();
  }
  if (!value) {
    return date;
  }
  const millisecondsOfDay = 1000 * 3600 * 24;
  return new Date(date.getTime() + value * millisecondsOfDay);
}

/**
 * format Date: YYYY/MM/DD
 * @param {Date} date
 * @param {string} separate separate to divide date part: '/', '-',...
 */
export function dateToYYYYMMDD(date, separate = '/') {
  const y = date.getFullYear();
  const m = `0${date.getMonth() + 1}`.substr(-2);
  const d = `0${date.getDate()}`.substr(-2);
  return `${y}${separate}${m}${separate}${d}`;
}
/**
 * format Date: DD/MM/YYYY
 * @param {Date} date
 * @param {string} separate separate to divide date part: '/', '-',...
 */
export function dateToDDMMYYYY(date, separate = '/') {
  const y = date.getFullYear();
  const m = `0${date.getMonth() + 1}`.substr(-2);
  const d = `0${date.getDate()}`.substr(-2);
  return `${d}${separate}${m}${separate}${y}`;
}

export function startOf(date, unit = 'd') {
  switch (unit) {
    case 'w':
    case 'week':
      return startOfWeek(date);
    case 'm':
    case 'month':
      return startOfMonth(date);
    case 'd':
    case 'day':
    case 'date':
    default:
      return startOfDay(date);
  }
}

function startOfDay(date) {
  const clone = new Date(date);
  clone.setHours(0, 0, 0, 0);
  return clone;
}

function startOfWeek(date) {
  return startOfDay(addDate(date, -date.getDay() + 1));
}

function startOfMonth(date) {
  return startOfDay(addDate(date, -date.getDate() + 1));
}

/**
 *
 * @param {Date} date
 */
export function formatDDMMYYYY(date) {
  if (!date || isNaN(date)) {
    return '';
  }
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString();
  const d = date.getDate().toString();
  return `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${y}`;
}

export function newDateFormatDDMMYYYY(str) {
  if (!str) {
    return undefined;
  }
  try {
    const s = str.split('/').map((v) => +v);
    if (s.length === 3) {
      const date = new Date(s[2], s[1] - 1, s[0]);
      if (!isNaN(date)) {
        return date;
      }
    }
  } catch (e) {
    console.error(e);
  }
  return undefined;
}

export function toYearOption(y) {
  return {
    label: `${y}`,
    value: y,
  };
}

export function toMonthOption(m) {
  return {
    label: `Tháng ${m + 1}`,
    value: m,
  };
}

export function toDateOption(d) {
  return {
    // label: `Ngày ${d}`,
    label: d,
    value: d,
  };
}

const maxYear = 2050;
const minYear = 1900;
export const yearsOptions = Array(maxYear - minYear + 1)
  .fill(0)
  .map((_, i) => toYearOption(maxYear - i));

export const monthOptions = Array(12)
  .fill(0)
  .map((_, i) => toMonthOption(i));

export const getDateOptions = (year, month) => {
  const max = !year || !month ? 31 : new Date(year, month + 1, 0).getDate();

  return Array(max)
    .fill(0)
    .map((_, i) => toDateOption(i + 1));
};

export const minuteOptions = Array(60)
  .fill(0)
  .map((_, i) => ({
    label: i.toString().padStart(2, '0'),
    value: i,
  }));
export const hourOptions = Array(13)
  .fill(0)
  .map((_, i) => ({
    label: i.toString().padStart(2, '0'),
    value: i,
  }));
export const aOptions = [
  { label: 'AM', value: 'am' },
  { label: 'PM', value: 'pm' },
];

export const getCurrentTime = () => {
  const d = new Date();
  return extractTime(`${d.getHours()}:${d.getMinutes()}`);
};

/**
 *
 * @param {string} str
 */
export const extractTime = (str = '') => {
  const [hh = '', mma = ''] = str.toString().split(':');

  const [mm = '', a = ''] = mma.split(' ');
  if (a) {
    return {
      hour: Math.max(0, Math.min(12, +hh)),
      min: Math.max(0, Math.min(59, +mm)),
      a: a.toLowerCase(),
    };
  }
  const hour = Math.max(0, Math.min(24, +hh));
  return {
    hour: hour > 12 ? hour - 12 : hour,
    min: Math.max(0, Math.min(59, +mm)),
    a: hour >= 12 ? 'pm' : 'am',
  };
};

export const formatHHMMA = (obj) => {
  const h = `${obj?.hour ?? 0}`.padStart(2, '0');
  const m = `${obj?.min ?? 0}`.padStart(2, '0');
  const a = `${obj?.a ?? 'am'}`.toUpperCase();
  return `${h}:${m} ${a}`;
};

/**
 *
 * @param {Date} date
 */
export const formatDateTime = (date) => {
  if (!date || isNaN(date)) {
    return '';
  }
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString();
  const d = date.getDate().toString();
  const h = date.getHours().toString();
  const min = date.getMinutes().toString();
  const s = date.getSeconds().toString();
  return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')} ${h.padStart(
    2,
    '0',
  )}:${min.padStart(2, '0')}:${s.padStart(2, '0')}`;
};

/**
 * @param {int} The month number, 0 based
 * @param {int} The year, not zero based, required to account for leap years
 * @return {Date[]} List with date objects for each day of the month
 */
export function getDaysInMonthUTC(month, year) {
  var date = new Date(Date.UTC(year, month, 1));
  var days = [];
  while (date.getUTCMonth() === month) {
    days.push(new Date(date));
    date.setUTCDate(date.getUTCDate() + 1);
  }
  return days;
}

export function getDaysInMonth(month, year) {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}
