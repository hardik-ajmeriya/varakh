"use client";
import { useI18n } from "@/i18n/LanguageProvider";

export function SkipLink() {
  const { t } = useI18n();
  return (
    <a
      href="#main"
      className="sr-only-focusable fixed left-4 top-4 z-[60] rounded-full bg-[color:var(--ink)] px-4 py-2 font-semibold text-[color:var(--base)]"
    >
      {t("meta.skip")}
    </a>
  );
}
