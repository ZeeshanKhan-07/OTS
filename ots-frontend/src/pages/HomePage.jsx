import { useState, useEffect } from 'react';
import React from 'react';
import Lenis from "lenis";
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';
import MenuSection from '../components/MenuSection';
import GallerySection from '../components/GallerySection';
import TestimonialsSection from '../components/TestimonialsSection';
import VisitUsSection from '../components/VisitUsSection';

export default function HomePage() {
    useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    const frameId = requestAnimationFrame(raf);

    return () => {
        cancelAnimationFrame(frameId);
        lenis.destroy();
    };
}, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <GallerySection />
        <TestimonialsSection />
        <VisitUsSection />
        <Footer />
      </main>
    </div>
  );
}