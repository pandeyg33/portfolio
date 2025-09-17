// src/lib/brandVariant.ts
"use client";

export type Variant = "blue" | "ink" | "banana" | "white";

declare global {
  interface Window {
    __brandVariant?: Variant;
  }
}

export function pickBrandVariant(): Variant {
  if (typeof window === "undefined") return "blue";
  if (window.__brandVariant) return window.__brandVariant;

  const pool: Variant[] = ["blue", "ink", "banana", "white"];
  const picked = pool[Math.floor(Math.random() * pool.length)];

  window.__brandVariant = picked;
  document.documentElement.dataset.brandVariant = picked; // optional hook for CSS/testing
  return picked;
}
