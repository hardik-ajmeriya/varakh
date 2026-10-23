"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type CartCtx = { count: number; add: (id: string) => void };
const CartContext = createContext<CartCtx | null>(null);

/** Demo cart: counts items only. Swap for a real store (Shopify, Razorpay, etc.) per client. */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Record<string, number>>({});
  const add = useCallback((id: string) => setItems((s) => ({ ...s, [id]: (s[id] ?? 0) + 1 })), []);
  const count = Object.values(items).reduce((a, b) => a + b, 0);
  const value = useMemo(() => ({ count, add }), [count, add]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
