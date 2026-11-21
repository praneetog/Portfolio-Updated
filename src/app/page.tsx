import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TechStack } from "@/components/TechStack";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { AskAI } from "@/components/AskAI";

export default function Home() {
  return (
    <>
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
