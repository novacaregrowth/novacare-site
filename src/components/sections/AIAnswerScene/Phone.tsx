"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, type MotionValue } from "framer-motion";
import { ChevronLeft, Phone as PhoneIcon, Video } from "lucide-react";

import { ChatMessage, type ReceiptState } from "./ChatMessage";
import {
  CLINIC_NAME,
  CLINIC_STATUS,
  CONVERSATION,
  type Message,
} from "./conversation";
import { TypingIndicator } from "./TypingIndicator";

export type TypingSide = "sent" | "received" | null;

type Props = {
  visibleCount: number;
  typingSide: TypingSide;
  receiptStates: Record<string, ReceiptState>;
  cardHovered: boolean;
  cardLanded: boolean;
  reduce: boolean;
  statusBarX?: MotionValue<number>;
  headerX?: MotionValue<number>;
  messagesX?: MotionValue<number>;
  reflectionX?: MotionValue<number>;
  reflectionY?: MotionValue<number>;
};

const FRAME_GRADIENT =
  "linear-gradient(180deg, #322a22 0%, #221c17 50%, #161210 100%)";

const FRAME_BOX_SHADOW = [
  "0 0 0 1px rgba(244,241,234,0.15)",
  "inset 0 0 0 1px rgba(244,241,234,0.06)",
  "inset 0 1px 0 rgba(244,241,234,0.14)",
  "inset 0 -1px 0 rgba(0,0,0,0.4)",
].join(", ");

const REFLECTION_GRADIENT =
  "linear-gradient(135deg, rgba(244,241,234,0.04) 0%, rgba(244,241,234,0.01) 30%, rgba(244,241,234,0) 50%)";

function SignalIcon() {
  return (
    <svg
      viewBox="0 0 14 11"
      width="12"
      height="11"
      aria-hidden="true"
      className="text-bone"
    >
      <rect x="0" y="7" width="3" height="4" rx="0.5" fill="currentColor" />
      <rect x="4" y="4" width="3" height="7" rx="0.5" fill="currentColor" />
      <rect x="8" y="1" width="3" height="10" rx="0.5" fill="currentColor" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg
      viewBox="0 0 14 11"
      width="12"
      height="11"
      aria-hidden="true"
      className="text-bone"
    >
      <path
        d="M1 4.2 A6 6 0 0 1 13 4.2"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M3 6.4 A4 4 0 0 1 11 6.4"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M5 8.5 A2 2 0 0 1 9 8.5"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="7" cy="10" r="0.8" fill="currentColor" />
    </svg>
  );
}

function BatteryIcon({ percent }: { percent: number }) {
  const fillWidth = percent * 0.19;
  return (
    <svg
      viewBox="0 0 24 11"
      width="20"
      height="11"
      aria-hidden="true"
      className="text-bone"
    >
      <rect
        x="0.4"
        y="0.4"
        width="21.2"
        height="10.2"
        rx="2.4"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.45"
      />
      <rect
        x="22.4"
        y="3.4"
        width="1.2"
        height="4.2"
        rx="0.6"
        fill="currentColor"
        opacity="0.45"
      />
      <rect
        x="1.6"
        y="1.6"
        width={fillWidth}
        height="7.8"
        rx="1"
        fill="currentColor"
      />
    </svg>
  );
}

function PaperPlaneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      className="text-stone-soft"
    >
      <path
        d="M3 11L21 4L14 21L11 13L3 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DynamicIsland() {
  return (
    <div
      aria-hidden="true"
      className="absolute top-3 left-1/2 -translate-x-1/2 w-[84px] h-[24px] rounded-[16px] bg-black z-20"
    />
  );
}

function HomeIndicator() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[4px] rounded-[3px] bg-[rgba(244,241,234,0.35)] z-[15]"
    />
  );
}

function ScreenReflection({
  x,
  y,
}: {
  x?: MotionValue<number>;
  y?: MotionValue<number>;
}) {
  const className = "pointer-events-none absolute inset-0 z-10";
  if (!x || !y) {
    return (
      <div
        aria-hidden="true"
        className={className}
        style={{ backgroundImage: REFLECTION_GRADIENT }}
      />
    );
  }
  return (
    <motion.div
      aria-hidden="true"
      className={className}
      style={{
        backgroundImage: REFLECTION_GRADIENT,
        x,
        y,
      }}
    />
  );
}

function SideButtons() {
  return (
    <>
      {/* Power button (right) */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-[11%] w-[1px] h-[8%] bg-[#181210] z-[16]"
        style={{ boxShadow: "inset 0 1px 0 rgba(244,241,234,0.06)" }}
      />
      {/* Volume up (right) */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-[19%] w-[1px] h-[4%] bg-[#181210] z-[16]"
        style={{ boxShadow: "inset 0 1px 0 rgba(244,241,234,0.06)" }}
      />
      {/* Volume down (right) */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-[26%] w-[1px] h-[4%] bg-[#181210] z-[16]"
        style={{ boxShadow: "inset 0 1px 0 rgba(244,241,234,0.06)" }}
      />
      {/* Mute switch (left) */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-[11%] w-[1px] h-[3%] bg-[#181210] z-[16]"
        style={{ boxShadow: "inset 0 1px 0 rgba(244,241,234,0.06)" }}
      />
    </>
  );
}

function ContactShadow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-4"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 60% 100% at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 70%)",
        filter: "blur(8px)",
      }}
    />
  );
}

function StatusBar({ x }: { x?: MotionValue<number> }) {
  const inner = (
    <>
      <span className="font-sans text-[14px] font-semibold text-bone tabular-nums leading-none">
        11:47
      </span>
      <div className="flex items-center gap-1">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon percent={87} />
      </div>
    </>
  );
  if (!x) {
    return (
      <div className="relative h-[44px] px-4 flex items-center justify-between">
        {inner}
      </div>
    );
  }
  return (
    <motion.div
      style={{ x }}
      className="relative h-[44px] px-4 flex items-center justify-between"
    >
      {inner}
    </motion.div>
  );
}

function ChatHeader({ x }: { x?: MotionValue<number> }) {
  const inner = (
    <>
      <div className="flex items-center gap-2.5 min-w-0">
        <ChevronLeft
          size={20}
          strokeWidth={1.75}
          className="text-stone-soft flex-shrink-0"
          aria-hidden="true"
        />
        <div
          className="w-8 h-8 rounded-full bg-card flex items-center justify-center font-serif font-normal text-bone text-[14px] flex-shrink-0"
          aria-hidden="true"
        >
          M
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-sans text-[15px] font-semibold text-bone leading-tight truncate">
            {CLINIC_NAME}
          </span>
          <span className="font-sans text-[12px] text-stone-soft leading-tight">
            {CLINIC_STATUS}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <Video
          size={18}
          strokeWidth={1.75}
          className="text-stone-soft"
          aria-hidden="true"
        />
        <PhoneIcon
          size={18}
          strokeWidth={1.75}
          className="text-stone-soft"
          aria-hidden="true"
        />
      </div>
    </>
  );
  const className =
    "h-[56px] px-4 flex items-center justify-between [border-bottom:0.5px_solid_rgba(244,241,234,0.06)]";
  if (!x) return <div className={className}>{inner}</div>;
  return (
    <motion.div style={{ x }} className={className}>
      {inner}
    </motion.div>
  );
}

function ComposerBar() {
  return (
    <div className="h-[48px] px-3 flex items-center gap-2 [border-top:0.5px_solid_rgba(244,241,234,0.06)] bg-ink">
      <div className="flex-1 h-9 rounded-full bg-[rgba(244,241,234,0.04)] px-3 flex items-center">
        <span className="font-sans text-[13px] text-stone-soft select-none">
          Message
        </span>
      </div>
      <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
        <PaperPlaneIcon />
      </div>
    </div>
  );
}

function MessageList({
  visibleCount,
  typingSide,
  receiptStates,
  cardHovered,
  cardLanded,
  reduce,
  x,
}: {
  visibleCount: number;
  typingSide: TypingSide;
  receiptStates: Record<string, ReceiptState>;
  cardHovered: boolean;
  cardLanded: boolean;
  reduce: boolean;
  x?: MotionValue<number>;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const visible: Message[] = CONVERSATION.slice(0, visibleCount);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [visibleCount, typingSide]);

  const inner = (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto bg-ink px-3 py-2 flex flex-col gap-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 12%, black 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 12%, black 100%)",
      }}
    >
      {visible.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          receiptState={
            message.kind === "text" && message.side === "sent"
              ? receiptStates[message.id]
              : undefined
          }
          cardHovered={cardHovered}
          cardLanded={cardLanded}
          reduce={reduce}
        />
      ))}
      <AnimatePresence mode="popLayout" initial={false}>
        {typingSide ? (
          <TypingIndicator key={`typing-${typingSide}`} side={typingSide} />
        ) : null}
      </AnimatePresence>
    </div>
  );

  if (!x) {
    return inner;
  }

  return (
    <motion.div style={{ x }} className="flex-1 flex flex-col min-h-0">
      {inner}
    </motion.div>
  );
}

export function Phone({
  visibleCount,
  typingSide,
  receiptStates,
  cardHovered,
  cardLanded,
  reduce,
  statusBarX,
  headerX,
  messagesX,
  reflectionX,
  reflectionY,
}: Props) {
  return (
    <div className="relative">
      <div
        className="relative w-[min(55vw,210px)] md:w-[min(340px,38vh)] aspect-[9/19.5] rounded-[44px]"
        style={{
          backgroundImage: FRAME_GRADIENT,
          boxShadow: FRAME_BOX_SHADOW,
        }}
      >
        <SideButtons />
        <div className="absolute inset-[3px] rounded-[41px] bg-ink overflow-hidden flex flex-col">
          <DynamicIsland />
          <StatusBar x={statusBarX} />
          <ChatHeader x={headerX} />
          <MessageList
            visibleCount={visibleCount}
            typingSide={typingSide}
            receiptStates={receiptStates}
            cardHovered={cardHovered}
            cardLanded={cardLanded}
            reduce={reduce}
            x={messagesX}
          />
          <ComposerBar />
          <HomeIndicator />
          <ScreenReflection x={reflectionX} y={reflectionY} />
        </div>
      </div>
      <ContactShadow />
    </div>
  );
}
