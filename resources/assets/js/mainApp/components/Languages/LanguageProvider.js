import React from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

import enTranslationMessages from './translations/en.json';
import esTranslationMessages from './translations/es.json';

export const languages = [
  { value: "en", label: { id: "settings.languages.english", defaultMessage: "English" } },
  { value: "es", label: { id: "settings.languages.spanish", defaultMessage: "Spanish" } },
];

export const translationMessages = {
  en: enTranslationMessages,
  es: esTranslationMessages,
};

const LanguageProvider = ({ selectedLanguage, children }) => {
  const locale = selectedLanguage || navigator.language;
  const localeMessages = translationMessages[locale] || translationMessages[locale.split('-')[0]];
  return (
    <IntlProvider key={locale} locale={locale} messages={localeMessages}>
      {children}
    </IntlProvider>
  );
};

function mapStateToProps(state) {
  return {
    selectedLanguage: state.user.language,
  }
}

export default connect(mapStateToProps)(LanguageProvider);
