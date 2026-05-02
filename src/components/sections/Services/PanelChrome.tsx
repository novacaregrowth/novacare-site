"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CHROME_START_SEC = [0.7, 0.9, 1.1] as const;
const CHROME_TOP_DUR_SEC = 0.2;
const CHROME_SIDES_DELAY_SEC = 0.1;
const CHROME_SIDES_DUR_SEC = 0.2;
const CHROME_BG_DUR_SEC = 0.3;
const CHROME_BOTTOM_DELAY_SEC = 0.3;
const CHROME_BOTTOM_DUR_SEC = 0.2;

type Props = {
  tierIndex: 0 | 1 | 2;
  featured: boolean;
  play: boolean;
  isStatic?: boolean;
  bgClassName?: string;
  tier2MarkerDelaySec?: number;
};

export function PanelChrome({
  tierIndex,
  featured,
  play,
  isStatic,
  bgClassName = "bg-card",
  tier2MarkerDelaySec = 3.05,
}: Props) {
  const start = CHROME_START_SEC[tierIndex];

  if (isStatic) {
    return (
      <>
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-md ${bgClassName}`}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 left-0 h-px bg-border-warm"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 bottom-0 left-0 h-px bg-border-warm"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 bottom-0 left-0 w-px bg-border-warm"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 bottom-0 w-px bg-border-warm"
        />
        {featured && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0 left-0 z-[2] h-px bg-terracotta"
          />
        )}
      </>
    );
  }

  return (
    <>
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-md ${bgClassName}`}
        initial={{ opacity: 0 }}
        animate={play ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          delay: start + CHROME_SIDES_DELAY_SEC,
          duration: CHROME_BG_DUR_SEC,
          ease: EASE,
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 left-0 h-px bg-border-warm"
        style={{ transformOrigin: "left center" }}
        initial={{ scaleX: 0 }}
        animate={play ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ delay: start, duration: CHROME_TOP_DUR_SEC, ease: EASE }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 bottom-0 left-0 w-px bg-border-warm"
        style={{ transformOrigin: "center top" }}
        initial={{ scaleY: 0 }}
        animate={play ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{
          delay: start + CHROME_SIDES_DELAY_SEC,
          duration: CHROME_SIDES_DUR_SEC,
          ease: EASE,
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 bottom-0 w-px bg-border-warm"
        style={{ transformOrigin: "center top" }}
        initial={{ scaleY: 0 }}
        animate={play ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{
          delay: start + CHROME_SIDES_DELAY_SEC,
          duration: CHROME_SIDES_DUR_SEC,
          ease: EASE,
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-px bg-border-warm"
        style={{ transformOrigin: "left center" }}
        initial={{ scaleX: 0 }}
        animate={play ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          delay: start + CHROME_BOTTOM_DELAY_SEC,
          duration: CHROME_BOTTOM_DUR_SEC,
          ease: EASE,
        }}
      />

      {featured && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 left-0 z-[2] h-px bg-terracotta"
          style={{ transformOrigin: "center" }}
          initial={{ scaleX: 0 }}
          animate={play ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{
            delay: tier2MarkerDelaySec,
            duration: 0.4,
            ease: EASE,
          }}
        />
      )}
    </>
  );
}
