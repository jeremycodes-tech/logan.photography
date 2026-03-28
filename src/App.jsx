import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Triangle, Zap, ArrowUpRight, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AvatarCircles } from "@/registry/magicui/avatar-circles";
import { ScrollVelocityContainer, ScrollVelocityRow } from "@/registry/magicui/scroll-based-velocity";
import { TextAnimate } from "@/registry/magicui/text-animate";
import { TypingAnimation } from "@/registry/magicui/typing-animation";
import { NumberTicker } from "@/registry/magicui/number-ticker";
import { Highlighter } from "@/registry/magicui/highlighter";
import PageLoader from './PageLoader.jsx';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

const avatars = [
  {
    imageUrl: "https://avatars.githubusercontent.com/u/16860528",
    profileUrl: "https://github.com/dillionverma",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/20110627",
    profileUrl: "https://github.com/tomonarifeehan",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/106103625",
    profileUrl: "https://github.com/BankkRoll",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59228569",
    profileUrl: "https://github.com/safethecode",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59442788",
    profileUrl: "https://github.com/sanjay-mali",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/89768406",
    profileUrl: "https://github.com/itsarghyadas",
  },
];

function App() {
  const heroRef = useRef(null);
  const testiScrollRef = useRef(null);
  const galleryScrollRef = useRef(null);
  const [loaderDone, setLoaderDone] = useState(false);

  const scrollGallery = (dir) => {
    if (galleryScrollRef.current) {
      const cardWidth = window.innerWidth * 0.95 + 16;
      galleryScrollRef.current.scrollBy({ left: dir === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' });
    }
  };
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTesti = (dir) => {
    if (testiScrollRef.current) {
      testiScrollRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
    }
  };

  // Mobile Auto-Scroll Testimonials Carousel
  useEffect(() => {
    const autoScrollInterval = setInterval(() => {
      // Only execute auto-scroll natively if it aligns with the mobile boundaries (< 900px)
      if (window.matchMedia('(max-width: 900px)').matches && testiScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = testiScrollRef.current;
        // Roughly 95vw plus margin gap
        const cardWidth = window.innerWidth * 0.95 + 16;

        // If we've reached the absolute end of the scroll array, smoothly return to start
        if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 10) {
          testiScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Incrementally scroll one component unit rightwards
          testiScrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => clearInterval(autoScrollInterval);
  }, []);

  // Mobile Auto-Scroll Gallery Carousel
  useEffect(() => {
    const autoScrollInterval = setInterval(() => {
      if (window.matchMedia('(max-width: 900px)').matches && galleryScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = galleryScrollRef.current;
        const cardWidth = window.innerWidth * 0.82 + 16;
        if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 10) {
          galleryScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          galleryScrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }
    }, 4500);
    return () => clearInterval(autoScrollInterval);
  }, []);

  useEffect(() => {
    if (!loaderDone) return;

    let mm = gsap.matchMedia();

    // DESKTOP HERO ANIMATIONS
    mm.add("(min-width: 900px)", () => {
      gsap.from('.hero-bg-img', { scale: 1.4, filter: 'blur(30px)', duration: 3.5, ease: 'power3.out' });
      gsap.from('.giant-bg-text', { opacity: 0, y: -100, filter: 'blur(10px)', scale: 0.9, duration: 2.5, ease: 'power4.out', delay: 0.5 });
      gsap.from('.navbar', { y: -50, opacity: 0, filter: 'blur(4px)', duration: 1.5, ease: 'elastic.out(1, 0.7)', delay: 1.2 });
      gsap.from('.service-item', { x: -50, opacity: 0, filter: 'blur(4px)', stagger: 0.15, duration: 1.2, ease: 'power3.out', delay: 2.2 });
      gsap.from(['.hero-description', '.action-row'], { y: 40, opacity: 0, filter: 'blur(4px)', stagger: 0.3, duration: 1.5, ease: 'power3.out', delay: 3.5 });
      gsap.from('.floating-action > *', { scale: 0, opacity: 0, rotation: -45, stagger: 0.1, duration: 1.2, ease: 'elastic.out(1, 0.5)', delay: 4.2 });
    });

    // MOBILE HERO ANIMATIONS
    mm.add("(max-width: 899px)", () => {
      gsap.from('.hero-bg-img', { scale: 1.1, filter: 'blur(10px)', duration: 2.5, ease: 'power3.out' });
      gsap.from('.giant-bg-text', { opacity: 0, y: -20, duration: 1.5, ease: 'power3.out', delay: 0.3 });
      gsap.from('.navbar', { y: -20, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.8 });
      gsap.from('.service-item', { y: 20, opacity: 0, stagger: 0.1, duration: 1, ease: 'power3.out', delay: 1.5 });
      gsap.from(['.hero-description', '.action-row'], { y: 20, opacity: 0, stagger: 0.2, duration: 1.2, ease: 'power3.out', delay: 2.2 });
      gsap.from('.island-nav', { y: 50, opacity: 0, duration: 1.5, ease: 'elastic.out(1, 0.7)', delay: 3.0 });
    });

    return () => mm.revert();
  }, [loaderDone]);

  // Hook 2: Initialize all ScrollTriggers IMMEDIATELY so they hide elements correctly and lazy-load
  useEffect(() => {
    let mm = gsap.matchMedia();

    // DESKTOP SCROLL TRIGGERS
    mm.add("(min-width: 900px)", () => {

      // Clients section - INDIVIDUAL LAZY SCROLL REVEAL
      gsap.fromTo('.clients-section',
        { y: 60, opacity: 0 },
        {
          scrollTrigger: { trigger: '.clients-section', start: 'top 85%', toggleActions: 'play none none reverse' },
          y: 0, opacity: 1, duration: 1.2, ease: 'power3.out'
        }
      );



      // Bento section animations - INDIVIDUAL LAZY SCROLL REVEALS
      gsap.fromTo('.bento-stamp',
        { scale: 0, rotation: -180, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.bento-stamp',
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          scale: 1, rotation: 0, opacity: 1, duration: 1.5, ease: 'back.out(1.5)'
        }
      );

      gsap.utils.toArray('.bento-headline > div').forEach((block) => {
        gsap.fromTo(block,
          { y: 80, opacity: 0, filter: 'blur(10px)' },
          {
            scrollTrigger: {
              trigger: block,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            },
            y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out'
          }
        );
      });

      gsap.utils.toArray('.bento-box').forEach((box) => {
        gsap.fromTo(box,
          { y: 100, scale: 0.9, opacity: 0 },
          {
            scrollTrigger: {
              trigger: box,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            y: 0, scale: 1, opacity: 1, duration: 1, ease: 'power3.out'
          }
        );
      });

      // Intro section animations - INDIVIDUAL LAZY SCROLL REVEALS
      gsap.utils.toArray('.intro-top, .intro-middle-left, .intro-bottom-header').forEach((el) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            y: 0, opacity: 1, duration: 1.2, ease: 'power3.out'
          }
        );
      });

      // Stagger the 4 discipline columns individually but as a grouped section
      gsap.fromTo('.intro-col',
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.intro-bottom-cols',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power3.out'
        }
      );

      // Pricing section animations - INDIVIDUAL LAZY SCROLL REVEALS
      gsap.utils.toArray('.pricing-header').forEach((el) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0, filter: 'blur(5px)' },
          {
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out'
          }
        );
      });

      gsap.utils.toArray('.price-card').forEach((card) => {
        gsap.fromTo(card,
          { y: 80, scale: 0.95, opacity: 0 },
          {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            y: 0, scale: 1, opacity: 1, duration: 1, ease: 'power3.out'
          }
        );
      });

      // Gallery section animations - INDIVIDUAL LAZY SCROLL REVEALS
      gsap.utils.toArray('.gallery-header, .gal-wrapper').forEach((el) => {
        gsap.fromTo(el,
          { y: 80, opacity: 0, filter: 'blur(8px)' },
          {
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out'
          }
        );
      });

      // Testimonials animations - INDIVIDUAL LAZY SCROLL REVEALS
      gsap.utils.toArray('.testi-left > *, .testi-right').forEach((el) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0, filter: 'blur(5px)' },
          {
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
            y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out'
          }
        );
      });

      // Footer animations - INDIVIDUAL LAZY SCROLL REVEALS
      gsap.utils.toArray('.footer-cta, .footer-col, .thanks-text, .thanks-bubble').forEach((el) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' },
            y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out'
          }
        );
      });

    });

    // MOBILE SCROLL TRIGGERS (Premium cascading animations for every section)
    mm.add("(max-width: 899px)", () => {

      // Helper: returns a GSAP "to" config with scroll trigger
      const reveal = (trigger, extra = {}) => ({
        scrollTrigger: { trigger, start: 'top 88%', toggleActions: 'play none none reverse' },
        y: 0, x: 0, scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.85, ease: 'power3.out',
        ...extra
      });

      // ── 1. CLIENTS MARQUEE ────────────────────────────────────────────
      gsap.fromTo('.clients-section',
        { y: 50, opacity: 0 },
        reveal('.clients-section', { duration: 1 })
      );
      gsap.fromTo('.clients-title',
        { y: 20, opacity: 0 },
        reveal('.clients-title', { duration: 0.7 })
      );

      // ── 2. BENTO HEADLINE (desktop bento section) ────────────────────
      gsap.fromTo('.bento-headline > div',
        { y: 50, opacity: 0, filter: 'blur(8px)' },
        reveal('.bento-headline', { stagger: 0.12, duration: 1 })
      );

      // ── 3. INTRO / ABOUT SECTION ──────────────────────────────────────
      gsap.fromTo('.intro-top',
        { y: 40, opacity: 0 },
        reveal('.intro-top')
      );
      gsap.fromTo('.intro-middle-left p',
        { y: 30, opacity: 0 },
        reveal('.intro-middle-left', { duration: 1 })
      );
      gsap.fromTo('.intro-middle-right h3',
        { y: 40, opacity: 0, filter: 'blur(6px)' },
        reveal('.intro-middle-right', { duration: 1.1 })
      );
      gsap.fromTo('.intro-bottom-header',
        { y: 30, opacity: 0 },
        reveal('.intro-bottom-header')
      );
      gsap.fromTo('.intro-col',
        { y: 50, opacity: 0 },
        reveal('.intro-bottom-cols', { stagger: 0.12, duration: 0.9 })
      );

      // ── 4. MOBILE BENTO SECTION (cards after intro) ──────────────────
      gsap.fromTo('.Mobile-bento-section',
        { y: 60, opacity: 0 },
        reveal('.mobile-bento-section', { duration: 1 })
      );
      gsap.fromTo('.mobile-bento-section .mobile-bento-grid .mob-card',
        { y: 60, opacity: 0, scale: 0.95 },
        reveal('.mobile-bento-grid', { stagger: 0.12, duration: 0.9 })
      );
      gsap.fromTo('.mobile-bento-section .mob-stat',
        { scale: 0.85, opacity: 0 },
        reveal('.mob-stats-row', { stagger: 0.1, duration: 0.8 })
      );

      // ── 5. GALLERY SECTION ────────────────────────────────────────────
      gsap.fromTo('.gallery-section .gallery-header',
        { y: 50, opacity: 0, filter: 'blur(6px)' },
        reveal('.gallery-section', { duration: 1.1 })
      );
      gsap.fromTo('.gallery-section .gal-wrapper',
        { x: 60, opacity: 0 },
        reveal('.gallery-grid', { stagger: 0.1, duration: 1, ease: 'power2.out' })
      );

      // ── 6. PRICING SECTION ────────────────────────────────────────────
      gsap.fromTo('.pricing-header',
        { y: 50, opacity: 0, filter: 'blur(6px)' },
        reveal('.pricing-header', { duration: 1 })
      );
      gsap.fromTo('.price-card',
        { y: 70, opacity: 0, scale: 0.93 },
        reveal('.pricing-section', { stagger: 0.15, duration: 1, ease: 'back.out(1.2)' })
      );

      // ── 7. TESTIMONIALS SECTION ───────────────────────────────────────
      gsap.fromTo('.testi-main-title',
        { y: 50, opacity: 0, filter: 'blur(8px)' },
        reveal('.testi-main-title', { duration: 1.1 })
      );
      gsap.fromTo('.testi-subtitle',
        { y: 30, opacity: 0 },
        reveal('.testi-subtitle', { duration: 0.8, delay: 0.15 })
      );
      gsap.fromTo('.testi-cta-btn',
        { scale: 0.85, opacity: 0 },
        reveal('.testi-cta-row', { duration: 0.7, ease: 'back.out(1.4)' })
      );
      // The testimonial card carousel appears as one unit
      gsap.fromTo('.testi-right',
        { y: 40, opacity: 0 },
        reveal('.testi-right', { duration: 1 })
      );

      // ── 8. MOBILE FOOTER ─────────────────────────────────────────────
      gsap.fromTo('.fm-top',
        { y: 30, opacity: 0 },
        reveal('.footer-mobile-exclusive', { duration: 0.9 })
      );
      gsap.fromTo('.fm-nav a',
        { x: -40, opacity: 0 },
        reveal('.fm-nav', { stagger: 0.07, duration: 0.8, ease: 'power2.out' })
      );
      gsap.fromTo('.fm-contact-block',
        { y: 30, opacity: 0 },
        reveal('.fm-contact-block', { duration: 0.9 })
      );
      gsap.fromTo('.fm-thanks-text',
        { scale: 0.8, opacity: 0, filter: 'blur(10px)' },
        reveal('.fm-thanks-wrapper', { duration: 1.2, ease: 'power4.out' })
      );
      gsap.fromTo('.m-bubble',
        { scale: 0, opacity: 0, rotation: -20 },
        reveal('.fm-thanks-wrapper', { stagger: 0.1, duration: 0.6, ease: 'back.out(1.7)', delay: 0.3 })
      );

      // ── 9. FOOTER BAR ─────────────────────────────────────────────────
      gsap.fromTo('.footer-bar',
        { y: 20, opacity: 0 },
        reveal('.footer-bar', { duration: 0.7 })
      );

    });


    return () => mm.revert();
  }, []);

  return (
    <div className="app-container" ref={heroRef}>
      <PageLoader onDone={() => setLoaderDone(true)} />
      {/* Hero Section */}
      <section className="hero-section">
        {/* Background Layer. Expecting you to upload hero-bg.jpg to public/ */}
        <div className="hero-bg-layer">
          {/* Faint LOGAN Text Behind */}
          <h1 className="giant-bg-text">LOGAN</h1>
          <img src="/hero-bg.png" alt="Hero Background" className="hero-bg-img" />
          <div className="hero-overlay"></div>
        </div>

        {/* Foreground Content */}
        <div className="content-wrapper">
          {/* Navigation */}
          <nav className="navbar container">
            <a href="/" className="nav-logo">LOGAN™</a>
            <div className="nav-links">
              <a href="#portfolio" className="nav-link">Portfolio</a>
              <a href="#gallery" className="nav-link">Gallery</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#testimonials" className="nav-link">Testimonials</a>
              <a href="#pricing" className="nav-link">Pricing</a>
              <a href="#contact" className="nav-link">Contact</a>
            </div>
            {/* Mobile Hamburger Button */}
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X color="white" size={32} strokeWidth={1.5} /> : <Menu color="white" size={32} strokeWidth={1.5} />}
            </button>
          </nav>

          {/* Mobile Overlay Menu */}
          <div className={`mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
            <a href="#portfolio" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Portfolio</a>
            <a href="#gallery" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Gallery</a>
            <a href="#about" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#testimonials" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
            <a href="#pricing" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <a href="#contact" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </div>

          {/* Main Hero Area */}
          <main className="hero-main container">

            <div className="services-list">
              <span className="service-item">Portrait photography</span>
              <span className="service-item">Wedding coverage</span>
              <span className="service-item">Brand identity shoots</span>
              <span className="service-item">Editorial content</span>
            </div>

            <div className="hero-bottom-grid">

              <div className="hero-title-container">
                <h2 className="hero-title">
                  <TextAnimate animation="blurInUp" by="word" once useScroll={false} startTrigger={loaderDone}>Premium photography</TextAnimate>
                  <br />
                  <TextAnimate animation="blurInUp" by="word" once useScroll={false} delay={150} startTrigger={loaderDone}>for founders</TextAnimate>
                </h2>
              </div>

              <div className="hero-info-right">
                <p className="hero-description">
                  I partner with brands to capture digital photography that drives emotion and commands attention.
                </p>

                <div className="action-row">
                  <div className="triangle-icon">
                    <Triangle size={36} color="transparent" stroke="white" strokeWidth={1} />
                  </div>
                  <button className="animated-plane-btn hero-version" onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}>
                    <div className="outline"></div>
                    <div className="state state--default">
                      <div className="icon">
                        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g style={{ filter: "url(#shadow)" }}>
                            <path d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63ZM7.63988 7.03001C4.85988 7.96001 3.86988 9.06001 3.86988 9.78001C3.86988 10.5 4.85988 11.6 7.63988 12.52L10.1599 13.36C10.3799 13.43 10.5599 13.61 10.6299 13.83L11.4699 16.35C12.3899 19.13 13.4999 20.12 14.2199 20.12C14.9399 20.12 16.0399 19.13 16.9699 16.35L19.7999 7.86001C20.3099 6.32001 20.2199 5.06001 19.5699 4.41001C18.9199 3.76001 17.6599 3.68001 16.1299 4.19001L7.63988 7.03001Z" fill="currentColor"></path>
                            <path d="M10.11 14.4C9.92005 14.4 9.73005 14.33 9.58005 14.18C9.29005 13.89 9.29005 13.41 9.58005 13.12L13.16 9.53C13.45 9.24 13.93 9.24 14.22 9.53C14.51 9.82 14.51 10.3 14.22 10.59L10.64 14.18C10.5 14.33 10.3 14.4 10.11 14.4Z" fill="currentColor"></path>
                          </g>
                          <defs>
                            <filter id="shadow">
                              <feDropShadow dx="0" dy="1" stdDeviation="0.6" floodOpacity="0.5"></feDropShadow>
                            </filter>
                          </defs>
                        </svg>
                      </div>
                      <p>
                        <span style={{ '--i': 0 }}>S</span>
                        <span style={{ '--i': 1 }}>e</span>
                        <span style={{ '--i': 2 }}>e</span>
                        <span style={{ '--i': 3 }}>&nbsp;</span>
                        <span style={{ '--i': 4 }}>P</span>
                        <span style={{ '--i': 5 }}>r</span>
                        <span style={{ '--i': 6 }}>i</span>
                        <span style={{ '--i': 7 }}>c</span>
                        <span style={{ '--i': 8 }}>i</span>
                        <span style={{ '--i': 9 }}>n</span>
                        <span style={{ '--i': 10 }}>g</span>
                      </p>
                    </div>
                    <div className="state state--sent">
                      <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="1em" width="1em" strokeWidth="0.5px" stroke="black">
                          <g style={{ filter: "url(#shadow)" }}>
                            <path fill="currentColor" d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"></path>
                            <path fill="currentColor" d="M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z"></path>
                          </g>
                        </svg>
                      </div>
                      <p>
                        <span style={{ '--i': 5 }}>L</span>
                        <span style={{ '--i': 6 }}>e</span>
                        <span style={{ '--i': 7 }}>t</span>
                        <span style={{ '--i': 8 }}>s</span>
                        <span style={{ '--i': 9 }}>&nbsp;</span>
                        <span style={{ '--i': 10 }}>G</span>
                        <span style={{ '--i': 11 }}>o</span>
                        <span style={{ '--i': 12 }}>!</span>
                      </p>
                    </div>
                  </button>
                </div>
              </div>

            </div>
          </main>
        </div>
      </section>

      {/* Selected Clients Section - Marquee */}
      <section className="clients-section" style={{ paddingBottom: '3rem', overflow: 'hidden' }}>
        <h4 className="clients-title">Selected clients</h4>

        <div className="clients-wrapper">
          <ScrollVelocityContainer style={{ padding: '1rem 0', gap: '3rem' }}>
            {/* Row 1: Logos (Moving Left) */}
            <ScrollVelocityRow baseVelocity={10} direction={1}>
              {[
                { name: 'NBA', logo: 'https://cdn.worldvectorlogo.com/logos/nba-1.svg' },
                { name: 'ROLEX', logo: 'https://cdn.worldvectorlogo.com/logos/rolex.svg' },
                { name: 'NETFLIX', logo: 'https://cdn.worldvectorlogo.com/logos/netflix-3.svg' },
                { name: 'GUCCI', logo: 'https://cdn.worldvectorlogo.com/logos/gucci.svg' },
                { name: "L'ORÉAL", logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/L%27Or%C3%A9al_logo.svg' },
                { name: 'Google', logo: 'https://cdn.worldvectorlogo.com/logos/google-1-1.svg' },
                { name: 'CHANEL', logo: 'https://cdn.worldvectorlogo.com/logos/chanel-2.svg' },
                { name: 'FERRARI', logo: 'https://cdn.worldvectorlogo.com/logos/ferrari-ges.svg' },
                { name: 'NIKE', logo: 'https://cdn.worldvectorlogo.com/logos/nike-11.svg' },
              ].map((brand, i) => (
                <div key={`row1-${i}`} className="client-logo-item" style={{ margin: '0 3rem' }}>
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="client-logo-img"
                    style={{ opacity: 0.8, filter: 'grayscale(100%)', height: '60px', width: 'auto', objectFit: 'contain' }}
                  />
                </div>
              ))}
            </ScrollVelocityRow>

            {/* Row 2: Names (Moving Right) */}
            <ScrollVelocityRow baseVelocity={10} direction={-1}>
              {[
                { name: 'NBA', color: '#111' },
                { name: 'ROLEX', color: '#111' },
                { name: 'NETFLIX', color: '#E50914' },
                { name: 'GUCCI', color: '#111' },
                { name: "L'ORÉAL", color: '#111' },
                { name: 'Google', color: '#111' },
                { name: 'CHANEL', color: '#111' },
                { name: 'FERRARI', color: '#D40000' },
                { name: 'NIKE', color: '#111' },
              ].map((brand, i) => (
                <div key={`row2-${i}`} className="client-logo-item" style={{ margin: '0 3rem' }}>
                  <h2 className="client-logo" style={{ color: brand.color || 'inherit', margin: 0, fontSize: '3rem' }}>{brand.name}</h2>
                </div>
              ))}
            </ScrollVelocityRow>
          </ScrollVelocityContainer>
        </div>
      </section>

      {/* Portfolio / Bento Section */}
      <section id="portfolio" className="bento-section">
        <div className="container">
          <div className="bento-grid">

            {/* Top Left: Text Area */}
            <div className="bento-text">
              <div className="bento-stamp">
                <svg viewBox="0 0 100 100" className="stamp-svg">
                  <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                  <text>
                    <textPath href="#circlePath" startOffset="0%">
                      crafted photos • premium • crafted photos • premium •
                    </textPath>
                  </text>
                  <circle cx="50" cy="50" r="5" fill="black" />
                </svg>
              </div>
              <div className="bento-headline relative">

                {/* Decorative Highlighting Vectors (Mobile Only) */}
                <svg className="bento-annotation crown" viewBox="0 0 24 24" fill="currentColor">
                  {/* Crown */}
                  <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
                </svg>
                <svg className="bento-annotation paw1" viewBox="0 0 24 24" fill="currentColor">
                  {/* Left Paw */}
                  <path d="M12 2c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm-5.5 1c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5zm11 0c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5zm-5.5 6c-3.1 0-5.6 2.5-5.6 5.6 0 2.8 2 5.2 4.6 5.8.3.1.5.3.6.6v.5c0 .3.2.5.5.5h1c.3 0 .5-.2.5-.5v-.5c.1-.3.3-.5.6-.6 2.6-.6 4.6-3 4.6-5.8 0-3.1-2.5-5.6-5.6-5.6z" />
                </svg>
                <svg className="bento-annotation paw2" viewBox="0 0 24 24" fill="currentColor">
                  {/* Right Paw */}
                  <path d="M12 2c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm-5.5 1c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5zm11 0c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5zm-5.5 6c-3.1 0-5.6 2.5-5.6 5.6 0 2.8 2 5.2 4.6 5.8.3.1.5.3.6.6v.5c0 .3.2.5.5.5h1c.3 0 .5-.2.5-.5v-.5c.1-.3.3-.5.6-.6 2.6-.6 4.6-3 4.6-5.8 0-3.1-2.5-5.6-5.6-5.6z" />
                </svg>

                <div className="line-thin line-right relative" style={{ zIndex: 2 }}>
                  <Highlighter action="underline" color="#FFC107">ELEVATING</Highlighter>
                </div>
                <div className="line-bold flex-line relative" style={{ zIndex: 2 }}>BRANDS <span className="bento-pill-outline">WITH</span></div>
                <div className="line-bold line-center relative" style={{ zIndex: 2 }}>
                  PREMIUM
                </div>
                <div className="line-thin line-right relative" style={{ zIndex: 2 }}>
                  <Highlighter action="underline" color="#FFC107">PHOTOGRAPHY</Highlighter>
                </div>
              </div>
            </div>

            {/* Top Right: Dark Box */}
            <div className="bento-box bento-dark">
              <div className="dark-top">
                <span className="pill-outline white-pill">Portfolio</span>
                <span className="asterisk">*</span>
              </div>
              <p className="dark-bottom">
                Discover a new way of presenting your brand with our premium photography. Achieve your visual goals and stand out with us.
              </p>
            </div>

            {/* Middle Left: Image Box */}
            <div className="bento-box bento-image-box">
              <img src="/hh.png" alt="Camera Lens" className="bento-full-img" />
            </div>

            {/* Middle Center: Purple Offer Box */}
            <div className="bento-box bento-purple">
              <div className="purple-content">
                <span className="offer-badge">LIMITED OFFER</span>
                <h3 className="offer-title">50% OFF</h3>
                <p className="offer-subtitle">On your first booking</p>
                <button className="offer-btn">Claim Offer ↗</button>
              </div>
            </div>

            {/* Bottom Left: Stat 1 */}
            <div className="bento-box bento-stat1">
              <h3><NumberTicker value={150} suffix="+" duration={2.5} startTrigger={loaderDone} /></h3>
              <span>Shoots</span>
            </div>

            {/* Bottom Left: Stat 2 */}
            <div className="bento-box bento-stat2">
              <h3><NumberTicker value={50} suffix="+" duration={2.5} delay={0.2} startTrigger={loaderDone} /></h3>
              <span>Brands</span>
            </div>

            {/* Right: Lime Box */}
            <div className="bento-box bento-lime">
              <div className="lime-tags">
                <span className="pill dark-pill">Portraits</span>
                <span className="pill dark-outline-pill">Commercial</span>
                <span className="pill dark-outline-pill">Editorial</span>
              </div>
              <h2 className="lime-title">Versatile</h2>
              <div className="lime-bottom">
                <p>Our cutting-edge equipment and creative vision adapts to your needs and provides a tailored approach that helps you succeed.</p>
                <div className="arrow-box">
                  <ArrowUpRight size={80} strokeWidth={1} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Editorial Gallery Section */}
      <section id="gallery" className="gallery-section">
        {/* Background decorative web loader pattern */}
        <div className="pattern-bg"></div>
        <div className="container">
          <div className="gallery-header">
            <h2 className="section-title">Selected<br />Works</h2>
            <p className="desktop-desc">This collection is a visual journey across the globe, blending the polished narrative of editorial storytelling with the striking impact of commercial photography. Each frame is a curated intersection of world cultures and intimate human experiences, capturing everything from high-concept professional campaigns to the raw, unfiltered beauty of personal moments. It is more than just a gallery; it is a global tapestry that celebrates the diverse textures of life, documented through a lens that values both artistic precision and authentic connection.</p>
            <p className="mobile-desc">A curated intersection of high-concept campaigns and striking editorial storytelling spanning across the globe.</p>

            {/* Mobile Only Arrows */}
            <div className="testi-mobile-arrows gallery-mobile-arrows">
              <button onClick={() => scrollGallery('left')} aria-label="Scroll left"><ChevronLeft size={24} /></button>
              <button onClick={() => scrollGallery('right')} aria-label="Scroll right"><ChevronRight size={24} /></button>
            </div>
          </div>
          <div className="gallery-grid" ref={galleryScrollRef}>

            <div className="gal-wrapper gal-1">
              <div className="gal-item">
                <img src="/gal-1.png" alt="Gallery 1" />
              </div>
              <div className="gal-caption-under">
                <h4>Summer Collection</h4>
                <span>2026</span>
              </div>
              <p className="gal-desc">
                A vibrant exploration of summer aesthetics featuring bold high-fashion editorials and elegant accessory showcases. This collection highlights the intersection of modern couture with playful seasonal energy, commanding attention in every frame.
              </p>
            </div>

            <div className="gal-wrapper gal-2">
              <div className="gal-item">
                <img src="/gal-2.jfif" alt="Gallery 2" />
              </div>
              <div className="gal-caption-under">
                <h4>Court Vision</h4>
                <span>Editorial</span>
              </div>
              <p className="gal-desc">
                Raw athleticism meets modern menswear in an editorial campaign celebrating the power and intensity of the court. Through stark lighting and dynamic posing, we captured the unapologetic drive that defines modern sportswear.
              </p>
            </div>

            <div className="gal-wrapper gal-3">
              <div className="gal-item">
                <img src="/gal-3.jfif" alt="Gallery 3" />
              </div>
              <div className="gal-caption-under">
                <h4>The Wedding</h4>
                <span>Personal</span>
              </div>
              <p className="gal-desc">
                Intimate and unscripted moments capturing the pure joy, celebration, and timeless romance of your special day. From golden hour portraits to candid dance floor flashes, every shot tells a deeply personal story of love.
              </p>
            </div>

            <div className="gal-wrapper gal-4">
              <div className="gal-item">
                <img src="/gal-4.jfif" alt="Gallery 4" />
              </div>
              <div className="gal-caption-under">
                <h4>The read</h4>
                <span>Campaign</span>
              </div>
              <p className="gal-desc">
                A relaxed, candid campaign celebrating quiet moments, intellectual curiosity, and effortless everyday style. Shot entirely on location in historic libraries, this series leans into rich, earthy tones and a nostalgic, academic aesthetic.
              </p>
            </div>

            <div className="gal-wrapper gal-5">
              <div className="gal-item">
                <img src="/gal-5.png" alt="Gallery 5" />
              </div>
              <div className="gal-caption-under">
                <h4>Old Money</h4>
                <span>Ariyani</span>
              </div>
              <p className="gal-desc">
                Sophisticated styling and grand environments come together to evoke legacy, power, and timeless luxury. A masterclass in cinematic lighting, this shoot emphasizes rich textures, tailored suits, and the unmistakable aura of success.
              </p>
            </div>

            <div className="gal-wrapper gal-6">
              <div className="gal-item">
                <img src="/kk.jfif" alt="Gallery 6" />
              </div>
              <div className="gal-caption-under">
                <h4>Match Point</h4>
                <span>Athletic Editorial</span>
              </div>
              <p className="gal-desc">
                A powerful combination of high-end activewear and raw on-court energy. This editorial captures the intensity, elegance, and precision of the game, blending athletic prowess with modern fashion aesthetics under striking natural light.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Intro Section — Replaces Statement */}
      <section id="about" className="intro-section">
        <div className="container">
          <div className="intro-top">
            <h2 className="intro-title">Intro</h2>
          </div>

          <div className="intro-middle">
            <div className="intro-middle-left">
              <p>Having started in editorial fashion<br />
                and transitioning into commercial<br />
                photography gives me a unique<br />
                perspective and understanding in<br />
                merging raw emotional storytelling<br />
                with striking visual impact.</p>
            </div>
            <div className="intro-middle-right">
              <h3>
                <TextAnimate animation="blurInUp" by="word" once>
                  Visionary photographer with a cinematic background, crafting stunning visual narratives that command attention and elevate brand identity.
                </TextAnimate>
              </h3>
            </div>
          </div>

          <div className="intro-bottom">
            <div className="intro-bottom-header">
              <span>Core Disciplines</span>
            </div>
            <div className="intro-bottom-cols">
              <div className="intro-col">
                <h4>Editorial</h4>
                <p>Editorial shoots serve as the backbone for shaping ambitious narratives and intricate visual concepts. It enables the creation of raw, authentic imagery with high-end styling, seamless conceptual transitions, and captivating storytelling that resonates globally.</p>
              </div>
              <div className="intro-col">
                <h4>Commercial</h4>
                <p>Commercial photography is a powerful tool for driving engagement and creating striking visuals directly for modern brands. We harness advanced cinematic lighting, enabling the development of visually stunning, high-performance campaigns that stand out.</p>
              </div>
              <div className="intro-col">
                <h4>Portraits</h4>
                <p>An intimate approach to personal photography that builds dynamic and authentic images by creating a comfortable environment, capturing the true, unfiltered essence and energy of founders, global icons, and visionaries.</p>
              </div>
              <div className="intro-col">
                <h4>Direction</h4>
                <p>Comprehensive creative direction. We allow clients to seamlessly execute their visual goals, facilitating flawless alignment on set without friction, providing brands with absolute confidence and real-time control over their creative identity.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-Only Bento Cards Section — shown after Intro on mobile, hidden on desktop */}
      <section className="mobile-bento-section">
        <div className="container">
          <div className="mobile-bento-grid">

            {/* Dark Portfolio Box */}
            <div className="bento-box bento-dark mob-card">
              <div className="dark-top">
                <span className="pill-outline white-pill">Portfolio</span>
                <span className="asterisk">*</span>
              </div>
              <p className="dark-bottom">
                Discover a new way of presenting your brand with our premium photography. Achieve your visual goals and stand out with us.
              </p>
            </div>

            {/* Image Box */}
            <div className="bento-box bento-image-box mob-card">
              <img src="/hh.png" alt="Camera Lens" className="bento-full-img" />
            </div>

            {/* Stats Row */}
            <div className="mob-stats-row">
              <div className="bento-box bento-stat1 mob-stat">
                <h3><NumberTicker value={150} suffix="+" duration={2.5} startTrigger={loaderDone} /></h3>
                <span>Shoots</span>
              </div>
              <div className="bento-box bento-stat2 mob-stat">
                <h3><NumberTicker value={50} suffix="+" duration={2.5} delay={0.2} startTrigger={loaderDone} /></h3>
                <span>Brands</span>
              </div>
            </div>

            {/* Offer Box */}
            <div className="bento-box bento-purple mob-card">
              <div className="purple-content">
                <span className="offer-badge">LIMITED OFFER</span>
                <h3 className="offer-title">50% OFF</h3>
                <p className="offer-subtitle">On your first booking</p>
                <a href="https://wa.me/254799711789?text=Hi%20Logan%2C%20I%20want%20to%20claim%20the%2050%25%20OFF%20first%20booking%20offer!" target="_blank" rel="noreferrer" className="offer-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>Claim Offer ↗</a>
              </div>
            </div>

            {/* Lime/Versatile Box */}
            <div className="bento-box bento-lime mob-card">
              <div className="lime-tags">
                <span className="pill dark-pill">Portraits</span>
                <span className="pill dark-outline-pill">Commercial</span>
                <span className="pill dark-outline-pill">Editorial</span>
              </div>
              <h2 className="lime-title">Versatile</h2>
              <div className="lime-bottom">
                <p>Our cutting-edge equipment and creative vision adapts to your needs.</p>
                <div className="arrow-box">
                  <ArrowUpRight size={60} strokeWidth={1} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <div className="container">

          {/* Section Header */}
          <div className="pricing-header">
            <h2 className="pricing-title-light">Plans &amp;</h2>
            <h2 className="pricing-title-bold">Pricing</h2>
          </div>

          {/* Top row: two cards */}
          <div className="pricing-top-row">

            {/* Card 1 — Session (light) */}
            <div className="price-card price-card-light">
              <div className="card-top-row">
                <span className="card-label">Session</span>
                <span className="card-badge badge-red">Flexible Booking</span>
              </div>
              <p className="card-headline">One shoot.<br />Infinite impact.</p>
              <div className="card-price-row">
                <span className="card-currency">$</span>
                <span className="card-amount">500</span>
                <span className="card-period">/session</span>
              </div>
              <a href="https://wa.me/254799711789?text=Hi%20Logan%2C%20I'd%20like%20to%20book%20a%20photography%20session!" target="_blank" rel="noreferrer" className="card-btn btn-dark" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>Book a Session →</a>
              <div className="card-testimonial">
                <div className="testimonial-avatar">TK</div>
                <span className="testimonial-name">Temi K., Founder</span>
                <p className="testimonial-quote">"Logan made our brand look like a million dollars."</p>
              </div>
              <div className="card-features">
                <ul>
                  <li>Full portrait or commercial session</li>
                  <li>2–3 hour on-location shoot</li>
                  <li>20+ hand-edited final images</li>
                  <li>Commercial usage license</li>
                </ul>
                <ul>
                  <li>Same-week delivery</li>
                  <li>Online gallery & downloads</li>
                  <li>Cancel anytime</li>
                  <li>Scales with your needs</li>
                </ul>
              </div>
            </div>

            {/* Card 2 — Retainer (dark) */}
            <div className="price-card price-card-dark">
              <div className="card-top-row">
                <span className="card-label">Retainer</span>
                <span className="card-badge badge-gray">Limited slots</span>
              </div>
              <p className="card-headline">For brands ready to own<br />their visual identity.</p>
              <div className="card-price-row">
                <span className="card-currency">$</span>
                <span className="card-amount">2,500</span>
                <span className="card-period">/mo</span>
              </div>
              <a href="https://wa.me/254799711789?text=Hi%20Logan%2C%20I'm%20interested%20in%20your%20Retainer%20package.%20Can%20we%20book%20a%20call%3F" target="_blank" rel="noreferrer" className="card-btn btn-light" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>Book a Call</a>
              <div className="card-testimonial">
                <div className="testimonial-avatar">AW</div>
                <span className="testimonial-name">Ashley W., CMO</span>
                <p className="testimonial-quote">"Our campaign went viral. Worth every cent."</p>
              </div>
              <div className="card-features">
                <ul>
                  <li>Monthly shoot sessions</li>
                  <li>Creative direction included</li>
                  <li>Branded social content</li>
                  <li>Everything delivered</li>
                </ul>
                <ul>
                  <li>Access to full team</li>
                  <li>Updates every 48hrs</li>
                  <li>Priority booking</li>
                  <li>Cancel anytime</li>
                </ul>
              </div>
            </div>

          </div>

          {/* Bottom wide card — Campaign Sprint */}
          <div className="price-card price-card-sprint">
            <div className="sprint-left">
              <div className="card-top-row">
                <span className="card-label">Campaign</span>
                <span className="card-badge badge-green">2 week delivery</span>
              </div>
              <p className="sprint-headline">
                Great for brands who want <strong>quality&nbsp;+ speed.</strong>
              </p>
            </div>
            <div className="sprint-right">
              <div className="card-price-row">
                <span className="card-currency">$</span>
                <span className="card-amount">4,000</span>
                <span className="card-period">one-time fee</span>
              </div>
              <a href="https://wa.me/254799711789?text=Hi%20Logan%2C%20I'd%20like%20to%20book%20a%20Campaign%20Sprint!" target="_blank" rel="noreferrer" className="card-btn btn-dark" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>Book a Campaign →</a>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <div className="testi-layout">

            {/* Left side text */}
            <div className="testi-left">
              <h2 className="testi-main-title">What people<br />say about<br />Me<span className="dot-red">.</span></h2>
              <p className="testi-subtitle">
                Discover why founders, icons, and global brands trust Logan to elevate their vision. Partner with me for unparalleled cinematic photography.
              </p>
              <div className="testi-cta-row">
                <a href="https://wa.me/254799711789?text=Hi%20Logan%2C%20I'd%20like%20to%20book%20a%20photo%20shoot!" target="_blank" rel="noreferrer" className="testi-cta-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>Book a shoot →</a>
                <AvatarCircles numPeople={72} avatarUrls={avatars} />
              </div>

              {/* Mobile Only Arrows */}
              <div className="testi-mobile-arrows">
                <button onClick={() => scrollTesti('left')} aria-label="Scroll left"><ChevronLeft size={24} /></button>
                <button onClick={() => scrollTesti('right')} aria-label="Scroll right"><ChevronRight size={24} /></button>
              </div>
            </div>

            {/* Right side Masonry Columns */}
            <div className="testi-right" ref={testiScrollRef}>

              {/* Column 1: Scrolls Up */}
              <div className="testi-track testi-track-up">
                <div className="testi-track-inner">
                  {/* Item Set */}
                  <div className="t-card">
                    <div className="t-card-img-wrap"><img src="/t_lydia.jfif" alt="Lydia Ko" /></div>
                    <div className="t-card-content">
                      <p className="t-card-quote">"Logan captures the sheer intensity of the moment like no one else. His work is iconic. It’s like when you’re standing on the 18th tee with a one-shot lead—everything just feels sharp and focused. He really knows how to dial into that energy and make it look effortless."</p>
                      <div className="t-card-author">
                        <strong>Lydia Ko</strong>
                        <span>LPGA Icon</span>
                      </div>
                    </div>
                  </div>
                  <div className="t-card">
                    <div className="t-card-img-wrap"><img src="/t_rolex.jfif" alt="Rolex Global" /></div>
                    <div className="t-card-content">
                      <p className="t-card-quote">"A genuine master of light, timing, and structural precision. Logan Photography consistently delivers absolute perfection every single time, treating each composition with the same meticulous craftsmanship and uncompromising quality we pour into our own timepieces."</p>
                      <div className="t-card-author">
                        <strong>Rolex Global</strong>
                        <span>Luxury Brand</span>
                      </div>
                    </div>
                  </div>
                  <div className="t-card">
                    <div className="t-card-img-wrap"><img src="/ti_china.png" alt="Wei Chen" /></div>
                    <div className="t-card-content">
                      <p className="t-card-quote">"Our Shanghai campaign was breathtaking from start to finish. Logan brought an extraordinary global cinematic vision to our local narrative, seamlessly blending cultural nuance with striking, world-class aesthetic precision that elevated our brand's presence instantly."</p>
                      <div className="t-card-author">
                        <strong>Wei Chen</strong>
                        <span>Tech CEO, China</span>
                      </div>
                    </div>
                  </div>
                  {/* Duplicate Set for Infinite Scroll */}
                  <div className="t-card dup-card">
                    <div className="t-card-img-wrap"><img src="/t_lydia.jfif" alt="Lydia Ko" /></div>
                    <div className="t-card-content">
                      <p className="t-card-quote">"Logan captures the sheer intensity of the moment like no one else. His work is iconic. It’s like when you’re standing on the 18th tee with a one-shot lead—everything just feels sharp and focused. He really knows how to dial into that energy and make it look effortless."</p>
                      <div className="t-card-author">
                        <strong>Lydia Ko</strong>
                        <span>LPGA Icon</span>
                      </div>
                    </div>
                  </div>
                  <div className="t-card dup-card">
                    <div className="t-card-img-wrap"><img src="/t_rolex.jfif" alt="Rolex Global" /></div>
                    <div className="t-card-content">
                      <p className="t-card-quote">"A genuine master of light, timing, and structural precision. Logan Photography consistently delivers absolute perfection every single time, treating each composition with the same meticulous craftsmanship and uncompromising quality we pour into our own timepieces."</p>
                      <div className="t-card-author">
                        <strong>Rolex Global</strong>
                        <span>Luxury Brand</span>
                      </div>
                    </div>
                  </div>
                  <div className="t-card dup-card">
                    <div className="t-card-img-wrap"><img src="/ti_china.png" alt="Wei Chen" /></div>
                    <div className="t-card-content">
                      <p className="t-card-quote">"Our Shanghai campaign was breathtaking from start to finish. Logan brought an extraordinary global cinematic vision to our local narrative, seamlessly blending cultural nuance with striking, world-class aesthetic precision that elevated our brand's presence instantly."</p>
                      <div className="t-card-author">
                        <strong>Wei Chen</strong>
                        <span>Tech CEO, China</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2: Scrolls Down */}
              <div className="testi-track testi-track-down">
                <div className="testi-track-inner">
                  {/* Item Set */}
                  <div className="t-card">
                    <div className="t-card-img-wrap"><img src="/t_vogue.jpg" alt="Vogue Magazine" /></div>
                    <div className="t-card-content">
                      <p className="t-card-quote">"Logan is unmistakably a true visionary in the photography landscape. His cinematic editorial spreads continually redefine modern luxury, capturing profound emotional depth and raw beauty in every single frame he composes for our pages."</p>
                      <div className="t-card-author">
                        <strong>Vogue Magazine</strong>
                        <span>Editorial</span>
                      </div>
                    </div>
                  </div>
                  <div className="t-card">
                    <div className="t-card-img-wrap"><img src="/ti_brady.jfif" alt="Tom Brady" /></div>
                    <div className="t-card-content">
                      <p className="t-card-quote">"The focus, the relentless drive, the precision of the final shot—Logan operates entirely at a championship level. His ability to anticipate the perfect moment and freeze that raw competitive energy into a legendary image is completely unmatched."</p>
                      <div className="t-card-author">
                        <strong>Tom Brady</strong>
                        <span>NFL Legend</span>
                      </div>
                    </div>
                  </div>
                  <div className="t-card">
                    <div className="t-card-img-wrap"><img src="/l.jfif" alt="L'Oréal Paris" /></div>
                    <div className="t-card-content">
                      <p className="t-card-quote">"Exquisite attention to detail at every stage of the production. Logan brought our Parisian beauty campaign to life beautifully, mastering lighting and composition to capture the authentic, radiant essence of our subjects with unparalleled elegance."</p>
                      <div className="t-card-author">
                        <strong>L'Oréal</strong>
                        <span>Paris</span>
                      </div>
                    </div>
                  </div>
                  {/* Duplicate Set for Infinite Scroll */}
                  <div className="t-card dup-card">
                    <div className="t-card-img-wrap"><img src="/t_vogue.jpg" alt="Vogue Magazine" /></div>
                    <div className="t-card-content">
                      <p className="t-card-quote">"Logan is unmistakably a true visionary in the photography landscape. His cinematic editorial spreads continually redefine modern luxury, capturing profound emotional depth and raw beauty in every single frame he composes for our pages."</p>
                      <div className="t-card-author">
                        <strong>Vogue Magazine</strong>
                        <span>Editorial</span>
                      </div>
                    </div>
                  </div>
                  <div className="t-card dup-card">
                    <div className="t-card-img-wrap"><img src="/ti_brady.jfif" alt="Tom Brady" /></div>
                    <div className="t-card-content">
                      <p className="t-card-quote">"The focus, the relentless drive, the precision of the final shot—Logan operates entirely at a championship level. His ability to anticipate the perfect moment and freeze that raw competitive energy into a legendary image is completely unmatched."</p>
                      <div className="t-card-author">
                        <strong>Tom Brady</strong>
                        <span>NFL Legend</span>
                      </div>
                    </div>
                  </div>
                  <div className="t-card dup-card">
                    <div className="t-card-img-wrap"><img src="/l.jfif" alt="L'Oréal Paris" /></div>
                    <div className="t-card-content">
                      <p className="t-card-quote">"Exquisite attention to detail at every stage of the production. Logan brought our Parisian beauty campaign to life beautifully, mastering lighting and composition to capture the authentic, radiant essence of our subjects with unparalleled elegance."</p>
                      <div className="t-card-author">
                        <strong>L'Oréal</strong>
                        <span>Paris</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 3: Scrolls Up */}
              <div className="testi-track testi-track-up-fast">
                <div className="testi-track-inner">
                  {/* Item Set */}
                  <div className="t-card">
                    <div className="t-card-img-wrap"><img src="/Nike.jfif" alt="Nike Creative" /></div>
                    <div className="t-card-content">
                      <p className="t-card-quote">"Dynamic, raw, and undeniably powerful. Logan perfectly captured the unyielding spirit and drive of our top athletes, delivering high-octane visual storytelling that resonates deeply with our audience and sets a new benchmark for sports editorial."</p>
                      <div className="t-card-author">
                        <strong>Nike Creative</strong>
                        <span>Activewear</span>
                      </div>
                    </div>
                  </div>
                  <div className="t-card">
                    <div className="t-card-img-wrap"><img src="/t_tatum.jpg" alt="Jayson Tatum" /></div>
                    <div className="t-card-content">
                      <p className="t-card-quote">"Working with Logan on set is completely effortless. He knows exactly how to capture your best angles and true personality, making you look absolutely legendary whether you're dominating on the court or styling off the clock."</p>
                      <div className="t-card-author">
                        <strong>Jayson Tatum</strong>
                        <span>NBA Star</span>
                      </div>
                    </div>
                  </div>
                  <div className="t-card">
                    <div className="t-card-img-wrap"><img src="/av.jfif" alt="Aarav Patel" /></div>
                    <div className="t-card-content">
                      <p className="t-card-quote">"From initial architectural concept to the final frame, Logan's luxury shoots across Mumbai were beyond world-class. He has an intuitive eye for translating opulent environments and refined details into striking, sophisticated digital masterpieces."</p>
                      <div className="t-card-author">
                        <strong>Aarav Patel</strong>
                        <span>Founder, India</span>
                      </div>
                    </div>
                  </div>
                  {/* Duplicate Set for Infinite Scroll */}
                  <div className="t-card dup-card">
                    <div className="t-card-img-wrap"><img src="/Nike.jfif" alt="Nike Creative" /></div>
                    <div className="t-card-content">
                      <p className="t-card-quote">"Dynamic, raw, and undeniably powerful. Logan perfectly captured the unyielding spirit and drive of our top athletes, delivering high-octane visual storytelling that resonates deeply with our audience and sets a new benchmark for sports editorial."</p>
                      <div className="t-card-author">
                        <strong>Nike Creative</strong>
                        <span>Activewear</span>
                      </div>
                    </div>
                  </div>
                  <div className="t-card dup-card">
                    <div className="t-card-img-wrap"><img src="/t_tatum.jpg" alt="Jayson Tatum" /></div>
                    <div className="t-card-content">
                      <p className="t-card-quote">"Working with Logan on set is completely effortless. He knows exactly how to capture your best angles and true personality, making you look absolutely legendary whether you're dominating on the court or styling off the clock."</p>
                      <div className="t-card-author">
                        <strong>Jayson Tatum</strong>
                        <span>NBA Star</span>
                      </div>
                    </div>
                  </div>
                  <div className="t-card dup-card">
                    <div className="t-card-img-wrap"><img src="/av.jfif" alt="Aarav Patel" /></div>
                    <div className="t-card-content">
                      <p className="t-card-quote">"From initial architectural concept to the final frame, Logan's luxury shoots across Mumbai were beyond world-class. He has an intuitive eye for translating opulent environments and refined details into striking, sophisticated digital masterpieces."</p>
                      <div className="t-card-author">
                        <strong>Aarav Patel</strong>
                        <span>Founder, India</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FOOTER OUTER WRAPPER */}
      <section id="contact" className="footer-outer-wrapper">
        <footer className="footer-inner">
          {/* Top Top Hump Tab */}
          <div className="footer-tab">
            <svg viewBox="0 0 300 40" preserveAspectRatio="none">
              <path d="M 0 40 C 40 40, 40 0, 80 0 L 220 0 C 260 0, 260 40, 300 40 Z" />
            </svg>
          </div>

          {/* Top info area */}
          <div className="footer-top container">
            <div className="footer-cta">
              <h2 className="footer-headline">Have a Vision?<br />Let's Create It<span className="dot-red">.</span></h2>
              <button className="animated-plane-btn footer-version" onClick={() => window.open("https://wa.me/254799711789?text=Hi%20Logan%2C%20I%20have%20a%20vision%20I'd%20like%20to%20discuss!", "_blank")}>
                <div className="outline"></div>
                <div className="state state--default">
                  <div className="icon">
                    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g style={{ filter: "url(#shadow)" }}>
                        <path d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63ZM7.63988 7.03001C4.85988 7.96001 3.86988 9.06001 3.86988 9.78001C3.86988 10.5 4.85988 11.6 7.63988 12.52L10.1599 13.36C10.3799 13.43 10.5599 13.61 10.6299 13.83L11.4699 16.35C12.3899 19.13 13.4999 20.12 14.2199 20.12C14.9399 20.12 16.0399 19.13 16.9699 16.35L19.7999 7.86001C20.3099 6.32001 20.2199 5.06001 19.5699 4.41001C18.9199 3.76001 17.6599 3.68001 16.1299 4.19001L7.63988 7.03001Z" fill="currentColor"></path>
                        <path d="M10.11 14.4C9.92005 14.4 9.73005 14.33 9.58005 14.18C9.29005 13.89 9.29005 13.41 9.58005 13.12L13.16 9.53C13.45 9.24 13.93 9.24 14.22 9.53C14.51 9.82 14.51 10.3 14.22 10.59L10.64 14.18C10.5 14.33 10.3 14.4 10.11 14.4Z" fill="currentColor"></path>
                      </g>
                      <defs>
                        <filter id="shadow">
                          <feDropShadow dx="0" dy="1" stdDeviation="0.6" floodOpacity="0.5"></feDropShadow>
                        </filter>
                      </defs>
                    </svg>
                  </div>
                  <p>
                    <span style={{ '--i': 0 }}>G</span>
                    <span style={{ '--i': 1 }}>e</span>
                    <span style={{ '--i': 2 }}>t</span>
                    <span style={{ '--i': 3 }}>&nbsp;</span>
                    <span style={{ '--i': 4 }}>I</span>
                    <span style={{ '--i': 5 }}>n</span>
                    <span style={{ '--i': 6 }}>&nbsp;</span>
                    <span style={{ '--i': 7 }}>T</span>
                    <span style={{ '--i': 8 }}>o</span>
                    <span style={{ '--i': 9 }}>u</span>
                    <span style={{ '--i': 10 }}>c</span>
                    <span style={{ '--i': 11 }}>h</span>
                  </p>
                </div>
                <div className="state state--sent">
                  <div className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="1em" width="1em" strokeWidth="0.5px" stroke="black">
                      <g style={{ filter: "url(#shadow)" }}>
                        <path fill="currentColor" d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"></path>
                        <path fill="currentColor" d="M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z"></path>
                      </g>
                    </svg>
                  </div>
                  <p>
                    <span style={{ '--i': 5 }}>S</span>
                    <span style={{ '--i': 6 }}>e</span>
                    <span style={{ '--i': 7 }}>n</span>
                    <span style={{ '--i': 8 }}>t</span>
                  </p>
                </div>
              </button>
            </div>
            <div className="footer-info-grid">
              <div className="footer-col">
                <h4>Location</h4>
                <p>Nairobi, Kenya<br />Available Globally</p>
              </div>
              <div className="footer-col">
                <h4>Contact</h4>
                <p><a href="https://wa.me/254799711789" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>+254 799 711 789</a><br />hello@logan.photo</p>
              </div>
              <div className="footer-col">
                <h4>Social</h4>
                <p>
                  <span className="footer-link">● Instagram</span><br />
                  <span className="footer-link">● YouTube</span>
                </p>
              </div>
              <div className="footer-col">
                <h4>Connect</h4>
                <p>
                  <span className="footer-link">Instagram</span>&nbsp;·&nbsp;
                  <span className="footer-link">Twitter/X</span>&nbsp;·&nbsp;
                  <span className="footer-link">LinkedIn</span>
                </p>
                <div className="footer-availability" style={{ marginTop: '20px' }}>
                  <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '5px' }}>Based in Nairobi.</p>
                  <a href="mailto:hello@logan.photo" style={{ fontSize: '1.1rem', fontWeight: 500, letterSpacing: '-0.02em' }}>hello@logan.photo</a>
                </div>
              </div>
            </div>
          </div>

          {/* THANKS giant text with translation bubbles */}
          <div className="footer-thanks">
            <div className="thanks-bubble bubble-1">Salamat!</div>
            <div className="thanks-bubble bubble-2">Danke!</div>
            <div className="thanks-bubble bubble-3">Arigato!</div>
            <div className="thanks-bubble bubble-4">Gracias!</div>
            <div className="thanks-bubble bubble-5">Merci!</div>
            <h1 className="thanks-text">Thanks</h1>
          </div>
        </footer>

        {/* --- MOBILE EXCLUSIVE FOOTER (Matches Reference Image) --- */}
        <div className="footer-mobile-exclusive">
          <div className="fm-top">
            <span className="fm-explore">EXPLORE</span>
            <span className="fm-logo">LOGAN™</span>
          </div>
          <nav className="fm-nav">
            <a href="#hero">Home</a>
            <a href="#gallery">Work</a>
            <a href="#pricing">Pricing</a>
            <a href="https://wa.me/254799711789?text=Hi%20Logan%2C%20I'd%20like%20to%20get%20in%20touch!" target="_blank" rel="noreferrer">Contact</a>
          </nav>

          <div className="fm-divider"></div>

          <div className="fm-contact-block">
            <p className="fm-availability">Available for global commissions.</p>
            <a href="mailto:hello@logan.photo" className="fm-email">hello@logan.photo</a>
            <div className="fm-socials">
              <a href="#">IG</a>
              <a href="#">X</a>
              <a href="#">IN</a>
              <a href="#">BE</a>
            </div>
          </div>

          <div className="fm-thanks-wrapper">
            <div className="m-bubble m-bubble-1">Salamat!</div>
            <div className="m-bubble m-bubble-2">Danke!</div>
            <div className="m-bubble m-bubble-3">Arigato!</div>
            <div className="m-bubble m-bubble-4">Gracias!</div>
            <h1 className="fm-thanks-text">Thanks</h1>
          </div>
        </div>

        {/* Bottom bar moved to Outer Wrapper for dark contrast */}
        <div className="footer-bar">
          <span>©Logan Photography 2025</span>
          <span>Made with Love — Nairobi</span>
          <span>Created by Logan™</span>
        </div>
      </section>



    </div>
  );
}

export default App;
