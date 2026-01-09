import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RibbonSection from "@/components/RibbonSection";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { TechNetwork } from "@/components/ui/tech-network";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-blue-500/30">
      <TechNetwork />
      <Navbar />
      <main>
        <Hero />
        <RibbonSection />
        <Experience />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
