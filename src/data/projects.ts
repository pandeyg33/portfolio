import type { ElementType } from "react";
import {
  CommandLineIcon,
  CpuChipIcon,
  ChatBubbleLeftRightIcon,
  BeakerIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

export type Tone =
  | "lavender"
  | "pastelBlue"
  | "phthalo"
  | "lime"
  | "pastelRed"
  | "white"
  | "dark";

export type Project = {
  slug: string;
  title: string;
  blurb: string; // one line used for hover marquee
  tone: Tone; // single-color theme
  icon: ElementType;
  stack: string[];
  details: {
    overview: string;
    highlights: string[];
    results?: string[];
    links?: { github?: string; demo?: string };
  };
};

export const projects: Project[] = [
  {
    slug: "skipscout",
    title: "SkipScout",
    blurb:
      "Chrome extension that extracts YouTube transcripts and runs local LLM summarization & Q&A via Ollama—privacy-first and fast.",
    tone: "lavender",
    icon: CommandLineIcon,
    stack: ["Chrome MV3", "TypeScript", "Ollama", "LLM", "Vite"],
    details: {
      overview:
        "Manifest V3 extension that fetches/scrapes transcripts, summarizes, and answers questions using locally hosted LLMs (Gemma/Qwen) through Ollama—no data leaves your machine.",
      highlights: [
        "Content scripts + service worker + declarativeNetRequest",
        "Robust transcript extraction (DOM or timedtext API)",
        "Summarization & Q&A pipelines with caching and prompts",
        "Responsive panel UI with FAB & tooltips",
      ],
      results: ["~2–3s local response", "Privacy-first, low latency"],
      links: { github: "https://github.com/your/skipscout" },
    },
  },
  {
    slug: "gan-detector",
    title: "GAN/CNN Image Detector",
    blurb:
      "EfficientNetV2 + GAN discriminators to classify AI-generated vs real images; tuned for accuracy, cost, and latency.",
    tone: "pastelBlue",
    icon: CpuChipIcon,
    stack: ["PyTorch", "timm", "Python"],
    details: {
      overview:
        "Trained multiple architectures (EfficientNetV2, StyleGAN/ProGAN discriminators) on a 10k+ image dataset to detect synthetic imagery.",
      highlights: [
        "Transfer learning, dropout, heavy augmentation",
        "Evaluation with ROC/AUC, PR curves and confusion matrices",
      ],
      results: ["97% acc · 0.973 F1 · 0.997 AUC (EffNetV2)"],
      links: { github: "https://github.com/your/gan-detector" },
    },
  },
  {
    slug: "interviewmate",
    title: "InterviewMate",
    blurb:
      "AI-powered interview automation with Whisper STT, HeyGen avatars, and cosine-similarity scoring for explainable feedback.",
    tone: "phthalo",
    icon: RocketLaunchIcon,
    stack: ["React", "Node", "MongoDB", "Whisper", "HeyGen"],
    details: {
      overview:
        "End-to-end interview system with real-time transcription, avatar-led prompts, and transparent response scoring.",
      highlights: [
        "React frontend + Node backend (REST)",
        "Auth, scheduling, session persistence",
        "Cosine-similarity scoring with rationales",
      ],
    },
  },
  {
    slug: "pv-signal",
    title: "AI PV Reporting",
    blurb:
      "FAERS/MedDRA analytics with PRR/ROR + CIs, dashboards, and LLM insights to surface adverse-event signals.",
    tone: "lime",
    icon: BeakerIcon,
    stack: ["Python", "DuckDB", "Pandas", "Altair", "Ollama"],
    details: {
      overview:
        "Built a full pipeline: ETL JSON→Parquet, signal detection (PRR/ROR with continuity correction), and interactive dashboards.",
      highlights: [
        "DuckDB + Parquet for fast local analytics",
        "Altair dashboards & Ag-Grid explorer",
        "LLM notes via Gemma (Ollama)",
      ],
    },
  },
  {
    slug: "pharmaai",
    title: "PharmaAI",
    blurb:
      "Local, privacy-preserving RAG for medication info—Gemma 3 + sentence embeddings; accurate and fast on consumer hardware.",
    tone: "pastelRed",
    icon: ChatBubbleLeftRightIcon,
    stack: ["Ollama", "Embeddings", "RAG", "Streamlit", "Docker"],
    details: {
      overview:
        "RAG answers grounded in a curated medication DB; designed for offline/local use with low energy footprint.",
      highlights: [
        "Sentence-embedding search + context packing",
        "Prompt templates to reduce hallucinations",
        "Streamlit conversational UI; Dockerized",
      ],
      results: [
        "92% response accuracy · ~2.8s median latency · 3% hallucination",
      ],
    },
  },
  // try "lime" or "lavender" on future items
];
