import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/OTS_LOGO.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Store, Hourglass, Truck, Phone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Custom social icons (avoids relying on lucide-react exports that vary
// between versions, e.g. Facebook / Twitter were removed in newer releases)
const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" {...props}>
    <path d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h11.02v-8.937H9.692v-3.472h3.099V8.936c0-3.075 1.877-4.752 4.62-4.752 1.314 0 2.443.098 2.771.142v3.212h-1.902c-1.492 0-1.78.71-1.78 1.749v2.292h3.554l-.463 3.472h-3.091V24h6.057c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const topBarItems = [
  {
    icon: Store,
    title: "Find a Store",
    subtitle: "Store Location",
  },
  {
    icon: Hourglass,
    title: "Time",
    subtitle: "Between 12 pm - 12 am",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    subtitle: "Take your order free",
  },
  {
    icon: Phone,
    title: "Store Number",
    subtitle: "+91 98765 43210",
  },
];

const linkColumns = [
  {
    heading: "About Us",
    links: ["Our Story", "Meet the Team", "Our Values"],
  },
  {
    heading: "Help",
    links: ["Size Guide", "Order Status", "Shipping", "FAQ"],
  },
  {
    heading: "Company",
    links: ["Press And Media", "Contact Us", "Careers"],
  },
];

const socialIcons = [
  { icon: InstagramIcon, label: "Instagram", href: "#" },
  { icon: FacebookIcon, label: "Facebook", href: "#" },
  { icon: TwitterIcon, label: "Twitter", href: "#" },
];

export default function Footer() {
  const footerRef = useRef(null);
  const topBarRef = useRef(null);
  const logoColRef = useRef(null);
  const linkColsRef = useRef(null);
  const ctaColRef = useRef(null);
  const socialRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      // ------------------------------------------------------------------
      // 1) LOAD-IN TIMELINE — plays once, immediately, when Footer mounts
      // ------------------------------------------------------------------
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.7 },
      });

      tl.from(topBarRef.current.children, {
        y: -20,
        opacity: 0,
        stagger: 0.08,
      })
        .from(logoColRef.current, { x: -30, opacity: 0 }, "-=0.3")
        .from(
          linkColsRef.current.children,
          { y: 24, opacity: 0, stagger: 0.1 },
          "-=0.4"
        )
        .from(
          ctaColRef.current.children,
          { y: 24, opacity: 0, stagger: 0.15, ease: "back.out(1.6)" },
          "-=0.3"
        )
        .from(
          socialRef.current.children,
          { scale: 0, opacity: 0, stagger: 0.08, ease: "back.out(2)" },
          "-=0.3"
        )
        .from(bottomRef.current, { opacity: 0, duration: 0.5 }, "-=0.2");

      // Gentle continuous "breathing" glow on the primary CTA so the
      // footer never feels fully static once it has loaded in.
      const orderBtn = ctaColRef.current.querySelector("[data-cta='order']");
      if (orderBtn) {
        gsap.to(orderBtn, {
          boxShadow: "0 0 0 6px rgba(255,255,255,0.08)",
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: tl.duration() + 0.3,
        });
      }

      // ------------------------------------------------------------------
      // 2) SCROLL-TRIGGERED REVEALS — each block animates independently
      //    as the user scrolls the footer into view.
      // ------------------------------------------------------------------
      const revealBlocks = [
        { el: topBarRef.current, y: -30 },
        { el: logoColRef.current, x: -40, y: 0 },
        { el: linkColsRef.current, y: 30 },
        { el: ctaColRef.current, y: 30 },
        { el: socialRef.current, y: 20 },
        { el: bottomRef.current, y: 20 },
      ];

      revealBlocks.forEach(({ el, x = 0, y = 0 }) => {
        gsap.fromTo(
          el,
          { opacity: 0, x, y },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Whole footer gets a soft lift as it enters the viewport, on top
      // of the per-block reveals above.
      gsap.fromTo(
        footerRef.current,
        { opacity: 0.85 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ---- Subtle parallax on the dashed decorative arc ----
      gsap.to(".footer-decor-arc", {
        rotation: 10,
        transformOrigin: "center center",
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden bg-[#060606] text-white"
    >

      {/* ---- Top info bar ---- */}
      <div className="border-b border-white/25">
        <div
          ref={topBarRef}
          className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-6 px-6 py-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-4"
        >
          {topBarItems.map(({ icon: Icon, title, subtitle }) => (
            <div key={title} className="flex items-center gap-3">
              <Icon className="h-6 w-6 flex-shrink-0" strokeWidth={1.8} />
              <div>
                <p className="text-sm font-bold  font-rasputin leading-tight">{title}</p>
                <p className="text-sm leading-tight text-white/90">
                  {subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Main footer content ---- */}
      <div className="relative mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Logo + description + social */}
          <div ref={logoColRef} className="lg:col-span-1">
            <div className="flex flex-row items-center justify-between gap-4 sm:flex-col sm:items-start sm:justify-start sm:gap-0">
              <img
                src={logo}
                alt="Logo"
                className="h-9 w-auto shrink-0 object-contain"
                draggable="false"
              />
              <p className="max-w-[55%] text-sm leading-relaxed text-white/90 font-grotesk sm:mt-4 sm:max-w-[220px]">
                OT’s Cafe & Bar offers a thoughtfully curated dining and lounge experience for every occasion.
              </p>
            </div>

            <div className="mt-6 flex flex-row items-center justify-between gap-4 sm:flex-col sm:items-start sm:justify-start sm:gap-0">
              <p className="text-sm font-rasputin font-bold">Follow Us</p>
              <div ref={socialRef} className="flex items-center gap-3 sm:mt-3">
                {socialIcons.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-8 w-8 hover:px-2 hover:py-2 items-center justify-center rounded-md border border-white/70 transition-colors duration-200"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Link columns + CTA buttons */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-4">
            <div ref={linkColsRef} className="contents">
              {linkColumns.map(({ heading, links }) => (
                <div key={heading}>
                  <p className="mb-4 text-sm font-rasputin">{heading}</p>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-sm text-white/90 transition-colors duration-200 font-grotesk hover:text-white hover:underline"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* CTA buttons column (replaces the old Quick Link column) */}
            <div ref={ctaColRef} className="flex flex-col gap-10">
              <Link
                to="/order"
                data-cta="order"
                className="inline-flex w-full items-center justify-center rounded-md bg-white px-4 py-3 text-sm font-bold font-rasputin text-[#060606] shadow-md transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Order Now
              </Link>
              <Link
                to="/book-table"
                data-cta="book"
                className="inline-flex w-full items-center justify-center rounded-md border border-white px-4 py-3 text-sm font-rasputin font-bold text-white transition-colors duration-200 hover:bg-white hover:text-[#060606]"
              >
                Book a Table
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Bottom bar ---- */}
      <div ref={bottomRef} className="border-t border-white/25">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 py-6 text-center">
          <p className="text-sm font-grotesk text-white/90">
            2026 OT's cafe & Bar. All Right Reserved. Designed & Developed by <span className="font-display text-white">Zeeshan Khan</span>
          </p>
        </div>
      </div>
    </footer>
  );
}