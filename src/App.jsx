import { useEffect } from 'react';
import Lenis from 'lenis';
import { Fade } from 'react-awesome-reveal';
import Navbar from './components/ui/Navbar';
import Hero from './components/sections/Hero'; 
// Import your new God-Level Collections section
import Collections from './components/sections/Collections';

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

      <main className="w-full">
        {/* HERO SECTION */}
        <Hero />

        {/* COLLECTIONS SECTION - Replaced the old one with our new Horizontal Scroll */}
        <Collections />

        {/* CRAFTSMANSHIP SECTION */}
        <section 
          id="craftsmanship" 
          className="relative w-full min-h-screen flex items-center justify-center border-b border-white/5 bg-black"
        >
          <Fade direction="up" triggerOnce>
            <h2 className="text-4xl md:text-6xl font-display font-medium text-zinc-600 tracking-widest uppercase">
              <span className="text-[#D4AF37] text-2xl align-top mr-4">02.</span> 
              Craftsmanship
            </h2>
          </Fade>
        </section>

        {/* BOUTIQUE SECTION */}
        <section 
          id="boutique" 
          className="relative w-full min-h-screen flex items-center justify-center border-b border-white/5 bg-[#050505]"
        >
          <Fade direction="up" triggerOnce>
            <h2 className="text-4xl md:text-6xl font-display font-medium text-zinc-600 tracking-widest uppercase">
              <span className="text-[#D4AF37] text-2xl align-top mr-4">03.</span> 
              Boutique
            </h2>
          </Fade>
        </section>

        {/* LEGACY SECTION */}
        <section 
          id="legacy" 
          className="relative w-full min-h-screen flex items-center justify-center bg-black"
        >
          <Fade direction="up" triggerOnce>
            <h2 className="text-4xl md:text-6xl font-display font-medium text-zinc-600 tracking-widest uppercase">
              <span className="text-[#D4AF37] text-2xl align-top mr-4">04.</span> 
              Legacy
            </h2>
          </Fade>
        </section>
      </main>
      
    </div>
  );
}

export default App;