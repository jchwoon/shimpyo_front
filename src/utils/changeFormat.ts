export const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const formattedDate = new Intl.DateTimeFormat('ko-Kr', options).format(date);
  return formattedDate;
};

export const changeDateType = (date: string) => {
  const [year, month, day, hour = 24] = date.split('.').map(str => parseInt(str, 10));

  return new Date(year, month - 1, day, hour);
};

export const formatCurrency = (price: string | number) => {
  let toNumber;
  if (typeof price === 'string') {
    toNumber = parseInt(price, 10);
  } else {
    toNumber = price;
  }

  const formattedCurrency = new Intl.NumberFormat('ko-Kr', { style: 'currency', currency: 'KRW' }).format(toNumber);

  return formattedCurrency;
};

export const changeToMilliSeconds = (date: string) => {
  const changeDate = changeDateType(date);
  const changeISOString = changeDate.toISOString();
  const MilliSeconds = Date.parse(changeISOString);
  return MilliSeconds;
};

export const oneHour = 60 * 60 * 1000;
export const oneMinute = 60 * 1000;
