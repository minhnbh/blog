import React, { useEffect, useRef } from 'react';
import i18next from 'i18next';
import {
  initReactI18next,
  I18nextProvider as ReactI18nextProvider
} from 'react-i18next';
import { isEmpty } from 'lodash';

export declare type Resource = {
  lang: string;
  data: {
    [ky: string]: string | { [key: string]: any };
  };
};

export interface II18nextProvider {
  resource?: Resource;
  initReactI18nextProps?: boolean;
}

const I18next: React.FC<II18nextProvider> = ({
  initReactI18nextProps = false,
  resource,
  ...props
}) => {
  initReactI18nextProps && i18next.use(initReactI18next);
  const ref = useRef<any>(null);

  if (!ref.current) {
    i18next.init({
      interpolation: {
        escapeValue: false
      },
      react: {
        useSuspense: false,
        transSupportBasicHtmlNodes: true,
        transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'b']
      },
      resources: {},
      ns: 'translation',
      lng: 'en',
      defaultNS: 'translation',
      fallbackLng: 'en'
    });
    ref.current = 'rendered';
  }

  useEffect(() => {
    if (resource && !isEmpty(resource.data)) {
      const { lang, data } = resource;
      i18next.changeLanguage(lang);
      if (i18next.hasResourceBundle(lang, 'translation')) return;

      i18next
        .addResourceBundle(lang, 'translation', data, true, true)
        .reloadResources();
    }
  }, [resource]);

  return (
    <ReactI18nextProvider i18n={i18next}>{props.children}</ReactI18nextProvider>
  );
};

export default I18next;
