import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";

const heroTexts = [
  { part1: "Experience The", part2: "Perfect Night Out" },
  { part1: "Discover Great", part2: "Food, Drinks & Vibes" },
  { part1: "Unwind With", part2: "Good Food & Great Company" },
  { part1: "Where Every Visit", part2: "Becomes A Memory" },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance & exit timeline for sequential options
      const tl = gsap.timeline({
        onComplete: () => {
          // Loop through the items continuously
          setCurrentIndex((prev) => (prev + 1) % heroTexts.length);
        },
      });

      // Animate In
      tl.fromTo(
        textRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" },
      )
        // Hold for 2.5 seconds
        .to(textRef.current.children, {
          y: -20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 2.5,
          ease: "power3.in",
        });
    });

    return () => ctx.revert();
  }, [currentIndex]);

  const current = heroTexts[currentIndex];

  return (
    <section className="relative w-full h-screen flex items-center justify-start overflow-hidden">
      {/* Background Image: Visible on all screen sizes */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('/drinks.jpg')`,
        }}
      />

      {/* Hero Content: Shifted slightly to the right with md:pl-16 or pl-8 */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full pt-20 pl-6 md:pl-20 lg:pl-32 flex flex-col items-center text-left">
        {/* Animated Text Area */}
        <div
          ref={textRef}
          className="min-h-[180px] flex flex-col justify-center mb-8"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold tracking-wide text-white drop-shadow-lg">
            {current.part1}
          </h1>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-grotesk font-semibold tracking-tight text-white/90 mt-2 drop-shadow-md">
            {current.part2}
          </h2>
        </div>

        {/* Action Buttons with Glassy Background: Aligned to the left/right matching the text shift */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          <button className="glass-button text-black font-rasputin px-7 py-3.5 hover:px-7.5 hover:py-4 rounded-full font-rasputin flex items-center space-x-2 bg-gradient-to-r from-[#DFBA42] via-[#F4E086] to-[#C99C23] hover:from-[#C99C23] hover:via-[#DFBA42] hover:to-[#B3871B] border border-amber-200/40 shadow-[0_4px_20px_rgba(217,168,48,0.35)] hover:shadow-[0_6px_25px_rgba(217,168,48,0.5)] transition-all duration-300 group">
            <span>Order Now</span>
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          <button className="glass-button font-rasputin text-black px-7 py-3.5 hover:px-7.5 hover:py-4 rounded-full font-rasputin flex items-center space-x-2 bg-gradient-to-r from-[#DFBA42] via-[#F4E086] to-[#C99C23] hover:from-[#C99C23] hover:via-[#DFBA42] hover:to-[#B3871B] border border-amber-200/40 shadow-[0_4px_20px_rgba(217,168,48,0.35)] hover:shadow-[0_6px_25px_rgba(217,168,48,0.5)] transition-all duration-300 group">
            <span>Explore Menu</span>
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
}