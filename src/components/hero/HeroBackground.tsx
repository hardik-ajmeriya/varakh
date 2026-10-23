"use client";

import { motion } from "framer-motion";
import { products } from "@/data/products";

/** One gradient layer per product; only opacity animates (GPU-friendly). */
export function HeroBackground({ active }: { active: number }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      {products.map((p, i) => (
        <motion.div
          key={p.id}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 46%, ${p.palette.glow} 0%, ${p.palette.base} 70%)`,
          }}
          initial={false}
          animate={{ opacity: i === active ? 1 : 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        />
      ))}
      <div className="grain absolute inset-0" />
    </div>
  );
}
