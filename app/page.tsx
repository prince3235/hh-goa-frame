import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { GeneratorSection } from "@/components/GeneratorSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <GeneratorSection />
      <Footer />
    </main>
  );
}
