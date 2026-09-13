import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MenuSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    const cards = cardsRef.current;
    const totalCards = cards.length;
    const mm = gsap.matchMedia();

    // Desktop / tablet: pinned section, cards slide up one at a time
    // into a horizontal 4-up layout.
    mm.add('(min-width: 768px)', () => {
      cards.forEach((card) => {
        gsap.set(card, { yPercent: 100 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalCards * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      cards.forEach((card) => {
        tl.to(card, {
          yPercent: 0,
          duration: 1,
          ease: 'power2.out',
        });
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    // Mobile: same pin-and-reveal mechanic, but cards are stacked
    // directly on top of each other (absolute, full screen). Card 1
    // is pinned in place, card 2 slides up and fully covers it, then
    // card 3 covers card 2, then card 4 covers card 3 — then the
    // whole section unpins. One continuous scroll-driven sequence.
    mm.add('(max-width: 767px)', () => {
      cards.forEach((card, index) => {
        gsap.set(card, { yPercent: index === 0 ? 0 : 100, zIndex: index + 1 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalCards * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Skip index 0 — it's already in place and visible first.
      cards.forEach((card, index) => {
        if (index === 0) return;
        tl.to(card, {
          yPercent: 0,
          duration: 1,
          ease: 'power2.out',
        });
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  const menuCategories = [
    {
      title: "Starters",
      bgClass: "bg-[#fff9e6]/95 backdrop-blur-md",
      textColor: "text-gray-900",
      items: [
        { name: "Crisp Lotus Chips", price: "9", desc: "I'm a dish description. Click 'Edit Menu' to change my text." },
        { name: "Spicy Tuna Tartare", price: "9", desc: "I'm a dish description. Click 'Edit Menu' to change my text." },
        { name: "Avocado Spring Rolls", price: "9", desc: "I'm a dish description. Click 'Edit Menu' to change my text." }
      ]
    },
    {
      title: "Cocktails",
      bgClass: "bg-[#d4ed6e]/95 backdrop-blur-md",
      textColor: "text-gray-900",
      items: [
        { name: "Siam Sunset Sparkler", price: "12", desc: "I'm a dish description. Click 'Edit Menu' to change my text." },
        { name: "Bangkok Bourbon Smash", price: "12", desc: "I'm a dish description. Click 'Edit Menu' to change my text." },
        { name: "Lychee Ginger Mojito", price: "13", desc: "I'm a dish description. Click 'Edit Menu' to change my text." }
      ]
    },
    {
      title: "Desserts",
      bgClass: "bg-[#1a1a1a]/95 backdrop-blur-md",
      textColor: "text-white",
      items: [
        { name: "CHOPOPLAN", price: "4", desc: "Lorem ipsum dolor sit amet ad." },
        { name: "MENU'S ICE CREAM", price: "4", desc: "Sed diam tincidunt ut wisi." },
        { name: "DOS LECHES", price: "4.5", desc: "Consecteteur adipiscing elit." },
        { name: "CREME BRULEE", price: "5.5", desc: "Lorem ipsum dolor sit amet." }
      ]
    },
    {
      title: "Drinks",
      bgClass: "bg-[#fdfbf7]/95 backdrop-blur-md",
      textColor: "text-gray-900",
      items: [
        { name: "ICE TEA", price: "3.5", desc: "Refreshing blend of house-brewed black tea." },
        { name: "GREEN DRINK", price: "7.5", desc: "Kale, green apple, cucumber, and lemon." },
        { name: "ORGANIC MILK", price: "4.5", desc: "Locally sourced farm-fresh organic milk." },
        { name: "WINE", price: "9", desc: "House selection red or white." }
      ]
    }
  ];

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url('/Menu_Section_BG.jpg')` }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Desktop: horizontal 4-up row, full-bleed.
          Mobile: cards stacked absolutely on top of each other, each full screen. */}
      <div className="absolute inset-0 z-10 flex flex-col md:flex-row w-full h-full">
        {menuCategories.map((cat, index) => (
          <div
            key={index}
            ref={addToCardsRef}
            className={`absolute inset-0 md:relative md:inset-auto w-full md:flex-1 h-full p-6 md:p-8 flex flex-col justify-between ${cat.bgClass} ${cat.textColor}`}
          >
            <div className="flex flex-col h-full">
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6 border-b border-current pb-4">
                {cat.title}
              </h3>

              <div className="flex flex-col gap-5 overflow-y-auto flex-1 pr-1">
                {cat.items.map((item, idx) => (
                  <div key={idx} className="flex flex-col border-b border-current/10 pb-3">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="font-bold text-base md:text-lg tracking-wide">{item.name}</span>
                      <span className="font-semibold text-base md:text-lg">{item.price}</span>
                    </div>
                    <p className="text-xs md:text-sm opacity-80 italic font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 text-xs tracking-widest uppercase opacity-60 font-semibold">
              Category 0{index + 1} / 04
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuSection;