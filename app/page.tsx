import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Motion from "@/components/Motion";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import Work from "@/components/Work";

export default function Page() {
  return (
    <>
      <Motion />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Work />
        <Capabilities />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
