import { useEffect, useRef, useState } from "react";

// easing suave e natural
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export function useTweenOnView({
  duration = 1600,
  once = true,
  ease = easeOutCubic,
}) {
  const ref = useRef(null);
  const [t, setT] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let raf = null,
      t0 = null;

    const animate = (ts) => {
      if (!t0) t0 = ts;
      const p =
        duration === 0 || reduced ? 1 : Math.min(1, (ts - t0) / duration);
      setT(ease(p));
      if (p < 1) raf = requestAnimationFrame(animate);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (once && startedRef.current) return;
        startedRef.current = true;
        cancelAnimationFrame(raf);
        t0 = null;
        raf = requestAnimationFrame(animate);
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0.2 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [duration, once, ease]);

  return { ref, t };
}
