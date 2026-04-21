import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Ruler, Circle, Settings } from 'lucide-react';

import watchVanguard from '../../assets/watchs/vanguard.png';
import watchAbyss from '../../assets/watchs/Abyss.png';
import watchCelestial from '../../assets/watchs/celestial.png';
import watchHeritage from '../../assets/watchs/heritage.png';

gsap.registerPlugin(ScrollTrigger);

const collectionsData = [
  {
    id: '01',
    name: 'Vanguard',
    tagline: 'The Edge of Tomorrow',
    desc: 'Forged from brushed titanium, the Vanguard redefines modern horology with a skeletonized dial.',
    specs: { size: '42mm', material: 'Titanium', movement: 'Automatic Tourbillon' },
    img: watchVanguard 
  },
  {
    id: '02',
    name: 'Abyss',
    tagline: 'Master the Depths',
    desc: 'Engineered for the extremes. Featuring a unidirectional ceramic bezel and luminescent markers.',
    specs: { size: '44mm', material: 'Obsidian Steel', movement: 'Chronometer' },
    img: watchAbyss 
  },
  {
    id: '03',
    name: 'Celestial',
    tagline: 'Written in the Stars',
    desc: 'An astronomical complication on your wrist. The dial features a genuine meteorite plate.',
    specs: { size: '40mm', material: 'Rose Gold', movement: 'Perpetual Calendar' },
    img: watchCelestial
  },
  {
    id: '04',
    name: 'Heritage',
    tagline: 'Echoes of Greatness',
    desc: 'A tribute to the golden era of watchmaking. Classic proportions, domed sapphire crystal.',
    specs: { size: '38mm', material: 'Platinum', movement: 'Manual Wind' },
    img: watchHeritage
  }
];

export default function Collections() {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // ==========================================
      // DESKTOP ANIMATION (Horizontal Scroll Pin)
      // ==========================================
      mm.add("(min-width: 768px)", () => {
        const totalPanels = collectionsData.length;

        const horizontalTween = gsap.to(scrollContainerRef.current, {
          x: () => -(window.innerWidth * (totalPanels - 1)),
          ease: "none",
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          pin: true,
          start: "top top",
          end: () => `+=${window.innerWidth * totalPanels}`,
          scrub: 1,
          animation: horizontalTween,
        });

        // Desktop Image Parallax
        cardsRef.current.forEach((card) => {
          const img = card.querySelector('.watch-img');
          gsap.to(img, {
            rotateZ: 15,
            scale: 1.15,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: "left center",
              end: "right center",
              scrub: true,
            }
          });
        });
      });

      // ==========================================
      // MOBILE ANIMATION (Vertical Parallax Fade)
      // ==========================================
      mm.add("(max-width: 767px)", () => {
        cardsRef.current.forEach((card) => {
          const img = card.querySelector('.watch-img');

          gsap.fromTo(img, 
            { y: 40, scale: 0.9, opacity: 0 },
            { 
              y: 0, scale: 1, opacity: 1, duration: 1, 
              scrollTrigger: {
                trigger: card,
                start: "top 70%",
                end: "top 30%",
                scrub: 1
              }
            }
          );
        });
      });

    }, sectionRef);

    return () => ctx.revert(); 
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="collections" 
      className="relative md:h-screen w-full bg-[#050505] overflow-hidden"
    >
      <div 
        ref={scrollContainerRef}
        className="flex flex-col md:flex-row w-full md:w-[400vw] h-full" 
      >
        {collectionsData.map((collection, index) => (
          <div 
            key={collection.id}
            ref={el => cardsRef.current[index] = el}
            className="relative h-[100svh] md:h-screen w-full md:w-screen shrink-0 flex flex-col md:flex-row items-center justify-center overflow-hidden sticky top-0 md:static bg-[#050505]"
          >
            
            {/* The background watermark numbers have been completely removed from here */}

            <div className="relative z-10 w-full h-full max-w-7xl px-6 py-20 md:py-0 md:px-12 flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-12">
              
              {/* TYPOGRAPHY */}
              <div className="flex-1 flex flex-col items-center text-center md:items-start md:text-left w-full watch-text z-20 order-1 md:order-none mt-10 md:mt-0">
                
                <div className="flex items-center justify-center md:justify-start gap-4 mb-2 md:mb-4">
                  <span className="text-[#D4AF37] font-display text-lg md:text-xl">{collection.id}.</span>
                  <span className="h-[1px] w-8 md:w-12 bg-[#D4AF37]/50"></span>
                  <span className="uppercase tracking-[0.2em] text-zinc-500 text-xs md:text-sm">{collection.tagline}</span>
                </div>

                <h2 className="text-5xl md:text-8xl font-display font-bold text-white tracking-tighter mb-4 md:mb-6">
                  {collection.name}
                </h2>

                <p className="text-zinc-400 max-w-md text-sm md:text-lg leading-relaxed mb-6 md:mb-8">
                  {collection.desc}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-3 md:gap-4 w-full max-w-sm md:max-w-md mb-8 md:mb-10">
                  <div className="bg-white/5 border border-white/10 p-3 md:p-4 rounded-xl backdrop-blur-md">
                    <Circle className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37] mb-1 md:mb-2 mx-auto md:mx-0" />
                    <div className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-wider mb-1">Case</div>
                    <div className="text-white text-xs md:text-sm font-medium">{collection.specs.size} {collection.specs.material}</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 md:p-4 rounded-xl backdrop-blur-md">
                    <Settings className="w-4 h-4 md:w-5 md:h-5 text-[#D4AF37] mb-1 md:mb-2 mx-auto md:mx-0" />
                    <div className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-wider mb-1">Caliber</div>
                    <div className="text-white text-xs md:text-sm font-medium">{collection.specs.movement}</div>
                  </div>
                </div>

                <button className="flex items-center gap-3 text-white hover:text-[#D4AF37] transition-colors group">
                  <span className="uppercase tracking-[0.15em] text-xs md:text-sm font-medium">Discover Piece</span>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#D4AF37] transition-colors">
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>

              {/* IMAGE */}
              <div className="flex-1 w-full h-[40svh] md:h-[80vh] relative order-2 md:order-none z-10 flex items-center justify-center -mt-6 md:mt-0">
                
                <div className="absolute inset-0 bg-[#D4AF37]/5 blur-[80px] md:blur-[100px] rounded-full w-2/3 h-2/3 md:w-3/4 md:h-3/4 m-auto"></div>
                
                <div className="relative w-full h-full flex items-center justify-center watch-img">
                   {collection.img ? (
                     <img 
                       src={collection.img} 
                       alt={collection.name}
                       className="object-contain w-[85%] h-[85%] md:w-3/4 md:h-3/4 drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] md:drop-shadow-[0_40px_40px_rgba(0,0,0,0.8)]"
                     />
                   ) : (
                     <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full border border-[#D4AF37]/30 bg-black/50 backdrop-blur-xl flex items-center justify-center shadow-[inset_0_0_50px_rgba(212,175,55,0.05)]">
                        <span className="text-zinc-600 font-display text-xs md:text-sm tracking-widest text-center">
                          {collection.name} <br/> PNG HERE
                        </span>
                     </div>
                   )}
                </div>

              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}