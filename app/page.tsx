import Header from "@/components/layout/Header";
import Hero from "@/components/hero/Hero";
import TrustBrands from "@/components/brands/TrustBrands";
import FeaturedWork from "@/components/projects/FeaturedWork";
import Services from "@/components/services/Services";
import Process from "@/components/process/Process";
import Testimonials from "@/components/testimonials/Testimonials";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBrands />
        <FeaturedWork />
        <Services />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
