"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { projects, type Tone } from "@/data/projects";
import { ArrowDownIcon } from "@heroicons/react/24/outline";

/* ----------------- Marquee speeds (seconds) ----------------- */
const MARQUEE = {
  desktop: "60s",
  mobile: "70s",
} as const;

/* Allow CSS vars safely */
type CSSVars = React.CSSProperties & {
  ["--speed"]?: string;
  ["--start"]?: string;
};

/* ----------------- Color helper ----------------- */
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

/* Reusable marquee using your global CSS (.marquee-track + .marquee-left) */
function PillMarquee({
  text,
  speed,
  sizeClass = "text-[32px]",
}: {
  text: string;
  speed: string;
  sizeClass?: string;
}) {
  const style: CSSVars = { "--speed": speed };
  return (
    <div className="w-full overflow-hidden marquee-mask">
      <div className="marquee-track marquee-left" style={style}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center whitespace-nowrap pr-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={`${copy}-${i}`}
                className={`${sizeClass} font-semibold leading-none mr-10`}
              >
                {text} &nbsp;&nbsp;|&nbsp;
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProjectsGallery() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Keep back navigation at #projects (not top)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) =>
        entry.isIntersecting && history.replaceState(null, "", "#projects"),
      { threshold: 0.4, rootMargin: "0px 0px -40% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const isOddCount = projects.length % 2 === 1;
  const oddLastIdx = isOddCount ? projects.length - 1 : -1;

  return (
    <section
      id="projects"
      className="w-full scroll-mt-24 mt-16 sm:mt-20 md:mt-24"
      ref={sectionRef}
    >
      <div className="w-full px-6 md:px-8 lg:px-12">
        {/* Header slab (with hover) */}
        <motion.div
          whileHover={{ scale: 1.015 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className="relative rounded-[var(--radius)] bg-[#0f0f12] border pill-shadow p-6 sm:p-8 md:p-10 mb-10 md:mb-12"
          style={{ borderColor: "rgba(34,211,238,.25)" }}
        >
          <div
            className="text-xs md:text-sm font-semibold tracking-[0.12em] uppercase"
            style={{ color: "var(--accent-cyan)" }}
          >
            What I’ve built
          </div>
          <h2
            className="mt-3 text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.08]"
            style={{ color: "var(--accent-cyan)" }}
          >
            Practical projects that blend{" "}
            <em className="not-italic opacity-90">ML</em> with{" "}
            <em className="not-italic opacity-90">solid engineering</em>.
          </h2>

          {/* rotating "PROJECTS" ring */}
          <div className="pointer-events-none absolute -right-6 md:-right-8 -bottom-10 md:-bottom-12">
            <div className="relative h-[110px] w-[110px] md:h-[140px] md:w-[140px]">
              <motion.svg
                viewBox="0 0 120 120"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                style={{ color: "var(--accent-cyan)" }}
              >
                <defs>
                  <path
                    id="projPath"
                    d="M60,60 m-48,0 a48,48 0 1,1 96,0 a48,48 0 1,1 -96,0"
                  />
                </defs>
                <text fill="currentColor">
                  <textPath
                    href="#projPath"
                    startOffset="0"
                    className="text-[10px] md:text-[12px] tracking-[0.25em] font-semibold"
                  >
                    PROJECTS • PROJECTS • PROJECTS •
                  </textPath>
                </text>
              </motion.svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <ArrowDownIcon
                  className="size-6 md:size-7"
                  style={{ color: "var(--accent-cyan)" }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid 2×N, aligned rows, hover enlarge */}
        <div className="mt-0 grid gap-8 md:grid-cols-2 md:gap-y-12">
          {projects.map((p, i) => {
            const sty = toneStyle(p.tone);
            const isLastOdd = i === oddLastIdx;
            const decoColor =
              sty.text === "white"
                ? "rgba(255,255,255,0.18)"
                : "rgba(0,0,0,0.22)";

            return (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.03 }}
                viewport={{ amount: 0.35, once: false }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={[
                  "group relative overflow-hidden transform-gpu will-change-transform",
                  "rounded-[var(--project-radius,var(--radius))] pill-shadow border",
                  "min-h-[50vh] p-6 md:p-8",
                  isLastOdd ? "md:col-span-2 md:w-1/2 md:mx-auto" : "",
                ].join(" ")}
                style={{
                  background: sty.bg,
                  color: sty.text,
                  borderColor: sty.border,
                }}
              >
                {/* make whole card clickable */}
                <Link
                  href={`/projects/${p.slug}`}
                  className="absolute inset-0 z-40"
                  aria-label={`Open ${p.title}`}
                >
                  <span className="sr-only">{p.title}</span>
                </Link>

                {/* decorative blurred icons */}
                <div className="pointer-events-none absolute inset-0 z-0">
                  <p.icon
                    className="absolute"
                    style={{
                      top: "10%",
                      left: "7%",
                      width: 44,
                      height: 44,
                      color: decoColor,
                      filter: "blur(1.5px)",
                    }}
                  />
                  <p.icon
                    className="absolute"
                    style={{
                      top: "38%",
                      right: "10%",
                      width: 88,
                      height: 88,
                      color: decoColor,
                      filter: "blur(2.5px)",
                    }}
                  />
                  <p.icon
                    className="absolute"
                    style={{
                      bottom: "12%",
                      left: "18%",
                      width: 32,
                      height: 32,
                      color: decoColor,
                      filter: "blur(1px)",
                    }}
                  />
                </div>

                {/* Desktop layer */}
                <div className="relative z-10 hidden md:block h-full w-full">
                  {/* Title centered; fades on hover */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-center text-3xl md:text-4xl font-extrabold tracking-tight transition-opacity duration-300 group-hover:opacity-0">
                      {p.title}
                    </h3>
                  </div>

                  {/* Hover marquee overlay */}
                  <div className="pointer-events-none absolute inset-0 z-10 flex items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <PillMarquee text={p.blurb} speed={MARQUEE.desktop} />
                  </div>

                  {/* Corner hint */}
                  <div className="absolute bottom-5 left-6 text-sm opacity-70 select-none">
                    View details →
                  </div>
                </div>

                {/* Mobile layer (center title + marquee) */}
                <div className="relative z-10 md:hidden h-full">
                  {/* Center the stack vertically & horizontally */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-3">
                    <h3 className="text-3xl font-extrabold tracking-tight">
                      {p.title}
                    </h3>

                    {/* Marquee directly under the title */}
                    <div className="mt-3 w-full flex items-center justify-center">
                      <PillMarquee
                        text={p.blurb}
                        speed={MARQUEE.mobile}
                        sizeClass="text-2xl"
                      />
                    </div>
                  </div>

                  {/* Bottom-left hint */}
                  <div className="pointer-events-none absolute bottom-5 left-6 text-sm opacity-70 select-none">
                    View details →
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
