/**
 * Prefix for files in /public.
 * Normal Vercel deploy: "" (absolute paths).
 * Portable demo build (DEMO_EXPORT=1): "." so the site works from any folder.
 */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_ASSET_BASE ?? ""}${path}`;

/**
 * Shadows are baked into the "-sh.webp" image variants (cheaper than CSS drop-shadow, which the
 * browser recomputes every frame while an image moves). Each variant has SHADOW_PAD of empty space
 * on every side; `shadowFit` enlarges the <img> by that amount so the object keeps its size.
 */
export const SHADOW_PAD = 0.12;
export const withShadow = (src: string) => src.replace(/\.webp$/, "-sh.webp");
export const shadowFit = {
  width: `${100 * (1 + 2 * SHADOW_PAD)}%`,
  maxWidth: "none",
  margin: `-${100 * SHADOW_PAD}%`,
} as const;
