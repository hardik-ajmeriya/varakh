"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/LanguageProvider";
import { useCart } from "@/lib/cart";
import { LanguageToggle } from "./LanguageToggle";
import { Logo } from "./Logo";

const links = [
  { href: "#sweets", key: "nav.sweets" },
  { href: "#story", key: "nav.story" },
  { href: "#process", key: "nav.process" },
  { href: "#gift", key: "nav.gift" },
] as const;

export function Header() {
  const { t, num, locale } = useI18n();
  const { count } = useCart();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  // once the hero is scrolled past, give the header a backdrop so it stays readable
  // hero height is measured once per resize, not on every scroll frame
  const heroEnd = useRef(0);
  useEffect(() => {
    const measure = () => {
      heroEnd.current =
        (document.getElementById("top")?.offsetHeight ?? window.innerHeight) - window.innerHeight * 0.5;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > heroEnd.current;
    setSolid((s) => (s === next ? s : next));
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50 text-[color:var(--ink)]">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10 border-b border-[color:var(--cream)]/10 bg-[color:var(--cocoa)]/95"
        initial={false}
        animate={{ opacity: solid ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-12">
        <a href="#top" aria-label="VARAKH home" className="rounded focus-visible:outline-2 focus-visible:outline-offset-4">
          <Logo />
        </a>

        <nav aria-label={t("nav.label")} className="hidden lg:block">
          <ul className={`flex gap-8 text-sm font-medium ${locale === "gu" ? "font-gujarati text-base" : ""}`}>
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="opacity-85 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 rounded"
                >
                  {t(l.key)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle />
          <button
            type="button"
            aria-label={`${t("cart.label")}: ${t("cart.items", { count: num(count) })}`}
            className="relative grid h-10 w-10 place-items-center rounded-full border border-[color:var(--ink)]/30 bg-black/10 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" />
              <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
            </svg>
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 600, damping: 22 }}
                  className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[color:var(--ink)] px-1 text-[11px] font-bold text-[color:var(--base)]"
                >
                  {num(count)}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </header>
  );
}
