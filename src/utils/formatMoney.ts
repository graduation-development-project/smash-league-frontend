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
