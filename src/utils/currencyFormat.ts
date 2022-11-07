function parseLocaleNumber(stringNumber: string, locale: string) {
  var thousandSeparator = Intl.NumberFormat(locale)
    .format(11111)
    .replace(/\p{Number}/gu, '');
  var decimalSeparator = Intl.NumberFormat(locale)
    .format(1.1)
    .replace(/\p{Number}/gu, '');

  return parseFloat(
    stringNumber
      .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
      .replace(new RegExp('\\' + decimalSeparator), '.'),
  );
}

function numberCurrencyFormat(number: number): number | string {
  const vndFormat = (val) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(val);
  };

  return vndFormat(number);
}

function numberWithCommas(x: number, commas = '.') {
  try {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, commas);
  } catch (error) {
    console.log({ error });
    return x.toString();
  }
}

export { parseLocaleNumber, numberWithCommas, numberCurrencyFormat };
