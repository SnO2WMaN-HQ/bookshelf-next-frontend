export function formatCurrency(
  {value, currency}: {value: number; currency: string},
  lang: string,
): string {
  if (lang === 'ja-JP') {
    return new Intl.NumberFormat(lang, {
      style: 'currency',
      currency,
      currencyDisplay: 'name',
    }).format(value);
  }

  return new Intl.NumberFormat(lang, {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
  }).format(value);
}
