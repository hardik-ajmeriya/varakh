"use client";

import { AnimatePresence, motion, useTransform, type MotionValue } from "framer-motion";
import type { Floater, Product } from "@/data/products";
import { asset, shadowFit, withShadow } from "@/lib/asset";

type Props = { product: Product; layer: 0 | 1; px: MotionValue<number>; py: MotionValue<number> };

/** Ingredients around the product. layer 0 sits behind the brand text, layer 1 in front of the product. */
export function Floaters({ product, layer, px, py }: Props) {
  const items = product.floaters.filter((f) => f.layer === layer);
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${layer === 0 ? "z-0" : "z-30"}`}>
      <AnimatePresence>
        {items.map((f, i) => (
          <FloatItem key={`${product.id}-${f.src}-${f.x}`} f={f} index={i} px={px} py={py} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function FloatItem({ f, index, px, py }: { f: Floater; index: number; px: MotionValue<number>; py: MotionValue<number> }) {
  const depth = f.layer === 1 ? 28 : 12; // front items move more = parallax depth
  const x = useTransform(px, (v) => v * depth);
  const y = useTransform(py, (v) => v * depth);
  const fromLeft = f.x < 50 ? -1 : 1;

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${f.x}%`,
        top: `${f.y}%`,
        width: `calc(${f.size}px * var(--fs))`,
        x,
        y,
        opacity: f.layer === 0 ? 0.9 : 1,
      }}
      initial={{ opacity: 0, scale: 0.4, rotate: f.rotate - 60 * fromLeft }}
      animate={{ opacity: f.layer === 0 ? 0.9 : 1, scale: 1, rotate: f.rotate }}
      exit={{ opacity: 0, scale: 0.6, rotate: f.rotate + 40 * fromLeft, transition: { duration: 0.35 } }}
      transition={{ delay: 0.15 + index * 0.07, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <img
        src={asset(withShadow(f.src))}
        alt=""
        draggable={false}
        fetchPriority="low"
        className="bob block h-auto"
        style={{ ...shadowFit, animationDuration: `${4 + index * 0.9}s`, animationDelay: `${-index * 0.7}s` }}
      />
    </motion.div>
  );
}
