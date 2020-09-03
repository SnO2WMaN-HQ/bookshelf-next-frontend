import i18n from 'i18next';
import i18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';
import dayjs from 'dayjs';

import ja from './ja/translation.json';

const resources = {ja};

i18n
  .use(i18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ja',
    debug: false,
    interpolation: {
      escapeValue: false,
      format(value, format) {
        if (value instanceof Date) return dayjs(value).format(format);
        return value;
      },
    },
  });

export default i18n;
