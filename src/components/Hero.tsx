"use client";

import { motion } from "framer-motion";
import HeroTiles from "./HeroTiles";

export default function Hero() {
  return (
    <section className="w-full" id="hero">
      <div className="w-full px-6 md:px-8 lg:px-12 pb-6 md:pb-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <HeroTiles />
        </motion.div>
      </div>
    </section>
  );
}
