"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import { products } from "@/data/products";
import { useI18n } from "@/i18n/LanguageProvider";
import { asset, withShadow } from "@/lib/asset";
import { BrandText } from "./BrandText";
import { Floaters } from "./Floaters";
import { HeroBackground } from "./HeroBackground";
import { IMAGE_SIZES, ProductImage, srcSetFor } from "./ProductImage";
import { ProductInfo } from "./ProductInfo";
import { ProductRail } from "./ProductRail";

export function Hero() {
  // first sweet is the largest thing on screen: fetch it before anything else
  preload(asset(withShadow(products[0].image)), {
    as: "image",
    fetchPriority: "high",
    imageSrcSet: srcSetFor(products[0].image),
    imageSizes: IMAGE_SIZES,
  });
  const { t, locale } = useI18n();
  const reduce = useReducedMotion();
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const product = products[index];

  const go = useCallback((next: number, direction?: number) => {
    setState(([cur]) => {
      const n = (next + products.length) % products.length;
      if (n === cur) return [cur, 1];
      return [n, direction ?? (n > cur ? 1 : -1)];
    });
  }, []);
  const prev = useCallback(
    () => setState(([c]) => [(c - 1 + products.length) % products.length, -1]),
    [],
  );
  const next = useCallback(
    () => setState(([c]) => [(c + 1) % products.length, 1]),
    [],
  );

  /* ---------- 1. Scroll: hero is pinned; scrolling through it moves through the sweets ---------- */
  const wrapRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  const lastSegment = useRef(0);
  const lastScroll = useRef(0);

  // the scroll position inside the pinned hero picks the sweet (4 equal parts)
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    lastScroll.current = performance.now();
    const seg = Math.min(products.length - 1, Math.floor(v * products.length));
    if (seg !== lastSegment.current) {
      lastSegment.current = seg;
      go(seg);
    }
  });

  /* ---------- 2. Auto-play: next sweet every few seconds while the visitor stays on the hero ---------- */
  const AUTOPLAY_MS = 4500;
  const timer = useMotionValue(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const inView = useInView(sectionRef, { amount: 0.6 });
  useEffect(() => setUserPaused(reduce), [reduce]); // no auto-play by default for reduced motion
  const playing = !userPaused;
  const running = playing && !hovered && !focused && inView;

  useEffect(() => timer.set(0), [index, timer]); // restart the timer after every change
  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      // hold while the visitor is scrolling or the tab is hidden
      if (
        document.visibilityState === "visible" &&
        now - lastScroll.current > 1200
      ) {
        const v = timer.get() + dt / AUTOPLAY_MS;
        if (v >= 1) {
          timer.set(0);
          next();
        } else timer.set(v);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, next, timer]);

  // push the active palette to <html> so header + page share it
  useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty("--base", product.palette.base);
    r.setProperty("--ink", product.palette.ink);
    r.setProperty("--accent", product.palette.accent);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", product.palette.base);
  }, [product]);

  // preload the other product images so the first swap is instant
  useEffect(() => {
    const t = window.setTimeout(() => {
      products.forEach((p) => {
        const img = new Image();
        img.sizes = IMAGE_SIZES;
        img.srcset = srcSetFor(p.image);
      });
    }, 1500);
    return () => window.clearTimeout(t);
  }, []);

  // pointer parallax (desktop, fine pointer only)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 18 });
  const py = useSpring(my, { stiffness: 60, damping: 18 });
  const onPointerMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if ((e.target as HTMLElement).tagName === "INPUT") return;
    if (e.key === "ArrowRight") next();
    else if (e.key === "ArrowLeft") prev();
  };

  return (
    // tall wrapper = scroll distance for the 4 sweets; the hero itself sticks to the screen
    <div ref={wrapRef} id="top" className="relative h-[260svh]">
      <section
        ref={sectionRef}
        aria-roledescription="carousel"
        aria-label={t("hero.heading")}
        onPointerMove={onPointerMove}
        // pause auto-play only for keyboard users (mouse clicks also focus buttons)
        onFocus={(e) =>
          (e.target as HTMLElement).matches(":focus-visible") &&
          setFocused(true)
        }
        onBlur={(e) =>
          !e.currentTarget.contains(e.relatedTarget as Node) &&
          setFocused(false)
        }
        onKeyDown={onKeyDown}
        className="sticky top-0 isolate flex h-[100svh] flex-col overflow-hidden pt-16 lg:block lg:pt-0"
      >
        <h1 className="sr-only">{t("hero.heading")}</h1>
        <span id="sweets" className="absolute top-0" aria-hidden="true" />
        <HeroBackground active={index} />

        {/* stage: brand text + product + ingredients. Swipe on touch screens. */}
        <motion.div
          className="stage relative min-h-0 flex-1 touch-pan-y lg:absolute lg:inset-0"
          onPanEnd={(_, info) => {
            if (
              Math.abs(info.offset.x) < 50 ||
              Math.abs(info.offset.x) < Math.abs(info.offset.y)
            )
              return;
            if (info.offset.x < 0) next();
            else prev();
          }}
        >
          <Floaters product={product} layer={0} px={px} py={py} />
          <BrandText />
          <ProductImage
            product={product}
            dir={dir}
            px={px}
            py={py}
            first={index === 0}
          />
          <Floaters product={product} layer={1} px={px} py={py} />
        </motion.div>

        {/* kicker (desktop, top-left) */}
        <p
          className={`absolute left-12 top-28 z-40 hidden max-w-[14rem] text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--ink)]/85 lg:block ${
            locale === "gu" ? "normal-case tracking-normal text-base" : ""
          }`}
        >
          {t("hero.kicker")}
        </p>

        <div
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          className="relative z-40 flex justify-center px-4 pb-4 lg:absolute lg:right-12 lg:top-1/2 lg:-translate-y-1/2 lg:p-0"
        >
          <ProductRail
            active={index}
            onSelect={(i) => go(i)}
            onPrev={prev}
            onNext={next}
          />
        </div>

        <div
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          className="relative z-40 px-4 pb-8 sm:px-6 lg:absolute lg:bottom-12 lg:left-12 lg:p-0"
        >
          <ProductInfo
            product={product}
            index={index}
            total={products.length}
            timer={timer}
            playing={playing}
            onTogglePlay={() => setUserPaused((p) => !p)}
          />
        </div>
      </section>
    </div>
  );
}
