"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { giftBox, giftBoxFullPrice } from "@/data/giftBox";
import { products } from "@/data/products";
import { useI18n } from "@/i18n/LanguageProvider";
import { asset, shadowFit, withShadow } from "@/lib/asset";
import { useCart } from "@/lib/cart";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function GiftBox() {
  const { t, locale, price } = useI18n();
  const { add } = useCart();
  const reduce = useReducedMotion();
  const gu = locale === "gu";
  const desktop = useMediaQuery("(min-width: 1024px)");
  // desktop: whole section is pinned; phone: only the box is pinned, text follows below
  const deskRef = useRef<HTMLDivElement>(null);
  const mobRef = useRef<HTMLDivElement>(null);
  const deskScroll = useScroll({ target: deskRef, offset: ["start start", "end end"] }).scrollYProgress;
  const mobScroll = useScroll({ target: mobRef, offset: ["start 10%", "end end"] }).scrollYProgress;
  const reduceMV = useMotionValue(0);
  const desktopMV = useMotionValue(0);
  useEffect(() => reduceMV.set(reduce ? 1 : 0), [reduce, reduceMV]);
  useEffect(() => desktopMV.set(desktop ? 1 : 0), [desktop, desktopMV]);
  // one progress value 0→1 for the scene; reduced motion = open box, no animation
  const p = useTransform([deskScroll, mobScroll, reduceMV, desktopMV], ([d, m, r, isDesk]: number[]) =>
    r ? 1 : isDesk ? d : m,
  );
  const [announce, setAnnounce] = useState("");

  const lidY = useTransform(p, [0.04, 0.32], ["0%", "-70%"]);
  const lidRotate = useTransform(p, [0.04, 0.32], [0, -10]);
  const lidOpacity = useTransform(p, [0.22, 0.34], [1, 0]);
  const hintOpacity = useTransform(p, [0, 0.12], [1, 0]);

  const onAdd = () => {
    add(giftBox.id);
    setAnnounce(t("gift.added"));
  };

  return (
    <section id="gift" aria-labelledby="gift-title" className="overflow-x-clip bg-[color:var(--paper)] text-[color:var(--paper-ink)]">
      {/* tall wrapper gives scroll distance; the inner stage sticks to the screen */}
      <div ref={deskRef} className={reduce ? "" : "relative lg:h-[250svh]"}>
        <div
          className={`mx-auto grid max-w-[1440px] items-center gap-4 px-4 pb-20 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-12 lg:pb-0 ${
            reduce ? "pt-20 lg:py-28" : "pt-20 lg:sticky lg:top-0 lg:min-h-[100svh] lg:content-center lg:py-0"
          }`}
        >
          <div className="order-2 min-w-0 lg:order-1">
            <p
              className={`mb-4 flex items-center gap-3 text-sm font-semibold text-[color:var(--maroon)] ${
                gu ? "" : "uppercase tracking-[0.22em]"
              }`}
            >
              <span aria-hidden="true">◆</span>
              {t("gift.eyebrow")}
            </p>
            <h2
              id="gift-title"
              className={`font-display text-[2.75rem] text-balance sm:text-6xl lg:text-7xl ${
                gu ? "font-extrabold leading-[1.15]" : "uppercase leading-[0.95]"
              }`}
            >
              {t("gift.title")}
            </h2>
            <p className="mt-4 max-w-[44ch] leading-relaxed text-[color:var(--paper-muted)] sm:mt-6 sm:text-lg">{t("gift.body")}</p>

            <h3 className="mt-6 text-sm font-bold sm:mt-8">{t("gift.contents")}</h3>
            <ul className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-[15px] text-[color:var(--paper-muted)] sm:mt-3">
              {products.map((pr) => (
                <li key={pr.id} className="flex items-baseline justify-between gap-2 border-b border-[color:var(--paper-ink)]/10 py-1.5">
                  <span className="font-semibold text-[color:var(--paper-ink)]">{pr.name[locale]}</span>
                  <span className="shrink-0 text-sm tabular-nums">{pr.unit[locale]}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 sm:mt-8">
              <p className="leading-tight">
                <span className="sr-only">{t("gift.price")}: </span>
                <span className="font-display text-4xl tabular-nums">{price(giftBox.price)}</span>{" "}
                <s className="ml-1 text-[color:var(--paper-muted)] tabular-nums">{price(giftBoxFullPrice)}</s>
                <span className="block text-sm font-semibold text-[color:var(--maroon)]">
                  {t("gift.save", { amount: price(giftBoxFullPrice - giftBox.price) })} · {t("gift.wrap")}
                </span>
              </p>
              <motion.button
                type="button"
                onClick={onAdd}
                whileTap={{ scale: 0.96 }}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[color:var(--maroon)] px-6 text-sm font-bold text-[color:var(--paper)] shadow-[0_12px_30px_-12px_rgba(122,31,31,0.7)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--maroon)]"
              >
                <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="8" width="14" height="9" rx="1.5" />
                  <path d="M2.5 5.5h15v2.5h-15zM10 5.5V17M10 5.5C8.5 2.5 5.5 3 6.5 5.5M10 5.5c1.5-3 4.5-2.5 3.5 0" />
                </svg>
                {t("gift.add")}
              </motion.button>
            </div>
            <p aria-live="polite" className="sr-only">
              {announce}
            </p>
          </div>

          {/* the box scene; on phones its tall wrapper gives the scroll distance */}
          <div ref={mobRef} className={`order-1 min-w-0 lg:order-2 ${reduce ? "" : "h-[150svh] lg:h-auto"}`}>
          <div className="relative mx-auto w-full max-w-[min(86vw,440px)] pt-[26%] sticky top-[18svh] lg:static lg:max-w-[620px] lg:pt-[22%]">
            <div className="relative aspect-[1000/834]">
              <img
                src={asset(giftBox.base)}
                alt={t("gift.boxAlt")}
                loading="lazy"
                className="absolute inset-x-0 bottom-0 w-full drop-shadow-[0_30px_40px_rgba(60,20,10,0.35)]"
              />
              {products.map((pr, i) => (
                <Piece key={pr.id} src={pr.piece} index={i} progress={p} />
              ))}
              <motion.img
                src={asset(giftBox.lid)}
                alt={t("gift.lidAlt")}
                loading="lazy"
                style={{ y: lidY, rotate: lidRotate, opacity: lidOpacity }}
                className="absolute -left-[2%] top-0 z-20 w-[104%] max-w-none"
              />
            </div>
            {!reduce && (
              <motion.p
                aria-hidden="true"
                style={{ opacity: hintOpacity }}
                className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-[color:var(--paper-muted)]"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M8 3v10M4 9l4 4 4-4" />
                </svg>
                {t("gift.hint")}
              </motion.p>
            )}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** One compartment: its pieces drop in one after another after the lid lifts. Transform + opacity only. */
function Piece({ src, index, progress }: { src: string; index: number; progress: MotionValue<number> }) {
  const slot = giftBox.slots[index];
  const turn = giftBox.dropOrder.indexOf(index);
  return (
    <>
      {slot.pieces.map((pc, j) => (
        <Drop key={j} src={src} pc={pc} z={10 + slot.z * 5 + j} start={0.3 + turn * 0.1 + j * 0.03} progress={progress} />
      ))}
    </>
  );
}

type PieceSpot = { x: number; y: number; w: number; r: number };

function Drop({ src, pc, z, start, progress }: { src: string; pc: PieceSpot; z: number; start: number; progress: MotionValue<number> }) {
  const end = start + 0.16;
  const yRaw = useTransform(progress, [start, end], [-320, 0]);
  // spring gives a small, natural settle when the piece lands
  const y = useSpring(yRaw, { stiffness: 260, damping: 20, mass: 0.6 });
  const rotate = useTransform(progress, [start, end], [pc.r + 18, pc.r]);
  const scale = useTransform(progress, [start, end], [1.15, 1]);
  const opacity = useTransform(progress, [start, start + 0.04], [0, 1]);
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-[62%]"
      style={{ left: `${pc.x}%`, top: `${pc.y}%`, width: `${pc.w}%`, zIndex: z }}
    >
      <motion.img
        src={asset(withShadow(src))}
        alt=""
        loading="lazy"
        style={{ ...shadowFit, y, rotate, scale, opacity }}
        className="block"
      />
    </div>
  );
}
