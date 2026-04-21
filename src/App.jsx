import { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/ui/Navbar';
import Hero from './components/sections/Hero'; 
import Collections from './components/sections/Collections';
import Craftsmanship from './components/sections/Craftsmanship';
import Boutique from './components/sections/Boutique';
// Import the final Legacy section
import Legacy from './components/sections/Legacy';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black text-white selection:bg-[#D4AF37] selection:text-black font-sans overflow-x-hidden">
      
      <Navbar />

      {/* CRITICAL PARALLAX SETUP: 
        The main tag must have z-10 and a solid background (bg-black) 
        so it slides cleanly over the top of the Legacy footer.
      */}
      <main className="w-full relative z-10 bg-black">
        <Hero />
        <Collections />
        <Craftsmanship />
        <Boutique />
      </main>

      {/* LEGACY / FOOTER SECTION */}
      {/* Placed outside of main to ensure it acts as the foundational base layer */}
      <Legacy />
      
    </div>
  );
}

export default App;