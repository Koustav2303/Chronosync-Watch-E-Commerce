import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MapPin,
  CalendarDays,
  Globe,
  ArrowRight,
  Clock,
  Sparkles,
  PhoneCall,
  Ticket,
  Glasses
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const boutiques = [
  {
    id: '01',
    city: 'Geneva',
    region: 'Europe',
    address: 'Rue du Rhône 41, 1204 Genève',
    status: 'Flagship',
    timezone: 'GMT+1',
    ianaTimeZone: 'Europe/Zurich',
    hours: '10:00 - 19:00',
    phone: '+41 22 555 01 90',
    img: 'https://en.worldtempus.com/sites/default/files/media/article/a-lemeraude/emeraude-devanture.jpg',
    experiences: ['Private Salon', 'Master Watchmaker Desk', 'Rare Complications']
  },
  {
    id: '02',
    city: 'New York',
    region: 'Americas',
    address: '57th Street & 5th Ave, NY 10022',
    status: 'Open',
    timezone: 'GMT-5',
    ianaTimeZone: 'America/New_York',
    hours: '09:30 - 20:00',
    phone: '+1 212 555 88 20',
    img: 'https://uploads.nationaljeweler.com/uploads/72a5fc792bde0ede0b5a0446f52d30c8.jpg',
    experiences: ['Collector Lounge', 'Strap Atelier', 'Concierge Pickup']
  },
  {
    id: '03',
    city: 'Tokyo',
    region: 'Asia Pacific',
    address: 'Ginza 6-Chome, Chuo City, Tokyo 104-0061',
    status: 'Open',
    timezone: 'GMT+9',
    ianaTimeZone: 'Asia/Tokyo',
    hours: '11:00 - 20:00',
    phone: '+81 3 5555 0901',
    img: 'https://mkiiwatches.com/cdn/shop/articles/R0003673_1000x.jpg?v=1673893479',
    experiences: ['Tea Pairing Session', 'Dial Personalization', 'Movement Showcase']
  },
  {
    id: '04',
    city: 'Dubai',
    region: 'Middle East',
    address: 'Fashion Avenue, Dubai Mall',
    status: 'Opening Soon',
    timezone: 'GMT+4',
    ianaTimeZone: 'Asia/Dubai',
    hours: '12:00 - 22:00',
    phone: '+971 4 555 0199',
    img: 'https://luxebook.in/wp-content/uploads/2023/12/WatchBox_and_Ahmed_Seddiqi-1.jpg',
    experiences: ['Skyline VIP Room', 'Launch Exhibits', 'Golden Hour Consultations']
  }
];

const upcomingEvents = [
  { city: 'Geneva', date: '12 Jun', name: 'Atelier Open Bench' },
  { city: 'New York', date: '22 Jun', name: 'Collector Night' },
  { city: 'Tokyo', date: '07 Jul', name: 'Complication Discovery' }
];

export default function Boutique() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const imageWrappersRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [localTime, setLocalTime] = useState('');
  const prevIndexRef = useRef(0);

  const regions = useMemo(() => ['All', ...new Set(boutiques.map((boutique) => boutique.region))], []);
  const filteredBoutiques = useMemo(() => {
    if (selectedRegion === 'All') {
      return boutiques;
    }
    return boutiques.filter((boutique) => boutique.region === selectedRegion);
  }, [selectedRegion]);

  useEffect(() => {
    setActiveIndex(0);
    prevIndexRef.current = 0;
  }, [selectedRegion]);

  useEffect(() => {
    const targetBoutique = filteredBoutiques[activeIndex];
    if (!targetBoutique) {
      return;
    }

    const formatTime = () => {
      setLocalTime(
        new Intl.DateTimeFormat('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: targetBoutique.ianaTimeZone
        }).format(new Date())
      );
    };

    formatTime();
    const timer = setInterval(formatTime, 30000);
    return () => clearInterval(timer);
  }, [activeIndex, filteredBoutiques]);

  // ==========================================
  // GOD-LEVEL IMAGE SHUTTER LOGIC
  // ==========================================
  useEffect(() => {
    if (!filteredBoutiques.length) {
      return;
    }

    // Prevent animation on initial mount
    if (prevIndexRef.current === activeIndex) return;

    const prevImg = imageWrappersRef.current[prevIndexRef.current];
    const newImg = imageWrappersRef.current[activeIndex];

    if (!prevImg || !newImg) {
      prevIndexRef.current = activeIndex;
      return;
    }

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
  }, [activeIndex, filteredBoutiques]);

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

  const activeBoutique = filteredBoutiques[activeIndex];

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
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tighter">
              The <span className="text-zinc-600 italic font-light">Boutiques.</span>
            </h2>
            <p className="max-w-xl text-zinc-400 leading-relaxed">
              Discover immersive maisons around the world, each designed with regional culture, curated appointments,
              and one-of-a-kind client rituals.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {regions.map((region) => {
              const isSelected = selectedRegion === region;
              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => setSelectedRegion(region)}
                  className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition-all ${
                    isSelected
                      ? 'border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#E8CF79]'
                      : 'border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/25 hover:text-zinc-200'
                  }`}
                >
                  {region}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-zinc-500">
              <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
              Signature Service
            </p>
            <p className="text-lg text-white">Private consultations by appointment</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-zinc-500">
              <Clock className="h-3.5 w-3.5 text-[#D4AF37]" />
              Local Time
            </p>
            <p className="text-lg text-white">{activeBoutique ? `${localTime} (${activeBoutique.timezone})` : '--:--'}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-zinc-500">
              <Ticket className="h-3.5 w-3.5 text-[#D4AF37]" />
              Upcoming Events
            </p>
            <p className="text-lg text-white">{upcomingEvents.length} curated sessions this month</p>
          </div>
        </div>

        {/* ========================================== */}
        {/* DESKTOP VIEW (Split Layout)                */}
        {/* ========================================== */}
        <div className="hidden lg:grid grid-cols-12 gap-12 items-center h-[65vh]">
          
          {/* Left Column: Interactive React-Driven List */}
          <div className="col-span-6 flex flex-col h-full justify-center space-y-2">
            {filteredBoutiques.map((boutique, index) => {
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
              
              {filteredBoutiques.map((boutique, index) => (
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
            <div className="absolute bottom-8 left-8 right-8 z-20 bg-[#0a0a0b]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:border-[#D4AF37]/40">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div key={activeBoutique?.id || 'none'} className="animate-[fadeIn_0.5s_ease-out_forwards]">
                <p className="text-[#D4AF37] font-display text-xs tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
                  <MapPin className="w-3 h-3" /> {activeBoutique?.status || 'Unavailable'}
                </p>
                  <h4 className="text-2xl font-display text-white mb-1">{activeBoutique?.address || 'No location'}</h4>
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                    Boutique Hours: {activeBoutique?.hours || 'TBC'}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-xs uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/10">
                    <PhoneCall className="h-4 w-4 text-[#D4AF37]" />
                    Call Concierge
                  </button>
                  <button className="w-14 h-14 rounded-full bg-[#D4AF37] flex shrink-0 items-center justify-center text-black hover:scale-110 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all">
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="mb-12 mt-10 hidden lg:grid grid-cols-12 gap-6">
          <div className="col-span-8 rounded-2xl border border-white/10 bg-[#060606]/80 p-6">
            <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-zinc-500">Boutique Experience Highlights</p>
            <div className="flex flex-wrap gap-3">
              {(activeBoutique?.experiences || []).map((experience) => (
                <span
                  key={experience}
                  className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-xs uppercase tracking-[0.14em] text-[#E8CF79]"
                >
                  <Glasses className="h-3.5 w-3.5" />
                  {experience}
                </span>
              ))}
            </div>
          </div>
          <div className="col-span-4 rounded-2xl border border-white/10 bg-[#060606]/80 p-6">
            <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-zinc-500">Global Event Calendar</p>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.city} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                  <div>
                    <p className="text-white text-sm">{event.name}</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">{event.city}</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.14em] text-[#D4AF37]">{event.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* MOBILE VIEW (Horizontal Snap Carousel)     */}
        {/* ========================================== */}
        <div className="mobile-carousel lg:hidden flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 w-[100vw] -ml-6 px-6 hide-scrollbar mt-6">
          {filteredBoutiques.map((boutique) => (
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

                <div className="mb-4 flex flex-wrap gap-2">
                  {boutique.experiences.slice(0, 2).map((experience) => (
                    <span key={experience} className="rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-white/80">
                      {experience}
                    </span>
                  ))}
                </div>

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