"use client";

import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import type { CardMessage, Message } from "@/components/sections/AIAnswerScene/conversation";
import { ChatMessage, type ReceiptState } from "@/components/sections/AIAnswerScene/ChatMessage";
import { TypingIndicator } from "@/components/sections/AIAnswerScene/TypingIndicator";
import { copy } from "@/content/copy";

import { CursorDemo } from "./shared/CursorDemo";
import { PhoneShell } from "./shared/PhoneShell";
import { SpecCaption } from "./shared/SpecCaption";
import { StatusBar } from "./shared/StatusBar";
import {
  AttachIcon,
  ChevronLeftIcon,
  EmojiIcon,
  MicIcon,
  VideoCallIcon,
  VoiceCallIcon,
} from "./shared/icons";

const PHONE_W = 260;
const PHONE_H = 564;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const data = copy.services.artifacts.maisonAesthetic;
const captionParts = copy.services.artifacts.specCaptions.tier2;

const conversation = data.conversation as readonly Message[];
const cardMessage: CardMessage = {
  id: "tier2-card",
  kind: "card",
  side: "received",
  data: data.confirmationCard,
};

type Phase =
  | "empty"
  | "m1"
  | "typing-pre-m2"
  | "m2"
  | "m3"
  | "typing-pre-m4"
  | "m4"
  | "m5"
  | "typing-pre-card"
  | "card"
  | "card-cursor"
  | "card-settled"
  | "fade-out";

const PHASE_ORDER: Phase[] = [
  "empty",
  "m1",
  "typing-pre-m2",
  "m2",
  "m3",
  "typing-pre-m4",
  "m4",
  "m5",
  "typing-pre-card",
  "card",
  "card-cursor",
  "card-settled",
  "fade-out",
];

const SCHEDULE: ReadonlyArray<{ at: number; phase: Phase }> = [
  { at: 1000, phase: "m1" },
  { at: 3500, phase: "typing-pre-m2" },
  { at: 4500, phase: "m2" },
  { at: 8000, phase: "m3" },
  { at: 10000, phase: "typing-pre-m4" },
  { at: 11000, phase: "m4" },
  { at: 14000, phase: "m5" },
  { at: 15500, phase: "typing-pre-card" },
  { at: 17000, phase: "card" },
  { at: 18500, phase: "card-cursor" },
  { at: 20000, phase: "card-settled" },
  { at: 21500, phase: "fade-out" },
];

const CYCLE_MS = 22500;

type ViewState = {
  visibleCount: number;
  typing: boolean;
  cardLanded: boolean;
  cursorOnCard: boolean;
  fading: boolean;
};

function stateFor(phase: Phase): ViewState {
  const base: ViewState = {
    visibleCount: 0,
    typing: false,
    cardLanded: false,
    cursorOnCard: false,
    fading: false,
  };
  switch (phase) {
    case "empty":
      return base;
    case "m1":
      return { ...base, visibleCount: 1 };
    case "typing-pre-m2":
      return { ...base, visibleCount: 1, typing: true };
    case "m2":
      return { ...base, visibleCount: 2 };
    case "m3":
      return { ...base, visibleCount: 3 };
    case "typing-pre-m4":
      return { ...base, visibleCount: 3, typing: true };
    case "m4":
      return { ...base, visibleCount: 4 };
    case "m5":
      return { ...base, visibleCount: 5 };
    case "typing-pre-card":
      return { ...base, visibleCount: 5, typing: true };
    case "card":
      return { ...base, visibleCount: 5, cardLanded: true };
    case "card-cursor":
      return { ...base, visibleCount: 5, cardLanded: true, cursorOnCard: true };
    case "card-settled":
      return { ...base, visibleCount: 5, cardLanded: true };
    case "fade-out":
      return { ...base, visibleCount: 5, cardLanded: true, fading: true };
  }
}

function timeFor(phase: Phase): string {
  if (
    phase === "empty" ||
    phase === "m1" ||
    phase === "typing-pre-m2" ||
    phase === "m2"
  ) {
    return "11:47";
  }
  if (phase === "m3" || phase === "typing-pre-m4" || phase === "m4") {
    return "11:48";
  }
  return "11:49";
}

function receiptFor(messageIndex: number, phase: Phase): ReceiptState | undefined {
  const idx = PHASE_ORDER.indexOf(phase);
  // m1 (index 0): sent at "m1" (1), delivered at "typing-pre-m2" (2), read at "m2"+ (3+)
  if (messageIndex === 0) {
    if (idx <= 1) return "single";
    if (idx === 2) return "double-soft";
    return "double-bone";
  }
  // m3 (index 2): sent at "m3" (4), delivered at "typing-pre-m4" (5), read at "m4"+ (6+)
  if (messageIndex === 2) {
    if (idx <= 4) return "single";
    if (idx === 5) return "double-soft";
    return "double-bone";
  }
  // m5 (index 4): sent at "m5" (7), delivered at "typing-pre-card" (8), read at "card"+ (9+)
  if (messageIndex === 4) {
    if (idx <= 7) return "single";
    if (idx === 8) return "double-soft";
    return "double-bone";
  }
  return undefined;
}

type Tier2ArtifactProps = {
  play: boolean;
};

export function Tier2Artifact({ play }: Tier2ArtifactProps) {
  const reduceMotion = useReducedMotion();
  const reduce = !!reduceMotion;
  const [phase, setPhase] = useState<Phase>(reduce ? "card-settled" : "empty");

  useEffect(() => {
    if (reduce) return;
    if (!play) return;

    let timers: ReturnType<typeof setTimeout>[] = [];
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const clearTimers = () => {
      timers.forEach(clearTimeout);
      timers = [];
    };

    const runCycle = () => {
      clearTimers();
      setPhase("empty");
      SCHEDULE.forEach(({ at, phase: next }) => {
        timers.push(setTimeout(() => setPhase(next), at));
      });
    };

    const stop = () => {
      clearTimers();
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const onVisibility = () => {
      if (document.hidden) {
        stop();
      } else {
        stop();
        runCycle();
        intervalId = setInterval(runCycle, CYCLE_MS);
      }
    };

    runCycle();
    intervalId = setInterval(runCycle, CYCLE_MS);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [play, reduce]);

  const view = stateFor(phase);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="relative">
        <PhoneShell width={PHONE_W} height={PHONE_H}>
          <StatusBar time={timeFor(phase)} />

          <ChatHeader reduce={reduce} />

          <ChatBody view={view} reduce={reduce} phase={phase} />

          <ComposerBar />
        </PhoneShell>

        <CursorDemo
          active={view.cursorOnCard}
          x="50%"
          y="92%"
          reduceMotion={reduce}
        />
      </div>

      <SpecCaption parts={captionParts} />
    </div>
  );
}

function ChatBody({
  view,
  reduce,
  phase,
}: {
  view: ViewState;
  reduce: boolean;
  phase: Phase;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [overflowY, setOverflowY] = useState(0);

  useEffect(() => {
    if (!innerRef.current || !bodyRef.current) return;
    const innerH = innerRef.current.scrollHeight;
    const containerH = bodyRef.current.clientHeight;
    setOverflowY(Math.max(0, innerH - containerH));
  }, [phase, view.visibleCount, view.typing, view.cardLanded]);

  const innerContent = (
    <>
      <DateChip />
      <div className="mt-3 flex flex-col gap-2">
        {conversation.slice(0, view.visibleCount).map((msg, i) => {
          const receipt =
            msg.kind === "text" && msg.side === "sent"
              ? receiptFor(i, phase)
              : undefined;
          return (
            <ChatMessage
              key={msg.id}
              message={msg}
              receiptState={receipt}
              cardHovered={false}
              cardLanded={false}
              reduce={reduce}
            />
          );
        })}

        <AnimatePresence>
          {view.typing && <TypingIndicator key="typing" side="received" />}
        </AnimatePresence>

        {view.cardLanded && (
          <motion.div
            animate={{ y: view.cursorOnCard ? -2 : 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="flex w-full"
          >
            <ChatMessage
              key={cardMessage.id}
              message={cardMessage}
              cardHovered={view.cursorOnCard}
              cardLanded={view.cardLanded}
              reduce={reduce}
            />
          </motion.div>
        )}
      </div>
    </>
  );

  return (
    <div
      ref={bodyRef}
      className="relative flex-1 overflow-hidden bg-card px-3 pb-3 pt-2"
    >
      {reduce ? (
        <div ref={innerRef}>{innerContent}</div>
      ) : (
        <motion.div
          ref={innerRef}
          animate={{ y: -overflowY, opacity: view.fading ? 0 : 1 }}
          transition={{
            y: { duration: 0.45, ease: EASE },
            opacity: { duration: 0.2, ease: EASE },
          }}
        >
          {innerContent}
        </motion.div>
      )}
    </div>
  );
}

function ChatHeader({ reduce }: { reduce: boolean }) {
  return (
    <div className="flex h-[56px] items-center gap-3 border-b border-border-warm bg-ink/40 px-3">
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        className="text-bone"
      >
        <ChevronLeftIcon size={16} />
      </button>

      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta">
        <span className="font-serif text-[15px] text-bone">MA</span>
      </div>

      <div className="flex-1">
        <p className="font-sans text-[13px] font-semibold leading-tight text-bone">
          {data.brand.name}
        </p>
        <p className="mt-0.5 flex items-center gap-1.5 font-sans text-[10px] text-stone-soft">
          {reduce ? (
            <span className="h-1.5 w-1.5 rounded-full bg-terracotta" aria-hidden="true" />
          ) : (
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-terracotta"
              aria-hidden="true"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
            />
          )}
          Online
        </p>
      </div>

      <div className="flex items-center gap-3 text-stone-soft">
        <VideoCallIcon size={18} />
        <VoiceCallIcon size={18} />
      </div>
    </div>
  );
}

function DateChip() {
  return (
    <div className="flex justify-center">
      <span className="rounded-full border border-border-warm bg-card-elevated/60 px-3 py-1 font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-stone-soft">
        Today
      </span>
    </div>
  );
}

function ComposerBar() {
  return (
    <div className="flex items-center gap-2 border-t border-border-warm bg-ink/40 px-3 py-2.5">
      <button type="button" tabIndex={-1} className="text-stone-soft" aria-hidden="true">
        <AttachIcon size={18} />
      </button>
      <div className="flex-1 rounded-full border border-border-warm bg-card px-3 py-1.5">
        <span className="font-sans text-[12px] text-stone-soft">Message</span>
      </div>
      <button type="button" tabIndex={-1} className="text-stone-soft" aria-hidden="true">
        <EmojiIcon size={18} />
      </button>
      <button type="button" tabIndex={-1} className="text-stone-soft" aria-hidden="true">
        <MicIcon size={18} />
      </button>
    </div>
  );
}

export default Tier2Artifact;
