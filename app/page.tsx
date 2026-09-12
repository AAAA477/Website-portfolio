import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Work from "@/components/Work";

export default function Page() {
  return (
    <main id="main">
      <Hero />
      <Work />
      <Capabilities />
      <About />
      <Contact />
    </main>
  );
}
