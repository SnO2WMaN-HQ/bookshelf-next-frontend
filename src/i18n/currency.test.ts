import {formatCurrency} from './currency';

describe('Currency i18n', () => {
  describe('ja-JP', () => {
    const code = 'ja-JP';
    it('JPY', () => {
      const currency = 'JPY';
      expect(formatCurrency({value: 499, currency}, code)).toBe('499円');
      expect(formatCurrency({value: 499.9, currency}, code)).toBe('499円');
      expect(formatCurrency({value: 2000, currency}, code)).toBe('2,000円');
      expect(formatCurrency({value: 20000, currency}, code)).toBe('20,000円');
    });
    it('USD', () => {
      const currency = 'USD';
      expect(formatCurrency({value: 4, currency}, code)).toBe('$4.00');
      expect(formatCurrency({value: 4.99, currency}, code)).toBe('$4.99');
      expect(formatCurrency({value: 40, currency}, code)).toBe('$40.00');
    });
  });
  describe('en', () => {
    const code = 'en';
    it('JPY', () => {
      const currency = 'JPY';
      expect(formatCurrency({value: 499, currency}, code)).toBe('¥499');
      expect(formatCurrency({value: 499.9, currency}, code)).toBe('¥500');
      expect(formatCurrency({value: 2000, currency}, code)).toBe('¥2,000');
      expect(formatCurrency({value: 20000, currency}, code)).toBe('¥20,000');
    });
    it('USD', () => {
      const currency = 'USD';
      expect(formatCurrency({value: 4, currency}, code)).toBe('$4.00');
      expect(formatCurrency({value: 4.99, currency}, code)).toBe('$4.99');
      expect(formatCurrency({value: 40, currency}, code)).toBe('$40.00');
      expect(formatCurrency({value: 400, currency}, code)).toBe('$400.00');
    });
  });
});
