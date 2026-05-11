"use client";

import { useEffect, useRef, useState } from "react";

import { AnimatePresence, useReducedMotion } from "framer-motion";

import type { CardMessage, Message } from "@/components/sections/AIAnswerScene/conversation";
import { ChatMessage, type ReceiptState } from "@/components/sections/AIAnswerScene/ChatMessage";
import { TypingIndicator } from "@/components/sections/AIAnswerScene/TypingIndicator";
import { copy } from "@/content/copy";

import { PhoneShell } from "./shared/PhoneShell";
import { StatusBar } from "./shared/StatusBar";
import { SpecCaption } from "./shared/SpecCaption";
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
  | "card";

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
];

const CYCLE_MS = 22500;

type ViewState = {
  visibleCount: number;
  typing: boolean;
  cardLanded: boolean;
};

function stateFor(phase: Phase): ViewState {
  switch (phase) {
    case "empty":
      return { visibleCount: 0, typing: false, cardLanded: false };
    case "m1":
      return { visibleCount: 1, typing: false, cardLanded: false };
    case "typing-pre-m2":
      return { visibleCount: 1, typing: true, cardLanded: false };
    case "m2":
      return { visibleCount: 2, typing: false, cardLanded: false };
    case "m3":
      return { visibleCount: 3, typing: false, cardLanded: false };
    case "typing-pre-m4":
      return { visibleCount: 3, typing: true, cardLanded: false };
    case "m4":
      return { visibleCount: 4, typing: false, cardLanded: false };
    case "m5":
      return { visibleCount: 5, typing: false, cardLanded: false };
    case "typing-pre-card":
      return { visibleCount: 5, typing: true, cardLanded: false };
    case "card":
      return { visibleCount: 5, typing: false, cardLanded: true };
  }
}

function receiptFor(messageIndex: number, visibleCount: number): ReceiptState {
  // Sent messages live at indices 0, 2, 4 (m1, m3, m5)
  // Receipt evolves as later messages arrive
  const messagesAfter = visibleCount - messageIndex - 1;
  if (messagesAfter <= 0) return "single";
  if (messagesAfter === 1) return "double-soft";
  return "double-bone";
}

type Tier2ArtifactProps = {
  play: boolean;
};

export function Tier2Artifact({ play }: Tier2ArtifactProps) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(reduce ? "card" : "empty");
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (reduce) return;
    if (!play) return;

    const clearAll = () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };

    const runCycle = () => {
      clearAll();
      setPhase("empty");
      SCHEDULE.forEach(({ at, phase: next }) => {
        timersRef.current.push(setTimeout(() => setPhase(next), at));
      });
    };

    runCycle();
    intervalRef.current = setInterval(runCycle, CYCLE_MS);

    return () => {
      clearAll();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [play, reduce]);

  const view = stateFor(phase);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <PhoneShell width={PHONE_W} height={PHONE_H}>
        <StatusBar time="11:47" />

        <ChatHeader />

        <div className="flex-1 overflow-hidden bg-card px-3 pb-3 pt-2">
          <DateChip />

          <div className="mt-3 flex flex-col gap-2">
            {conversation.slice(0, view.visibleCount).map((msg, i) => {
              const receipt =
                msg.kind === "text" && msg.side === "sent"
                  ? receiptFor(i, view.visibleCount)
                  : undefined;
              return (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  receiptState={receipt}
                  cardHovered={false}
                  cardLanded={false}
                  reduce={!!reduce}
                />
              );
            })}

            <AnimatePresence>
              {view.typing && (
                <TypingIndicator key="typing" side="received" />
              )}
            </AnimatePresence>

            {view.cardLanded && (
              <ChatMessage
                key={cardMessage.id}
                message={cardMessage}
                cardHovered={false}
                cardLanded={view.cardLanded}
                reduce={!!reduce}
              />
            )}
          </div>
        </div>

        <ComposerBar />
      </PhoneShell>

      <SpecCaption parts={captionParts} />
    </div>
  );
}

function ChatHeader() {
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
          <span className="h-1.5 w-1.5 rounded-full bg-terracotta" aria-hidden="true" />
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
