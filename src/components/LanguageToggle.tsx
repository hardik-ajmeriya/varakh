"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/i18n/LanguageProvider";
import type { Locale } from "@/i18n/config";

const options: { value: Locale; short: string }[] = [
  { value: "en", short: "EN" },
  { value: "gu", short: "ગુ" },
];

export function LanguageToggle() {
  const { locale, setLocale, t } = useI18n();
  return (
    <div
      role="group"
      aria-label={t("lang.label")}
      className="relative flex h-10 items-center rounded-full border border-[color:var(--ink)]/30 bg-black/10 p-1"
    >
      {options.map((o) => {
        const active = o.value === locale;
        return (
          <button
            key={o.value}
            type="button"
            lang={o.value}
            aria-pressed={active}
            aria-label={t(`lang.${o.value}`)}
            onClick={() => setLocale(o.value)}
            className={`relative z-10 h-8 min-w-11 rounded-full px-3 text-sm font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ink)] ${
              active ? "text-[color:var(--base)]" : "text-[color:var(--ink)]"
            } ${o.value === "gu" ? "font-gujarati" : ""}`}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 -z-10 rounded-full bg-[color:var(--ink)]"
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
              />
            )}
            {o.short}
          </button>
        );
      })}
    </div>
  );
}
