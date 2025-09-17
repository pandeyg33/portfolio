"use client";

import { motion } from "framer-motion";
import type { ElementType } from "react";
import {
  ChartBarIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";

/** One row in the timeline */
type Role = {
  tag: string; // "01.", "02.", ...
  company: string; // "Virtuous Transactional Analytics"
  role: string; // "Senior Software Engineer (Full-Stack)"
  dates: string; // "Oct 2021 – May 2023"
  title: string; // left-card title
  bullets: string[]; // left-card details
  Icon: ElementType; // icon for the left-card heading
};

const ROLES: Role[] = [
  {
    tag: "03.",
    company: "Virtuous Transactional Analytics",
    role: "Senior Software Engineer (Full-Stack)",
    dates: "Oct 2021 – May 2023",
    title: "Led data-driven pharma platforms",
    bullets: [
      "Led a 6-member team building compliance & adverse-event apps; increased discrepancy-resolution throughput by ~90%.",
      "Cut mission-critical API latency by ~71% via log-driven optimization & caching; shipped a caching layer that reduced load times by ~95% for real-time analytics.",
      "Built a live analytics dashboard for microservices—monitoring, visualization, and anomaly signals to drive proactive fixes.",
      "Mentored juniors/interns; earned the OrionStars award for shipping high-impact features under tight deadlines.",
    ],
    Icon: ChartBarIcon,
  },
  {
    tag: "02.",
    company: "Virtuous Transactional Analytics",
    role: "Software Engineer (Full-Stack)",
    dates: "Mar 2020 – Sep 2021",
    title: "Modernized & scaled core services",
    bullets: [
      "Migrated legacy apps to cloud-ready frameworks for scalable storage & retrieval used by analytics workflows.",
      "Created plug-and-play modules that accelerated client integration and shortened delivery times.",
      "Hardened microservices with real-time production monitoring and targeted optimizations.",
      "Trained interns on Spring Boot—productive within one week.",
    ],
    Icon: WrenchScrewdriverIcon,
  },
  {
    tag: "01.",
    company: "Philips Healthcare",
    role: "Software Developer I",
    dates: "Jun 2018 – Feb 2020",
    title: "Healthcare data & interoperability",
    bullets: [
      "Built a custom client solution across 3 org teams; received the Take Ownership to Win and Deliver award.",
      "Integrated disparate healthcare systems into a centralized platform—better data quality & analytics-readiness.",
      "Contributed to Hospital-to-Home telehealth apps enabling remote monitoring and real-time support.",
      "Top-4 in a 3-month Java stack bootcamp; strong fundamentals and fast ramp-up.",
    ],
    Icon: BoltIcon,
  },
];

/** Shared hover props for all pills */
const hoverProps = {
  whileHover: { scale: 1.02, y: -2 },
  whileTap: { scale: 0.995 },
};

function Row({ r }: { r: Role }) {
  return (
    <div className="grid gap-6 md:gap-8 md:[grid-template-columns:1.1fr_1fr]">
      {/* RIGHT: role pill FIRST on mobile, SECOND on desktop */}
      <motion.div
        initial={{ x: -60, opacity: 0.6 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ amount: 0.5, once: false }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        {...hoverProps}
        className="
          order-1 md:order-2
          transform-gpu will-change-transform
          relative rounded-[var(--radius)]
          bg-[var(--pill-blue)] text-white
          border border-white/10 pill-shadow
          p-6 md:p-8 flex items-center justify-center
          min-h-[160px] md:min-h-[200px] lg:min-h-[220px]
        "
      >
        <div className="text-center">
          <div className="text-sm md:text-base uppercase tracking-widest opacity-95">
            {r.company}
          </div>
          <div className="mt-2 text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
            {r.role}
          </div>
          <div className="mt-1 text-sm md:text-base opacity-95">{r.dates}</div>
        </div>
      </motion.div>

      {/* LEFT: details SECOND on mobile, FIRST on desktop */}
      <motion.div
        initial={{ x: 60, opacity: 0.6 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ amount: 0.5, once: false }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        {...hoverProps}
        className="
          order-2 md:order-1
          transform-gpu will-change-transform
          rounded-[var(--radius)] bg-[#121215]
          border border-white/10 pill-shadow
          p-5 sm:p-6 md:p-8
        "
      >
        <div className="text-xs md:text-sm uppercase tracking-[0.14em] text-white/55">
          {r.tag} Experience
        </div>
        <div className="mt-2 flex items-start gap-3">
          <r.Icon className="size-6 shrink-0 text-white/70" />
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white/95">
            {r.title}
          </h3>
        </div>
        <ul className="mt-4 grid gap-2.5 text-sm md:text-base text-white/80">
          {r.bullets.map((b) => (
            <li key={b} className="leading-relaxed">
              • {b}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default function ExperienceSequence() {
  return (
    // add a little more top space on small screens
    <section id="experience" className="w-full mt-12 sm:mt-16 md:mt-20">
      <div className="w-full px-6 md:px-8 lg:px-12">
        {/* Header slab — CYAN accent (hoverable) */}
        <motion.div
          className="
            relative rounded-[var(--radius)] bg-[#0f0f12]
            border pill-shadow p-6 sm:p-8 md:p-10 mb-10 sm:mb-18 md:mb-0 
          "
          style={{ borderColor: "rgba(34,211,238,.25)" }}
          {...hoverProps}
        >
          <div
            className="text-xs md:text-sm font-semibold tracking-[0.12em] uppercase"
            style={{ color: "var(--accent-cyan)" }}
          >
            Where I’ve worked
          </div>
          <h2
            className="mt-3 text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.08]"
            style={{ color: "var(--accent-cyan)" }}
          >
            Real-world impact across{" "}
            <em className="not-italic opacity-90">healthcare</em> and{" "}
            <em className="not-italic opacity-90">pharma analytics</em>.
          </h2>

          {/* bottom-right circular EXPERIENCE ring — cyan */}
          <div className="pointer-events-none absolute -right-6 md:-right-8 -bottom-10 md:-bottom-12 ring-scale">
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
                    id="expPath"
                    d="M60,60 m-48,0 a48,48 0 1,1 96,0 a48,48 0 1,1 -96,0"
                  />
                </defs>

                {/* We tile the text in three chunks around the circle */}
                <g fill="currentColor" className="font-semibold">
                  <text
                    style={{ fontSize: "14px" }}
                    className="md:[font-size:12px]"
                  >
                    <textPath href="#expPath" startOffset="0%">
                      EXPERIENCE •
                    </textPath>
                  </text>
                  <text
                    style={{ fontSize: "14px" }}
                    className="md:[font-size:12px]"
                  >
                    <textPath href="#expPath" startOffset="33.33%">
                      EXPERIENCE •
                    </textPath>
                  </text>
                  <text
                    style={{ fontSize: "14px" }}
                    className="md:[font-size:12px]"
                  >
                    <textPath href="#expPath" startOffset="66.66%">
                      EXPERIENCE •
                    </textPath>
                  </text>
                </g>
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

        {/* Rows */}
        <div className="mt-8 md:mt-14 grid gap-6 md:gap-8">
          {ROLES.map((r) => (
            <Row key={`${r.company}-${r.role}-${r.dates}`} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
