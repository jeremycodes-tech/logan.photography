import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function TextAnimate({ 
  children, 
  animation = "blurIn", 
  as: Component = "span", 
  className,
  delay = 0,
  startTrigger = true,
  ...props 
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll('.animate-word');
    if (!words.length) return;
    
    // Kill any existing ScrollTriggers tied to this element's animation
    const ctx = gsap.context(() => {
      if (!startTrigger) {
        gsap.set(words, { opacity: 0 });
        return;
      }
      
      if (animation === 'blurIn' || animation === 'blurInUp') {
        const startY = animation === 'blurInUp' ? 30 : 15;
        
        const animProps = {
            delay: delay / 1000,
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: props.by === 'character' ? 0.02 : 0.1,
            ease: 'power3.out',
            clearProps: 'filter,transform' // cleanup after animation
        };

        if (props.useScroll !== false) {
          animProps.scrollTrigger = {
            trigger: el,
            start: 'top 85%',
            toggleActions: props.once ? 'play none none none' : 'play none none reverse'
          };
        }

        gsap.fromTo(words, 
          { filter: 'blur(10px)', opacity: 0, y: startY },
          animProps
        );
      }
    });

    return () => ctx.revert();
  }, [animation, children, props.once, props.by, startTrigger, delay]);

  // Handle word splitting
  let content = children;
  
  if (typeof children === 'string') {
    if (props.by === 'character') {
      content = children.split('').map((char, i) => (
        <span key={i} className="animate-word" style={{ display: 'inline-block', willChange: 'filter, transform, opacity', whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
          {char}
        </span>
      ));
    } else {
      // Split on whitespace but preserve it
      const parts = children.split(/(\s+)/);
      content = parts.map((part, i) => {
        if (part.trim() === '') {
          return <span key={i} style={{ whiteSpace: 'pre' }}>{part}</span>;
        }
        return <span key={i} className="animate-word" style={{ display: 'inline-block', willChange: 'filter, transform, opacity' }}>{part}</span>;
      });
    }
  } else {
    // If it's a React node (e.g. <em>&amp;</em>), wrap it as a single animate-word
    content = <span className="animate-word" style={{ display: 'inline-block', willChange: 'filter, transform, opacity' }}>{children}</span>;
  }

  return (
    <Component ref={containerRef} className={className} style={{ display: 'inline', opacity: startTrigger ? 1 : 0 }} {...props}>
      {content}
    </Component>
  );
}
