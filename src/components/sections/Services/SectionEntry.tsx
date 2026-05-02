"use client";

import { motion, type Variants } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const centerVariants: Variants = {
  hidden: { scaleY: 0, opacity: 1 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

const sideVariants: Variants = {
  hidden: { scaleY: 0, opacity: 1 },
  visible: {
    scaleY: 1,
    opacity: 0,
    transition: {
      scaleY: { duration: 0.6, ease: EASE },
      opacity: { delay: 1.5, duration: 0.3, ease: EASE },
    },
  },
};

type Props = {
  play: boolean;
  isStatic?: boolean;
};

export function SectionEntry({ play, isStatic }: Props) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden md:grid grid-cols-3 gap-8"
    >
      {[0, 1, 2].map((i) => {
        const isCenter = i === 1;
        if (isStatic) {
          return (
            <div key={i} className="flex justify-center">
              <div
                className="w-px h-full bg-terracotta"
                style={{ opacity: isCenter ? 1 : 0 }}
              />
            </div>
          );
        }
        return (
          <div key={i} className="flex justify-center">
            <motion.div
              className="w-px h-full bg-terracotta"
              style={{ originY: 0 }}
              variants={isCenter ? centerVariants : sideVariants}
              initial="hidden"
              animate={play ? "visible" : "hidden"}
            />
          </div>
        );
      })}
    </div>
  );
}
