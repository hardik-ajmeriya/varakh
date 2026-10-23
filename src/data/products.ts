/**
 * SINGLE SOURCE OF TRUTH for the catalogue.
 * To reuse this page for another client: edit this file + /public/images.
 * Every text field is bilingual: { en, gu }.
 */
import type { Locale } from "@/i18n/config";

export type Localized = Record<Locale, string>;

export type Floater = {
  /** path under /public */
  src: string;
  /** position of the item centre, in % of the hero stage */
  x: number;
  y: number;
  /** width in px at desktop size (scaled down on mobile via CSS var) */
  size: number;
  rotate: number;
  /** 0 = behind the brand text, 1 = in front of the product */
  layer: 0 | 1;
};

export type Product = {
  id: string;
  name: Localized;
  tagline: Localized;
  description: Localized;
  /** price in INR for one unit */
  price: number;
  unit: Localized;
  image: string;
  /** small single piece, used in thumbnails and the gift box */
  piece: string;
  alt: Localized;
  palette: {
    /** page background */
    base: string;
    /** lighter glow behind the product */
    glow: string;
    /** text + button colour (≥4.5:1 on base and glow) */
    ink: string;
    /** decorative accent (large text / icons only) */
    accent: string;
  };
  floaters: Floater[];
};

const I = (name: string) => `/images/ingredients/${name}.webp`;

export const products: Product[] = [
  {
    id: "kaju-katli",
    name: { en: "Kaju Katli", gu: "કાજુ કતરી" },
    tagline: { en: "The silver-leaf classic", gu: "ચાંદીના વરખવાળી પરંપરા" },
    description: {
      en: "Slow-cooked cashew fudge, cut into diamonds and finished by hand with pure silver varakh.",
      gu: "ધીમા તાપે બનાવેલી કાજુની કતરી, હીરાના આકારમાં કાપીને હાથેથી શુદ્ધ ચાંદીનો વરખ લગાવેલો.",
    },
    price: 340,
    unit: { en: "250 g", gu: "૨૫૦ ગ્રામ" },
    image: "/images/products/kaju-katli.webp",
    piece: "/images/pieces/kaju-katli.webp",
    alt: {
      en: "A stack of diamond-shaped kaju katli covered in silver leaf",
      gu: "ચાંદીના વરખવાળી હીરા આકારની કાજુ કતરીનો ઢગલો",
    },
    palette: { base: "#8A5A2B", glow: "#9A6633", ink: "#FFF6E8", accent: "#E9C99B" },
    floaters: [
      { src: I("cashew"), x: 16, y: 24, size: 120, rotate: -18, layer: 0 },
      { src: I("almond"), x: 84, y: 20, size: 80, rotate: 24, layer: 0 },
      { src: I("cashew"), x: 80, y: 74, size: 96, rotate: 140, layer: 1 },
      { src: I("cardamom"), x: 33, y: 86, size: 84, rotate: 12, layer: 1 },
      { src: "/images/pieces/kaju-katli.webp", x: 68, y: 30, size: 84, rotate: -14, layer: 1 },
    ],
  },
  {
    id: "pista-roll",
    name: { en: "Pista Roll", gu: "પિસ્તા રોલ" },
    tagline: { en: "A swirl of pistachio", gu: "પિસ્તાનો મીઠો વળાંક" },
    description: {
      en: "Green pistachio filling rolled inside soft cashew, dusted with crushed pistachio and silver flakes.",
      gu: "નરમ કાજુના પડમાં વીંટાળેલું લીલું પિસ્તાનું પૂરણ, ઉપર પિસ્તાનો ભૂકો અને ચાંદીનો વરખ.",
    },
    price: 420,
    unit: { en: "250 g", gu: "૨૫૦ ગ્રામ" },
    image: "/images/products/pista-roll.webp",
    piece: "/images/pieces/pista-roll.webp",
    alt: {
      en: "Pista rolls with a green pistachio swirl, one cut open",
      gu: "લીલા પિસ્તાના વળાંકવાળા પિસ્તા રોલ, એક કાપેલો",
    },
    palette: { base: "#3E6B2F", glow: "#487A37", ink: "#F4FBEA", accent: "#C9E39A" },
    floaters: [
      { src: I("pistachio"), x: 15, y: 26, size: 120, rotate: -10, layer: 0 },
      { src: I("pistachio"), x: 86, y: 22, size: 84, rotate: 38, layer: 0 },
      { src: I("cardamom"), x: 82, y: 72, size: 96, rotate: -22, layer: 1 },
      { src: I("cashew"), x: 33, y: 86, size: 78, rotate: 30, layer: 1 },
      { src: "/images/pieces/pista-roll.webp", x: 70, y: 30, size: 86, rotate: 10, layer: 1 },
    ],
  },
  {
    id: "kesar-peda",
    name: { en: "Kesar Peda", gu: "કેસર પેંડા" },
    tagline: { en: "Saffron, milk and patience", gu: "કેસર, દૂધ અને ધીરજ" },
    description: {
      en: "Milk reduced for hours, scented with saffron and cardamom, then pressed by hand one by one.",
      gu: "કલાકો સુધી ઉકાળેલા દૂધમાંથી બનેલા, કેસર અને એલચીની સુગંધવાળા, એક-એક કરીને હાથે વાળેલા પેંડા.",
    },
    price: 260,
    unit: { en: "250 g", gu: "૨૫૦ ગ્રામ" },
    image: "/images/products/kesar-peda.webp",
    piece: "/images/pieces/kesar-peda.webp",
    alt: {
      en: "Five saffron pedas topped with saffron strands and pistachio",
      gu: "કેસરના તાંતણા અને પિસ્તાવાળા પાંચ કેસર પેંડા",
    },
    palette: { base: "#A84A0A", glow: "#B5530F", ink: "#FFF4E0", accent: "#FFD27A" },
    floaters: [
      { src: I("saffron"), x: 16, y: 24, size: 130, rotate: -6, layer: 0 },
      { src: I("almond"), x: 85, y: 22, size: 78, rotate: -30, layer: 0 },
      { src: I("pistachio"), x: 80, y: 74, size: 92, rotate: 20, layer: 1 },
      { src: I("cardamom"), x: 33, y: 86, size: 80, rotate: -16, layer: 1 },
      { src: "/images/pieces/kesar-peda.webp", x: 69, y: 30, size: 84, rotate: 8, layer: 1 },
    ],
  },
  {
    id: "masala-khakhra",
    name: { en: "Masala Khakhra", gu: "મસાલા ખાખરા" },
    tagline: { en: "Gujarat's favourite crunch", gu: "ગુજરાતનો મનપસંદ કડક નાસ્તો" },
    description: {
      en: "Thin, crisp whole-wheat khakhra, roasted slowly with chilli, cumin and a pinch of hing.",
      gu: "મરચું, જીરું અને ચપટી હિંગ સાથે ધીમા તાપે શેકેલા પાતળા, કડક ઘઉંના ખાખરા.",
    },
    price: 160,
    unit: { en: "200 g", gu: "૨૦૦ ગ્રામ" },
    image: "/images/products/masala-khakhra.webp",
    piece: "/images/pieces/khakhra.webp",
    alt: {
      en: "A stack of round masala khakhra with one piece broken off",
      gu: "ગોળ મસાલા ખાખરાનો ઢગલો, એક ટુકડો તૂટેલો",
    },
    palette: { base: "#8E1B1B", glow: "#A02622", ink: "#FFF1E6", accent: "#F2B65A" },
    floaters: [
      { src: I("chilli"), x: 15, y: 26, size: 130, rotate: 20, layer: 0 },
      { src: I("curry-leaf"), x: 86, y: 20, size: 100, rotate: -30, layer: 0 },
      { src: I("chilli"), x: 82, y: 74, size: 100, rotate: -120, layer: 1 },
      { src: I("curry-leaf"), x: 33, y: 86, size: 76, rotate: 60, layer: 1 },
      { src: "/images/pieces/khakhra.webp", x: 70, y: 30, size: 90, rotate: -12, layer: 1 },
    ],
  },
];
