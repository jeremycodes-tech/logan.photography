import React, { useEffect, useRef, useState } from "react";

export function NumberTicker({
  value,
  duration = 2,
  delay = 0,
  className = "",
  suffix = "",
  startTrigger = true
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!startTrigger) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startTrigger]);

  useEffect(() => {
    if (!inView) return;

    let startTime = null;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      // easeOutExpo for a nice snappy start and slow finish
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCurrentValue(Math.floor(ease * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [inView, value, duration, delay]);

  return (
    <span className={className} ref={ref}>
      {currentValue}{suffix}
    </span>
  );
}
