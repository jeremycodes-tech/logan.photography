import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Highlighter({ children, action = 'highlight', color = '#FF9800', className = '' }) {
  const pathRef = useRef(null);

  useEffect(() => {
    if (!pathRef.current) return;

    const length = pathRef.current.getTotalLength();

    // Reset initial state to hidden
    gsap.set(pathRef.current, {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 0
    });

    let mm = gsap.matchMedia();
    
    // Only animate on mobile as requested
    mm.add("(max-width: 900px)", () => {
      // Reveal path before animating
      gsap.set(pathRef.current, { opacity: 1 });
      
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: pathRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    return () => mm.revert();
  }, [action]);

  const isHighlight = action === 'highlight';
  
  return (
    <span className={`relative inline-block ${className}`} style={{ position: 'relative', display: 'inline-block', whiteSpace: 'nowrap' }}>
      {children}
      {isHighlight ? (
        <svg 
          style={{ position: 'absolute', top: '10%', left: '-2%', width: '104%', height: '80%', zIndex: -1, overflow: 'visible' }} 
          preserveAspectRatio="none" 
          viewBox="0 0 100 100"
        >
          <path
            ref={pathRef}
            d="M 1,55 Q 30,45 50,50 T 99,48"
            stroke={color}
            strokeWidth="80"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      ) : (
        <svg 
          style={{ position: 'absolute', bottom: '-5%', left: '-2%', width: '104%', height: '30%', zIndex: -1, overflow: 'visible' }} 
          preserveAspectRatio="none" 
          viewBox="0 0 100 20"
        >
          <path
            ref={pathRef}
            d="M 1,10 Q 30,5 50,15 T 99,10"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      )}
    </span>
  );
}
