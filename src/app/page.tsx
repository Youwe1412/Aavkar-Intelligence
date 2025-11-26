import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Credibility } from "@/components/sections/credibility";
import { FourWorlds } from "@/components/sections/four-worlds";
import { FocusAreas } from "@/components/sections/focus-areas";
import { Philosophy } from "@/components/sections/philosophy";
import { About } from "@/components/sections/about";
import { Process } from "@/components/sections/process";
import { CTA } from "@/components/sections/cta";
import { ScrollOrchestrator } from "@/components/animations/ScrollOrchestrator";
import { ChatWidget } from "@/components/interactive/ChatWidget";
import { PersonalizationBanner } from "@/components/sections/personalization-banner";

export default function Home() {
  return (
    <main className="min-h-screen bg-midnight text-white selection:bg-electric-teal/30">
      <ScrollOrchestrator />
      <Navbar />
      <Hero />
      <Credibility />
      <FourWorlds />
      <PersonalizationBanner />
      <div id="approach">
        <FocusAreas />
        <Philosophy />
      </div>
      <About />
      <Process />
      <CTA />
      <Footer />
      <ChatWidget />
    </main>
  );
}
