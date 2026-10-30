import { useContext } from 'react';
import { I18nContext } from './i18nContextDefinition';
import { TRANSLATIONS, type Language, type TranslationKey } from './i18n';

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    return {
      language: 'en' as Language,
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: (key: TranslationKey) => TRANSLATIONS.en[key] || key,
    };
  }
  return ctx;
}
