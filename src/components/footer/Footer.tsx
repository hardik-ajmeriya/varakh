"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { products } from "@/data/products";
import { useI18n } from "@/i18n/LanguageProvider";
import { Logo } from "../Logo";

const explore = [
  { href: "#story", key: "nav.story" },
  { href: "#process", key: "nav.process" },
  { href: "#gift", key: "nav.gift" },
] as const;

export function Footer() {
  const { t, locale } = useI18n();
  const gu = locale === "gu";
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  // demo form: validates and confirms locally (connect to Mailchimp / Brevo etc. per client)
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email")?.toString().trim() ?? "";
    setStatus(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "ok" : "error");
  };

  const linkCls =
    "rounded text-[color:var(--muted)] transition-colors hover:text-[color:var(--cream)] focus-visible:outline-2 focus-visible:outline-offset-2";
  const headCls = `mb-4 text-sm font-bold text-[color:var(--cream)] ${gu ? "" : "uppercase tracking-[0.18em]"}`;

  return (
    <footer className="overflow-hidden bg-[#170d07] text-[color:var(--cream)]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto grid max-w-[1440px] gap-12 px-4 pb-10 pt-20 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:px-12"
      >
        <div className="min-w-0">
          <Logo />
          <p className="mt-4 max-w-[32ch] text-[color:var(--muted)]">{t("footer.tagline")}</p>
          <form onSubmit={onSubmit} noValidate className="mt-8 max-w-sm">
            <label htmlFor="newsletter-email" className="text-sm font-bold">
              {t("footer.newsTitle")}
            </label>
            <div className="mt-3 flex gap-2">
              <input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                aria-label={t("footer.emailLabel")}
                aria-invalid={status === "error"}
                aria-describedby="newsletter-status"
                onChange={() => status !== "idle" && setStatus("idle")}
                className="h-12 min-w-0 flex-1 rounded-full border border-[color:var(--cream)]/25 bg-transparent px-5 text-[color:var(--cream)] placeholder:text-[color:var(--muted)]/70 focus-visible:border-[color:var(--accent)] focus-visible:outline-none"
              />
              <button
                type="submit"
                className="h-12 shrink-0 rounded-full bg-[color:var(--cream)] px-5 text-sm font-bold text-[color:var(--cocoa)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--cream)]"
              >
                {t("footer.subscribe")}
              </button>
            </div>
            <p id="newsletter-status" aria-live="polite" className="mt-2 min-h-5 text-sm">
              {status === "ok" && <span className="text-[color:var(--accent)]">{t("footer.thanks")}</span>}
              {status === "error" && <span className="text-[#ffb4a2]">{t("footer.invalid")}</span>}
            </p>
          </form>
        </div>

        <nav aria-label={t("footer.shop")}>
          <h2 className={headCls}>{t("footer.shop")}</h2>
          <ul className="space-y-2.5">
            {products.map((p) => (
              <li key={p.id}>
                <a href="#top" className={linkCls}>
                  {p.name[locale]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("footer.explore")}>
          <h2 className={headCls}>{t("footer.explore")}</h2>
          <ul className="space-y-2.5">
            {explore.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={linkCls}>
                  {t(l.key)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={headCls}>{t("footer.contact")}</h2>
          <ul className="space-y-2.5 text-[color:var(--muted)]">
            <li className="select-all">hello@varakh.example</li>
            <li>{t("footer.city")}</li>
            <li>{t("footer.hours")}</li>
          </ul>
        </div>
      </motion.div>

      {/* oversized decorative wordmark, drawn with CSS ::before so it is not read as page text */}
      <div
        aria-hidden="true"
        data-word={t("hero.brand")}
        className={`footer-wordmark pointer-events-none -mb-[0.18em] select-none text-center font-display leading-none text-[color:var(--accent)]/15 ${
          gu ? "text-[34vw] font-extrabold" : "text-[25vw]"
        }`}
      />

      <div className="relative border-t border-[color:var(--cream)]/10 bg-[#170d07]">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm text-[color:var(--muted)] sm:px-6 lg:px-12">
          <p>{t("footer.rights")}</p>
          <p>{t("footer.credit")}</p>
          <a href="#top" className={linkCls}>
            ↑ {t("footer.top")}
          </a>
        </div>
      </div>
    </footer>
  );
}
