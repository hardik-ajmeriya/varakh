import type { Localized } from "./products";

/**
 * SAMPLE reviews written for this demo (shown with a visible "sample" note).
 * Replace with the client's real, verified reviews before going live.
 */
export const reviews: { id: string; name: Localized; place: Localized; rating: number; text: Localized; product: string }[] = [
  {
    id: "r1",
    name: { en: "Meera P.", gu: "મીરા પી." },
    place: { en: "Leicester, UK", gu: "લેસ્ટર, યુકે" },
    rating: 5,
    product: "kaju-katli",
    text: {
      en: "The kaju katli tasted exactly like the box my nani brought from Surat. It arrived fresh and the silver was intact.",
      gu: "કાજુ કતરીનો સ્વાદ બિલકુલ નાની સુરતથી લાવતાં એવો જ હતો. તાજી આવી અને વરખ પણ અકબંધ હતો.",
    },
  },
  {
    id: "r2",
    name: { en: "Rohan S.", gu: "રોહન એસ." },
    place: { en: "Edison, New Jersey", gu: "એડિસન, ન્યૂ જર્સી" },
    rating: 5,
    product: "pista-roll",
    text: {
      en: "Ordered the gift box for Diwali. The whole family fought over the pista rolls.",
      gu: "દિવાળી માટે ગિફ્ટ બોક્સ મંગાવ્યું. પિસ્તા રોલ માટે આખું કુટુંબ ઝઘડ્યું!",
    },
  },
  {
    id: "r3",
    name: { en: "Kavita D.", gu: "કવિતા ડી." },
    place: { en: "Ahmedabad", gu: "અમદાવાદ" },
    rating: 4,
    product: "masala-khakhra",
    text: {
      en: "Masala khakhra is my tea-time staple now. Crisp, not oily, and the chilli is just right.",
      gu: "મસાલા ખાખરા હવે મારી ચા સાથેનો રોજનો નાસ્તો છે. કડક, તેલ વગરના અને મરચું બરાબર.",
    },
  },
];
