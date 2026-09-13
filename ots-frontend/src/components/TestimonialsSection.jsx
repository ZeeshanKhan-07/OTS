import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const TestimonialsSection = () => {
  const gridRef = useRef(null);

  // 15 testimonials = 5 pages x 3 reviews each
  // Page 1: Crystal Chicken Dumplings | Page 2: Prawn Red Thai Curry
  // Page 3: Filter Coffee Tiramisu | Page 4: Deep Ocean | Page 5: Gold Medalist
  const testimonials = [
    // --- Crystal Chicken Dumplings ---
    {
      quote:
        "The Crystal Chicken Dumplings are unbelievably light the chicken filling is so tender and the wrapper has the perfect bite.",
      name: "Ananya Sharma",
      rating: "4.9",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      quote:
        "Ordered these dumplings on a friend's recommendation and they didn't disappoint aromatic, well-balanced, easily the best starter here.",
      name: "Rohan Verma",
      rating: "4.9",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      quote:
        "Texture on the Crystal Chicken Dumplings is spot on, delicate skin and a juicy center. We ended up ordering a second plate.",
      name: "Priya Nair",
      rating: "4.8",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },

    // --- Prawn Red Thai Curry ---
    {
      quote:
        "The Prawn Red Thai Curry is rich and creamy with just the right amount of heat the prawns were perfectly cooked, never rubbery.",
      name: "Aditya Rao",
      rating: "4.9",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
    },
    {
      quote:
        "As a seafood lover, this curry blew me away. Great depth of flavor and generous prawns in every spoonful.",
      name: "Neha Kapoor",
      rating: "5.0",
      avatar: "https://randomuser.me/api/portraits/women/21.jpg",
    },
    {
      quote:
        "Mildly spicy, beautifully balanced, and pairs perfectly with steamed rice. The Prawn Red Thai Curry is a must-try main.",
      name: "Vikram Singh",
      rating: "4.8",
      avatar: "https://randomuser.me/api/portraits/men/78.jpg",
    },

    // --- Filter Coffee Tiramisu ---
    {
      quote:
        "The Filter Coffee Tiramisu is genius classic tiramisu but with that unmistakable South Indian filter coffee kick. Ordered it twice in one visit.",
      name: "Ishita Mehta",
      rating: "4.9",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      quote:
        "Best dessert on the menu, hands down. The coffee notes come through without overpowering the mascarpone layers.",
      name: "Arjun Malhotra",
      rating: "4.8",
      avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    },
    {
      quote:
        "Loved the local twist on a classic the Filter Coffee Tiramisu is rich, not overly sweet, and the perfect way to end the meal.",
      name: "Kavya Reddy",
      rating: "4.9",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    },

    // --- Deep Ocean (cocktail) ---
    {
      quote:
        "The Deep Ocean cocktail is stunning both in presentation and taste beautifully balanced with a refreshing finish.",
      name: "Rahul Desai",
      rating: "4.8",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    },
    {
      quote:
        "Our bartender recommended the Deep Ocean and it turned out to be the highlight of the evening smooth, well-crafted, not too sweet.",
      name: "Sanya Gupta",
      rating: "4.9",
      avatar: "https://randomuser.me/api/portraits/women/50.jpg",
    },
    {
      quote:
        "Went back purely for another round of the Deep Ocean. Easily one of the best cocktails I've had in Mumbai.",
      name: "Karan Joshi",
      rating: "4.9",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    },

    // --- Gold Medalist (cocktail) ---
    {
      quote:
        "The Gold Medalist lives up to its name bold, well-balanced, and beautifully garnished. A true house favorite.",
      name: "Meera Iyer",
      rating: "5.0",
      avatar: "https://randomuser.me/api/portraits/women/59.jpg",
    },
    {
      quote:
        "Asked the bartender for their best pick and got the Gold Medalist strong, smooth, and full of character.",
      name: "Siddharth Bhatia",
      rating: "4.8",
      avatar: "https://randomuser.me/api/portraits/men/64.jpg",
    },
    {
      quote:
        "The Gold Medalist cocktail is exactly why we keep coming back consistently excellent every single time.",
      name: "Tanya Chopra",
      rating: "4.9",
      avatar: "https://randomuser.me/api/portraits/women/27.jpg",
    },
  ];

  // One featured image per page, loosely themed to that page's dish/drink
  const featuredImages = [
    "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&h=800&fit=crop", // dumplings
    "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&h=800&fit=crop", // curry / seafood
    "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=800&fit=crop", // tiramisu / dessert
    "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&h=800&fit=crop", // cocktail
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=800&fit=crop", // cocktail
  ];

  const avatarStack = [
    "https://randomuser.me/api/portraits/women/68.jpg",
    "https://randomuser.me/api/portraits/men/32.jpg",
    "https://randomuser.me/api/portraits/women/44.jpg",
  ];

  const PAGE_SIZE = 3;
  const totalPages = Math.ceil(testimonials.length / PAGE_SIZE);
  const [page, setPage] = useState(0);

  const currentReviews = testimonials.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE,
  );
  const currentImage = featuredImages[page % featuredImages.length];

  useEffect(() => {
    if (!gridRef.current) return;
    const tiles = gridRef.current.querySelectorAll(".testimonial-tile");

    gsap.fromTo(
      tiles,
      { opacity: 0, scale: 0.8, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "back.out(1.6)",
      },
    );
  }, [page]);

  const goPrev = () => setPage((p) => Math.max(0, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  const Stars = ({ rating }) => (
    <div className="flex items-center gap-1 text-sm font-medium text-gray-800">
      <span className="text-orange-500">★</span>
      <span>{rating}/5</span>
    </div>
  );

  const ReviewCard = ({ item }) => (
    <div className="testimonial-tile w-full h-full bg-[#f7f2e7] rounded-3xl p-6 md:p-7 flex flex-col justify-between shadow-lg overflow-hidden">
      <div>
        <span className="text-3xl md:text-4xl text-black font-serif leading-none">
          &ldquo;
        </span>
        <p className="text-gray-800 text-sm md:text-base font-groteskleading-relaxed mt-2 line-clamp-4">
          {item.quote}
        </p>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <img
          src={item.avatar}
          alt={item.name}
          className="w-10 h-10 rounded-full object-cover shrink-0"
          draggable={false}
        />
        <div className="min-w-0">
          <p className="font-rasputin text-gray-900 text-sm md:text-base truncate">
            {item.name}
          </p>
          <Stars rating={item.rating} />
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative w-full bg-[#fff9e6]/95 backdrop-blur-md px-6 md:px-12 lg:px-16 py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-10 lg:gap-14 items-center">
        {/* Left column */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <h2 className="font-serif italic text-black text-4xl sm:text-5xl md:text-6xl leading-[1.05] mb-6">
              What Our Happy
              <br />
              Customers Say
            </h2>
            <p className="text-black/60 font-grotesk text-sm md:text-base max-w-sm">
              Hear genuine stories from our guests who join us for great food,
              crafted drinks, and memorable times.
            </p>
          </div>

          {/* Arrows desktop position */}
          <div className="hidden lg:flex items-center gap-4 mt-10">
            <button
              onClick={goPrev}
              disabled={page === 0}
              aria-label="Previous reviews"
              className="w-12 h-12 rounded-full bg-black cursor-pointer hover:bg-black/50 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-md disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>

            <button
              onClick={goNext}
              disabled={page === totalPages - 1}
              aria-label="Next reviews"
              className="w-12 h-12 rounded-full bg-black cursor-pointer hover:bg-black/50 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-emerald-900/20 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right column fixed-height 2x2 grid so every tile is exactly the same size */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 grid-rows-2 gap-5 md:gap-6 h-[520px] sm:h-[500px] md:h-[560px]"
        >
          <ReviewCard item={currentReviews[0]} />
          <ReviewCard item={currentReviews[1]} />
          <ReviewCard item={currentReviews[2]} />

          <div className="testimonial-tile w-full h-full rounded-3xl overflow-hidden">
            <img
              src={currentImage}
              alt="Featured dish"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        </div>

        {/* Arrows mobile position */}
        <div className="flex lg:hidden items-center justify-center gap-3">
          <button
            onClick={goPrev}
            disabled={page === 0}
            aria-label="Previous reviews"
            className="w-12 h-12 rounded-full bg-black cursor-pointer hover:bg-black/50 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-md disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>

          <button
            onClick={goNext}
            disabled={page === totalPages - 1}
            aria-label="Next reviews"
            className="w-12 h-12 rounded-full bg-black cursor-pointer hover:bg-black/50 text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-emerald-900/20 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Page indicator dots */}
      <div className="max-w-7xl mx-auto flex justify-center lg:justify-end mt-8 gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            aria-label={`Go to page ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === page ? "w-6 bg-black" : "w-1.5 bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
