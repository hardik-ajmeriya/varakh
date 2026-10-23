export const locales = ["en", "gu"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const STORAGE_KEY = "varakh-locale";
