"use client";

import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PATIENT_MESSAGE = "Hi, do you have appointments this week?";
const AI_MESSAGE = "Yes, Thursday 2 PM or Friday 10 AM. Which works?";

type Stage = "init" | "patient" | "typing" | "settled";

const INTRO_TIMINGS_MS = {
  patient: 0,
  typing: 400,
  ai: 900,
};

const HOVER_TIMINGS_MS = {
  patient: 0,
  typing: 450,
  ai: 1250,
};

const BUBBLE_INITIAL = { opacity: 0.01, scale: 0.96 };
const BUBBLE_ANIMATE = { opacity: 1, scale: [0.96, 1.04, 1] };
const BUBBLE_EXIT = { opacity: 0.01, scale: 0.96 };
const BUBBLE_TRANSITION = { duration: 0.35, ease: EASE };

const TYPING_INITIAL = { opacity: 0.01, y: 6 };
const TYPING_ANIMATE = { opacity: 1, y: 0 };
const TYPING_EXIT = { opacity: 0.01, y: -4 };

type Props = {
  play: boolean;
  introDelaySec: number;
  hovered: boolean;
  enableIntros: boolean;
};

export function ArtifactPhoneReal({
  play,
  introDelaySec,
  hovered,
  enableIntros,
}: Props) {
  const [stage, setStage] = useState<Stage>(enableIntros ? "init" : "settled");
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const introPlayedRef = useRef(false);

  const clearTimers = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  useEffect(() => {
    if (!enableIntros) {
      setStage("settled");
      return;
    }
    if (!play) return;
    if (introPlayedRef.current) return;

    introPlayedRef.current = true;
    const offsetMs = introDelaySec * 1000;
    timeoutsRef.current.push(
      setTimeout(() => setStage("patient"), offsetMs + INTRO_TIMINGS_MS.patient),
      setTimeout(() => setStage("typing"), offsetMs + INTRO_TIMINGS_MS.typing),
      setTimeout(() => setStage("settled"), offsetMs + INTRO_TIMINGS_MS.ai),
    );
  }, [play, introDelaySec, enableIntros]);

  useEffect(() => {
    if (!enableIntros) return;
    if (!hovered) return;
    if (!introPlayedRef.current) return;
    if (stage !== "settled") return;

    clearTimers();
    setStage("init");
    timeoutsRef.current.push(
      setTimeout(() => setStage("patient"), HOVER_TIMINGS_MS.patient),
      setTimeout(() => setStage("typing"), HOVER_TIMINGS_MS.typing),
      setTimeout(() => setStage("settled"), HOVER_TIMINGS_MS.ai),
    );
    // Intentionally no cleanup return: hover-out should not cancel an in-flight
    // replay. The cycle completes on its own; the next hover-in starts a fresh one.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered, enableIntros]);

  const showPatient = stage === "patient" || stage === "typing" || stage === "settled";
  const showTyping = stage === "typing";
  const showAi = stage === "settled";

  return (
    <div className="relative mx-auto h-[280px] w-[160px] overflow-hidden rounded-[14px] border border-border-warm bg-ink">
      <div className="flex items-center justify-between border-b border-border-warm px-3 py-2">
        <div>
          <p className="font-sans text-[10px] font-medium text-bone leading-none">
            Maison Aesthetic
          </p>
          <p className="mt-0.5 font-sans text-[8px] text-stone-soft leading-none">
            Online
          </p>
        </div>
        <div className="h-1.5 w-1.5 rounded-full bg-terracotta/80" />
      </div>

      <div className="flex flex-col gap-1.5 px-3 pt-3">
        <AnimatePresence>
          {showPatient && (
            <motion.div
              key="patient"
              className="flex flex-col items-end"
              initial={BUBBLE_INITIAL}
              animate={BUBBLE_ANIMATE}
              exit={BUBBLE_EXIT}
              transition={BUBBLE_TRANSITION}
            >
              <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-bubble-sent px-2.5 py-1.5 font-sans text-[10px] leading-[1.35] text-bone">
                {PATIENT_MESSAGE}
              </div>
              <span className="mt-0.5 pr-1 font-sans text-[8px] text-stone-soft">
                10:42
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showTyping && (
            <motion.div
              key="typing"
              className="flex items-center gap-1 self-start rounded-2xl rounded-bl-sm bg-card px-2.5 py-2"
              initial={TYPING_INITIAL}
              animate={TYPING_ANIMATE}
              exit={TYPING_EXIT}
              transition={{ duration: 0.25, ease: EASE }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1 w-1 rounded-full bg-stone-soft"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.15,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showAi && (
            <motion.div
              key="ai"
              className="flex flex-col items-start"
              initial={BUBBLE_INITIAL}
              animate={BUBBLE_ANIMATE}
              exit={BUBBLE_EXIT}
              transition={BUBBLE_TRANSITION}
            >
              <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-card px-2.5 py-1.5 font-sans text-[10px] leading-[1.35] text-bone">
                {AI_MESSAGE}
              </div>
              <span className="mt-0.5 pl-1 font-sans text-[8px] text-stone-soft">
                10:42
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
