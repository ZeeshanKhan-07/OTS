import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const VisitUsSection = () => {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const mapWrapperRef = useRef(null);
  const loaderRef = useRef(null);
  const pinRef = useRef(null);

  const [mapLoaded, setMapLoaded] = useState(false);

  // Location details
  const LAT = 19.2146573;
  const LNG = 72.9892232;
  const PLACE_NAME = "OT's Cafe & Bar";
  const MAP_EMBED_SRC = `https://www.google.com/maps?q=${LAT},${LNG}&z=16&output=embed`;

  const contact = {
    phone: '+91 98765 43210',
    email: 'hello@otscafebar.com',
    address: "OT's Cafe & Bar, Mira Road, Thane, Maharashtra, India",
    manager: {
      name: 'Rohan Shetty',
      role: 'Store Manager',
      avatar: 'https://i.pravatar.cc/150?img=68',
    },
    hours: [
      { day: 'Mon – Fri', time: '11:00 AM – 11:00 PM' },
      { day: 'Sat – Sun', time: '10:00 AM – 12:00 AM' },
    ],
  };

  // ---- Get Directions: origin = user's live location, destination = cafe ----
  const handleGetDirections = () => {
    const destination = `${LAT},${LNG}`;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const origin = `${position.coords.latitude},${position.coords.longitude}`;
          const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&destination_place_id=&travelmode=driving`;
          window.open(url, '_blank', 'noopener,noreferrer');
        },
        () => {
          // Permission denied or failed — Google Maps will default to the
          // user's current location automatically on their end.
          const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
          window.open(url, '_blank', 'noopener,noreferrer');
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // ---- GSAP loading shimmer while the map iframe loads ----
  useEffect(() => {
    if (mapLoaded) {
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
          if (loaderRef.current) loaderRef.current.style.display = 'none';
        },
      });
      return;
    }

    const shimmer = gsap.fromTo(
      loaderRef.current?.querySelector('.shimmer-bar'),
      { x: '-100%' },
      {
        x: '100%',
        duration: 1.2,
        repeat: -1,
        ease: 'power1.inOut',
      }
    );

    const pulse = gsap.to(pinRef.current, {
      y: -10,
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    return () => {
      shimmer.kill();
      pulse.kill();
    };
  }, [mapLoaded]);

  // ---- GSAP scroll-triggered reveal animations ----
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftColRef.current.children,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        rightColRef.current,
        { opacity: 0, x: 40, scale: 0.96 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="visit"
      ref={sectionRef}
      className="w-full bg-[#faf6ef] py-16 md:py-24 px-6 md:px-12 lg:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
        {/* Left column — contact details */}
        <div ref={leftColRef} className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold font-rasputin text-gray-900 mb-6 leading-tight">
              Come Say Hello.
            </h2>
            <p className="text-gray-600 font-grotesk text-sm md:text-base max-w-md mb-10">
              Drop by for great food, good company, and a warm welcome. Here's everything you need to find us.
            </p>
          </div>

          {/* Contact items */}
          <div className="space-y-5 mb-10">
            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-black shrink-0 mt-1" strokeWidth={1.8} />
              <div>
                <p className="text-xs font-rasputin uppercase tracking-wide text-gray-400 font-medium">Phone</p>
                <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="text-gray-900 font-semibold text-base md:text-lg hover:text-orange-600 transition-colors">
                  {contact.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-black shrink-0 mt-1" strokeWidth={1.8} />
              <div>
                <p className="text-xs font-rasputin uppercase tracking-wide text-gray-400 font-medium">Email</p>
                <a href={`mailto:${contact.email}`} className="text-gray-900 font-semibold text-base md:text-lg hover:text-orange-600 transition-colors break-all">
                  {contact.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-black shrink-0 mt-1" strokeWidth={1.8} />
              <div>
                <p className="text-xs font-rasputin uppercase tracking-wide text-gray-400 font-medium">Address</p>
                <p className="text-gray-900 font-semibold text-base md:text-lg">{contact.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 text-black shrink-0 mt-1" strokeWidth={1.8} />
              <div>
                <p className="text-xs font-rasputin uppercase tracking-wide text-gray-400 font-medium">Hours</p>
                {contact.hours.map((h, i) => (
                  <p key={i} className="text-gray-900 font-semibold text-sm md:text-base">
                    {h.day}: <span className="font-normal text-gray-600">{h.time}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Store manager card */}
          <div className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-md border border-gray-100 w-full sm:max-w-sm">
            <img
              src={contact.manager.avatar}
              alt={contact.manager.name}
              className="w-14 h-14 rounded-full object-cover shrink-0"
              draggable={false}
            />
            <div>
              <p className="font-bold font-rasputin text-gray-900 text-base">{contact.manager.name}</p>
              <p className="text-sm font-grotesk text-gray-500">{contact.manager.role}</p>
            </div>
          </div>
        </div>

        {/* Right column — map + get directions */}
        <div
          ref={rightColRef}
          className="relative w-full min-h-[400px] md:min-h-[500px] lg:min-h-full rounded-3xl overflow-hidden shadow-xl border border-gray-200"
        >
          {/* Loading overlay */}
          <div
            ref={loaderRef}
            className="absolute inset-0 z-20 bg-gray-100 flex flex-col items-center justify-center overflow-hidden"
          >
            <MapPin ref={pinRef} className="w-10 h-10 text-black mb-3" strokeWidth={1.6} />
            <p className="text-gray-500 text-sm font-medium mb-4">Loading map…</p>
            <div className="relative w-40 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="shimmer-bar absolute inset-y-0 left-0 w-1/2 bg-orange-500 rounded-full" />
            </div>
          </div>

          {/* Map */}
          <div ref={mapWrapperRef} className="absolute inset-0 z-10">
            <iframe
              title="Restaurant location map"
              src={MAP_EMBED_SRC}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setMapLoaded(true)}
            />
          </div>

          {/* Floating info + CTA card */}
          <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto md:bottom-6 z-30 bg-white rounded-2xl shadow-2xl p-5 md:p-6 md:max-w-xs">
            <p className="text-xs uppercase tracking-wide text-orange-600 font-semibold mb-1">
              {PLACE_NAME}
            </p>
            <p className="text-gray-600 text-sm mb-4">{contact.address}</p>
            <button
              onClick={handleGetDirections}
              className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-rasputin text-sm md:text-base py-3 rounded-xl transition-all hover:shadow-lg active:scale-95"
            >
              Get Directions
              <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitUsSection;