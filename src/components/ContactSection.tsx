// src/components/ContactSection.tsx
"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionStyle,
} from "framer-motion";
import { useRef } from "react";
import {
  EnvelopeIcon,
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  CameraIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { useForm, ValidationError } from "@formspree/react";

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 12, filter: "blur(3px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.5, ease: "easeOut", delay: d },
});

export default function ContactSection() {
  // quick links
  const EMAIL = "abhi96dayni@gmail.com";
  const GITHUB = "https://github.com/pandeyg33?tab=repositories";
  const LINKEDIN = "https://www.linkedin.com/in/pandeyg33";
  const RESUME = "/docs/Abhimanyu_Pandey_Resume_SE.pdf";
  const INSTAGRAM = "https://instagram.com/akamanyu";

  // header slab scroll-expand
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "center 40%"],
  });
  const widthScaleRaw = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const widthScale = useSpring(widthScaleRaw, {
    stiffness: 140,
    damping: 20,
    mass: 0.35,
  });
  const slabStyle: MotionStyle = {
    scaleX: widthScale,
    transformOrigin: "center",
    borderColor: "rgba(234,179,8,.25)", // banana
  };

  // formspree
  const [state, handleSubmit] = useForm("xpwjeokj");

  // Button state machine
  const isSending = state.submitting;
  const isSent = state.succeeded;
  const isDisabled = isSending || isSent;
  const btnLabel = isSent ? "Sent" : isSending ? "Sending…" : "Send";

  // Reusable styles so pills look identical across themes
  const pillBase =
    "rounded-[var(--radius)] border pill-shadow w-full " +
    "bg-[var(--intro-pill-color)] " + // solid black in both themes
    "border-[color:var(--pill-banana)]/25 " +
    "text-[color:var(--pill-banana)] " +
    "placeholder-[color:var(--pill-banana)]/80 " +
    "px-5 py-4 md:py-5 focus:outline-none focus:ring-0";

  // Button variants
  const btnBase =
    "rounded-[calc(var(--radius)+4px)] w-full h-full min-h-[140px] " +
    "font-medium tracking-wide border pill-shadow " +
    "flex items-center justify-center gap-2 transition-transform will-change-transform";
  const btnIdle =
    "bg-[color:var(--pill-banana)] text-[color:var(--pill-ink)] " +
    "border-[color:var(--pill-banana)]/40 hover:scale-[1.02] active:scale-[0.99]";
  const btnSent =
    "bg-[color:var(--card-pastel-red)] text-[color:var(--pill-ink)] " +
    "border-[color:var(--card-pastel-red)]/40 opacity-90 cursor-not-allowed";

  return (
    <section
      id="contact"
      className="w-full scroll-mt-24 mt-16 sm:mt-20 md:mt-24"
      ref={sectionRef}
    >
      {/* same container width as rest of page */}
      <div className="w-full px-6 md:px-8 lg:px-12">
        {/* ===== Header pill ===== */}
        <motion.div
          {...fade(0)}
          whileHover={{ scale: 1.005 }}
          style={slabStyle}
          className="relative rounded-[var(--radius)] bg-[var(--intro-pill-color)] border p-6 sm:p-8 md:p-10 theme-fade"
        >
          <div
            className="text-xs md:text-sm font-semibold tracking-[0.12em] uppercase"
            style={{ color: "var(--pill-banana)" }}
          >
            Where to find me
          </div>

          <h2
            className="mt-3 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] max-w-5xl"
            style={{ color: "var(--pill-banana)" }}
          >
            Curious about my work?
            <br />
            Lets connect!
          </h2>

          {/* chips */}
          <div className="mt-8 md:mt-10">
            <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-4">
              <motion.a
                {...fade(0.1)}
                href={`mailto:${EMAIL}?subject=Let%27s%20work%20together`}
                className="group inline-flex w-full md:w-auto items-center justify-center md:justify-start gap-2 rounded-full border px-5 py-3 text-sm font-medium"
                style={{
                  color: "var(--pill-banana)",
                  borderColor: "var(--pill-banana)",
                }}
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              >
                <EnvelopeIcon className="size-4 opacity-80" />
                <span className="tracking-wide">{EMAIL}</span>
              </motion.a>

              <motion.a
                {...fade(0.22)}
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-full md:w-auto items-center justify-center md:justify-start gap-2 rounded-full border px-5 py-3 text-sm font-medium"
                style={{
                  color: "var(--pill-banana)",
                  borderColor: "var(--pill-banana)",
                }}
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              >
                <CodeBracketIcon className="size-4 opacity-80" />
                <span className="tracking-wide">GitHub</span>
                <ArrowTopRightOnSquareIcon className="size-4 opacity-80" />
              </motion.a>

              <motion.a
                {...fade(0.28)}
                href={LINKEDIN}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-full md:w-auto items-center justify-center md:justify-start gap-2 rounded-full border px-5 py-3 text-sm font-medium"
                style={{
                  color: "var(--pill-banana)",
                  borderColor: "var(--pill-banana)",
                }}
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              >
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-current text-[10px] leading-none">
                  in
                </span>
                <span className="tracking-wide">LinkedIn</span>
                <ArrowTopRightOnSquareIcon className="size-4 opacity-80" />
              </motion.a>

              <motion.a
                {...fade(0.34)}
                href={INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-full md:w-auto items-center justify-center md:justify-start gap-2 rounded-full border px-5 py-3 text-sm font-medium"
                style={{
                  color: "var(--pill-banana)",
                  borderColor: "var(--pill-banana)",
                }}
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              >
                <CameraIcon className="size-4 opacity-80" />
                <span className="tracking-wide">Instagram</span>
                <ArrowTopRightOnSquareIcon className="size-4 opacity-80" />
              </motion.a>

              <motion.a
                {...fade(0.16)}
                href={RESUME}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-full md:w-auto items-center justify-center md:justify-start gap-2 rounded-full border px-5 py-3 text-sm font-medium"
                style={{
                  color: "var(--pill-banana)",
                  borderColor: "var(--pill-banana)",
                }}
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              >
                <DocumentTextIcon className="size-4 opacity-80" />
                <span className="tracking-wide">Resume</span>
                <ArrowTopRightOnSquareIcon className="size-4 opacity-80" />
              </motion.a>
            </div>
          </div>

          {/* rotating ring */}
          <div className="pointer-events-none absolute -right-6 md:-right-8 -bottom-10 md:-bottom-12">
            <div className="relative h-[110px] w-[110px] md:h-[140px] md:w-[140px]">
              <motion.svg
                viewBox="0 0 120 120"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                style={{ color: "var(--pill-banana)" }}
              >
                <defs>
                  <path
                    id="contactPath"
                    d="M60,60 m-48,0 a48,48 0 1,1 96,0 a48,48 0 1,1 -96,0"
                  />
                </defs>
                <text fill="currentColor">
                  <textPath
                    href="#contactPath"
                    startOffset="0"
                    className="text-[10px] md:text-[12px] tracking-[0.14em] font-semibold"
                    style={{ color: "var(--pill-banana)" }}
                  >
                    WHERE TO FIND ME • WHERE TO FIND ME • WHERE TO FIND ME •
                  </textPath>
                </text>
              </motion.svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  style={{ color: "var(--pill-banana)" }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M12 5v14m0 0l-6-6m6 6l6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===== Segregated form below ===== */}
        <form
          onSubmit={handleSubmit}
          className="mt-12 md:mt-12 grid grid-cols-12 gap-4 md:gap-5 lg:gap-6 pr-6 md:pr-6 lg:pr-12 pl-6 md:pl-8 lg:pl-12"
        >
          {/* Row 1: Name / Email / Subject */}
          <div className="col-span-12 md:col-span-3">
            <input
              id="name"
              name="name"
              type="text"
              className={pillBase}
              placeholder="Name"
              aria-label="Name"
            />
          </div>

          <div className="col-span-12 md:col-span-3">
            <input
              id="email"
              name="email"
              type="email"
              className={pillBase}
              placeholder="E-mail"
              aria-label="Email"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <input
              id="subject"
              name="subject"
              type="text"
              className={pillBase}
              placeholder="Subject"
              aria-label="Subject"
            />
          </div>

          {/* Row 2: Message (left) + Send (right) */}
          <div className="col-span-12 xl:col-span-9">
            <textarea
              id="message"
              name="message"
              rows={8}
              className={`${pillBase} resize-y`}
              placeholder="Message"
              aria-label="Message"
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>

          {/* Send button — becomes pastel red + disabled after success */}
          <div className="col-span-12 xl:col-span-3 flex">
            <button
              type="submit"
              disabled={isDisabled}
              aria-disabled={isDisabled}
              className={`${btnBase} ${isSent ? btnSent : btnIdle}`}
              aria-label={btnLabel}
            >
              {!isSent && (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M22 2L11 13" strokeLinecap="round" />
                  <path
                    d="M22 2l-7 20-4-9-9-4 20-7z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <span>{btnLabel}</span>
            </button>
          </div>
        </form>

        {/* Success state pill */}
        {state.succeeded && (
          <div
            className="
              mt-4 rounded-[var(--radius)]
              border border-[color:var(--pill-banana)]/30
              bg-[var(--intro-pill-color)]
              text-[color:var(--pill-banana)]
              px-5 py-4 pill-shadow ml-18 mr-18
            "
          >
            Thanks — your message is on its way! ✨
          </div>
        )}
      </div>
    </section>
  );
}
