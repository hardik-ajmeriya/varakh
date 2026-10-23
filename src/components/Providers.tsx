"use client";

import { MotionConfig } from "framer-motion";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { CartProvider } from "@/lib/cart";
import { SmoothScroll } from "./SmoothScroll";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // reducedMotion="user": Framer skips transform animations for users who ask for less motion
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <CartProvider>
          <SmoothScroll />
          {children}
        </CartProvider>
      </LanguageProvider>
    </MotionConfig>
  );
}
