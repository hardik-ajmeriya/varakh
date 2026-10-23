import type { Localized } from "./products";

/** Ingredient strip in the brand story. Edit per client. */
export const ingredients: { id: string; name: Localized; image: string }[] = [
  { id: "cashew", name: { en: "Cashew", gu: "કાજુ" }, image: "/images/ingredients/cashew.webp" },
  { id: "pistachio", name: { en: "Pistachio", gu: "પિસ્તા" }, image: "/images/ingredients/pistachio.webp" },
  { id: "saffron", name: { en: "Saffron", gu: "કેસર" }, image: "/images/ingredients/saffron.webp" },
  { id: "cardamom", name: { en: "Cardamom", gu: "એલચી" }, image: "/images/ingredients/cardamom.webp" },
  { id: "almond", name: { en: "Almond", gu: "બદામ" }, image: "/images/ingredients/almond.webp" },
  { id: "chilli", name: { en: "Red chilli", gu: "લાલ મરચું" }, image: "/images/ingredients/chilli.webp" },
  { id: "curry-leaf", name: { en: "Curry leaf", gu: "મીઠો લીમડો" }, image: "/images/ingredients/curry-leaf.webp" },
];
