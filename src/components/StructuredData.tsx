import { products } from "@/data/products";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varakh.vercel.app";

/** schema.org data so search engines can show products and prices. No review/rating data (reviews are samples). */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", name: "VARAKH", url: siteUrl, logo: `${siteUrl}/icon.svg` },
      ...products.map((p) => ({
        "@type": "Product",
        name: p.name.en,
        alternateName: p.name.gu,
        description: p.description.en,
        image: `${siteUrl}${p.image}`,
        brand: { "@type": "Brand", name: "VARAKH" },
        offers: { "@type": "Offer", price: p.price, priceCurrency: "INR", availability: "https://schema.org/InStock" },
      })),
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
