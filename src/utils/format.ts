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

export const formatOccurDate = (startDate?: string, endDate?: string) => {
  
  if (!startDate || !endDate) return "Invalid Date";

  const startYear = dayjs(startDate).format('YYYY');
  const endYear = dayjs(endDate).format('YYYY');

  const start = dayjs(startDate).format(startYear === endYear ? 'MMM DD' : 'MMM DD, YYYY');
  const end = dayjs(endDate).format('MMM DD, YYYY');

  return `${start} - ${end}`;
};

// Format Date (Check if date exists)
export const formatDate = (date?: string) => {
  return date ? dayjs(date).format('DD-MM-YYYY') : "Invalid Date";
};

// Format DateTime with Hydration Fix
export const formatDateTime = (date?: string) => {
  if (!date) return "Invalid Date";
  return typeof window === "undefined" 
    ? "Loading..." 
    : dayjs(date).format('HH:mm MMM DD, YYYY');
};

export const formatTime = (date?: string) => {
  if (!date) return "Invalid Date";

  const hourTime = dayjs(date).format('HH');

  const time = dayjs(date).format( Number(hourTime) > 0 ? 'HH:mm:ss' : 'mm:ss');

  return typeof window === "undefined" 
    ? "Loading..." 
    : time;
};
