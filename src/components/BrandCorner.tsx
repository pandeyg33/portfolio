// src/components/BrandCorner.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { pickBrandVariant, type Variant } from "@/lib/brandVariant";

/** Safe CSS var read (SSR-friendly) */
function cssVar(name: string, fallback: string) {
  if (typeof window === "undefined" || !document?.documentElement)
    return fallback;
  const v = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return v || fallback;
}

export default function BrandCorner() {
  const [variant, setVariant] = useState<Variant>("blue"); // stable initial render
  useEffect(() => setVariant(pickBrandVariant()), []);

  const style = useMemo(() => {
    const BLUE = cssVar("--pill-blue", "#2f2fff");
    const INK = cssVar("--pill-ink", "#141414");
    const BANANA = cssVar("--pill-banana", "#ffd84d");
    const WHITE = cssVar("--card-white", "#f7f7fb");

    // white text for ink/blue, blue text for white, black text for banana
    const map: Record<Variant, { bg: string; fg: string; border: string }> = {
      blue: { bg: BLUE, fg: WHITE, border: "rgba(255,255,255,.10)" },
      ink: { bg: INK, fg: WHITE, border: "rgba(255,255,255,.10)" },
      banana: { bg: BANANA, fg: INK, border: "rgba(0,0,0,.14)" },
      white: { bg: WHITE, fg: BLUE, border: "rgba(0,0,0,.12)" },
    };
    return map[variant];
  }, [variant]);

  return (
    <Link
      href="/#header"
      aria-label="Home"
      className="
        left-4 top-4 z-50 select-none
        block               /* ensure it has box dimensions */
        h-12 w-12 md:h-12 md:w-12
        rounded-2xl
        border shadow-lg theme-fade
        transition-transform hover:scale-[1.03] active:scale-[0.99]
        relative
      "
      style={{
        background: style.bg,
        color: style.fg,
        borderColor: style.border,
      }}
    >
      {/* bottom-right aligned mark */}
      <span
        className="
          absolute right-2 bottom-1.5
          md:right-2.5 md:bottom-1.5
          text-sm md:text-base font-extrabold tracking-tight leading-none
        "
      >
        .ap
      </span>
    </Link>
  );
}
