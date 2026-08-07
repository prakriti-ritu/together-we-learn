"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated number that counts up when scrolled into view (motion-primitives
 * "sliding number" style). Pure requestAnimationFrame — no library.
 * Honors prefers-reduced-motion (renders the final value immediately).
 */
export default function CountUp({
  to,
  decimals = 0,
  suffix = "",
  className = "",
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Start at the real final value (not 0) so SSR/no-JS output shows the actual
  // number instead of a literal "0" that contradicts the stat elsewhere on the
  // page. The count-up-from-0 effect is applied client-side, after hydration,
  // once the element scrolls into view.
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.disconnect();
          setValue(0);
          const duration = 1500;
          let start: number | null = null;
          const step = (ts: number) => {
            if (start === null) start = ts;
            const t = Math.min((ts - start) / duration, 1);
            setValue(to * (1 - Math.pow(1 - t, 3)));
            if (t < 1) requestAnimationFrame(step);
            else setValue(to);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref} className={className}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
