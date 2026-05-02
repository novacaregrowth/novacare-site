"use client";

import { motion } from "framer-motion";

type Props = {
  play: boolean;
  isStatic?: boolean;
};

export function SectionSweep({ play, isStatic }: Props) {
  if (isStatic) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-[30%] md:block"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, color-mix(in srgb, var(--terracotta) 12%, transparent) 50%, transparent 100%)",
      }}
      initial={{ x: "-100%" }}
      animate={play ? { x: "333%" } : { x: "-100%" }}
      transition={{ delay: 0.25, duration: 0.6, ease: "linear" }}
    />
  );
}
