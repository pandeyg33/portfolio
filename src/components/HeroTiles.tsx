"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  SparklesIcon,
  BeakerIcon,
  CubeIcon,
  LinkIcon,
  CpuChipIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

/* ---------- Speed controls (seconds per cycle) ---------- */
const SPEED = {
  blue: 60, // big left tile
  projects: 42, // Projects pill
  skills: 48, // Skills pill
  contact: 45, // Where to reach me pill
};

/* ---------- Helpers ---------- */

type TileProps = {
  variant: "blue" | "white" | "ink" | "banana";
  label?: string;
  href?: string;
  children?: React.ReactNode;
  align?: "start" | "center" | "end";
  className?: string;
  replace?: boolean;
  /** When true, the label softly blurs on hover (used for projects/skills/contact) */
  blurLabelOnHover?: boolean;
};

const variants: Record<TileProps["variant"], string> = {
  blue: "bg-[var(--pill-blue)] text-white",
  white: "bg-white text-black",
  ink: "bg-[var(--pill-ink)] text-white",
  banana: "bg-[var(--pill-banana)] text-black",
};

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Marquee confined to the pill; speed in seconds */
function Marquee({ text, speed = 60 }: { text: string; speed?: number }) {
  return (
    <div className="relative w-full h-[3.5rem] sm:h-[4rem] md:h-[5rem] overflow-hidden">
      <motion.div
        className="absolute inset-y-0 left-0 flex items-center whitespace-nowrap gap-12 pr-12 will-change-transform opacity-90"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-none"
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ---------- Tile ---------- */

function Tile({
  variant,
  label,
  href,
  children,
  align = "start",
  className = "",
  replace = false,
  blurLabelOnHover = false,
}: TileProps) {
  const card = (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ scale: 1.01 }}
      className={`group relative h-full flex flex-col overflow-hidden rounded-[var(--radius)]
        ${variants[variant]} border border-white/5 pill-shadow ${className}`}
    >
      {/* Top-right icon */}
      <div className="relative z-10 flex items-center justify-end px-5 md:px-6 pt-4">
        <span
          className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${
            variant === "white" || variant === "banana"
              ? "bg-black/5 text-black"
              : "bg-white/15 text-white"
          }`}
          aria-hidden
        >
          {variant === "blue" ? <MoonIcon /> : <ArrowIcon />}
        </span>
      </div>

      {/* Body */}
      <div
        className={`relative z-10 flex-1 px-5 md:px-6 pb-12 pt-2 flex ${
          align === "center"
            ? "items-center"
            : align === "end"
            ? "items-end"
            : "items-start"
        }`}
      >
        <div className="w-full">{children}</div>
      </div>

      {/* Bottom-left caption — bigger + bold */}
      {label && (
        <div
          className={`relative z-10 left-5 md:left-6 bottom-4 font-semibold text-base md:text-lg lg:text-3xl tracking-wide opacity-90
            transition duration-200 ${
              blurLabelOnHover ? "filter group-hover:blur-sm" : ""
            }`}
        >
          {label}
        </div>
      )}

      {/* Blue pill decorations (behind content) */}
      {variant === "blue" && (
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute -right-10 top-1/3 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
          <div className="absolute -left-10 bottom-5 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
          <div className="absolute right-20 bottom-6 h-10 w-10 rotate-12 rounded-md bg-white/20" />
          <div className="absolute left-12 top-1/4 h-0 w-0 border-l-[18px] border-l-transparent border-t-[28px] border-t-white/25 border-r-[18px] border-r-transparent opacity-70" />
        </div>
      )}
    </motion.div>
  );

  return href ? (
    <Link
      href={href}
      replace={replace}
      className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
    >
      {card}
    </Link>
  ) : (
    card
  );
}

/* Top-right cell split into two pills: Projects (white) + Skills (ink) */
function SplitProjectsSkills() {
  return (
    <div className="grid h-full gap-6 md:gap-8 [grid-template-columns:repeat(2,minmax(0,1fr))]">
      {/* Projects (white) with hover marquee + label blur */}
      <Tile
        variant="white"
        label="Projects"
        href="#projects"
        replace={true}
        align="center"
        className="h-full"
        blurLabelOnHover
      >
        {/* Default state (icons + small caption) */}
        <div className="h-full flex flex-col items-center justify-center gap-4 transition-opacity duration-300 group-hover:opacity-0">
          <div className="flex items-center gap-4 opacity-90">
            <SparklesIcon className="size-12" />
            <BeakerIcon className="size-12" />
            <CubeIcon className="size-12" />
            <LinkIcon className="size-12" />
          </div>
        </div>

        {/* Hover state (marquee) */}
        <div className="pointer-events-none absolute inset-0 flex items-center opacity-0 transition-opacity duration-700 group-hover:opacity-100">
          <Marquee text={`See what I've built`} speed={SPEED.projects} />
        </div>
      </Tile>

      {/* Skills (ink) with hover marquee + label blur */}
      <Tile
        variant="ink"
        label="Skills"
        href="#skills"
        replace={true}
        align="center"
        className="h-full"
        blurLabelOnHover
      >
        {/* Default state */}
        <div className="h-full flex flex-col items-center justify-center gap-4 transition-opacity duration-300 group-hover:opacity-0">
          <div className="flex items-center gap-4 opacity-90">
            <CpuChipIcon className="size-12" />
            <WrenchScrewdriverIcon className="size-12" />
            <ChartBarIcon className="size-12" />
          </div>
        </div>

        {/* Hover state (marquee) */}
        <div className="pointer-events-none absolute inset-0 flex items-center opacity-0 transition-opacity duration-700 group-hover:opacity-100">
          <Marquee text={"AI • Full-stack • Data •"} speed={SPEED.skills} />
        </div>
      </Tile>
    </div>
  );
}

/* ---------- Main grid ---------- */

export default function HeroTiles() {
  const bannerText =
    "MS in Information Science: Machine Learning | Former Senior Software Engineer | Analytics Enthusiasts |";

  return (
    <div
      className="
        grid w-full gap-6 md:gap-8
        grid-cols-1
        md:[grid-template-columns:1.6fr_1fr]
        md:[grid-template-rows:repeat(2,minmax(260px,1fr))]
        md:[grid-auto-rows:minmax(260px,1fr)]
        min-h-[49vh]
      "
    >
      {/* Left: BLUE spans both rows */}
      <div className="md:row-span-2 h-full">
        <Tile
          variant="blue"
          label="Work experience"
          href="#experience"
          replace={true}
          align="center"
          className="h-full"
        >
          {/* Always-visible banner inside blue tile */}
          <Marquee text={bannerText} speed={SPEED.blue} />
        </Tile>
      </div>

      {/* Top-right: split Projects + Skills */}
      <div className="h-full">
        <SplitProjectsSkills />
      </div>

      {/* Bottom-right: banana yellow -> Where to reach me (with hover marquee + label blur) */}
      <div className="h-full">
        <Tile
          variant="banana"
          label="Where to reach me"
          href="#contact"
          replace={true}
          align="center"
          className="h-full"
          blurLabelOnHover
        >
          {/* Default state */}
          <div className="h-full w-full flex items-center justify-center gap-4 opacity-90 transition-opacity duration-300 group-hover:opacity-0">
            <EnvelopeIcon className="size-12" />
            <ChatBubbleLeftRightIcon className="size-12" />
            <PaperAirplaneIcon className="size-12" />
          </div>

          {/* Hover state (marquee) */}
          <div className="pointer-events-none absolute inset-0 flex items-center opacity-0 transition-opacity duration-700 group-hover:opacity-100">
            <Marquee
              text={"Email • Github • Linkedin • Instagram •"}
              speed={SPEED.contact}
            />
          </div>
        </Tile>
      </div>
    </div>
  );
}
