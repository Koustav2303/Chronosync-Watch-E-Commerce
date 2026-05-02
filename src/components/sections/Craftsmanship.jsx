import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cog, Gem, Flame, Layers, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Cog className="w-6 h-6 text-[#D4AF37]" />,
    tag: "Caliber Engineering",
    title: "Micro-Tolerances",
    desc: "Machined to the absolute micron. Our in-house calibers are assembled in a vacuum-sealed cleanroom, ensuring friction is virtually eliminated.",
    metric: "±2μm",
    img: "https://oracleoftime.com/wp-content/uploads/2025/04/Handmade-Watches-Featured.jpg" // Add a path to a close-up gear PNG or image here
  },
  {
    icon: <Gem className="w-6 h-6 text-[#D4AF37]" />,
    tag: "Optical Science",
    title: "Sapphire Architecture",
    desc: "Forged at 2,050°C, our sapphire crystals are coated with 7 layers of anti-reflective treatment, making the glass disappear to the naked eye.",
    metric: "7 AR Layers",
    img: "https://cdn.shopify.com/s/files/1/2652/4762/files/2_1.jpg?v=1749477000"
  },
  {
    icon: <Flame className="w-6 h-6 text-[#D4AF37]" />,
    tag: "Thermal Craft",
    title: "Heat-Blued Steel",
    desc: "Achieved not by paint, but by oxidizing steel hands over an open flame at exactly 290°C to achieve a flawless, permanent azure hue.",
    metric: "290°C",
    img: "https://i.ytimg.com/vi/483fHa0Vaq8/maxresdefault.jpg"
  },
  {
    icon: <Layers className="w-6 h-6 text-[#D4AF37]" />,
    tag: "Mirror Finish",
    title: "Zaratsu Polishing",
    desc: "Our artisans spend up to 40 hours hand-polishing a single titanium case against a spinning tin plate to create a distortion-free mirror finish.",
    metric: "40 Hours",
    img: "https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2023/02/10/544c4a1d-8912-45f1-9009-0cf30e70e0a9_60807538.jpg"
  }
];

const stats = [
  { label: "Components Inspected", value: "1,200+" },
  { label: "Hand Finishing Hours", value: "300+" },
  { label: "Quality Control Checks", value: "42" },
  { label: "Average Daily Output", value: "8 Pieces" }
];

const processSteps = [
  "Design blueprint and tolerance mapping",
  "Micro-assembly in dust-controlled environment",
  "Manual regulation and amplitude balancing",
  "Final polish, acoustic test, and certification"
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
          { y: 120, opacity: 0, rotateX: 6 },
          { 
            y: 0, 
            opacity: 1, 
            rotateX: 0,
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
      className="relative w-full bg-black overflow-hidden py-16 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-40 left-1/4 h-[32rem] w-[32rem] rounded-full bg-[#D4AF37]/10 blur-[130px]" />
        <div className="absolute bottom-[-12rem] right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[#5A4A1A]/25 blur-[110px]" />
      </div>

      {/* Massive Background Marquee Text */}
      <div className="absolute top-[20%] left-0 w-[200%] pointer-events-none select-none z-0 overflow-hidden flex items-center">
        <h2 
          ref={marqueeRef}
          className="text-[15vw] font-display font-bold text-[#D4AF37]/[0.06] whitespace-nowrap tracking-tighter"
        >
          CRAFTSMANSHIP — PRECISION — ARTISTRY — CRAFTSMANSHIP
        </h2>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="pt-10 md:pt-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[#D4AF37] font-display text-xl">02.</span>
            <span className="h-[1px] w-12 bg-[#D4AF37]/50"></span>
            <span className="uppercase tracking-[0.2em] text-zinc-500 text-sm">The Details</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-end">
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tighter">
            Uncompromising <br/>
            <span className="text-zinc-600 italic font-light">Precision.</span>
            </h2>

            <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-2xl">
              True luxury is found in the micro-measurements. We blend centuries-old hand-finishing techniques with cutting-edge metallurgy, where every surface, screw, and spring is tuned for visual harmony and mechanical perfection.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#E5C96A]">
              <Sparkles className="h-3.5 w-3.5" />
              Hand-Assembled
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.18em] text-zinc-300">
              Chronometry Grade
            </span>
          </div>
        </div>

        <div className="mt-10 md:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="col-span-2 lg:col-span-1 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-6 backdrop-blur-sm"
            >
              <p className="text-2xl md:text-3xl font-display text-[#E2C56A]">{stat.value}</p>
              <p className="mt-2 text-[11px] md:text-xs uppercase tracking-[0.18em] text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-10 rounded-2xl border border-white/10 bg-[#070707]/80 p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-4">Atelier Process</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {processSteps.map((step, i) => (
              <div key={step} className="flex items-start gap-3">
                <span className="mt-0.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-2.5 py-1 text-[10px] tracking-[0.18em] text-[#E3C86B]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-sm md:text-base text-zinc-300 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 pt-12 md:pt-16 pb-20 md:pb-24 z-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className={`relative w-full overflow-hidden bg-[#050505]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] group hover:border-[#D4AF37]/40 transition-colors duration-500 ${index % 2 === 1 ? 'md:translate-y-16' : ''}`}
            >
              <div className="pointer-events-none absolute -right-20 -top-24 h-52 w-52 rounded-full bg-[#D4AF37]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(212,175,55,0.1)_35%,transparent_70%)] translate-x-[-120%] group-hover:translate-x-[130%] transition-transform duration-1000" />
              
              <div className="mb-5 flex items-center justify-between">
                <span className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-[10px] md:text-xs uppercase tracking-[0.2em] text-zinc-300">
                  {feature.tag}
                </span>
                <span className="font-display text-xs md:text-sm tracking-[0.25em] text-[#D4AF37]/80">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

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

              <div className="mt-5 flex items-center justify-between">
                <span className="text-[10px] md:text-xs uppercase tracking-[0.22em] text-zinc-500">
                  Atelier Spec
                </span>
                <span className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3 py-1 text-[10px] md:text-xs font-medium tracking-[0.14em] text-[#E3C86B] uppercase">
                  {feature.metric}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}