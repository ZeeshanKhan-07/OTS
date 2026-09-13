import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

import mainImage from "../assets/images/mocktail.jpg";
import smallImg1 from "../assets/images/items/coffee2.jpg";
import smallImg2 from "../assets/images/items/cocktail.jpg";
import smallImg3 from "../assets/images/items/momos.jpg";

const AboutSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const mainImgRef = useRef(null);
  const smallImgsRef = useRef([]);

  // Helper to collect refs for the small images pop-up animation
  const addToSmallImgsRef = (el) => {
    if (el && !smallImgsRef.current.includes(el)) {
      smallImgsRef.current.push(el);
    }
  };

  useEffect(() => {
    const el = sectionRef.current;

    // Clear previous refs array elements if component re-runs
    smallImgsRef.current = smallImgsRef.current.slice(0, 3);

    // Create a timeline bound to ScrollTrigger for bidirectional smooth scrubbing/playing
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 80%", // Starts when top of section hits 80% down the viewport
        end: "bottom 20%", // Ends when bottom of section hits 20%
        toggleActions: "play reverse play reverse", // Handles up and down scrolling cleanly
      },
    });

    // 1. Text slides in from the left, Main Image (on the right) slides in from the right simultaneously
    tl.fromTo(
      textRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
    )
      .fromTo(
        mainImgRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "<", // Sync start with the text animation
      )

      // 2. After main animations complete, the 3 smaller images (below text on left) pop up one by one
      .fromTo(
        smallImgsRef.current,
        { scale: 0, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2, // Stagger effect to pop up sequentially
          ease: "back.out(1.7)", // Gives a nice bouncy "pop" effect
        },
        "-=0.3", // Slightly overlap with the end of the first sequence for fluid motion
      );

    return () => {
      // Clean up ScrollTrigger instances on unmount
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full py-16 px-6 md:px-16 bg-[#fff9e6]/95 backdrop-blur-md lg:px-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Side: Content Text + 3 Smaller Images Below */}
        <div className="w-full lg:w-1/2 flex flex-col items-start">
          <div ref={textRef} className="w-full flex flex-col items-start">

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-rasputin font-bold text-gray-900 leading-tight mb-6">
              About OT’s
            </h2>

            <p className="text-gray-600 text-base font-rasputin leading-relaxed mb-4">
              OT’s Cafe & Bar brings together great food, crafted drinks, and a
              warm, inviting ambience in the heart of Thane. Our menu blends
              global flavours with regional favourites, thoughtfully curated to
              deliver comfort, creativity, and quality in every dish.{" "}
            </p>

            <p className="text-gray-600 text-base leading-relaxed font-rasputin mb-8">
              Led by globally experienced Chef Vikram Udaygiri, OT’s is driven by culinary excellence, live kitchen energy, and attention to detail creating experiences that go beyond dining.
            </p>
          </div>

          {/* 3 Smaller Images Grid (Placed below text on the left, pops up sequentially) */}
          <div className="grid grid-cols-3 gap-4 w-full">
            {[smallImg1, smallImg2, smallImg3].map((imgSrc, index) => (
              <div
                key={index}
                ref={addToSmallImgsRef}
                className="w-full h-24 md:h-28 rounded-lg overflow-hidden shadow-md bg-gray-100"
              >
                <img
                  src={imgSrc}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Main Large Image Container */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div
            ref={mainImgRef}
            className="relative w-full h-[350px] md:h-[480px] rounded-xl overflow-hidden shadow-lg"
          >
            <img
              src={mainImage}
              alt="Restaurant Atmosphere"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
