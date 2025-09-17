"use client";

import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, type Tone } from "@/data/projects";
import {
  BoltIcon,
  CpuChipIcon,
  BeakerIcon,
  CommandLineIcon,
  RocketLaunchIcon,
  SparklesIcon,
  PuzzlePieceIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import { use as usePromise, useMemo, type ElementType } from "react";

/* Tone → inline style helpers */
function toneStyle(tone: Tone) {
  switch (tone) {
    case "white":
      return {
        bg: "var(--card-white)",
        text: "#0a0a0b",
        border: "rgba(10,10,11,.12)",
      };
    case "dark":
      return {
        bg: "var(--card-dark)",
        text: "white",
        border: "rgba(255,255,255,.10)",
      };
    case "lime":
      return {
        bg: "var(--card-lime)",
        text: "#0a0a0b",
        border: "rgba(10,10,11,.12)",
      };
    case "lavender":
      return {
        bg: "var(--card-lavender)",
        text: "#0a0a0b",
        border: "rgba(10,10,11,.12)",
      };
    case "pastelBlue":
      return {
        bg: "var(--card-pastel-blue)",
        text: "#0a0a0b",
        border: "rgba(10,10,11,.12)",
      };
    case "phthalo":
      return {
        bg: "var(--card-phthalo)",
        text: "white",
        border: "rgba(255,255,255,.10)",
      };
    case "pastelRed":
      return {
        bg: "var(--card-pastel-red)",
        text: "#0a0a0b",
        border: "rgba(255,105,97,.12)",
      };
    default:
      return {
        bg: "var(--card-dark)",
        text: "white",
        border: "rgba(255,255,255,.10)",
      };
  }
}

/* Reusable fade-up preset (sequential delays) */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14, filter: "blur(3px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.5, ease: "easeOut", delay },
});

/* Icon pool to randomize from */
const ICON_POOL: ElementType[] = [
  BoltIcon,
  CpuChipIcon,
  BeakerIcon,
  CommandLineIcon,
  RocketLaunchIcon,
  SparklesIcon,
  PuzzlePieceIcon,
  LightBulbIcon,
];

/* Fixed triangle positions (top-right quadrant, comfortably inside the pill) */
const TRI_POS = [
  { top: "10%", right: "7%" },
  { top: "26%", right: "15%" },
  { top: "38%", right: "9%" },
];

type PageProps = { params: Promise<{ slug: string }> };

export default function ProjectPage({ params }: PageProps) {
  // Next.js 15: unwrap params promise in client component
  const { slug } = usePromise(params);

  // Hooks first (no conditional usage)
  const proj = useMemo(() => projects.find((p) => p.slug === slug), [slug]);

  // Pick 3 random icons (stable for this page render), with randomized sizes + jiggle durations
  const triangleIcons = useMemo(() => {
    const pool = [...ICON_POOL];
    const sample = (n: number) =>
      Array.from(
        { length: n },
        () => pool.splice(Math.floor(Math.random() * pool.length), 1)[0]
      );

    const picked = sample(3) as ElementType[];

    const rnd = (min: number, max: number) =>
      Math.round(min + Math.random() * (max - min));

    return picked.map((Icon, i) => ({
      Icon,
      pos: TRI_POS[i],
      size: rnd(28, 96), // px
      duration: 3 + Math.random() * 1.5, // seconds
    }));
  }, []);

  if (!proj) {
    notFound();
    return null;
  }

  const tone = toneStyle(proj.tone);
  const iconColor = tone.text; // no opacity/blur modifiers; use solid tone text color

  return (
    <main className="w-full">
      <section className="w-full px-6 md:px-8 lg:px-12 mt-10 md:mt-16">
        <div className="grid gap-6 md:gap-8 md:[grid-template-columns:1fr_1fr] items-start">
          {/* Title pill — title bottom-left, icons in a fixed triangle top-right */}
          <motion.div
            {...fadeUp(0)}
            whileHover={{ scale: 1.015 }}
            className="relative md:[grid-column:span_2] rounded-[var(--radius)] pill-shadow border p-8 md:p-12 h-[50vh] flex items-end justify-start text-left overflow-hidden"
            style={{
              background: tone.bg,
              color: tone.text,
              borderColor: tone.border,
            }}
          >
            {/* Triangle of quirky icons */}
            <div className="pointer-events-none absolute inset-0">
              {triangleIcons.map(({ Icon, pos, size, duration }, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{ top: pos.top, right: pos.right, color: iconColor }}
                  // Smooth perpetual jiggle (subtle)
                  animate={{
                    x: [0, 5.5, -1.5, 0],
                    y: [0, -1.5, 5.5, 0],
                    rotate: [-2, 2, -2],
                  }}
                  transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Icon style={{ width: size, height: size }} />
                </motion.div>
              ))}
            </div>

            {/* Bottom-left title */}
            <h1 className="relative z-10 text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05]">
              {proj.title}
            </h1>
          </motion.div>

          {/* Details pill (dark) */}
          <motion.div
            {...fadeUp(0.12)}
            whileHover={{ scale: 1.015 }}
            className="relative rounded-[var(--radius)] bg-[#121215] border border-white/10 p-6 md:p-8"
          >
            {/* Icon moved slightly inward */}
            <BoltIcon className="pointer-events-none absolute right-4 top-4 size-8 text-white/15" />
            <h2 className="text-white/90 text-xl md:text-2xl font-semibold">
              Project details
            </h2>

            <p className="mt-3 text-white/80 text-sm md:text-base">
              {proj.details.overview}
            </p>

            <ul className="mt-4 grid gap-2.5 text-white/80 text-sm md:text-base">
              {proj.details.highlights.map((h) => (
                <li key={h}>• {h}</li>
              ))}
            </ul>

            {proj.details.results && (
              <>
                <h3 className="mt-5 text-white/90 font-semibold">
                  Results &amp; impact
                </h3>
                <ul className="mt-2 grid gap-2.5 text-white/80 text-sm md:text-base">
                  {proj.details.results.map((r) => (
                    <li key={r}>• {r}</li>
                  ))}
                </ul>
              </>
            )}

            <div className="mt-6 space-x-4">
              {proj.details.links?.github && (
                <Link
                  href={proj.details.links.github}
                  target="_blank"
                  className="underline/50 hover:underline text-white/80"
                >
                  GitHub
                </Link>
              )}
              {proj.details.links?.demo && (
                <Link
                  href={proj.details.links.demo}
                  target="_blank"
                  className="underline/50 hover:underline text-white/80"
                >
                  Live demo
                </Link>
              )}
            </div>
          </motion.div>

          {/* Tech stack pill (white) */}
          <motion.div
            {...fadeUp(0.24)}
            whileHover={{ scale: 1.015 }}
            className="relative rounded-[var(--radius)] bg-[var(--card-white)] border border-[rgba(10,10,11,.12)] p-6 md:p-8 text-[#0a0a0b]"
          >
            <CpuChipIcon className="pointer-events-none absolute right-4 top-4 size-8 text-black/15" />
            <h3 className="text-lg md:text-xl font-semibold">Tech stack</h3>

            <div className="mt-3 flex flex-wrap gap-2">
              {proj.stack.map((t) => (
                <span
                  key={t}
                  className="text-xs md:text-sm px-2.5 py-1 rounded-full border border-black/10 bg-white/80"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-6">
              {/* Go back to the projects section */}
              <Link
                href="/#projects"
                className="text-black/70 hover:text-black"
              >
                ← Back to projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
