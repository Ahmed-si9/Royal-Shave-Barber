import { useEffect } from "react";
import Lenis from "lenis";
import "@/App.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GoldMarquee from "@/components/GoldMarquee";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Visit from "@/components/Visit";
import Footer from "@/components/Footer";

function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    window.__lenis = lenis;
    let rafId;
    const loop = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <div className="App bg-coal font-body text-white antialiased">
      <div className="grain-overlay" />
      <Navbar />
      <main>
        <Hero />
        <GoldMarquee />
        <Services />
        <Gallery />
        <Reviews />
        <Visit />
      </main>
      <Footer />
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#141414",
            border: "1px solid rgba(212, 175, 55, 0.3)",
            color: "#fff",
            borderRadius: "0px",
          },
        }}
      />
    </div>
  );
}

export default App;
