const MINUTE_IN_SECOND = 60;
const HOUR_IN_SECOND = MINUTE_IN_SECOND * 60;
const DAY_IN_SECOND = HOUR_IN_SECOND * 24;
const WEEK_IN_SECOND = DAY_IN_SECOND * 7;
const MONTH_IN_SECOND = DAY_IN_SECOND * 30;
const YEAR_IN_SECOND = DAY_IN_SECOND * 365;

export function formatDateTimeDeposit(param) {
  if (typeof param !== 'string') return param;

  const timeArr = param.trim().split(' ');
  const house = timeArr[1].slice(0, 5);
  const date = timeArr[0].split('-');

  return `${date[2]}/${date[1]}/${date[0]} ${house}`;
}

export function formatDateTimeHistory(paramDate) {
  if (!paramDate || typeof paramDate !== 'string') {
    return paramDate;
  }

  const valueTime = Math.floor((Date.now() - Date.parse(paramDate)) / 1000);

  const year = Math.floor(valueTime / YEAR_IN_SECOND);
  if (year > 0) {
    return year + ' năm';
  }

  const month = Math.floor(valueTime / MONTH_IN_SECOND);
  if (month > 0) {
    return month + ' tháng ';
  }

  const week = Math.floor(valueTime / WEEK_IN_SECOND);
  if (week > 0) {
    return week + ' tuần';
  }

  const day = Math.floor(valueTime / DAY_IN_SECOND);
  if (day > 0) {
    return day + ' ngày';
  }

  const hour = Math.floor(valueTime / HOUR_IN_SECOND);
  if (hour > 0) {
    return hour + ' giờ';
  }

  const munite = Math.floor(valueTime / MINUTE_IN_SECOND);
  if (munite > 0) {
    return munite + '  phút';
  }
  return '1 phút';
}

export function formatMoney(paramMoney, separate = '.') {
  if (!paramMoney) {
    return paramMoney;
  }
  const moneyValue = paramMoney.toString();
  const regex = /\B(?=(\d{3})+(?!\d))/g;
  return moneyValue.replace(regex, separate);
}

export function formatName(param) {
  if (param && typeof param !== 'string') {
    return param;
  }
  const text = param.trim();
  if (text.indexOf(' ') < 0) {
    return text.slice(0, 2).toUpperCase();
  }
  var textArr = text.split(' ');
  return (
    textArr[0].slice(0, 1).toUpperCase() + textArr[1].slice(0, 1).toUpperCase()
  );
}

/**
 *
 * @param {Date} date
 */
export function formatDateTime(date) {
  if (!(date instanceof Date)) {
    return '';
  }
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.substr(-2);
  const day = `0${date.getDate()}`.substr(-2);
  const hour = `0${date.getHours()}`.substr(-2);
  const min = `0${date.getMinutes()}`.substr(-2);
  return `${day}/${month}/${year} ${hour}:${min}`;
}

export function range(size, startAt = 0) {
  return [...Array(size).keys()].map((i) => i + startAt);
}

export function validatePassword(p) {
  const errors = [];
  if (p.length < 8) {
    errors.push('Your password must be at least 8 characters');
  }
  if (p.search(/[a-z]/i) < 0) {
    errors.push('Your password must contain at least one letter.');
  }
  if (p.search(/[0-9]/) < 0) {
    errors.push('Your password must contain at least one digit.');
  }
  if (errors.length > 0) {
    return errors.join(' - ');
  }
  return true;
}

export function convertToString18(value) {
  if (!value) return '0';
  if (value.indexOf('.') === -1) {
    return value + '000000000000000000';
  }
  var splitArr = value.split('.');
  var x = splitArr[1];
  while (x.length < 18) {
    x += '0';
  }
  var v1 = splitArr[0].replace(/,/g, '') * 1;
  if (v1 > 0) {
    return [v1, x].join('');
  }
  return (x * 1).toString();
}

export function formatMetaCoin(iData, isCompact) {
  if (!iData) {
    return 0;
  }
  if (iData === 0) {
    return 0;
  }
  const value = iData.toString();

  try {
    const compactCoin = (coin) => {
      if (coin.indexOf(',') > -1) {
        const str = coin.substr(0, coin.indexOf('.'));
        if (str.length > 10) {
          return str;
        }
        const iStart = coin.indexOf('.') + 1;
        const firstLetterAffterDot = coin.substr(iStart, 3);
        return `${str}.${firstLetterAffterDot}***`;
      } else {
        const strBeforeDot = coin.substr(0, coin.indexOf('.'));
        // const strAfterDot = coin.substr(coin.indexOf('.') + 1);
        return `${strBeforeDot}.${coin.substr(
          coin.indexOf('.') + 1,
          1,
        )}***${coin.substr(-6)}`;
      }
    };

    const formatFunction = () => {
      var isExistDot = value.indexOf('.') > -1;
      if (isExistDot) {
        var strTest = value.substr(value.indexOf('.') + 1);
        if (strTest.length < 18) {
          return 0;
        } else {
          return value;
        }
      } else {
        var valLength = value.length;
        if (valLength <= 18) {
          var newValue = value;
          while (newValue.length < 18) {
            newValue = '0' + newValue;
          }
          return `0.${newValue}`;
        } else {
          var after = value.substr(-18);
          var before = value.substr(0, value.indexOf(after));
          var beforeLength = before.length;
          if (beforeLength > 3) {
            before = formatMoney(before, ',');
          }
          return `${before}.${after}`;
        }
      }
    };
    const result = formatFunction();
    if (isCompact) {
      return compactCoin(result);
    }
    return result;
  } catch (error) {
    console.log('formatMetaCoin  error ', error);
  }
}
