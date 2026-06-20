export const moneyFormat = (
  value: number | string | null | undefined,
  locale = 'pt-BR',
  currency = 'BRL',
): string => {
  if (value === null || value === undefined) return '';

  const numericValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numericValue)) return '';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(numericValue);
};
