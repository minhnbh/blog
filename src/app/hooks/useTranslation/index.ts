import { useTranslation as useTranslationI18next } from 'react-i18next';
import { TOptions } from 'i18next';
import { useCallback } from 'react';

const useTranslation = () => {
  const { t: translation, ready } = useTranslationI18next();

  const t: any = useCallback(
    (ky: string, defaultText?: string, options?: TOptions) => {
      if (ready) {
        return translation(ky, defaultText, options);
      }

      if (typeof defaultText === 'string') {
        return defaultText;
      }

      return ky;
    },
    [ready, translation]
  );

  return { t };
};

export default useTranslation;
