import dayjs from 'dayjs';

export const formatMoney = (value: number) => {
  const config = {
    style: 'currency' as const,
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };
  const formatted = new Intl.NumberFormat('vi-VN', config)
    .format(value)
    .replace('₫', 'VND');

  return formatted;
};

export const formatOccurDate = (startDate: string, endDate: string) => {
  let start = '';
  let end = '';
  if (dayjs(startDate).format('YYYY') === dayjs(endDate).format('YYYY')) {
     start = dayjs(startDate).format('MMM DD');
     end = dayjs(endDate).format('MMM DD, YYYY');
  } else {
    start = dayjs(startDate).format('MMM DD, YYYY');
    end = dayjs(endDate).format('MMM DD, YYYY');
  }

  return `${start} - ${end}`;
};

export const formatDate = (date: string) => {
  return dayjs(date).format('DD-MM-YYYY');
};
export const formatDateTime = (date: string) => {
  return dayjs(date).format('DD-MM-YYYY HH:mm:ss');
};
