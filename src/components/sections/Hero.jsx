import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

// Import your watch image (adjust the path if your assets folder is outside src)
import heroWatchImg from '../../assets/watchs/herowatch.png';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const textRefs = useRef([]);
  const visualRef = useRef(null);
  const watchImgRef = useRef(null);
  const scrollArrowRef = useRef(null);

  useEffect(() => {
    // 1. Initial Load Animation
    const tl = gsap.timeline();

    gsap.set(textRefs.current, { y: 100, opacity: 0, clipPath: 'inset(100% 0 0 0)' });
    gsap.set(visualRef.current, { scale: 0.8, opacity: 0, rotateY: -15 });
    gsap.set(scrollArrowRef.current, { opacity: 0, y: -20 });

    tl.to(textRefs.current, {
      y: 0,
      opacity: 1,
      clipPath: 'inset(0% 0 0 0)',
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out',
      delay: 0.2, 
    })
    .to(visualRef.current, {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      duration: 1.5,
      ease: 'power3.out',
    }, '-=0.8')
    .to(scrollArrowRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'bounce.out',
    }, '-=0.5');

    // 2. Continuous Floating Animation for the PNG
    // This makes the static image feel alive and 3D
    gsap.to(watchImgRef.current, {
      y: -15,
      rotationZ: 2,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // 3. Parallax Scroll Animation
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5, 
      animation: gsap.timeline()
        .to(textRefs.current, { y: -100, opacity: 0, stagger: 0.05 }, 0)
        .to(visualRef.current, { y: 150, scale: 1.1, ease: 'none' }, 0),
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-black pt-20"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-20"></div>

      <div className="relative z-10 w-full max-w-7xl px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 mt-12 md:mt-0">
        
        {/* Left Side: Typography & CTA */}
        <div className="flex-1 flex flex-col items-start text-left w-full">
          <div className="overflow-hidden mb-2">
            <span 
              ref={el => textRefs.current[0] = el}
              className="block text-sm md:text-base tracking-[0.3em] text-[#D4AF37] uppercase font-semibold"
            >
              The Pinnacle of Horology
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter leading-[0.9] text-white">
            <div className="overflow-hidden">
              <div ref={el => textRefs.current[1] = el}>Master</div>
            </div>
            <div className="overflow-hidden">
              <div ref={el => textRefs.current[2] = el} className="flex items-center gap-4">
                <span className="font-light italic text-zinc-500">the</span> 
                <span>Art</span>
              </div>
            </div>
          </h1>

          <div className="overflow-hidden mt-6 mb-10 max-w-md">
            <p 
              ref={el => textRefs.current[3] = el}
              className="text-base md:text-lg text-zinc-400 font-sans tracking-wide leading-relaxed"
            >
              Discover timepieces crafted with uncompromising precision, marrying legacy mechanics with avant-garde design.
            </p>
          </div>

          <div className="overflow-hidden">
            <div ref={el => textRefs.current[4] = el}>
              <button className="group relative px-8 py-4 bg-transparent border border-[#D4AF37]/30 text-white font-medium tracking-widest uppercase text-sm overflow-hidden rounded-full transition-all duration-500 hover:border-[#D4AF37]">
                <span className="relative z-10 transition-colors duration-500 group-hover:text-black">Explore Collection</span>
                <div className="absolute inset-0 h-full w-0 bg-[#D4AF37] transition-all duration-500 ease-out group-hover:w-full z-0"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: The Watch Visual */}
        <div className="flex-1 flex justify-center items-center w-full mt-10 lg:mt-0 perspective-[1000px]">
          <div 
            ref={visualRef}
            className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px] rounded-full border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-3xl shadow-[0_0_80px_rgba(212,175,55,0.05)] flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Inner Metallic Ring */}
            <div className="absolute inset-4 rounded-full border border-[#D4AF37]/20 border-t-[#D4AF37]/60 shadow-inner"></div>
            
            {/* Floating PNG Watch Image */}
            <img 
              ref={watchImgRef}
              src={heroWatchImg} 
              alt="Premium ChronoSync Timepiece" 
              className="relative z-10 w-[85%] h-[85%] object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.8)] scale-110"
            />
          </div>
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <div 
        ref={scrollArrowRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500"
      >
        <span className="text-xs uppercase tracking-[0.2em] font-medium">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce text-[#D4AF37]" />
      </div>

    </section>
  );
}