import en from "./messages/en.json";
import gu from "./messages/gu.json";
import type { Locale } from "./config";

export type Messages = typeof en;
// gu must have exactly the same keys as en (TypeScript checks this)
const guTyped: Messages = gu;

export const dictionaries: Record<Locale, Messages> = { en, gu: guTyped };

type Path<T> = T extends string
  ? ""
  : { [K in keyof T & string]: T[K] extends string ? K : `${K}.${Path<T[K]>}` }[keyof T & string];
export type MessageKey = Path<Messages>;

export function translate(
  messages: Messages,
  key: MessageKey,
  vars?: Record<string, string | number>,
): string {
  const value = key
    .split(".")
    .reduce<unknown>((obj, part) => (obj as Record<string, unknown>)?.[part], messages);
  let text = typeof value === "string" ? value : key;
  if (vars) for (const [k, v] of Object.entries(vars)) text = text.replace(`{${k}}`, String(v));
  return text;
}

const formatters: Record<Locale, Intl.NumberFormat> = {
  en: new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }),
  gu: new Intl.NumberFormat("gu-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
    numberingSystem: "gujr",
  }),
};
export const formatPrice = (locale: Locale, amount: number) => formatters[locale].format(amount);
export const formatNumber = (locale: Locale, n: number) =>
  new Intl.NumberFormat(locale === "gu" ? "gu-IN-u-nu-gujr" : "en-IN").format(n);
