"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDownIcon } from "@heroicons/react/24/outline";

export default function IntroPill() {
  return (
    <section className="w-full -mt-4 md:-mt-6">
      <div className="w-full px-4 md:px-6 lg:px-12">
        <div className="relative h-[100vh] md:h-[108vh]">
          <div className="sticky top-50 min-h-[58vh] md:min-h-[64vh] flex items-center pt-10 md:pt-18">
            {/* keep ring outside to avoid clipping */}
            <div className="relative w-full">
              {/* PILL — solid black, overflow-hidden */}
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.985 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ scale: 1.01 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="
                  relative w-full overflow-hidden
                  rounded-[var(--radius)]
                  bg-[var(--intro-pill-bg)]               /* SOLID BLACK */
                  border border-[rgba(184,168,255,.35)]
                  pill-shadow
                  p-6 sm:p-8 md:p-12 lg:p-16
                "
              >
                {/* Background image on the RIGHT */}
                <div className="pointer-events-none absolute inset-y-0 right-0 w-[48%] md:w-[35%]">
                  <Image
                    src="/me.jpg"
                    alt="Profile photo"
                    fill
                    sizes="(min-width:1024px) 48vw, 100vw"
                    /* shift LEFT on mobile so face is in frame */
                    className="object-cover object-[20%_35%] md:object-[center_35%] opacity-90"
                    priority
                  />
                  {/* faint merge into the pill surface */}
                  <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-transparent to-transparent" />
                </div>

                {/* RIGHT-side veil (mobile only) to keep copy readable */}
                <div className="intro-veil absolute inset-0 md:hidden z-10" />

                {/* CONTENT */}
                <div className="relative z-20 grid gap-8 md:gap-10 lg:gap-12 md:[grid-template-columns:repeat(12,minmax(0,1fr))]">
                  <div className="md:[grid-column:span_8]">
                    <div className="text-xs md:text-sm font-semibold tracking-[0.12em] uppercase text-[var(--accent)] mb-4 md:mb-6">
                      What I do
                    </div>

                    <h2 className="text-[var(--accent)] leading-[1.08] font-bold text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
                      I help teams ship{" "}
                      <em className="not-italic opacity-90">ML-powered</em>{" "}
                      products, crafted with{" "}
                      <em className="not-italic opacity-90">clarity</em> &{" "}
                      <em className="not-italic opacity-90">speed</em>.
                    </h2>

                    <p className="mt-5 md:mt-7 text-base md:text-xl text-white/85 max-w-4xl">
                      I’m a data & machine learning practitioner with an MS in
                      Information Science (ML emphasis, 4.0 GPA) and 5+ years as
                      a Senior Software Engineer. I build end-to-end
                      systems—clean data pipelines, reliable APIs, and
                      thoughtful UIs— then deploy them so they scale.
                      Comfortable with supervised & unsupervised learning, deep
                      nets, and large-scale analytics; equally fluent in
                      Java/Spring, React/Next, SQL/NoSQL, and cloud-ready
                      microservices. I care about performance, clarity, and
                      making the product feel great to use.
                    </p>
                  </div>

                  <div className="hidden md:block md:[grid-column:span_4]" />
                </div>
              </motion.div>

              {/* RING — scale from a global var so you can reuse it site-wide */}
              <div
                className="pointer-events-none absolute -right-6 md:-right-10 -bottom-10 md:-bottom-12"
                style={{
                  transform: "scale(var(--ring-scale))",
                  transformOrigin: "center",
                }}
              >
                <div className="relative h-[120px] w-[120px] md:h-[150px] md:w-[150px]">
                  <motion.svg
                    viewBox="0 0 120 120"
                    className="absolute inset-0 h-full w-full overflow-visible"
                    aria-hidden="true"
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 16,
                      ease: "linear",
                    }}
                    style={{ color: "var(--accent)" }}
                  >
                    <defs>
                      {/* Full circle with fixed pathLength for precise wrap */}
                      <path
                        id="ringPath"
                        d="M60,60 m-48,0 a48,48 0 1,1 96,0 a48,48 0 1,1 -96,0"
                        pathLength="360"
                      />
                    </defs>
                    <text fill="currentColor">
                      <textPath
                        href="#ringPath"
                        startOffset="0"
                        textLength="360"
                        lengthAdjust="spacing"
                        className="text-[10px] md:text-[12px] tracking-[0.16em] font-semibold"
                      >
                        WHAT I DO • WHAT I DO • WHAT I DO • WHAT I DO • WHAT I
                        DO • WHAT I DO •
                      </textPath>
                    </text>
                  </motion.svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ArrowDownIcon
                      className="size-6 md:size-7"
                      style={{ color: "var(--accent)" }}
                    />
                  </div>
                </div>
              </div>
              {/* /ring */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
