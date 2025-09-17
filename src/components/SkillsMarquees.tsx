// src/components/SkillsMarquees.tsx
"use client";

import type { CSSProperties } from "react";
import { memo } from "react";

const SKILLS: readonly string[] = [
  "Python",
  "Java",
  "JavaScript",
  "TypeScript",
  "React",
  "Angular",
  "Node.js",
  "Spring Boot",
  "REST APIs",
  "Microservices",
  "Caching",
  "PyTorch",
  "timm",
  "EfficientNetV2",
  "GANs (ProGAN, StyleGAN)",
  "RAG",
  "Semantic Search",
  "sentence-transformers",
  "Cosine Similarity",
  "Ollama",
  "Gemma",
  "Qwen",
  "Whisper STT",
  "HeyGen Avatars",
  "Pandas",
  "DuckDB",
  "Parquet (ETL)",
  "Altair",
  "Ag-Grid",
  "Analytics Dashboards",
  "Streamlit",
  "Chrome Extension (MV3)",
  "MongoDB",
  "SQL / NoSQL",
  "Docker",
  "Pharmacovigilance (PRR/ROR)",
] as const;

/** Use theme-bound CSS variables (defined in global.css) */
const COLORS = {
  straw: "var(--marquee-straw)",
  vanilla: "var(--marquee-vanilla)",
  melon: "var(--marquee-melon)",
} as const;

// CSS custom props we animate
type CSSVars = CSSProperties & {
  ["--start"]?: string;
  ["--speed"]?: string;
};

type RowProps = {
  direction: "left" | "right";
  start?: string;
  speed?: string;
  color: string; // will be a CSS var (e.g., "var(--marquee-straw)")
};

function Row({ direction, start = "0%", speed = "26s", color }: RowProps) {
  const style: CSSVars = { "--start": start, "--speed": speed };

  return (
    <div className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen overflow-hidden py-4">
      <div
        className={`marquee-track ${
          direction === "right" ? "marquee-right" : "marquee-left"
        }`}
        style={style}
      >
        {/* duplicate to create seamless loop */}
        {[0, 1].map((copy) => (
          <div className="flex items-center whitespace-nowrap pr-12" key={copy}>
            {SKILLS.map((s) => (
              <span key={`${copy}-${s}`} className="mx-6">
                <span style={{ color }} className="font-semibold">
                  {s}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsMarquees() {
  return (
    <section id="skills" className="w-full mt-16 sm:mt-20 md:mt-24">
      <div className="w-full px-6 md:px-8 lg:px-12">
        <div className="select-none">
          {/* 1 → LTR with Straw */}
          <Row direction="left" start="0%" speed="70s" color={COLORS.straw} />
          {/* 2 → RTL with Vanilla */}
          <Row
            direction="right"
            start="-22%"
            speed="95s"
            color={COLORS.vanilla}
          />
          {/* 3 → LTR with Melon */}
          <Row direction="left" start="-44%" speed="83s" color={COLORS.melon} />
        </div>
      </div>
    </section>
  );
}

export default memo(SkillsMarquees);
