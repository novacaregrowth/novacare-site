"use client";

import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const INTRO = {
  receivedAtMs: 0,
  typingAtMs: 300,
  sentAtMs: 900,
  totalMs: 1200,
} as const;

const HOVER = {
  receivedAtMs: 0,
  typingAtMs: 400,
  sentAtMs: 1400,
  totalMs: 2500,
} as const;

type Phase = "init" | "received" | "typing" | "sent";

type Props = {
  playIntro: boolean;
  introDelaySec: number;
  cardHovered: boolean;
  isStatic?: boolean;
};

const BUBBLE_INITIAL = { opacity: 0, scale: 0.96 };
const BUBBLE_ANIMATE = { opacity: 1, scale: [0.96, 1.04, 1] };
const BUBBLE_TRANSITION = { duration: 0.3, ease: EASE, times: [0, 0.6, 1] };

const TYPING_INITIAL = { opacity: 0, y: 4 };
const TYPING_ANIMATE = { opacity: 1, y: 0 };
const TYPING_EXIT = { opacity: 0, y: -4 };
const TYPING_TRANSITION = { duration: 0.2, ease: EASE };

export function ArtifactPhone({
  playIntro,
  introDelaySec,
  cardHovered,
  isStatic,
}: Props) {
  const [phase, setPhase] = useState<Phase>(isStatic ? "sent" : "init");
  const isReplayingRef = useRef(false);
  const previousHoverRef = useRef(false);

  useEffect(() => {
    if (isStatic) return;
    if (!playIntro) return;
    const offsetMs = introDelaySec * 1000;
    const timers: number[] = [];
    timers.push(
      window.setTimeout(() => setPhase("received"), offsetMs + INTRO.receivedAtMs),
      window.setTimeout(() => setPhase("typing"), offsetMs + INTRO.typingAtMs),
      window.setTimeout(() => setPhase("sent"), offsetMs + INTRO.sentAtMs),
    );
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [playIntro, introDelaySec, isStatic]);

  useEffect(() => {
    if (isStatic) return;
    const wasHovered = previousHoverRef.current;
    previousHoverRef.current = cardHovered;
    if (!cardHovered || wasHovered) return;
    if (isReplayingRef.current) return;
    if (phase !== "sent") return;

    isReplayingRef.current = true;
    const timers: number[] = [];
    timers.push(
      window.setTimeout(() => setPhase("init"), 0),
      window.setTimeout(() => setPhase("received"), HOVER.receivedAtMs + 16),
      window.setTimeout(() => setPhase("typing"), HOVER.typingAtMs + 16),
      window.setTimeout(() => setPhase("sent"), HOVER.sentAtMs + 16),
      window.setTimeout(() => {
        isReplayingRef.current = false;
      }, HOVER.totalMs + 16),
    );
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [cardHovered, phase, isStatic]);

  const showReceived = phase !== "init";
  const showTyping = phase === "typing";
  const showSent = phase === "sent";

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[60%] h-full rounded-[8px] bg-ink p-2 flex flex-col gap-1.5 overflow-hidden border border-border-warm">
        <AnimatePresence initial={false}>
          {showReceived && (
            <motion.div
              key="received"
              initial={BUBBLE_INITIAL}
              animate={BUBBLE_ANIMATE}
              transition={BUBBLE_TRANSITION}
              className="self-start w-[70%] h-4 rounded-[6px] rounded-bl-[2px] bg-card border border-[rgba(244,241,234,0.04)]"
            />
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {showTyping && (
            <motion.div
              key="typing"
              initial={TYPING_INITIAL}
              animate={TYPING_ANIMATE}
              exit={TYPING_EXIT}
              transition={TYPING_TRANSITION}
              className="self-end flex items-center gap-1 px-1.5 py-1 rounded-[6px] bg-bubble-sent border border-[rgba(244,241,234,0.04)]"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1 h-1 rounded-full bg-stone-soft"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {showSent && (
            <motion.div
              key="sent"
              initial={BUBBLE_INITIAL}
              animate={BUBBLE_ANIMATE}
              transition={BUBBLE_TRANSITION}
              className="self-end w-[70%] h-4 rounded-[6px] rounded-br-[2px] bg-bubble-sent border border-[rgba(244,241,234,0.04)]"
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
