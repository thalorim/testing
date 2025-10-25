import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import DiscordStatus from "@/components/DiscordStatus";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Skills />
      {/* Animated dark gradient break replacing the removed Projects section */}
      <section aria-hidden className="h-40 md:h-56 animated-gradient-dark relative">
        <div className="absolute inset-0 bg-black/40" />
      </section>
      
      <section className="py-10 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <DiscordStatus />
          </div>
        </div>
      </section>
      
      <Contact />
      <Footer />
    </main>
  );
}
