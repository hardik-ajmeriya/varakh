"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Paragraph whose words light up as it scrolls into view.
 * Two stacked copies: the base copy is always readable (muted colour, passes contrast);
 * the bright copy on top fades in word by word (opacity only) and is hidden from screen readers.
 */
export function ScrollRevealText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={`relative ${className}`}>
      <span className="text-[color:var(--dim)]">{text}</span>
      <span aria-hidden="true" className="absolute inset-0 text-[color:var(--cream)]">
        {words.map((w, i) => (
          <Word key={`${w}-${i}`} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} still={reduce}>
            {w}
          </Word>
        ))}
      </span>
    </p>
  );
}

type WordProps = { children: string; progress: MotionValue<number>; range: [number, number]; still: boolean };

function Word({ children, progress, range, still }: WordProps) {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <>
      <motion.span style={{ opacity: still ? 1 : opacity }}>{children}</motion.span>{" "}
    </>
  );
}
