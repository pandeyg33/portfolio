// src/components/Header.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Nanum_Pen_Script } from "next/font/google";

const nanumPen = Nanum_Pen_Script({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function Header() {
  const prefersReduced = useReducedMotion();

  const wobbleLeft = prefersReduced
    ? { x: 0 }
    : {
        x: [-6, 6, -6],
        transition: { duration: 5, ease: "easeInOut", repeat: Infinity },
      };

  const wobbleRight = prefersReduced
    ? { x: 0 }
    : {
        x: [7, -7, 7],
        transition: {
          duration: 5.2,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 0.2,
        },
      };

  return (
    <header
      className="w-full min-h-[50vh] flex items-center overflow-hidden"
      id="header"
    >
      <div className="w-full px-6 md:px-8 lg:px-12">
        {/* Apply Nanum Pen Script only here */}
        <div
          className={`${nanumPen.className} flex flex-col items-center justify-center text-heading opacity-90 tracking-wide text-center space-y-1 md:space-y-2`}
        >
          <motion.div animate={wobbleLeft} className="w-full">
            <motion.h1
              initial={{ opacity: 0, x: -40, filter: "blur(3px)" }}
              animate={{ opacity: 1, x: -10, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="block text-7xl md:text-8xl font-bold leading-[0.95]"
              aria-label="Abhimanyu"
            >
              Abhimanyu
            </motion.h1>
          </motion.div>

          <motion.div animate={wobbleRight} className="w-full">
            <motion.h1
              initial={{ opacity: 0, x: 40, filter: "blur(3px)" }}
              animate={{ opacity: 1, x: 10, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
              className="block text-6xl md:text-5xl lg:text-8xl font-semibold leading-[0.95]"
              aria-label="Pandey"
            >
              Pandey
            </motion.h1>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
