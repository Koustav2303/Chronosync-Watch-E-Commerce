import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';

const navLinks = [
  { name: 'Collections', href: '#collections' },
  { name: 'Craftsmanship', href: '#craftsmanship' },
  { name: 'Boutique', href: '#boutique' },
  { name: 'Legacy', href: '#legacy' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const tl = useRef(null);

  // Advanced GSAP Mobile Menu Animation
  useEffect(() => {
    tl.current = gsap.timeline({ paused: true });

    tl.current
      .to(menuRef.current, {
        duration: 0.8,
        clipPath: 'circle(150% at 100% 0%)', 
        ease: 'power4.inOut',
        display: 'flex',
      })
      .fromTo(
        linksRef.current,
        { y: 60, opacity: 0, rotateX: -30 }, 
        { y: 0, opacity: 1, rotateX: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)' },
        '-=0.4' 
      );

    gsap.set(menuRef.current, { 
      clipPath: 'circle(0% at 100% 0%)',
      display: 'none' 
    });

    return () => tl.current.kill(); 
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Stealth Luxury Floating Pill Header */}
      <header className="fixed top-6 left-0 right-0 z-50 px-4 md:px-12 flex justify-center">
        {/* Using black/40 and heavy blur to simulate smoked glass */}
        <nav className="w-full max-w-7xl px-6 py-4 flex justify-between items-center bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-2xl transition-all duration-300">
          
          {/* Logo - Pure White and Champagne Gold */}
          <div className="text-xl font-display font-bold tracking-widest uppercase z-50 relative cursor-pointer">
            <span className="text-white">Chrono</span>
            {/* #D4AF37 is a classic metallic gold hex code */}
            <span className="text-[#D4AF37]">Sync</span>
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="text-sm uppercase tracking-widest text-zinc-400 hover:text-[#D4AF37] transition-all duration-300 relative group font-medium"
                >
                  {link.name}
                  {/* Champagne Gold Underline Effect */}
                  <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#D4AF37] transition-all duration-300 ease-out group-hover:w-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"></span>
                </a>
              </li>
            ))}
          </ul>

          {/* Icons & Hamburger */}
          <div className="flex items-center space-x-6 z-50 relative">
            <Search className="w-5 h-5 text-zinc-400 hover:text-[#D4AF37] cursor-pointer transition-colors hidden sm:block" />
            <ShoppingBag className="w-5 h-5 text-zinc-400 hover:text-[#D4AF37] cursor-pointer transition-colors" />
            
            {/* Mobile Toggle Button */}
            <button 
              className="md:hidden text-zinc-400 hover:text-[#D4AF37] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-[#D4AF37]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Full-Screen Mobile Menu Overlay - Obsidian Black */}
      <div 
        ref={menuRef}
        className="fixed inset-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-3xl flex-col justify-center items-center h-screen perspective-[1000px]"
      >
        <ul className="flex flex-col items-center space-y-10">
          {navLinks.map((link, index) => (
            <li 
              key={link.name}
              ref={el => linksRef.current[index] = el}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <a 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-4xl md:text-6xl font-display font-medium text-white hover:text-[#D4AF37] transition-colors tracking-wide"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}