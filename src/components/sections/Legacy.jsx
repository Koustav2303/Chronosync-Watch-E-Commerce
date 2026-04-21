import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// NATIVE SVG BRAND ICONS
// ==========================================
const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <path d="m10 15 5-3-5-3z"/>
  </svg>
);

export default function Legacy() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const contentRef = useRef(null);
  const linesRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Ghost Typography Parallax
      gsap.fromTo(textRef.current, 
        { y: -100 },
        { 
          y: 150, 
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom", 
            end: "bottom top",
            scrub: 1
          }
        }
      );

      // 2. Structural Lines Draw Effect
      linesRef.current.forEach(line => {
        gsap.fromTo(line,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.5,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            }
          }
        );
      });

      // 3. Staggered Content Fade Up
      gsap.fromTo(contentRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={containerRef} 
      id="legacy" 
      className="relative w-full min-h-[85svh] bg-[#030303] flex flex-col justify-end overflow-hidden pt-32"
    >
      {/* Top Border Line animating in */}
      <div ref={el => linesRef.current[0] = el} className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      {/* ========================================== */}
      {/* CINEMATIC BACKGROUND EFFECTS */}
      {/* ========================================== */}
      
      {/* Ambient Deep Gold Glow at the bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-[radial-gradient(ellipse_at_bottom,_rgba(212,175,55,0.08)_0%,_transparent_70%)] pointer-events-none z-0"></div>

      {/* Ghost Outline Typography Parallax */}
      <div 
        ref={textRef} 
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden"
      >
        <h2 className="text-[22vw] font-display font-bold text-transparent tracking-tighter leading-none select-none opacity-30" style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.1)' }}>
          CHRONOSYNC
        </h2>
      </div>

      {/* Rotating Horology Seal (Overlaps the top edge) */}
      <div className="absolute top-10 right-10 md:right-20 w-32 h-32 md:w-40 md:h-40 animate-[spin_15s_linear_infinite] opacity-50 pointer-events-none z-20">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4AF37] fill-current">
          <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
          <text fontSize="11.5" fontWeight="bold" letterSpacing="2.5" className="font-display uppercase">
            <textPath href="#circlePath" startOffset="0%">
              • Maison Horlogère • Swiss Precision
            </textPath>
          </text>
        </svg>
      </div>

      {/* ========================================== */}
      {/* MAIN FOOTER CONTENT */}
      {/* ========================================== */}
      <div ref={contentRef} className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-between h-full pb-8">
        
        {/* Top Half: Newsletter & Brand Story */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-8 mb-24 lg:mb-32">
          
          <div className="w-full lg:w-5/12">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[#D4AF37] font-display text-lg">04.</span>
              <span className="h-[1px] w-12 bg-[#D4AF37]/50"></span>
              <span className="uppercase tracking-[0.2em] text-zinc-500 text-sm">The Legacy</span>
            </div>
            <h3 className="text-5xl md:text-6xl font-display font-bold text-white tracking-tighter mb-6 leading-[1.1]">
              Join the <br/>
              <span className="text-zinc-600 italic font-light">Inner Circle.</span>
            </h3>
            <p className="text-zinc-400 text-base leading-relaxed mb-10 max-w-sm">
              Subscribe to receive exclusive invitations to private viewings, early access to limited allocations, and editorial horology insights.
            </p>

            {/* Premium Glassmorphic Newsletter Input */}
            <div className="relative w-full max-w-md group">
              {/* Outer glow ring on focus/hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37]/30 to-transparent rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="relative w-full bg-[#0a0a0b]/80 border border-white/10 rounded-full pl-6 pr-16 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#D4AF37]/50 transition-colors backdrop-blur-xl"
              />
              <button className="absolute right-2 top-2 bottom-2 w-12 bg-white/5 border border-white/10 hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black text-white rounded-full flex items-center justify-center transition-all duration-300 z-10 group-focus-within:bg-[#D4AF37] group-focus-within:text-black">
                <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Navigation Links Grid */}
          <div className="w-full lg:w-6/12 grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-4 pt-4">
            <div className="flex flex-col space-y-5">
              <h4 className="text-white font-display uppercase tracking-[0.15em] text-xs mb-2">Collections</h4>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block transform duration-300">Vanguard</a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block transform duration-300">Abyss</a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block transform duration-300">Celestial</a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block transform duration-300">Heritage</a>
            </div>

            <div className="flex flex-col space-y-5">
              <h4 className="text-white font-display uppercase tracking-[0.15em] text-xs mb-2">Maison</h4>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block transform duration-300">Our Story</a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block transform duration-300">Craftsmanship</a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block transform duration-300">Boutiques</a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block transform duration-300">Sustainability</a>
            </div>

            <div className="flex flex-col space-y-5 col-span-2 md:col-span-1 mt-6 md:mt-0">
              <h4 className="text-white font-display uppercase tracking-[0.15em] text-xs mb-2">Client Care</h4>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block transform duration-300">Contact Us</a>
              <a href="#" className="text-zinc-500 hover:text-[#D4AF37] transition-colors text-sm hover:translate-x-1 inline-block transform duration-300 font-medium">Book Appointment</a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block transform duration-300">Servicing</a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block transform duration-300">Warranty</a>
            </div>
          </div>
        </div>

        {/* Divider animating in */}
        <div ref={el => linesRef.current[1] = el} className="w-full h-[1px] bg-white/10 mb-8"></div>

        {/* Bottom Half: Socials & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          
          <div className="flex items-center gap-4">
            <a href="#" className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-zinc-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] group">
              <InstagramIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-zinc-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] group">
              <TwitterIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-zinc-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] group">
              <LinkedinIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-zinc-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] group">
              <YoutubeIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
          </div>

          <div className="text-zinc-600 text-xs tracking-widest uppercase flex flex-col md:flex-row items-center gap-4 text-center">
            <span>&copy; {new Date().getFullYear()} ChronoSync Hub.</span>
            <span className="hidden md:block w-1 h-1 bg-zinc-700 rounded-full"></span>
            <div className="flex gap-6 md:gap-4">
              <a href="#" className="hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all">Privacy</a>
              <a href="#" className="hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all">Terms</a>
              <a href="#" className="hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all">Cookies</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}