import React, { useState, useEffect } from 'react';
import { TRANSLATIONS, type Language, type TranslationKey } from './i18n';
import { I18nContext } from './i18nContextDefinition';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('adarsh_lang') as Language;
    if (saved === 'en' || saved === 'hi') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('adarsh_lang', lang);
  };

  const toggleLanguage = () => {
    const next = language === 'en' ? 'hi' : 'en';
    setLanguage(next);
  };

  const t = (key: TranslationKey): string => {
    const langDict = TRANSLATIONS[language] as Record<string, string>;
    return langDict[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}
