"use client";

import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const PAGE_COLOR = { dark: "#000000", light: "#ffffff" } as const;
type ThemeName = "dark" | "light";

type Ripple = {
  id: number;
  phase: "cover" | "reveal";
  color: string;
  cx: string;
  cy: string;
};

const COVER_DURATION = 0.65;
const REVEAL_DURATION = 0;
const BETWEEN_DELAY_MS = 500;

/** tiny solid-circle icon (no emoji) */
function Dot({ color }: { color: "black" | "white" }) {
  return (
    <span
      aria-hidden
      className="block h-3.5 w-3.5 rounded-full"
      style={{ background: color === "black" ? "#000" : "#fff" }}
    />
  );
}

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  // hydration-safe
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Pretend "dark" until mounted to keep SSR/CSR markup stable
  const current: ThemeName = useMemo<ThemeName>(() => {
    if (!mounted) return "dark";
    return (resolvedTheme ?? theme) === "light" ? "light" : "dark";
  }, [mounted, resolvedTheme, theme]);

  const next: ThemeName = current === "dark" ? "light" : "dark";

  // black dot means "switch to dark", white dot means "switch to light"
  const targetDot =
    next === "dark" ? <Dot color="black" /> : <Dot color="white" />;

  const [ripples, setRipples] = useState<Ripple[]>([]);
  const seq = useRef(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
    };
  }, []);

  function onClick() {
    // top-right corner like a peel
    const cx = "100%";
    const cy = "0%";
    const color = PAGE_COLOR[next];

    const idA = ++seq.current;
    setRipples((rs) => [...rs, { id: idA, phase: "cover", color, cx, cy }]);

    const t1 = window.setTimeout(() => {
      setTheme(next);

      const idB = ++seq.current;
      setRipples((rs) => [...rs, { id: idB, phase: "reveal", color, cx, cy }]);

      const t2 = window.setTimeout(() => {
        setRipples((rs) => rs.filter((r) => r.id !== idA && r.id !== idB));
      }, REVEAL_DURATION * 1000 + 60);

      timers.current.push(t2);
    }, BETWEEN_DELAY_MS);

    timers.current.push(t1);
  }

  const revealInitial: Record<string, string | number> = {
    opacity: 1,
    "--r": "0px",
  };
  const revealAnimate: Record<string, string | number> = {
    opacity: 0,
    "--r": "150vmax",
  };

  return (
    <>
      <button
        type="button"
        aria-label={mounted ? `Switch to ${next} theme` : "Switch theme"}
        onClick={onClick}
        className="
          fixed top-4 right-4 z-50 rounded-full border border-soft
          px-3 py-2 bg-[var(--card-dark)] theme-fade
          hover:bg-white/10
        "
      >
        {/* neutral placeholder before mount to avoid hydration mismatch */}
        <span suppressHydrationWarning>
          {mounted ? targetDot : <Dot color="white" />}
        </span>
      </button>

      <AnimatePresence>
        {ripples.map((rp) =>
          rp.phase === "cover" ? (
            <motion.div
              key={rp.id}
              className="pointer-events-none fixed inset-0 z-40"
              style={{ background: rp.color }}
              initial={{
                clipPath: `circle(0px at ${rp.cx} ${rp.cy})`,
                opacity: 1,
              }}
              animate={{
                clipPath: `circle(150vmax at ${rp.cx} ${rp.cy})`,
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: COVER_DURATION, ease: "linear" }}
            />
          ) : (
            <motion.div
              key={rp.id}
              className="pointer-events-none fixed inset-0 z-40"
              style={
                {
                  background: rp.color,
                  "--cx": rp.cx,
                  "--cy": rp.cy,
                  "--r": "0px",
                  clipPath: `circle(var(--r) at var(--cx) var(--cy))`,
                } as React.CSSProperties
              }
              initial={revealInitial}
              animate={revealAnimate}
              transition={{ duration: REVEAL_DURATION, ease: "linear" }}
            />
          )
        )}
      </AnimatePresence>
    </>
  );
}
