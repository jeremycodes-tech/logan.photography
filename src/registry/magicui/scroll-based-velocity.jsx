import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollVelocityContainer({ className, children, style }) {
  return (
    <div 
      className={className} 
      style={{ 
        position: 'relative', 
        display: 'flex', 
        width: '100%', 
        flexDirection: 'column', 
        overflow: 'hidden',
        ...style 
      }}
    >
      {children}
    </div>
  );
}

export function ScrollVelocityRow({ children, baseVelocity = 20, direction = 1, className, style }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    
    // Setup for continuous horizontal scroll
    let speed = baseVelocity;
    let dir = direction > 0 ? -1 : 1;
    
    const xPercentTarget = dir === -1 ? -50 : 0;
    const xPercentStart = dir === -1 ? 0 : -50;

    let tween = gsap.fromTo(track, 
      { xPercent: xPercentStart },
      { 
        xPercent: xPercentTarget, 
        duration: 1000 / speed, 
        ease: "none", 
        repeat: -1 
      }
    );

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const boost = Math.abs(velocity / 300);
          const timeScale = 1 + boost;
          
          gsap.to(tween, { timeScale: timeScale, duration: 0.1, overwrite: true });
          gsap.delayedCall(0.1, () => {
             gsap.to(tween, { timeScale: 1, duration: 0.5 });
          });
        }
      });
    });

    return () => {
      tween.kill();
      ctx.revert();
    };
  }, [baseVelocity, direction]);

  return (
    <div 
      className={className} 
      style={{ 
        display: 'flex', 
        flexWrap: 'nowrap', 
        whiteSpace: 'nowrap', 
        overflow: 'visible',
        ...style
      }}
    >
      <div 
        ref={trackRef} 
        style={{ 
          display: 'flex', 
          flexWrap: 'nowrap', 
          alignItems: 'center', 
          width: 'max-content',
          willChange: 'transform' 
        }}
      >
        {/* Set 1 */}
        <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', flexShrink: 0 }}>
          {children}
          {children}
          {children}
          {children}
        </div>
        {/* Set 2 (Identical to Set 1) */}
        <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', flexShrink: 0 }}>
          {children}
          {children}
          {children}
          {children}
        </div>
      </div>
    </div>
  );
}
