import { products } from "./products";

/** Gift box offer. Contents reuse the product list, so names and weights stay in one place. */
export const giftBox = {
  id: "gift-box",
  price: 1099,
  items: products.map((p) => p.id),
  lid: "/images/box/closed.webp",
  base: "/images/box/base.webp",
  /**
   * One compartment per sweet, in product order (kaju, pista, kesar, khakhra), 3 pieces each so no compartment looks empty.
   * x / y = where each piece sits, in % of the box image; w = width in %; r = tilt; z = row (front row draws on top).
   * Measured on /images/box/base.webp — remeasure if the box image changes.
   */
  slots: [
    { z: 2, pieces: [{ x: 35.0, y: 57.6, w: 17.0, r: -6 }, { x: 46.5, y: 55.2, w: 17.0, r: 10 }, { x: 41.0, y: 64.1, w: 18.0, r: -10 }] },
    { z: 1, pieces: [{ x: 21.5, y: 31.2, w: 16.5, r: 4 }, { x: 31.0, y: 29.4, w: 16.5, r: -10 }, { x: 26.5, y: 38.4, w: 17.5, r: 8 }] },
    { z: 1, pieces: [{ x: 53.5, y: 26.4, w: 16.0, r: 0 }, { x: 64.0, y: 24.0, w: 16.0, r: 6 }, { x: 59.0, y: 33.0, w: 17.0, r: -4 }] },
    { z: 2, pieces: [{ x: 66.0, y: 46.2, w: 16.5, r: 14 }, { x: 75.5, y: 44.4, w: 16.0, r: -8 }, { x: 70.5, y: 51.6, w: 16.5, r: 24 }] },
  ],
  /** order the compartments fill (indexes into slots): back row first */
  dropOrder: [1, 2, 0, 3],
};

export const giftBoxFullPrice = products.reduce((sum, p) => sum + p.price, 0);
