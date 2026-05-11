"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const STAGGER_SEC = 0.04;
const DURATION_SEC = 0.4;
const ITEM_CLASS = "font-sans text-bone text-[13px] leading-[1.8]";

type Props = {
  features: readonly string[];
  play: boolean;
  baseDelaySec: number;
  isStatic?: boolean;
};

export function FeaturesPoem({ features, play, baseDelaySec, isStatic }: Props) {
  return (
    <ul className="list-none">
      {features.map((feature, i) => {
        if (isStatic) {
          return (
            <li key={i} className={ITEM_CLASS}>
              {feature}
            </li>
          );
        }

        return (
          <motion.li
            key={i}
            className={ITEM_CLASS}
            initial={{ opacity: 0.01, y: 8 }}
            animate={play ? { opacity: 1, y: 0 } : { opacity: 0.01, y: 8 }}
            transition={{
              delay: baseDelaySec + i * STAGGER_SEC,
              duration: DURATION_SEC,
              ease: EASE,
            }}
          >
            {feature}
          </motion.li>
        );
      })}
    </ul>
  );
}
