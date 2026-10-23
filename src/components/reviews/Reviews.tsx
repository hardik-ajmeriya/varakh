"use client";

import { motion } from "framer-motion";
import { products } from "@/data/products";
import { reviews } from "@/data/reviews";
import { useI18n } from "@/i18n/LanguageProvider";
import { asset } from "@/lib/asset";

function Stars({ n, label }: { n: number; label: string }) {
  return (
    <span role="img" aria-label={label} className="flex gap-1 text-[color:var(--accent)]">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
          <path
            d="M10 1.8l2.5 5.3 5.8.7-4.3 4 1.1 5.7L10 14.7l-5.1 2.8 1.1-5.7-4.3-4 5.8-.7z"
            fill={i < n ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      ))}
    </span>
  );
}

export function Reviews() {
  const { t, locale, num } = useI18n();
  const gu = locale === "gu";
  return (
    <section aria-labelledby="reviews-title" className="bg-[color:var(--cocoa)] text-[color:var(--cream)]">
      <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 sm:py-28 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p
              className={`mb-4 flex items-center gap-3 text-sm font-semibold text-[color:var(--accent)] ${
                gu ? "" : "uppercase tracking-[0.22em]"
              }`}
            >
              <span aria-hidden="true">◆</span>
              {t("reviews.eyebrow")}
            </p>
            <h2
              id="reviews-title"
              className={`font-display text-5xl text-balance sm:text-6xl ${gu ? "font-extrabold leading-[1.15]" : "uppercase leading-[0.95]"}`}
            >
              {t("reviews.title")}
            </h2>
          </div>
          <p className="rounded-full border border-[color:var(--cream)]/25 px-4 py-1.5 text-sm text-[color:var(--muted)]">
            {t("reviews.note")}
          </p>
        </motion.div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.map((r, i) => {
            const product = products.find((p) => p.id === r.product);
            return (
              <motion.li
                key={r.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="flex"
              >
                <figure className="flex w-full flex-col rounded-3xl border border-[color:var(--cream)]/10 bg-[color:var(--cream)]/[0.04] p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-3">
                    <Stars n={r.rating} label={t("reviews.rating", { n: num(r.rating) })} />
                    {product && <img src={asset(product.piece)} alt="" loading="lazy" className="h-12 w-12 object-contain" />}
                  </div>
                  <blockquote className="mt-5 flex-1 text-lg leading-relaxed sm:text-xl">“{r.text[locale]}”</blockquote>
                  <figcaption className="mt-6 border-t border-[color:var(--cream)]/15 pt-4 text-sm">
                    <span className="font-bold">{r.name[locale]}</span>
                    <span className="text-[color:var(--muted)]"> · {r.place[locale]}</span>
                    {product && <span className="block text-[color:var(--muted)]">{product.name[locale]}</span>}
                  </figcaption>
                </figure>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
