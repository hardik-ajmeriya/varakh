"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/i18n/LanguageProvider";
import { asset } from "@/lib/asset";
import { IngredientMarquee } from "./IngredientMarquee";
import { ScrollRevealText } from "./ScrollRevealText";

const facts = ["fresh", "natural", "silver"] as const;

export function BrandStory() {
  const { t, locale } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const gu = locale === "gu";

  return (
    <section
      id="story"
      ref={ref}
      aria-labelledby="story-title"
      className="relative bg-[color:var(--cocoa)] text-[color:var(--cream)]"
    >
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.15fr_1fr] lg:gap-20 lg:px-12 lg:py-36">
        <div className="min-w-0">
          <p
            className={`mb-5 flex items-center gap-3 text-sm font-semibold text-[color:var(--accent)] ${
              gu ? "" : "uppercase tracking-[0.22em]"
            }`}
          >
            <span aria-hidden="true">◆</span>
            {t("story.eyebrow")}
          </p>
          <h2
            id="story-title"
            className={`font-display text-5xl text-balance sm:text-6xl lg:text-7xl ${
              gu ? "font-extrabold leading-[1.15]" : "uppercase leading-[0.95]"
            }`}
          >
            {t("story.title")}
          </h2>
          <ScrollRevealText
            key={locale}
            text={t("story.body")}
            className={`mt-8 max-w-[34ch] text-2xl font-medium leading-snug sm:text-3xl lg:text-[2.1rem] ${
              gu ? "leading-normal" : ""
            }`}
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-3">
            {facts.map((f) => (
              <li key={f} className="flex items-center gap-3 border-t border-[color:var(--cream)]/20 pt-4 text-[color:var(--muted)]">
                <span aria-hidden="true" className="text-[color:var(--accent)]">
                  ◆
                </span>
                <span className="text-base font-semibold">{t(`story.facts.${f}`)}</span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="min-w-0 self-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[4/3] lg:aspect-[4/5]">
            <motion.img
              src={asset("/images/kitchen.webp")}
              alt={
                gu
                  ? "પિત્તળની થાળીમાં કાજુ કતરી, પિસ્તા રોલ અને કેસર પેંડા ગોઠવતા હાથ"
                  : "Hands arranging kaju katli, pista rolls and kesar peda on a brass tray"
              }
              loading="lazy"
              style={{ y: imgY }}
              className="absolute inset-0 h-full w-full scale-[1.18] object-cover"
            />
          </div>
          <figcaption className="mt-4 text-sm text-[color:var(--muted)]">{t("story.caption")}</figcaption>
        </figure>
      </div>

      <IngredientMarquee />
    </section>
  );
}
