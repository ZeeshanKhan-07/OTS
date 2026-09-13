import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import instaLogo from '../assets/images/Instagram-Logo.wine.svg';
import gallery1 from '../assets/images/gallery/Gallery1.jpg';
import gallery2 from '../assets/images/gallery/Gallery2.jpg';
import gallery3 from '../assets/images/gallery/Gallery3.jpg';
import gallery4 from '../assets/images/gallery/Gallery4.jpg';
import gallery5 from '../assets/images/gallery/Gallery5.jpg';

gsap.registerPlugin(ScrollTrigger);

const INSTAGRAM_URL = 'https://www.instagram.com/otscafeandbar/';

// Instagram's signature brand gradient — used on the CTA text/button so it
// reads as "Instagram" without needing a literal Instagram font (Instagram
// doesn't ship a public web font, so this gradient + a rounded, friendly
// sans weight is the closest on-brand look for the web).
const INSTAGRAM_GRADIENT =
  'linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D, #F56040, #F77737, #FCAF45)';

const GallerySection = () => {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  cardsRef.current = [];
  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  // Replace these with your own images
  const images = [
    { src: gallery1, alt: 'River winding through mountains' },
    { src: gallery2, alt: 'Aerial coastline view' },
    { src: gallery3, alt: 'Mountain lake landscape' },
    { src: gallery4, alt: 'Coral reef underwater' },
    { src: gallery5, alt: 'Forest cliffside' },
  ];

  // Total number of cards in the track = photo cards + 1 Instagram CTA card
  const totalCards = images.length + 1;

  useEffect(() => {
    const cards = cardsRef.current;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    const gap = 32; // px, must match the gap-8 class below
    let ctx;

    const setup = () => {
      ctx = gsap.context(() => {
        const cardWidth = cards[0].offsetWidth;
        const step = cardWidth + gap;
        const viewportWidth = viewport.offsetWidth;
        const initialX = viewportWidth / 2 - cardWidth / 2;
        const totalDistance = step * (totalCards - 1);

        // Position track so the first card starts centered in the viewport
        gsap.set(track, { x: initialX });

        const applyDepthStyles = (progressIndex) => {
          cards.forEach((card, i) => {
            const distance = Math.abs(i - progressIndex);
            const scale = gsap.utils.clamp(0.78, 1, 1 - distance * 0.16);
            const opacity = gsap.utils.clamp(0.35, 1, 1 - distance * 0.45);
            gsap.set(card, { scale, opacity });
          });
        };

        applyDepthStyles(0);

        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalDistance + window.innerHeight * (totalCards - 1) * 0.5}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / (totalCards - 1),
            duration: 0.4,
            ease: 'power1.inOut',
          },
          onUpdate: (self) => {
            const progressIndex = self.progress * (totalCards - 1);
            gsap.set(track, { x: initialX - progressIndex * step });
            applyDepthStyles(progressIndex);
            setActiveIndex(Math.round(progressIndex));
          },
        });

        const onResize = () => ScrollTrigger.refresh();
        window.addEventListener('resize', onResize);

        return () => {
          window.removeEventListener('resize', onResize);
          st.kill();
        };
      }, sectionRef);
    };

    // Wait a tick so images/layout are measured correctly
    const raf = requestAnimationFrame(setup);

    return () => {
      cancelAnimationFrame(raf);
      if (ctx) ctx.revert();
    };
  }, [totalCards]);

  return (
    <section id="gallery" ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-[#d8e5da] flex flex-col justify-center">
      <h2 className="text-center text-3xl md:text-5xl font-rasputin font-bold text-black mb-10 md:mb-12 tracking-tight">
        Explore Our Gallery
      </h2>

      <div
        ref={viewportRef}
        className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden"
      >
        <div
          ref={trackRef}
          className="absolute top-0 left-0 h-full flex items-center gap-8 will-change-transform"
        >
          {images.map((img, index) => (
            <div
              key={index}
              ref={addToCardsRef}
              className="relative shrink-0 w-[78vw] sm:w-[65vw] md:w-[52vw] lg:w-[42vw] max-w-[900px] h-[85%] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover pointer-events-none select-none"
                draggable={false}
              />
            </div>
          ))}

          {/* Final card — Instagram CTA */}
          <div
            ref={addToCardsRef}
            className="relative shrink-0 w-[78vw] sm:w-[65vw] md:w-[52vw] lg:w-[42vw] max-w-[900px] h-[85%] rounded-3xl overflow-hidden shadow-2xl bg-white flex flex-col items-center justify-center px-8 text-center"
          >
            <img
              src={instaLogo}
              alt="Instagram"
              className="w-16 h-16 md:w-20 md:h-20 pointer-events-none select-none"
              draggable={false}
            />

            <p className="mt-6 text-lg md:text-xl font-grotesk text-black">
              See more on Instagram
            </p>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm md:text-base font-rasputin text-white transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: INSTAGRAM_GRADIENT }}
            >
              Take me there
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>

      {/* Dots overlay — fixed at bottom-center of the pinned viewport,
          always sitting over the active (centered) card */}
      <div className="absolute bottom-10 md:bottom-14 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {Array.from({ length: totalCards }).map((_, index) => (
          <span
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'w-6 bg-black' : 'w-2 bg-gray-400/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default GallerySection;
