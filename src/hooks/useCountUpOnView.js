import { useEffect, useRef, useState } from "react";

function easeOutCubic(t){ return 1 - Math.pow(1 - t, 3); }

export function useCountUpOnView({ end = 100, start = 0, duration = 1200, once = true }) {
  const ref = useRef(null);
  const [value, setValue] = useState(start);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rafId = null, startTime = null;

    const animate = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min(1, (ts - startTime) / duration);
      const eased = reduced ? 1 : easeOutCubic(p);
      const next = Math.floor(start + (end - start) * eased);
      setValue(next);
      if (p < 1) rafId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (once && startedRef.current) return;
          startedRef.current = true;
          cancelAnimationFrame(rafId);
          startTime = null;
          rafId = requestAnimationFrame(animate);
        }
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0.2 }
    );

    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(rafId); };
  }, [start, end, duration, once]);

  return { ref, value };
}
