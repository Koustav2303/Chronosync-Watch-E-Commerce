import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ArrowRight, ArrowLeft, Circle, Settings, Shield, Droplets, ChevronRight, ChevronLeft, Pause, Play, Maximize } from "lucide-react";

// Images
import watchVanguard from "../../assets/watchs/vanguard.png";
import watchAbyss from "../../assets/watchs/Abyss.png";
import watchCelestial from "../../assets/watchs/celestial.png";
import watchHeritage from "../../assets/watchs/heritage.png";
import watchNebula from "../../assets/watchs/nebula.png";
import watchTitan from "../../assets/watchs/titan.png";
import watchAurora from "../../assets/watchs/aurora.png";
import watchMonarch from "../../assets/watchs/monarch.png";
import watchPhantom from "../../assets/watchs/phantom.png";
import watchEquinox from "../../assets/watchs/equinox.png";

const collectionsData = [
  { id: "01", name: "Vanguard", tagline: "The Edge of Tomorrow", desc: "Forged from brushed titanium, the Vanguard redefines modern horology with a skeletonized dial. Every facet catches the light, demanding attention while retaining an air of absolute stealth.", specs: { size: "42mm", material: "Titanium", movement: "Automatic Tourbillon" }, img: watchVanguard },
  { id: "02", name: "Abyss", tagline: "Master the Depths", desc: "Engineered for the extremes. Featuring a unidirectional ceramic bezel, luminescent markers, and a helium escape valve for deep-sea exploration without compromise.", specs: { size: "44mm", material: "Obsidian Steel", movement: "Chronometer" }, img: watchAbyss },
  { id: "03", name: "Celestial", tagline: "Written in the Stars", desc: "An astronomical complication on your wrist. The dial features a genuine meteorite plate, ensuring no two timepieces in the universe are exactly alike.", specs: { size: "40mm", material: "Rose Gold", movement: "Perpetual Calendar" }, img: watchCelestial },
  { id: "04", name: "Heritage", tagline: "Echoes of Greatness", desc: "A tribute to the golden era of watchmaking. Classic proportions, a domed sapphire crystal, and an impeccably finished manual-wind movement visible through the caseback.", specs: { size: "38mm", material: "Platinum", movement: "Manual Wind" }, img: watchHeritage },
  { id: "05", name: "Nebula", tagline: "Beyond the Horizon", desc: "A cosmic-inspired timepiece with a gradient aventurine dial that mimics the night sky, capturing the depth and mystery of deep space on your wrist.", specs: { size: "41mm", material: "Stainless Steel", movement: "Automatic" }, img: watchNebula },
  { id: "06", name: "Titan", tagline: "Built to Endure", desc: "A rugged powerhouse designed for absolute durability. Featuring an advanced shock resistance system and bold, unapologetic architecture.", specs: { size: "45mm", material: "Carbon Fiber", movement: "Quartz Chronograph" }, img: watchTitan },
  { id: "07", name: "Aurora", tagline: "Light in Motion", desc: "A mesmerizing dial with shifting iridescent hues inspired by the northern lights. The ceramic case ensures perfect scratch resistance and a flawless gloss finish.", specs: { size: "39mm", material: "Ceramic", movement: "Automatic" }, img: watchAurora },
  { id: "08", name: "Monarch", tagline: "Rule Your Time", desc: "An opulent statement piece with intricate hand-engravings. The Monarch is an exercise in excess, crafted entirely from solid 18k yellow gold.", specs: { size: "42mm", material: "Yellow Gold", movement: "Automatic" }, img: watchMonarch },
  { id: "09", name: "Phantom", tagline: "Invisible Precision", desc: "A stealth-inspired design featuring a matte black PVD coating, high-contrast luminescent markers, and an integrated rubber strap for tactical elegance.", specs: { size: "43mm", material: "Black PVD Steel", movement: "Automatic" }, img: watchPhantom },
  { id: "10", name: "Equinox", tagline: "Perfect Balance", desc: "A harmonious blend of sport and elegance. The Equinox features a true GMT complication, allowing the modern traveler to track two time zones simultaneously.", specs: { size: "41mm", material: "Stainless Steel", movement: "GMT Automatic" }, img: watchEquinox },
];

// ==========================================
// 1. GOD-LEVEL WATCH DETAIL OVERLAY
// ==========================================
const WatchDetail = ({ watch, onClose }) => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const isClosing = useRef(false);

  // Close handler with bulletproof logic
  const handleClose = useCallback((e) => {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    if (isClosing.current) return;
    isClosing.current = true;

    // Smooth exit animation
    gsap.to(overlayRef.current, {
      clipPath: "inset(100% 0 0 0)", 
      opacity: 0,
      duration: 0.6, 
      ease: "power4.inOut",
      onComplete: onClose
    });
  }, [onClose]);

  // Esc key support for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Lock background scroll
    
    const tl = gsap.timeline();
    
    // 1. Wipe in overlay from bottom
    tl.fromTo(overlayRef.current, 
      { clipPath: "inset(100% 0 0 0)", opacity: 1 }, 
      { clipPath: "inset(0% 0 0 0)", duration: 0.8, ease: "power4.inOut" }
    );
    
    // 2. Staggered text reveal for editorial feel
    tl.fromTo(contentRef.current.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.05, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );

    // 3. GPU-Accelerated continuous floating effect
    gsap.to(imageRef.current, {
      y: -25,
      rotationZ: 2,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      force3D: true // Forces GPU rendering
    });

    return () => { 
      document.body.style.overflow = "auto"; 
      gsap.killTweensOf(imageRef.current);
    };
  }, []);

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-[99999] bg-[#050505] flex flex-col lg:flex-row overflow-hidden touch-auto"
    >
      
      {/* LEFT PANE: Cinematic Image Showcase (Pinned Top on Mobile) */}
      <div className="w-full h-[40svh] lg:h-full lg:w-1/2 relative flex items-center justify-center bg-[#020202] shrink-0 border-b lg:border-b-0 lg:border-r border-white/5 overflow-hidden">
        
        {/* Dynamic ambient background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_65%)]"></div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[45vh] lg:text-[35vw] font-display font-bold text-white/[0.01] select-none pointer-events-none leading-none tracking-tighter">
          {watch.id}
        </div>
        
        <img 
          ref={imageRef}
          src={watch.img} 
          alt={watch.name} 
          className="relative z-10 w-[70%] h-[70%] lg:w-[80%] lg:h-[80%] object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.9)] will-change-transform"
        />
        
        <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-3/4 h-10 bg-[#D4AF37]/10 blur-[40px] rounded-[100%] opacity-60 pointer-events-none"></div>
      </div>

      {/* RIGHT PANE: Editorial Content (Scrollable) */}
      <div className="w-full h-[60svh] lg:h-full lg:w-1/2 bg-[#080808] relative overflow-y-auto hide-scrollbar z-20">
        
        <div ref={contentRef} className="p-6 md:p-12 lg:p-20 flex flex-col min-h-full max-w-3xl mx-auto">
          
          {/* BULLETPROOF MANUAL CLOSE BUTTON - Embedded in the document flow */}
          <div className="w-full mb-10 flex justify-start pt-2 lg:pt-0">
             <button 
                onClick={handleClose}
                className="group flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer shadow-lg active:scale-95"
             >
                <div className="w-6 h-6 rounded-full bg-black/50 flex items-center justify-center group-hover:bg-[#D4AF37] transition-colors">
                  <ArrowLeft className="w-3 h-3 text-zinc-400 group-hover:text-black transition-colors" />
                </div>
                <span className="text-zinc-300 group-hover:text-white text-[10px] md:text-xs tracking-[0.2em] uppercase font-medium transition-colors">
                  Return to Showcase
                </span>
             </button>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="text-[#D4AF37] font-display tracking-widest uppercase text-[10px] md:text-xs border border-[#D4AF37]/30 px-4 py-1.5 rounded-full inline-block w-max shadow-[0_0_15px_rgba(212,175,55,0.1)]">
              Collection {watch.id}
            </span>
            <span className="text-zinc-600 text-xs tracking-[0.2em] uppercase hidden sm:block">/</span>
            <span className="text-zinc-400 text-[10px] md:text-xs tracking-[0.2em] uppercase">{watch.tagline}</span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-[7.5rem] font-display font-bold text-white tracking-tighter mb-6 lg:mb-8 leading-[0.9]">
            {watch.name}.
          </h1>

          <p className="text-zinc-400 text-sm md:text-base lg:text-lg leading-relaxed mb-12 font-light">
            {watch.desc} The {watch.name} stands as a testament to uncompromising luxury, engineered specifically for the modern connoisseur demanding both supreme functionality and God-tier aesthetics.
          </p>

          {/* Precision Specs Grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 w-full mb-16 border-t border-white/10 pt-10">
            <div className="flex flex-col border-l-2 border-[#D4AF37]/50 pl-4 hover:border-[#D4AF37] transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Circle className="w-3 h-3 text-[#D4AF37]" />
                <span className="text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-[0.15em] font-display">Architecture</span>
              </div>
              <span className="text-white text-sm md:text-base lg:text-lg font-light tracking-wide">{watch.specs.size} {watch.specs.material}</span>
            </div>
            
            <div className="flex flex-col border-l-2 border-[#D4AF37]/50 pl-4 hover:border-[#D4AF37] transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-3 h-3 text-[#D4AF37]" />
                <span className="text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-[0.15em] font-display">Caliber</span>
              </div>
              <span className="text-white text-sm md:text-base lg:text-lg font-light tracking-wide">{watch.specs.movement}</span>
            </div>
            
            <div className="flex flex-col border-l-2 border-[#D4AF37]/50 pl-4 hover:border-[#D4AF37] transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-3 h-3 text-[#D4AF37]" />
                <span className="text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-[0.15em] font-display">Crystal</span>
              </div>
              <span className="text-white text-sm md:text-base lg:text-lg font-light tracking-wide">Domed Sapphire, AR</span>
            </div>
            
            <div className="flex flex-col border-l-2 border-[#D4AF37]/50 pl-4 hover:border-[#D4AF37] transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="w-3 h-3 text-[#D4AF37]" />
                <span className="text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-[0.15em] font-display">Resistance</span>
              </div>
              <span className="text-white text-sm md:text-base lg:text-lg font-light tracking-wide">10 ATM / 100 Meters</span>
            </div>
          </div>

          {/* Action Area */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mt-auto pb-8">
            <button className="w-full sm:w-auto px-10 py-5 bg-[#D4AF37] text-black font-bold tracking-[0.15em] uppercase text-xs md:text-sm rounded-lg hover:bg-white hover:scale-[1.02] transition-all duration-300 shadow-[0_10px_30px_rgba(212,175,55,0.2)]">
              Inquire to Acquire
            </button>
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-zinc-300 text-xs md:text-sm tracking-widest uppercase font-medium">Boutique Exclusive</span>
              <span className="text-zinc-600 text-[10px] md:text-xs tracking-widest uppercase mt-1">Limited Allocation</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};


// ==========================================
// 2. HIGH-PERFORMANCE 3D COVERFLOW SLIDER
// ==========================================
export default function Collections() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedWatch, setSelectedWatch] = useState(null);
  const [isAutoplay, setIsAutoplay] = useState(true);
  
  const textContainerRef = useRef(null);
  const isAnimating = useRef(false);

  // --- Smooth Auto-Scroll Logic ---
  useEffect(() => {
    let interval;
    if (isAutoplay && !selectedWatch) {
      interval = setInterval(() => {
        if (!isAnimating.current) {
          setActiveIndex((prev) => (prev + 1) % collectionsData.length);
        }
      }, 4000); 
    }
    return () => clearInterval(interval);
  }, [isAutoplay, selectedWatch]);

  const handleIndexChange = (newIndex) => {
    if (isAnimating.current || newIndex === activeIndex) return;
    isAnimating.current = true;
    setActiveIndex(newIndex);
    setIsAutoplay(false);
    
    // Unlock interaction after transition duration
    setTimeout(() => { isAnimating.current = false; }, 800);
  };

  const nextSlide = () => handleIndexChange((activeIndex + 1) % collectionsData.length);
  const prevSlide = () => handleIndexChange(activeIndex === 0 ? collectionsData.length - 1 : activeIndex - 1);

  // --- Mobile Touch Swiping ---
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => { touchStartX.current = e.changedTouches[0].screenX; };
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchStartX.current - touchEndX.current > 60) nextSlide();
    if (touchEndX.current - touchStartX.current > 60) prevSlide();
  };

  // --- Text Animation ---
  useEffect(() => {
    gsap.fromTo(textContainerRef.current, 
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
    );
  }, [activeIndex]);

  // --- Hardware-Accelerated 3D Math ---
  const getCardStyle = (index) => {
    const len = collectionsData.length;
    let distance = index - activeIndex;

    // Infinite loop wrap-around logic
    if (distance > len / 2) distance -= len;
    if (distance < -len / 2) distance += len;

    const isActive = distance === 0;
    const absDistance = Math.abs(distance);
    
    // Optimize DOM: Hide cards further than 3 steps away to save render cycles
    const opacity = absDistance > 2 ? 0 : 1 - (absDistance * 0.35);
    const zIndex = 50 - absDistance;

    return {
      // GPU-Accelerated translate3d prevents paint flashing and layout thrashing
      transform: `
        translate3d(calc(${distance} * clamp(80px, 14vw, 200px)), 0, calc(-${absDistance} * clamp(100px, 18vw, 250px))) 
        rotateY(${-distance * 20}deg)
        scale(${isActive ? 1 : 0.85})
      `,
      opacity,
      zIndex,
      transition: "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s ease, filter 0.8s ease",
      filter: isActive ? "brightness(1) drop-shadow(0 20px 40px rgba(0,0,0,0.8))" : "brightness(0.2) blur(3px)",
      pointerEvents: isActive ? "auto" : "none",
      willChange: "transform, opacity, filter" 
    };
  };

  const activeWatch = collectionsData[activeIndex];

  return (
    <>
      <section 
        id="collections" 
        className="relative w-full min-h-[100svh] bg-[#050505] overflow-hidden flex flex-col justify-center py-24 lg:py-0"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        
        {/* Deep Global Lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[80%] bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.06)_0%,transparent_60%)] pointer-events-none z-0"></div>

        {/* Dynamic Background Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] md:text-[22vw] font-display font-bold text-transparent tracking-tighter whitespace-nowrap pointer-events-none z-0 opacity-40 transition-all duration-700" style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.04)' }}>
          {activeWatch.name.toUpperCase()}
        </div>

        <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center h-full pt-6 lg:pt-0">
          
          {/* ============================== */}
          {/* LEFT SIDE: Typography & Details */}
          {/* ============================== */}
          <div className="lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-left order-2 lg:order-1 z-20">
            
            <div className="flex items-center gap-3 mb-4 lg:mb-6">
              <span className="text-[#D4AF37] font-display tracking-[0.3em] uppercase text-xs md:text-sm">Series</span>
              <span className="h-[1px] w-8 bg-white/20"></span>
              <span className="text-white tracking-[0.3em] uppercase text-xs md:text-sm font-light">0{activeWatch.id}</span>
            </div>

            <div ref={textContainerRef} key={`text-${activeWatch.id}`} className="flex flex-col items-center lg:items-start w-full">
              <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-display font-bold text-white tracking-tighter mb-4 lg:mb-6 leading-none drop-shadow-2xl">
                {activeWatch.name}
              </h2>

              <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 lg:mb-10 max-w-md font-light line-clamp-3">
                {activeWatch.desc}
              </p>

              {/* Discover Button triggers Overlay */}
              <button 
                onClick={() => setSelectedWatch(activeWatch)}
                className="flex items-center gap-4 text-white hover:text-[#D4AF37] transition-all duration-300 group cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 rounded-full pl-6 pr-2 py-2 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)] active:scale-95"
              >
                <span className="uppercase tracking-[0.2em] text-[10px] md:text-xs font-medium">Discover Details</span>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                  <Maximize className="w-3 h-3 md:w-4 md:h-4 group-hover:scale-110 transition-transform" />
                </div>
              </button>
            </div>
          </div>

          {/* ============================== */}
          {/* RIGHT SIDE: 3D Coverflow Stage */}
          {/* ============================== */}
          <div 
            className="lg:col-span-7 relative h-[40vh] md:h-[50vh] lg:h-[75vh] w-full flex items-center justify-center order-1 lg:order-2 z-10 perspective-[1200px] lg:perspective-[2000px]"
            onMouseEnter={() => setIsAutoplay(false)} 
            onMouseLeave={() => setIsAutoplay(true)}
          >
            
            <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
              {collectionsData.map((watch, index) => (
                <div
                  key={watch.id}
                  className="absolute w-[60vw] md:w-[40vw] lg:w-[30vw] aspect-[3/4] bg-white/[0.01] backdrop-blur-sm border border-white/5 rounded-3xl flex flex-col items-center justify-center cursor-pointer overflow-hidden"
                  style={getCardStyle(index)}
                  onClick={() => {
                    if (activeIndex === index) setSelectedWatch(watch);
                    else handleIndexChange(index);
                  }}
                >
                  {/* Subtle inner glass highlight */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 rounded-3xl pointer-events-none"></div>
                  
                  <img
                    src={watch.img}
                    alt={watch.name}
                    className="w-[85%] h-[85%] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]"
                  />
                  
                  <div className="absolute bottom-6 left-0 w-full text-center pointer-events-none">
                     <span className="text-white/60 font-display tracking-[0.25em] uppercase text-[9px] md:text-[10px] drop-shadow-md">{watch.name}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ============================== */}
        {/* BOTTOM NAVIGATION CONTROLS */}
        {/* ============================== */}
        <div className="absolute bottom-6 md:bottom-10 left-0 w-full px-6 md:px-12 z-20 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsAutoplay(!isAutoplay)}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white transition-colors bg-black/50 backdrop-blur-md"
            >
              {isAutoplay ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
            </button>
            <span className="text-zinc-600 text-[10px] tracking-widest uppercase hidden md:block">Auto-Tour</span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all hover:scale-110 bg-black/50 backdrop-blur-md"
            >
              <ChevronLeft className="w-5 h-5 -ml-0.5" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all hover:scale-110 bg-black/50 backdrop-blur-md"
            >
              <ChevronRight className="w-5 h-5 -mr-0.5" />
            </button>
          </div>

        </div>

      </section>

      {/* CONDITIONAL DETAILED OVERLAY RENDER */}
      {selectedWatch && (
        <WatchDetail watch={selectedWatch} onClose={() => setSelectedWatch(null)} />
      )}
      
      {/* Hide Scrollbar Global Config */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </>
  );
}