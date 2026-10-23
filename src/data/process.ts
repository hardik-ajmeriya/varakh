import type { Localized } from "./products";

/** "How it's made" steps (kaju katli). Order matters: it is a real sequence. */
export const processSteps: { id: string; title: Localized; text: Localized; time: Localized; image: string }[] = [
  {
    id: "sort",
    title: { en: "Sort the nuts", gu: "દાણા વીણવા" },
    text: {
      en: "Whole cashews and pistachios are sorted by hand. Broken pieces never make it in.",
      gu: "કાજુ અને પિસ્તા હાથથી વીણવામાં આવે છે. તૂટેલા દાણા ક્યારેય વપરાતા નથી.",
    },
    time: { en: "30 min", gu: "૩૦ મિનિટ" },
    image: "/images/ingredients/pistachio.webp",
  },
  {
    id: "grind",
    title: { en: "Soak and grind", gu: "પલાળીને પીસવું" },
    text: {
      en: "Cashews soak for four hours, then go through a stone grinder into a smooth, cool paste.",
      gu: "કાજુને ચાર કલાક પલાળીને પથ્થરની ઘંટીમાં લીસી, ઠંડી પેસ્ટ બનાવવામાં આવે છે.",
    },
    time: { en: "4 hrs", gu: "૪ કલાક" },
    image: "/images/ingredients/cashew.webp",
  },
  {
    id: "cook",
    title: { en: "Slow-cook in brass", gu: "પિત્તળમાં ધીમા તાપે" },
    text: {
      en: "The paste is stirred with sugar and cardamom in a brass kadai over a low flame until it leaves the sides.",
      gu: "પિત્તળની કડાઈમાં ધીમા તાપે ખાંડ અને એલચી સાથે પેસ્ટ હલાવીએ છીએ, જ્યાં સુધી તે કિનારી ન છોડે.",
    },
    time: { en: "45 min", gu: "૪૫ મિનિટ" },
    image: "/images/ingredients/cardamom.webp",
  },
  {
    id: "cut",
    title: { en: "Roll and cut", gu: "વણવું અને કાપવું" },
    text: {
      en: "Rolled while still warm to an even 6 mm, then cut into diamonds with one long knife.",
      gu: "ગરમ હોય ત્યારે જ ૬ મિમી જાડું વણીને લાંબી છરીથી હીરાના આકારમાં કાપીએ છીએ.",
    },
    time: { en: "20 min", gu: "૨૦ મિનિટ" },
    image: "/images/pieces/kaju-katli.webp",
  },
  {
    id: "pack",
    title: { en: "Silver and pack", gu: "વરખ અને પેકિંગ" },
    text: {
      en: "Each piece gets real silver varakh by hand and goes into its box the same day.",
      gu: "દરેક ટુકડા પર હાથથી સાચો ચાંદીનો વરખ લગાવીને એ જ દિવસે બોક્સમાં પેક કરીએ છીએ.",
    },
    time: { en: "Same day", gu: "એ જ દિવસે" },
    image: "/images/box/closed.webp",
  },
];
