"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CHART_PATH =
  "M 5 75 Q 15 65 25 70 T 45 60 T 60 65 T 75 50 T 90 45 T 105 28 T 115 18";

const DOT_CX = 115;
const DOT_CY = 18;

type Props = {
  playIntro: boolean;
  introDelaySec: number;
  cardHovered: boolean;
  isStatic?: boolean;
};

export function ArtifactChart({
  playIntro,
  introDelaySec,
  cardHovered,
  isStatic,
}: Props) {
  const pathTarget = isStatic ? 1 : playIntro ? 1 : 0;
  const dotOpacityTarget = isStatic ? 1 : playIntro ? 1 : 0;

  const pathTransition = isStatic
    ? { duration: 0 }
    : { delay: introDelaySec, duration: 1.5, ease: EASE };

  const dotOpacityTransition = isStatic
    ? { duration: 0 }
    : { delay: introDelaySec + 1.3, duration: 0.2, ease: EASE };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 120 90"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <rect x="20" y="80" width="1" height="6" fill="var(--stone-soft)" opacity="0.5" />
        <rect x="60" y="80" width="1" height="6" fill="var(--stone-soft)" opacity="0.5" />
        <rect x="100" y="80" width="1" height="6" fill="var(--stone-soft)" opacity="0.5" />

        <motion.path
          d={CHART_PATH}
          stroke="var(--bone)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: isStatic ? 1 : 0 }}
          animate={{ pathLength: pathTarget }}
          transition={pathTransition}
        />

        <motion.circle
          cx={DOT_CX}
          cy={DOT_CY}
          r="2"
          fill="var(--terracotta)"
          initial={{ opacity: isStatic ? 1 : 0, scale: 1 }}
          animate={{
            opacity: dotOpacityTarget,
            scale: cardHovered && !isStatic ? [1, 1.4, 1] : 1,
            filter:
              cardHovered && !isStatic
                ? [
                    "drop-shadow(0 0 0px rgba(200,109,79,0))",
                    "drop-shadow(0 0 4px rgba(200,109,79,0.7))",
                    "drop-shadow(0 0 0px rgba(200,109,79,0))",
                  ]
                : "drop-shadow(0 0 0px rgba(200,109,79,0))",
          }}
          transition={
            cardHovered && !isStatic
              ? {
                  scale: { duration: 0.6, ease: EASE, times: [0, 0.5, 1] },
                  filter: { duration: 0.6, ease: EASE, times: [0, 0.5, 1] },
                  opacity: { duration: 0 },
                }
              : { opacity: dotOpacityTransition }
          }
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          className={
            isStatic
              ? undefined
              : "motion-safe:[animation:chart-dot-pulse_3s_ease-in-out_infinite]"
          }
        />
      </svg>
    </div>
  );
}
