export const formatBDT = (value) => {
  if (typeof value !== 'number') value = Number(value) || 0;
  return '৳ ' + value.toFixed(2);
};
