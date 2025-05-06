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

export const formatLocation1 = (value: string) => {
  const parts = value.split(',');
  if (parts.length <= 2) return '';
  return parts.slice(1).join(',').trim();
};
export const formatLocation = (location: string) => {
    const arr = location?.split(',').map(part => part.trim());
    if (arr?.length < 3) return location;
    return arr?.slice(-2).join(', ');
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

  if (typeof window === "undefined") {
    return dayjs(date).utc().format('YYYY-MM-DD HH:mm'); 
  }

  return dayjs(date).format('HH:mm MMM DD, YYYY');
};

export const formatTime = (date?: string) => {
  if (!date) return "Invalid Date";

  const hourTime = dayjs(date).format('HH');

  const time = dayjs(date).format( Number(hourTime) > 0 ? 'HH:mm:ss' : 'mm:ss');

  return typeof window === "undefined" 
    ? "Loading..." 
    : time;
};

export const formatYearOfBirth = (date?: string) => {
  return date ? dayjs(date).format('YYYY') : "N/A";
}
export const formatHeight = (height: number) => {
  return height ? `${height} cm` : "No Info";
}

export const formatCreatedDateTime = (date?: string) => {
  return date ? dayjs(date).format('MMM DD, YYYY, hh:mm:ss A') : "Invalid Date";
}
