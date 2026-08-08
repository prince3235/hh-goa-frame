import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { GeneratorSection } from "@/components/GeneratorSection";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <GeneratorSection />
      <HowItWorks />
      <Features />
      <Footer />
    </main>
  );
}
