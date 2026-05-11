"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type CursorDemoProps = {
  active: boolean;
  x: string;
  y: string;
  reduceMotion?: boolean;
};

export function CursorDemo({ active, x, y, reduceMotion }: CursorDemoProps) {
  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute z-30"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        left: x,
        top: y,
        opacity: active ? 1 : 0,
        scale: active ? 1 : 0.9,
      }}
      transition={{
        left: { duration: 0.55, ease: EASE },
        top: { duration: 0.55, ease: EASE },
        opacity: { duration: 0.22, ease: EASE },
        scale: { duration: 0.22, ease: EASE },
      }}
      style={{
        rotate: -12,
        filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.45))",
        transformOrigin: "top left",
      }}
    >
      <svg
        width="20"
        height="24"
        viewBox="0 0 20 24"
        aria-hidden="true"
      >
        <path
          d="M2 2 L2 18 L7 14 L10.5 21 L13 19.8 L9.6 13.3 L16 13 Z"
          fill="#F4F1EA"
          stroke="rgba(10,10,10,0.65)"
          strokeWidth="0.8"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}

export default CursorDemo;
