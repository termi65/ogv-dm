import React, { createContext, useContext, useState } from "react";
import { IntlProvider } from "react-intl";
// import deMessages from "../locales/de.json";
// import enMessages from "../locales/en.json";

// const messages = { en: enMessages, de: deMessages };

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState("de");

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      <IntlProvider locale={locale}> 
         {/* messages={messages[locale]}> */}
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;