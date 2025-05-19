"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "../locales/en.json";
import frTranslation from "../locales/fr.json";
import esTranslation from "../locales/es.json";
import itTranslation from "../locales/it.json";
import trTranslation from "../locales/tr.json";
import ruTranslation from "../locales/ru.json";
import zhTranslation from "../locales/zh.json";
import deTranslation from "../locales/de.json";
import arTranslation from "../locales/ar.json";

export type AvailableLanguages =
  | "en"
  | "fr"
  | "es"
  | "it"
  | "tr"
  | "ru"
  | "zh"
  | "de"
  | "ar";

const resources = {
  en: { translation: enTranslation },
  fr: { translation: frTranslation },
  es: { translation: esTranslation },
  it: { translation: itTranslation },
  tr: { translation: trTranslation },
  ru: { translation: ruTranslation },
  zh: { translation: zhTranslation },
  de: { translation: deTranslation },
  ar: { translation: arTranslation },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Langue par défaut
  fallbackLng: "fr", // Langue de secours
  interpolation: { escapeValue: false },
});

export default i18n;
