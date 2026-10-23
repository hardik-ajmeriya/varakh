"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/i18n/LanguageProvider";

/** Huge brand word behind the product. Letters rise once on load / language change. */
export function BrandText() {
  const { t, locale } = useI18n();
  const word = t("hero.brand");
  // Gujarati conjuncts must not be split, so animate whole grapheme clusters
  const letters = Array.from(new Intl.Segmenter(locale, { granularity: "grapheme" }).segment(word), (s) => s.segment);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-[30%] flex -translate-y-1/2 select-none justify-center sm:top-[34%] lg:top-[45%]"
    >
      <span
        key={locale}
        className={`flex whitespace-nowrap font-display leading-[0.82] text-[color:var(--ink)] ${
          locale === "gu"
            ? "text-[min(44vw,40svh)] font-extrabold leading-[1.1] lg:text-[min(36vw,52svh)]"
            : "text-[min(31vw,36svh)] tracking-[-0.01em] lg:text-[min(27vw,50svh)]"
        }`}
      >
        {letters.map((ch, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.04em]">
            <motion.span
              className="inline-block"
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {ch}
            </motion.span>
          </span>
        ))}
      </span>
    </div>
  );
}
