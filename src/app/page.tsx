import { Header } from "@/components/Header";
import { SkipLink } from "@/components/SkipLink";
import { Hero } from "@/components/hero/Hero";
import { BrandStory } from "@/components/story/BrandStory";
import { HowItsMade } from "@/components/process/HowItsMade";
import { GiftBox } from "@/components/gift/GiftBox";
import { Reviews } from "@/components/reviews/Reviews";
import { Footer } from "@/components/footer/Footer";
import { StructuredData } from "@/components/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData />
      <SkipLink />
      <Header />
      <main id="main">
        <Hero />
        <BrandStory />
        <HowItsMade />
        <GiftBox />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
