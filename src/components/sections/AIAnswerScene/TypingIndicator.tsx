"use client";

import { motion } from "framer-motion";

import { CLINIC_NAME, PATIENT_NAME } from "./conversation";

const DOT_DELAYS = [0, 0.15, 0.3];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const TYPING_INITIAL = { opacity: 0, y: 6 };
const TYPING_ANIMATE = { opacity: 1, y: 0 };
const TYPING_EXIT = { opacity: 0, y: -4 };
const TYPING_TRANSITION = { duration: 0.2, ease: EASE };
const DOT_ANIMATE = { opacity: [0.3, 1, 0.3] };

type Props = { side: "sent" | "received" };

export function TypingIndicator({ side }: Props) {
  const isSent = side === "sent";
  const align = isSent ? "justify-end" : "justify-start";
  const bgColor = isSent ? "bg-bubble-sent" : "bg-card";
  const tail = isSent ? "rounded-br-[4px]" : "rounded-bl-[4px]";
  const label = isSent
    ? `${PATIENT_NAME} is typing`
    : `${CLINIC_NAME} is typing`;

  return (
    <motion.div
      initial={TYPING_INITIAL}
      animate={TYPING_ANIMATE}
      exit={TYPING_EXIT}
      transition={TYPING_TRANSITION}
      className={`w-full flex ${align}`}
      aria-label={label}
    >
      <div
        className={`${bgColor} ${tail} rounded-[14px] px-3 py-2.5 flex items-center gap-1 border border-[rgba(244,241,234,0.04)]`}
      >
        {DOT_DELAYS.map((delay) => (
          <motion.span
            key={delay}
            aria-hidden="true"
            className="w-[6px] h-[6px] rounded-full bg-stone-soft"
            animate={DOT_ANIMATE}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              repeat: Infinity,
              delay,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
