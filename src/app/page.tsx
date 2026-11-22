import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TechStack } from "@/components/TechStack";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { AskAI } from "@/components/AskAI";
import { SilverFlowBackground } from "@/components/SilverFlowBackground";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <SilverFlowBackground />
      <SmoothScroll />
      <Navbar />
      <main>
        <Hero />
        <div id="about" />
        <TechStack />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <AskAI />
    </>
  );
}
