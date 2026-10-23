"use client";

import { AnimatePresence, motion, type MotionValue } from "framer-motion";
import { useState } from "react";
import type { Product } from "@/data/products";
import { useI18n } from "@/i18n/LanguageProvider";
import { useCart } from "@/lib/cart";

type Props = {
  product: Product;
  index: number;
  total: number;
  /** 0→1 time until the next sweet (auto-play) */
  timer: MotionValue<number>;
  playing: boolean;
  onTogglePlay: () => void;
};

export function ProductInfo({ product, index, total, timer, playing, onTogglePlay }: Props) {
  const { t, locale, price, num } = useI18n();
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const [announce, setAnnounce] = useState("");

  const onAdd = () => {
    add(product.id);
    setJustAdded(true);
    setAnnounce(t("cart.added", { name: product.name[locale] }));
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  const pad = (n: number) => num(n).padStart(2, num(0));

  return (
    <div className="relative z-40 w-full max-w-md">
      <div className="mb-2 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--ink)]/85">
        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={playing ? t("hero.pause") : t("hero.play")}
          aria-pressed={!playing}
          className="-ml-1 grid h-8 w-8 place-items-center rounded-full border border-[color:var(--ink)]/35 text-[color:var(--ink)] transition-colors hover:bg-[color:var(--ink)]/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ink)]"
        >
          {playing ? (
            <svg viewBox="0 0 12 12" aria-hidden="true" className="h-3 w-3" fill="currentColor">
              <rect x="2" y="1.5" width="2.6" height="9" rx=".6" />
              <rect x="7.4" y="1.5" width="2.6" height="9" rx=".6" />
            </svg>
          ) : (
            <svg viewBox="0 0 12 12" aria-hidden="true" className="h-3 w-3" fill="currentColor">
              <path d="M3 1.6v8.8L10.2 6z" />
            </svg>
          )}
        </button>
        <span className="tabular-nums" aria-live="polite">
          {pad(index + 1)} / {pad(total)}
        </span>
        {/* auto-play timer: a line that fills before the next sweet (scaleX only) */}
        <span aria-hidden="true" className="relative h-px w-14 overflow-hidden bg-[color:var(--ink)]/30">
          <motion.span style={{ scaleX: timer }} className="absolute inset-0 origin-left bg-[color:var(--ink)]" />
        </span>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${product.id}-${locale}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-1 text-sm font-semibold text-[color:var(--ink)]/85">{product.tagline[locale]}</p>
          <h2
            className={`font-display text-[2.6rem] leading-none sm:text-5xl lg:text-6xl ${
              locale === "gu" ? "font-extrabold leading-[1.15]" : "uppercase"
            }`}
          >
            {product.name[locale]}
          </h2>
          <p className="mt-3 line-clamp-3 [@media(max-height:700px)]:line-clamp-2 max-w-sm text-[15px] leading-relaxed text-[color:var(--ink)]/90 sm:text-base">
            {product.description[locale]}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-5 flex items-center gap-4 [@media(max-height:700px)]:mt-3">
        <p className="leading-tight">
          <span className="block font-display text-3xl tracking-wide tabular-nums">{price(product.price)}</span>
          <span className="text-sm text-[color:var(--ink)]/85">
            {t("hero.per")} {product.unit[locale]}
          </span>
        </p>
        <motion.button
          type="button"
          onClick={onAdd}
          whileTap={{ scale: 0.96 }}
          className="relative ml-auto inline-flex h-12 min-w-[9.5rem] items-center justify-center gap-2 overflow-hidden rounded-full bg-[color:var(--ink)] px-6 text-sm font-bold text-[color:var(--base)] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--ink)] sm:ml-0"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={justAdded ? "done" : "add"}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-2"
            >
              {justAdded ? (
                <>
                  <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="m4 10.5 4 4 8-9" />
                  </svg>
                  {t("hero.addedShort")}
                </>
              ) : (
                <>
                  <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M10 4v12M4 10h12" />
                  </svg>
                  {t("hero.add")}
                </>
              )}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>

      <p aria-live="polite" className="sr-only">
        {announce}
      </p>
    </div>
  );
}
