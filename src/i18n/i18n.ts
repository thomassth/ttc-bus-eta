import i18next, { Resource } from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "./en/locales.json";
import fr from "./fr/locales.json";
import zh from "./zh/locales.json";

const resources: Resource = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
  zh: {
    translation: zh,
  },
};

i18next
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: true, // react already safes from xss
    },
    nonExplicitSupportedLngs: true,
  });

export default i18next;
