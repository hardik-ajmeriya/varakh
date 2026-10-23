"use client";

import { AnimatePresence, motion, useTransform, type MotionValue } from "framer-motion";
import type { Product } from "@/data/products";
import { useI18n } from "@/i18n/LanguageProvider";
import { asset, shadowFit, withShadow } from "@/lib/asset";

/** phones get the 600px file, larger screens the 1000px one */
export const IMAGE_SIZES = "(min-width: 1024px) 40vw, (min-width: 640px) 58vw, 74vw";
export const srcSetFor = (src: string) =>
  `${asset(withShadow(src.replace(".webp", "-600.webp")))} 600w, ${asset(withShadow(src))} 1000w`;

const variants = {
  enter: (dir: number) => ({ x: `${dir * 55}%`, rotate: dir * 14, scale: 0.8, opacity: 0 }),
  center: { x: "0%", rotate: 0, scale: 1, opacity: 1 },
  exit: (dir: number) => ({ x: `${dir * -55}%`, rotate: dir * -14, scale: 0.8, opacity: 0 }),
};

type Props = { product: Product; dir: number; px: MotionValue<number>; py: MotionValue<number>; first: boolean };

export function ProductImage({ product, dir, px, py, first }: Props) {
  const { locale } = useI18n();
  const x = useTransform(px, (v) => v * -10);
  const y = useTransform(py, (v) => v * -10);

  return (
    <motion.div
      style={{ x, y }}
      className="absolute left-1/2 top-[56%] z-20 aspect-square w-[min(68vw,40svh,320px)] -translate-x-1/2 -translate-y-1/2 sm:top-[58%] sm:w-[min(58vw,440px)] lg:top-[56%] lg:w-[min(36vw,58svh,540px)]"
    >
      {/* soft contact shadow (static) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-[12%] bottom-[6%] h-[14%] rounded-[50%] bg-black/35 blur-2xl"
      />
      <AnimatePresence initial={false} custom={dir} mode="popLayout">
        <motion.div
          key={product.id}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 grid place-items-center"
        >
          <img
            src={asset(withShadow(product.image))}
            srcSet={srcSetFor(product.image)}
            sizes={IMAGE_SIZES}
            alt={product.alt[locale]}
            width={1000}
            height={1000}
            draggable={false}
            fetchPriority={first ? "high" : "auto"}
            className="bob h-auto"
            style={{ ...shadowFit, animationDuration: "5s" }}
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
