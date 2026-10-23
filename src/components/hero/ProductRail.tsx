"use client";

import { motion } from "framer-motion";
import { products } from "@/data/products";
import { useI18n } from "@/i18n/LanguageProvider";
import { asset } from "@/lib/asset";

type Props = { active: number; onSelect: (i: number) => void; onPrev: () => void; onNext: () => void };

const ArrowBtn = ({ label, onClick, flip }: { label: string; onClick: () => void; flip?: boolean }) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    className="grid h-11 w-11 place-items-center rounded-full border border-[color:var(--ink)]/40 transition-colors hover:bg-[color:var(--ink)]/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ink)]"
  >
    <svg viewBox="0 0 20 20" aria-hidden="true" className={`h-4 w-4 ${flip ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12.5 4 6.5 10l6 6" />
    </svg>
  </button>
);

export function ProductRail({ active, onSelect, onPrev, onNext }: Props) {
  const { t, locale } = useI18n();
  return (
    <div className="relative z-40 flex items-center gap-3 lg:flex-col lg:gap-5">
      <ArrowBtn label={t("hero.prev")} onClick={onPrev} />
      <ul aria-label={t("hero.choose")} className="flex items-center gap-2.5 lg:flex-col lg:gap-4">
        {products.map((p, i) => {
          const isActive = i === active;
          return (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-label={t("hero.show", { name: p.name[locale] })}
                aria-current={isActive ? "true" : undefined}
                className="group relative grid h-12 w-12 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--ink)] sm:h-14 sm:w-14"
              >
                {isActive && (
                  <motion.span
                    layoutId="rail-ring"
                    className="absolute inset-0 rounded-full border-2 border-[color:var(--ink)]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span
                  className="absolute inset-1 rounded-full transition-opacity"
                  style={{ background: p.palette.base, opacity: isActive ? 1 : 0.7 }}
                />
                <img
                  src={asset(p.piece)}
                  alt=""
                  fetchPriority="low"
                  className={`relative w-[78%] transition-transform duration-300 group-hover:scale-110 ${isActive ? "scale-110" : ""}`}
                />
              </button>
            </li>
          );
        })}
      </ul>
      <ArrowBtn label={t("hero.next")} onClick={onNext} flip />
    </div>
  );
}
