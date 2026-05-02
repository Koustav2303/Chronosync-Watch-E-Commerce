import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, Crosshair, Cog, ShieldCheck, Cpu, ArrowUpRight } from "lucide-react";

// Native Local Image Imports
import imgSapphire from "../../assets/anatomy/domed-sapphire.png";
import imgDial from "../../assets/anatomy/skeletonized-dial.png";
import imgCaliber from "../../assets/anatomy/inhouse-caliber.png";
import imgCase from "../../assets/anatomy/titanium-chassis.png";

const anatomyData = [
  { 
    id: '01',
    name: 'Domed Sapphire',
    sub: 'Anti-Reflective Architecture',
    desc: 'Forged at 2,050°C. Seven distinct layers of AR coating render the crystal virtually invisible to the naked eye, offering flawless clarity from any angle.',
    icon: <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />,
    img: imgSapphire,
  },
  { 
    id: '02',
    name: 'Skeletonized Dial',
    sub: 'Micro-Machined Rhodium',
    desc: 'Hand-beveled edges with luminescent rhodium-plated markers floating above the mechanical void. A masterpiece of negative space.',
    icon: <Crosshair className="w-5 h-5 text-[#D4AF37]" />,
    img: imgDial, 
  },
  { 
    id: '03',
    name: 'In-House Caliber',
    sub: 'Tourbillon Movement',
    desc: 'Suspended by grade 5 titanium bridges, vibrating at exactly 28,800 vph with a massive 72-hour power reserve.',
    icon: <Cog className="w-5 h-5 text-[#D4AF37]" />,
    img: imgCaliber, 
  },
  { 
    id: '04',
    name: 'Titanium Chassis',
    sub: 'Grade 5 Alloy Case',
    desc: 'Forged under extreme atmospheric pressure to create a weightless yet virtually indestructible housing for the micro-mechanics within.',
    icon: <Layers className="w-5 h-5 text-[#D4AF37]" />,
    img: imgCase, 
  }
];

gsap.registerPlugin(ScrollTrigger);

export default function Anatomy() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Smooth Header Reveal
      gsap.fromTo(headerRef.current,
        { y: 30, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          }
        }
      );

      // 2. Hardware-Accelerated Card Reveal
      // Instead of staggering all at once, we trigger them individually 
      // so mobile users get a smooth reveal as they scroll down.
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%", // Triggers when the top of each card hits 85% of the screen
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="anatomy" 
      className="relative w-full min-h-[100dvh] bg-[#030303] flex flex-col items-center justify-center py-20 lg:py-32 overflow-hidden border-t border-white/5"
    >
      
      {/* Cinematic Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[80%] bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.04)_0%,transparent_70%)] pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col h-full">
        
        {/* ========================================== */}
        {/* SECTION HEADER */}
        {/* ========================================== */}
        <div ref={headerRef} className="flex flex-col items-center lg:items-start text-center lg:text-left mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Cpu className="w-4 h-4 text-[#D4AF37]" />
            <span className="uppercase tracking-[0.25em] text-[#D4AF37] text-[10px] md:text-xs font-display font-medium">Engineering</span>
            <span className="h-[1px] w-12 bg-[#D4AF37]/50 hidden lg:block"></span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-[5.5rem] font-display font-bold text-white tracking-tighter leading-[0.9]">
            Anatomy of Time.
          </h2>
          <p className="text-zinc-500 mt-6 max-w-md font-light text-sm md:text-base leading-relaxed">
            Every timepiece is a micro-mechanical universe. Explore the four distinct layers that define our pursuit of absolute perfection.
          </p>
        </div>

        {/* ========================================== */}
        {/* GOD-LEVEL EDITORIAL CARD GRID */}
        {/* ========================================== */}
        
        <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-4 h-auto lg:h-[70vh]">
          {anatomyData.map((layer, index) => (
            <div 
              key={layer.id}
              ref={el => cardsRef.current[index] = el}
              // CORE ARCHITECTURE FIX:
              // Mobile: min-h-[65vh] and shrink-0 physically FORCES the browser to render the height. It cannot collapse.
              // Desktop: lg:min-h-0 allows the flex accordion logic (lg:hover:flex-[2.5]) to take over.
              className={`
                group relative w-full overflow-hidden cursor-pointer bg-[#080808] border border-white/5 rounded-3xl shadow-2xl
                shrink-0 min-h-[65vh] sm:min-h-[70vh] 
                lg:min-h-0 lg:h-full lg:flex-1 lg:hover:flex-[2.5]
                transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]
              `}
            >
              
              {/* IMAGE ZONE */}
              {/* object-contain ensures your 9:16 images fit perfectly without being cropped */}
              <div className="absolute inset-0 w-full h-full p-8 md:p-12 flex items-center justify-center z-10 pointer-events-none">
                <img 
                  src={layer.img} 
                  alt={layer.name} 
                  className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] opacity-90 lg:opacity-60 lg:group-hover:opacity-100 lg:group-hover:scale-105 transition-all duration-700 ease-out will-change-transform"
                />
              </div>

              {/* CARD GRADIENT OVERLAY */}
              {/* Essential for ensuring the white text is readable against the bright parts of your sketches */}
              <div className="absolute bottom-0 left-0 w-full h-[60%] lg:h-[50%] bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent z-15 pointer-events-none"></div>

              {/* TEXT CONTENT CONTAINER */}
              <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 lg:p-8 pointer-events-none">
                
                {/* Top: Digital Number & Hardware Icon */}
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-white lg:group-hover:border-[#D4AF37]/50 lg:group-hover:bg-[#D4AF37]/10 transition-colors duration-500 shadow-lg">
                    {layer.icon}
                  </div>
                  <span className="text-white/20 font-display text-4xl md:text-5xl font-bold tracking-tighter lg:group-hover:text-white/40 transition-colors duration-500 drop-shadow-md">
                    {layer.id}
                  </span>
                </div>

                {/* Bottom: Dynamic Editorial Text */}
                <div className="flex flex-col relative w-full mt-auto pt-10">
                  
                  {/* Persistent Titles */}
                  <h4 className="text-[#D4AF37] font-display text-[10px] md:text-xs tracking-[0.2em] uppercase mb-2 drop-shadow-md">
                    {layer.sub}
                  </h4>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-tighter mb-2 lg:mb-0 transform translate-y-0 lg:group-hover:-translate-y-2 transition-transform duration-500 drop-shadow-lg">
                    {layer.name}
                  </h3>

                  {/* 
                    Hidden Description 
                    Mobile: Always grid-rows-[1fr] (fully visible) because mobile has no hover.
                    Desktop: Animates from 0fr to 1fr on hover smoothly.
                  */}
                  <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]">
                    <p className="text-zinc-300 lg:text-zinc-400 text-sm md:text-base leading-relaxed font-light overflow-hidden opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-700 lg:delay-100 drop-shadow-md">
                      <span className="block pt-2 lg:pt-4">{layer.desc}</span>
                    </p>
                  </div>

                  {/* Elegant Interaction Arrow (Desktop Only) */}
                  <div className="hidden lg:flex absolute right-0 bottom-0 w-10 h-10 items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                    <ArrowUpRight className="w-5 h-5 text-[#D4AF37]" />
                  </div>

                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}