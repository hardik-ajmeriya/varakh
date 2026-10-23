"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { defaultLocale, locales, STORAGE_KEY, type Locale } from "./config";
import { dictionaries, formatNumber, formatPrice, translate, type MessageKey } from "./dictionary";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: MessageKey, vars?: Record<string, string | number>) => string;
  price: (amount: number) => string;
  num: (n: number) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  // restore saved choice after hydration
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved && locales.includes(saved)) setLocaleState(saved);
    } catch {
      /* storage blocked: keep default */
    }
  }, []);

  // keep <html lang> in sync for screen readers, fonts and SEO tools
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<Ctx>(() => {
    const messages = dictionaries[locale];
    return {
      locale,
      setLocale,
      t: (key, vars) => translate(messages, key, vars),
      price: (amount) => formatPrice(locale, amount),
      num: (n) => formatNumber(locale, n),
    };
  }, [locale, setLocale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used inside <LanguageProvider>");
  return ctx;
}
