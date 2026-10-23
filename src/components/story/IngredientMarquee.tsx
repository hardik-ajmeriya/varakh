"use client";

import { ingredients } from "@/data/ingredients";
import type { Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/LanguageProvider";
import { asset } from "@/lib/asset";

function Row({ locale, hidden }: { locale: Locale; hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10 sm:gap-16 sm:pr-16">
      {ingredients.map((ing) => (
        <li key={ing.id} className="flex shrink-0 items-center gap-4">
          <img src={asset(ing.image)} alt="" loading="lazy" className="h-14 w-14 object-contain sm:h-20 sm:w-20" />
          <span lang={locale} className="font-display text-3xl text-[color:var(--cream)] sm:text-5xl">
            {ing.name[locale]}
          </span>
          <span aria-hidden="true" className="ml-6 text-[color:var(--accent)] sm:ml-10">
            ◆
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Endless ingredient strip. CSS transform animation, pauses on hover, stops for reduced motion. */
export function IngredientMarquee() {
  const { t, locale } = useI18n();
  return (
    <div className="marquee relative overflow-hidden border-y border-[color:var(--cream)]/15 py-6 sm:py-8">
      <h3 className="sr-only">{t("story.stripLabel")}</h3>
      {/* two identical rows: the track slides by exactly one row, so the loop is seamless */}
      <div key={locale} className="marquee-track flex w-max">
        <Row locale={locale} />
        <Row locale={locale} hidden />
      </div>
    </div>
  );
}
