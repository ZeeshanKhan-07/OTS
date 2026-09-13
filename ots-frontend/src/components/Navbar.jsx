import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "../assets/images/OTS_LOGO.png";

export default function Navbar() {
  const navRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // GSAP Loading Animation: starts wide (full width) and shrinks to original rounded size
    gsap.fromTo(
      navRef.current,
      { width: "100vw", borderRadius: "0px", opacity: 0 },
      {
        width: "85%",
        maxWidth: "1200px",
        borderRadius: "9999px",
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
      },
    );
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        ref={navRef}
        className="glass-nav flex items-center justify-between px-6 py-3 shadow-xl backdrop-blur-md bg-white/10 border border-white/20"
        style={{ width: "100vw" }}
      >
        {/* Left: Logo */}
        <a
          href="/"
          className="flex items-center cursor-pointer group"
          aria-label="Home"
        >
          <img
            src={logo}
            alt="SoundSync Logo"
            className="w-[55px] h-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Center: Desktop Navigation Options */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-black/95">
          {["About", "Menu", "Gallery", "Visit"].map((item) => {
            const href = `#${item.toLowerCase()}`;

            return (
              <a
                key={item}
                href={href}
                className="relative font-rasputin transition-all duration-300 transform hover:-translate-y-[2px] text-white after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </a>
            );
          })}
        </div>

        {/* Get Started - Desktop */}
        <div className="hidden md:block">
          <button className="group flex items-center space-x-2 bg-gradient-to-r from-[#DFBA42] via-[#F4E086] to-[#C99C23] hover:from-[#C99C23] hover:via-[#DFBA42] hover:to-[#B3871B] text-black px-5 py-2 rounded-full text-sm font-rasputin hover:bg-transparent border border-amber-200/40 shadow-[0_4px_20px_rgba(217,168,48,0.35)] hover:shadow-[0_6px_25px_rgba(217,168,48,0.5)] transition-all duration-300 group">
            <span>Book Table</span>

            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[80%] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 flex flex-col space-y-4 md:hidden shadow-2xl transition-all">
          <a
            href="#about"
            onClick={() => setIsOpen(false)}
            className="text-white/90 text-lg border-b border-white/20 font-rasputin hover:text-white"
          >
            About
          </a>

          <a
            href="#menu"
            onClick={() => setIsOpen(false)}
            className="text-white/90 text-lg border-b border-white/20 font-rasputin hover:text-white"
          >
            Menu
          </a>

          <a
            href="#gallery"
            onClick={() => setIsOpen(false)}
            className="text-white/90 text-lg border-b border-white/20 font-rasputin hover:text-white"
          >
            Gallery
          </a>

          <a
            href="#visit"
            onClick={() => setIsOpen(false)}
            className="text-white/90 text-lg border-b border-white/20 font-rasputin hover:text-white"
          >
            Visit US
          </a>

          <div className="flex items-center justify-center">
            <button className="group relative flex w-full items-center justify-center bg-gradient-to-r from-[#DFBA42] via-[#F4E086] to-[#C99C23] hover:from-[#C99C23] hover:via-[#DFBA42] hover:to-[#B3871B] text-black px-5 py-2 rounded-full text-sm font-rasputin border border-amber-200/40 shadow-[0_4px_20px_rgba(217,168,48,0.35)] hover:shadow-[0_6px_25px_rgba(217,168,48,0.5)] transition-all duration-300">
              <span className="font-rasputin">Book Table</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
