import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, CalendarDays, Globe, ArrowRight, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const boutiques = [
  {
    id: '01',
    city: 'Geneva',
    region: 'Europe',
    address: 'Rue du Rhône 41, 1204 Genève',
    status: 'Flagship',
    timezone: 'GMT+1',
    img: 'https://en.worldtempus.com/sites/default/files/media/article/a-lemeraude/emeraude-devanture.jpg'
  },
  {
    id: '02',
    city: 'New York',
    region: 'Americas',
    address: '57th Street & 5th Ave, NY 10022',
    status: 'Open',
    timezone: 'GMT-5',
    img: 'https://uploads.nationaljeweler.com/uploads/72a5fc792bde0ede0b5a0446f52d30c8.jpg'
  },
  {
    id: '03',
    city: 'Tokyo',
    region: 'Asia Pacific',
    address: 'Ginza 6-Chome, Chuo City, Tokyo 104-0061',
    status: 'Open',
    timezone: 'GMT+9',
    img: 'https://mkiiwatches.com/cdn/shop/articles/R0003673_1000x.jpg?v=1673893479'
  },
  {
    id: '04',
    city: 'Dubai',
    region: 'Middle East',
    address: 'Fashion Avenue, Dubai Mall',
    status: 'Opening Soon',
    timezone: 'GMT+4',
    img: 'https://luxebook.in/wp-content/uploads/2023/12/WatchBox_and_Ahmed_Seddiqi-1.jpg'
  }
];

export default function Boutique() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const imageWrappersRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const prevIndexRef = useRef(0);

  // ==========================================
  // GOD-LEVEL IMAGE SHUTTER LOGIC
  // ==========================================
  useEffect(() => {
    // Prevent animation on initial mount
    if (prevIndexRef.current === activeIndex) return;

    const prevImg = imageWrappersRef.current[prevIndexRef.current];
    const newImg = imageWrappersRef.current[activeIndex];

    // 1. Kill any currently running animations to prevent rapid-hover glitching
    gsap.killTweensOf(imageWrappersRef.current);

    // 2. Reset all images to the deep background
    gsap.set(imageWrappersRef.current, { zIndex: 0 });
    
    // 3. Set the previous image to sit directly behind the new one
    // Force its clipPath open so there are no empty black spaces
    gsap.set(prevImg, { zIndex: 1, clipPath: 'inset(0% 0 0 0)' });
    
    // 4. Prep the new image to wipe in from the bottom
    gsap.set(newImg, { zIndex: 2, clipPath: 'inset(100% 0 0 0)' });

    // 5. Execute the buttery smooth wipe
    gsap.to(newImg, {
      clipPath: 'inset(0% 0 0 0)',
      duration: 0.7,
      ease: 'power3.inOut',
    });

    // Update the ref for the next interaction
    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  // ==========================================
  // INITIAL SCROLL REVEALS
  // ==========================================
  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // Desktop list stagger
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(itemsRef.current, 
          { y: 40, opacity: 0 },
          { 
            y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: containerRef.current, start: "top 70%" }
          }
        );
      });

      // Mobile carousel slide up
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(".mobile-carousel", 
          { y: 50, opacity: 0 },
          { 
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const activeBoutique = boutiques[activeIndex];

  return (
    <section 
      ref={containerRef} 
      id="boutique" 
      className="relative w-full min-h-[100svh] bg-black py-20 lg:py-32 overflow-hidden"
    >
      {/* Subtle Background Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col justify-center">
        
        {/* Section Header */}
        <div className="mb-12 lg:mb-20">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-[#D4AF37] font-display text-lg">03.</span>
            <span className="h-[1px] w-12 bg-[#D4AF37]/50"></span>
            <span className="uppercase tracking-[0.2em] text-zinc-500 text-sm">Global Network</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tighter">
            The <span className="text-zinc-600 italic font-light">Boutiques.</span>
          </h2>
        </div>

        {/* ========================================== */}
        {/* DESKTOP VIEW (Split Layout)                */}
        {/* ========================================== */}
        <div className="hidden lg:grid grid-cols-12 gap-12 items-center h-[65vh]">
          
          {/* Left Column: Interactive React-Driven List */}
          <div className="col-span-6 flex flex-col h-full justify-center space-y-2">
            {boutiques.map((boutique, index) => {
              const isActive = activeIndex === index;
              
              return (
                <div 
                  key={boutique.id} 
                  ref={el => itemsRef.current[index] = el}
                  onMouseEnter={() => setActiveIndex(index)}
                  className="group flex flex-col justify-center py-8 border-b border-white/5 w-full relative cursor-pointer"
                >
                  {/* Tailwind-driven Frosted Hover Panel */}
                  <div className={`absolute inset-0 left-[-20px] right-[-20px] top-[5px] bottom-[5px] bg-white/[0.02] border border-[#D4AF37]/10 backdrop-blur-md rounded-2xl origin-left pointer-events-none transition-all duration-500 ease-out z-0 ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-90'}`}>
                    <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.8)]"></div>
                  </div>

                  {/* Typography & Layout */}
                  <div className="flex items-center justify-between z-10 relative">
                    <h3 className={`text-6xl font-display font-bold uppercase tracking-tighter transition-all duration-500 ease-out ${isActive ? 'translate-x-6 text-white' : 'translate-x-0 text-zinc-600'}`}>
                      {boutique.city}
                    </h3>
                    
                    {/* Extra Details */}
                    <div className={`flex items-center gap-6 text-zinc-400 transition-all duration-500 ease-out ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                        <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-xs tracking-widest uppercase">{boutique.region}</span>
                        </div>
                        <div className="text-xs tracking-widest uppercase text-white/50">{boutique.timezone}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Portal & CTA */}
          <div className="col-span-6 relative h-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 group bg-zinc-900">
            
            {/* The Stacked Image Portal */}
            <div className="absolute inset-0 w-full h-full">
              <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
              
              {boutiques.map((boutique, index) => (
                <div
                  key={boutique.id}
                  ref={el => imageWrappersRef.current[index] = el}
                  // Init setup: first image is fully visible, rest are clipped to the bottom
                  className="absolute inset-0 w-full h-full overflow-hidden"
                  style={{ 
                    clipPath: index === 0 ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)',
                    zIndex: index === 0 ? 1 : 0 
                  }}
                >
                  <img 
                    src={boutique.img} 
                    alt={boutique.city} 
                    // Scale animation happens infinitely on hover, entirely independent of the clip-path wipe
                    className="w-full h-full object-cover scale-[1.02] group-hover:scale-110 transition-transform duration-[15s] ease-out"
                  />
                </div>
              ))}
            </div>

            {/* Floating Glass CTA Card (Animated with React Key) */}
            <div className="absolute bottom-8 left-8 right-8 z-20 bg-[#0a0a0b]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 flex items-center justify-between transition-all duration-500 hover:border-[#D4AF37]/40">
              <div key={activeBoutique.id} className="animate-[fadeIn_0.5s_ease-out_forwards]">
                <p className="text-[#D4AF37] font-display text-xs tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
                  <MapPin className="w-3 h-3" /> {activeBoutique.status}
                </p>
                <h4 className="text-2xl font-display text-white mb-1">{activeBoutique.address}</h4>
              </div>
              
              <button className="w-14 h-14 rounded-full bg-[#D4AF37] flex shrink-0 items-center justify-center text-black hover:scale-110 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all">
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>

        </div>

        {/* ========================================== */}
        {/* MOBILE VIEW (Horizontal Snap Carousel)     */}
        {/* ========================================== */}
        <div className="mobile-carousel lg:hidden flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 w-[100vw] -ml-6 px-6 hide-scrollbar mt-6">
          {boutiques.map((boutique) => (
            <div 
              key={boutique.id} 
              className="snap-center shrink-0 w-[85vw] h-[60vh] relative rounded-3xl overflow-hidden border border-white/10"
            >
              <img 
                src={boutique.img} 
                alt={boutique.city} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

              <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-[#D4AF37] text-black text-[10px] font-bold tracking-widest uppercase rounded-full">
                    {boutique.status}
                  </span>
                  <span className="flex items-center gap-1 text-white/70 text-xs tracking-widest uppercase">
                    <Clock className="w-3 h-3" /> {boutique.timezone}
                  </span>
                </div>

                <h3 className="text-5xl font-display font-bold text-white tracking-tighter mb-2">
                  {boutique.city}
                </h3>
                
                <p className="text-zinc-400 text-sm mb-6 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  {boutique.address}
                </p>

                <button className="w-full py-4 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md text-white font-medium tracking-widest uppercase text-xs flex items-center justify-center gap-2 active:bg-white/10 transition-colors">
                  Book Appointment <CalendarDays className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
      
      {/* Custom Styles for Mobile Scrollbar and Keyframe Animation */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </section>
  );
}