"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { processSteps } from "@/data/process";
import { useI18n } from "@/i18n/LanguageProvider";
import { asset } from "@/lib/asset";

export function HowItsMade() {
  const { t, locale, num } = useI18n();
  const gu = locale === "gu";
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  // progress line grows with scroll (scaleY = transform only)
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="process" aria-labelledby="process-title" className="bg-[color:var(--cocoa)] text-[color:var(--cream)]">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-12 lg:py-36">
        {/* intro stays in view while the steps scroll past (desktop) */}
        <div className="min-w-0 lg:sticky lg:top-32 lg:self-start">
          <p
            className={`mb-5 flex items-center gap-3 text-sm font-semibold text-[color:var(--accent)] ${
              gu ? "" : "uppercase tracking-[0.22em]"
            }`}
          >
            <span aria-hidden="true">◆</span>
            {t("process.eyebrow")}
          </p>
          <h2
            id="process-title"
            className={`font-display text-5xl text-balance sm:text-6xl lg:text-7xl ${
              gu ? "font-extrabold leading-[1.15]" : "uppercase leading-[0.95]"
            }`}
          >
            {t("process.title")}
          </h2>
          <p className="mt-6 max-w-[38ch] text-lg leading-relaxed text-[color:var(--muted)]">{t("process.intro")}</p>
        </div>

        <ol ref={listRef} className="relative min-w-0 space-y-5 pl-12 sm:space-y-8 sm:pl-20">
          {/* track + animated fill */}
          <span aria-hidden="true" className="absolute bottom-6 left-[1.05rem] top-6 w-px bg-[color:var(--cream)]/15 sm:left-[1.7rem]" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY }}
            className="absolute bottom-6 left-[1.05rem] top-6 w-px origin-top bg-[color:var(--accent)] sm:left-[1.7rem]"
          />

          {processSteps.map((s, i) => (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* step number on the line */}
              <span
                aria-hidden="true"
                className="absolute -left-12 top-5 grid h-9 w-9 place-items-center rounded-full border border-[color:var(--cream)]/25 bg-[color:var(--cocoa)] font-display text-lg tabular-nums sm:-left-20 sm:h-14 sm:w-14 sm:text-xl"
              >
                <motion.span
                  className="absolute -inset-px rounded-full border-2 border-[color:var(--accent)]"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ amount: 1, margin: "0px 0px -35% 0px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                />
                <span className="relative">{num(i + 1)}</span>
              </span>

              <article className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-3xl border border-[color:var(--cream)]/10 bg-[color:var(--cream)]/[0.04] p-4 sm:gap-8 sm:p-7">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[color:var(--muted)]">
                    <span className="sr-only">
                      {t("process.step")} {num(i + 1)}.{" "}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--cream)]/20 px-3 py-1">
                      <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <circle cx="8" cy="8" r="6.2" />
                        <path d="M8 4.6V8l2.3 1.5" />
                      </svg>
                      <span className="sr-only">{t("process.time")}: </span>
                      {s.time[locale]}
                    </span>
                  </p>
                  <h3 className={`mt-3 text-xl font-bold sm:text-3xl ${gu ? "font-gujarati" : ""}`}>{s.title[locale]}</h3>
                  <p className="mt-2 max-w-[46ch] leading-relaxed text-[color:var(--cream)]/85">{s.text[locale]}</p>
                </div>
                <img
                  src={asset(s.image)}
                  alt=""
                  loading="lazy"
                  className="h-12 w-12 self-start object-contain sm:self-center drop-shadow-[0_12px_16px_rgba(0,0,0,0.4)] sm:h-28 sm:w-28"
                />
              </article>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
