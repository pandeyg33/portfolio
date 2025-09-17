// src/components/RandomFavicon.tsx
"use client";

import { useEffect } from "react";
import { pickBrandVariant, type Variant } from "@/lib/brandVariant";

function cssVar(name: string, fallback: string) {
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return v || fallback;
}

function buildSVG(variant: Variant): string {
  const BLUE = cssVar("--pill-blue", "#2f2fff");
  const INK = cssVar("--pill-ink", "#141414");
  const BANANA = cssVar("--pill-banana", "#ffd84d");
  const WHITE = cssVar("--card-white", "#f7f7fb");

  const map: Record<Variant, { bg: string; fg: string }> = {
    blue: { bg: BLUE, fg: WHITE }, // blue tile, white text
    ink: { bg: INK, fg: WHITE }, // black tile, white text
    banana: { bg: BANANA, fg: INK }, // yellow tile, black text
    white: { bg: WHITE, fg: BLUE }, // white tile, blue text
  };
  const { bg, fg } = map[variant];

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
  <rect width="256" height="256" rx="36" fill="${bg}"/>
  <text x="22" y="204"
    font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
    font-weight="900" font-size="168" letter-spacing="-6"
    fill="${fg}" dominant-baseline="alphabetic">.ap</text>
</svg>`;
}

function replaceAllIcons(dataUrl: string) {
  document
    .querySelectorAll<HTMLLinkElement>(
      'link[rel="icon"], link[rel="shortcut icon"], link[rel*="icon"], link[rel="apple-touch-icon"], link[rel="mask-icon"]'
    )
    .forEach((el) => el.parentNode?.removeChild(el));

  const add = (rel: string, type?: string) => {
    const l = document.createElement("link");
    l.rel = rel;
    if (type) l.type = type;
    l.href = dataUrl + `#${Date.now()}`; // cache-buster
    document.head.appendChild(l);
  };

  add("icon", "image/svg+xml");
  add("shortcut icon", "image/svg+xml");
  add("apple-touch-icon");
}

export default function RandomFavicon() {
  useEffect(() => {
    const run = () => {
      const variant = pickBrandVariant(); // same pick for the page
      const svg = buildSVG(variant);
      const url = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
      replaceAllIcons(url);
    };

    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      setTimeout(run, 0);
    } else {
      const onReady = () => {
        document.removeEventListener("DOMContentLoaded", onReady);
        setTimeout(run, 0);
      };
      document.addEventListener("DOMContentLoaded", onReady);
    }
  }, []);

  return null;
}
