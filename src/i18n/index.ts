import i18n from 'i18next';
import i18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';
import dayjs from 'dayjs';

import ja from './ja/translation.json';
import {formatCurrency} from './currency';

const resources = {ja};

i18n
  .use(i18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ja-JP',
    debug: true,
    interpolation: {
      escapeValue: false,
      format(value, format, lang) {
        if (value instanceof Date) return dayjs(value).format(format);
        if (format === 'currency')
          return formatCurrency(value, lang || 'us-EN');
        return value;
      },
    },
  });

export default i18n;
