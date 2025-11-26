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

export default function Home() {
  return (
    <main className="min-h-screen bg-midnight text-white selection:bg-electric-teal/30">
      <Navbar />
      <Hero />
      <Credibility />
      <div id="services">
        <FourWorlds />
      </div>
      <div id="approach">
        <FocusAreas />
        <Philosophy />
      </div>
      <div id="about">
        <About />
      </div>
      <Process />
      <CTA />
      <Footer />
    </main>
  );
}
