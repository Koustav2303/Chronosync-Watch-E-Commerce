import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, CalendarDays, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const boutiques = [
  {
    id: '01',
    city: 'Geneva',
    region: 'Europe',
    address: 'Rue du Rhône 41, 1204 Genève',
    status: 'Flagship',
    timezone: 'GMT+1',
    img: 'https://images.unsplash.com/photo-1542000551532-dfebfb3cb2b7?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '02',
    city: 'New York',
    region: 'Americas',
    address: '57th Street & 5th Ave, NY 10022',
    status: 'Open',
    timezone: 'GMT-5',
    img: 'https://images.unsplash.com/photo-1522083111401-7c1bf2086e41?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '03',
    city: 'Tokyo',
    region: 'Asia Pacific',
    address: 'Ginza 6-Chome, Chuo City, Tokyo 104-0061',
    status: 'Open',
    timezone: 'GMT+9',
    img: 'https://images.unsplash.com/photo-1542051841857-4b71ed07a513?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '04',
    city: 'Dubai',
    region: 'Middle East',
    address: 'Fashion Avenue, Dubai Mall',
    status: 'Opening Soon',
    timezone: 'GMT+4',
    img: 'https://images.unsplash.com/photo-1582647509711-c8aa8a8b54cf?q=80&w=800&auto=format&fit=crop'
  }
];

export default function Boutique() {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const listRef = useRef(null);
  const itemsRef = useRef([]);
  const activePanelRef = useRef(null);
  const beamRef = useRef(null);
  const [activeImg, setActiveImg] = useState(boutiques[0].img);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // ==========================================
      // GLOBAL: ScrollTrigger Pinning
      // ==========================================
      ScrollTrigger.create({
        trigger: containerRef.current,
        pin: true, // Locks the section in place
        start: "top top",
        end: "+=150%", // How long it stays pinned
        scrub: 1,
      });

      // 1. Procedural Map 3D Rotation on Scroll Velocity
      // Makes the background feel like it has massive depth
      gsap.to(mapRef.current, {
        rotateX: 10,
        rotateY: -10,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });

      // ==========================================
      // DESKTOP: Advanced Mouse & Hover Effects
      // ==========================================
      mm.add("(min-width: 1024px)", () => {
        
        const listItems = listRef.current.querySelectorAll('.boutique-item');

        listItems.forEach((item, index) => {
          const imgUrl = item.getAttribute('data-img');
          const cityText = item.querySelector('.city-text');
          const panel = item.querySelector('.sapphire-panel');
          const details = item.querySelector('.item-details');

          item.addEventListener('mouseenter', (e) => {
            setActiveImg(imgUrl);
            
            // a. Draw the gold beam to this item's position
            const itemTop = item.getBoundingClientRect().top - listRef.current.getBoundingClientRect().top;
            gsap.to(beamRef.current, { y: itemTop, height: item.offsetHeight, opacity: 1, duration: 0.5, ease: "power3.out" });

            // b. Activate the frosted sapphire panel behind the city text
            gsap.to(panel, { opacity: 1, scaleX: 1, duration: 0.4, ease: "power4.out" });
            gsap.to(cityText, { x: 20, color: "#ffffff", duration: 0.4, ease: "power2.out" });

            // c. Reveal the extra details (timezone, region)
            gsap.to(details, { opacity: 1, y: 0, duration: 0.5, delay: 0.1, ease: "power2.out" });
          });

          item.addEventListener('mouseleave', () => {
            // Reverse everything
            gsap.to(panel, { opacity: 0, scaleX: 0.9, duration: 0.3, ease: "power2.in" });
            gsap.to(cityText, { x: 0, color: "#71717a", duration: 0.4, ease: "power2.out" }); // zinc-500
            gsap.to(details, { opacity: 0, y: 10, duration: 0.3, ease: "power2.in" });
            gsap.to(beamRef.current, { opacity: 0, duration: 0.3 }); // hide beam
          });
        });

        // initial reveal of the list on scroll in
        gsap.fromTo(itemsRef.current, 
          { y: 60, opacity: 0 },
          { 
            y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power4.out",
            scrollTrigger: { trigger: listRef.current, start: "top 80%" }
          }
        );
      });

      // ==========================================
      // MOBILE: Stacked Layout Reveal
      // ==========================================
      mm.add("(max-width: 1023px)", () => {
        itemsRef.current.forEach((item) => {
          gsap.fromTo(item, 
            { y: 30, opacity: 0 },
            { 
              y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
              scrollTrigger: { trigger: item, start: "top 85%" }
            }
          );
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="boutique" 
      className="relative w-full h-screen bg-black overflow-hidden py-16 lg:py-0 cursor-default flex items-center"
    >
      
      {/* ========================================== */}
      {/* GOD-LEVEL BACKGROUND: Fragmented Map + Image */}
      {/* ========================================== */}
      <div ref={mapRef} className="absolute inset-0 z-0 scale-[1.05] perspective-[2000px]">
        {/* Procedural Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none opacity-40"></div>
        
        {/* The active image blended into the background */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={activeImg} 
            alt="Boutique Location" 
            className="w-full h-full object-cover grayscale opacity-[0.03] blur-sm transition-opacity duration-1000"
          />
        </div>
        
        {/* Ambient Gold Glows */}
        <div className="absolute top-[30%] left-[20%] w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] bg-[#D4AF37]/3 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col h-full justify-center">
        
        {/* Section Header - Clean and Minimal */}
        <div className="w-full max-w-lg mb-12 lg:mb-20 self-start">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-[#D4AF37] font-display text-lg">03.</span>
            <span className="h-[1px] w-12 bg-[#D4AF37]/50"></span>
            <span className="uppercase tracking-[0.2em] text-zinc-600 text-xs md:text-sm">Global Presence</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter leading-tight">
            The <span className="text-zinc-700 italic font-light">Boutiques.</span>
          </h2>
        </div>

        {/* Massive Interactive List */}
        <div className="relative w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20 h-[60vh]">
          
          {/* Vertical Gold Beam (desktop only) */}
          <div 
            ref={beamRef}
            className="absolute left-0 top-0 w-[2px] h-20 bg-gradient-to-b from-[#D4AF37] to-[#D4AF37]/20 shadow-[0_0_15px_#D4AF37] z-10 opacity-0 hidden lg:block"
          ></div>

          {/* City List */}
          <div ref={listRef} className="flex-1 w-full flex flex-col h-full overflow-y-auto lg:overflow-y-visible pr-4 lg:pr-0 scrollbar-thin">
            {boutiques.map((boutique, index) => (
              <div 
                key={index} 
                data-img={boutique.img}
                ref={el => itemsRef.current[index] = el}
                className="boutique-item group flex flex-col items-start justify-center py-6 lg:py-10 border-b border-white/5 w-full relative transition-colors"
              >
                {/* ADVANCED: Sapphite Glass Panel hover effect (desktop) */}
                <div className="sapphire-panel absolute inset-0 left-[-40px] right-[-40px] top-[10px] bottom-[10px] bg-[#0c0c0d]/80 border border-[#D4AF37]/10 backdrop-blur-2xl rounded-2xl scale-x-[0.9] origin-left opacity-0 hidden lg:block z-0 pointer-events-none">
                  {/* Gold rim accent */}
                  <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.8)]"></div>
                </div>

                {/* City Name */}
                <h3 className="city-text text-4xl md:text-6xl lg:text-7xl font-display font-bold text-zinc-700 uppercase tracking-tighter mb-4 lg:mb-0 transition-colors z-10 relative">
                  {boutique.city}
                </h3>

                {/* ADVANCED: Extra Details revealed on hover */}
                <div className="item-details absolute right-10 top-1/2 -translate-y-1/2 flex items-center gap-6 text-zinc-600 z-10 opacity-0 translate-y-[10px] hidden lg:flex">
                    <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-[#D4AF37]/50" />
                        <span className="text-sm tracking-widest uppercase">{boutique.region}</span>
                    </div>
                    <div className="h-4 w-[1px] bg-zinc-800"></div>
                    <div className="text-sm tracking-widest uppercase">{boutique.timezone}</div>
                </div>

                {/* Mobile View details (static) */}
                <div className="w-full flex lg:hidden items-center gap-4 text-xs tracking-widest uppercase text-zinc-600 z-10 relative">
                    <MapPin className="w-3 h-3 text-[#D4AF37]" />
                    <span>{boutique.status}</span>
                    <span className="h-3 w-[1px] bg-zinc-800"></span>
                    <span>{boutique.timezone}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Appointment CTA Card */}
          <div className="w-full lg:w-4/12 flex-shrink-0 lg:sticky top-[20vh] z-20 mt-10 lg:mt-0">
            <div className="bg-[#0c0c0d] border border-white/5 rounded-3xl p-8 shadow-[0_20px_40px_rgba(0,0,0,0.6)] backdrop-blur-3xl relative overflow-hidden group hover:border-[#D4AF37]/30 transition-all duration-500">
              {/* Subtle gold shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>

              <div className="relative z-10 flex flex-col items-start">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-inner group-hover:border-[#D4AF37]/50 transition-colors">
                      <CalendarDays className="w-7 h-7 text-[#D4AF37]" />
                  </div>
                  
                  <h4 className="text-2xl md:text-3xl font-display font-medium text-white tracking-tight mb-4 leading-snug">
                    Schedule a <br/>Private <span className="text-[#D4AF37]">Viewing</span>
                  </h4>
                  
                  <p className="text-zinc-400 text-sm md:text-base mb-8 leading-relaxed max-w-sm">
                    Experience our timepieces firsthand. Book a dedicated appointment at your nearest flagship location.
                  </p>
                  
                  <button className="w-full text-center px-6 py-4 bg-[#D4AF37] text-black font-semibold tracking-widest uppercase text-sm rounded-xl overflow-hidden transition-all duration-300 hover:bg-[#b89a30] hover:scale-[1.02] shadow-[0_10px_20px_rgba(212,175,55,0.2)]">
                    Book Now
                  </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}