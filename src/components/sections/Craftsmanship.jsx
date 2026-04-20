import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cog, Gem, Flame, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Cog className="w-6 h-6 text-[#D4AF37]" />,
    title: "Micro-Tolerances",
    desc: "Machined to the absolute micron. Our in-house calibers are assembled in a vacuum-sealed cleanroom, ensuring friction is virtually eliminated.",
    img: "" // Add a path to a close-up gear PNG or image here
  },
  {
    icon: <Gem className="w-6 h-6 text-[#D4AF37]" />,
    title: "Sapphire Architecture",
    desc: "Forged at 2,050°C, our sapphire crystals are coated with 7 layers of anti-reflective treatment, making the glass disappear to the naked eye.",
    img: ""
  },
  {
    icon: <Flame className="w-6 h-6 text-[#D4AF37]" />,
    title: "Heat-Blued Steel",
    desc: "Achieved not by paint, but by oxidizing steel hands over an open flame at exactly 290°C to achieve a flawless, permanent azure hue.",
    img: ""
  },
  {
    icon: <Layers className="w-6 h-6 text-[#D4AF37]" />,
    title: "Zaratsu Polishing",
    desc: "Our artisans spend up to 40 hours hand-polishing a single titanium case against a spinning tin plate to create a distortion-free mirror finish.",
    img: ""
  }
];

export default function Craftsmanship() {
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Background Marquee Scroll Effect
      // As you scroll down, the massive text moves to the left
      gsap.to(marqueeRef.current, {
        x: '-30%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1, // Smooth scrub tied to Lenis
        }
      });

      // 2. Card Parallax Fade-ins
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card, 
          { y: 100, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%", // Triggers when the top of the card is 80% down the screen
              end: "top 50%",
              scrub: 1
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="craftsmanship" 
      className="relative w-full bg-black overflow-hidden"
    >
      {/* Massive Background Marquee Text */}
      <div className="absolute top-[20%] left-0 w-[200%] pointer-events-none select-none z-0 overflow-hidden flex items-center">
        <h2 
          ref={marqueeRef}
          className="text-[15vw] font-display font-bold text-[#D4AF37]/5 whitespace-nowrap tracking-tighter"
        >
          CRAFTSMANSHIP — PRECISION — ARTISTRY — CRAFTSMANSHIP
        </h2>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start justify-between">
        
        {/* ======================= */}
        {/* LEFT SIDE: Sticky Header */}
        {/* ======================= */}
        <div className="w-full md:w-5/12 h-auto md:h-screen md:sticky top-0 flex flex-col justify-center pt-20 md:pt-0 pb-12 md:pb-0 z-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[#D4AF37] font-display text-xl">02.</span>
            <span className="h-[1px] w-12 bg-[#D4AF37]/50"></span>
            <span className="uppercase tracking-[0.2em] text-zinc-500 text-sm">The Details</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tighter mb-6">
            Uncompromising <br/>
            <span className="text-zinc-600 italic font-light">Precision.</span>
          </h2>

          <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-md">
            True luxury is found in the micro-measurements. We blend centuries-old hand-finishing techniques with cutting-edge metallurgy.
          </p>
        </div>

        {/* ======================= */}
        {/* RIGHT SIDE: Scrolling Cards */}
        {/* ======================= */}
        <div className="w-full md:w-6/12 flex flex-col gap-8 md:gap-32 pt-10 md:pt-[30vh] pb-20 md:pb-[30vh] z-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="relative w-full bg-[#050505]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-8 md:p-10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] group hover:border-[#D4AF37]/30 transition-colors duration-500"
            >
              {/* Feature Icon & Title */}
              <div className="flex items-center gap-6 mb-6">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-[#D4AF37]/50 transition-all duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-medium text-white">
                  {feature.title}
                </h3>
              </div>

              {/* Feature Description */}
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8">
                {feature.desc}
              </p>

              {/* Placeholder for an inner image (Macro photography) */}
              <div className="w-full h-48 md:h-64 bg-black rounded-xl border border-white/5 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                {feature.img ? (
                  <img src={feature.img} alt={feature.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-600 text-sm tracking-widest uppercase font-display bg-[linear-gradient(45deg,rgba(255,255,255,0.02)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.02)_50%,rgba(255,255,255,0.02)_75%,transparent_75%,transparent)] bg-[length:20px_20px]">
                    Macro Image Here
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}