"use client";

import { motion } from "framer-motion";

import { ConfirmationCard } from "./ConfirmationCard";
import type { Message } from "./conversation";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const BUBBLE_INITIAL = { opacity: 0, scale: 0.96, y: 8 };
const BUBBLE_ANIMATE = { opacity: 1, scale: [0.96, 1.04, 1], y: 0 };
const BUBBLE_TRANSITION = {
  duration: 0.45,
  ease: EASE,
  times: [0, 0.6, 1],
};

export type ReceiptState = "single" | "double-soft" | "double-bone";

type Props = {
  message: Message;
  receiptState?: ReceiptState;
  cardHovered: boolean;
  cardLanded: boolean;
  reduce: boolean;
};

function SingleCheck({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 12 8"
      width="12"
      height="8"
      aria-hidden="true"
      style={{ color }}
    >
      <path
        d="M1 4.4 L4.2 7 L11 1"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DoubleCheck({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 16 8"
      width="16"
      height="8"
      aria-hidden="true"
      style={{ color }}
    >
      <path
        d="M1 4.4 L4.2 7 L11 1"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 4.4 L8.2 7 L15 1"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReadReceipt({ state }: { state: ReceiptState }) {
  if (state === "single") return <SingleCheck color="#8A8378" />;
  if (state === "double-soft") return <DoubleCheck color="#8A8378" />;
  return <DoubleCheck color="#F4F1EA" />;
}

export function ChatMessage({
  message,
  receiptState,
  cardHovered,
  cardLanded,
  reduce,
}: Props) {
  const isSent = message.side === "sent";
  const rowAlign = isSent ? "justify-end" : "justify-start";

  if (message.kind === "card") {
    const inner = (
      <div className={`w-full flex ${rowAlign}`}>
        <ConfirmationCard
          data={message.data}
          cardHovered={cardHovered}
          cardLanded={cardLanded}
          reduce={reduce}
        />
      </div>
    );
    return inner;
  }

  const bubbleColor = isSent ? "bg-bubble-sent" : "bg-card";
  const tail = isSent ? "rounded-br-[4px]" : "rounded-bl-[4px]";
  const tsAlign = isSent ? "justify-end" : "justify-start";

  const bubbleInner = (
    <div
      className={`max-w-[75%] ${bubbleColor} ${tail} rounded-[14px] px-3 py-1.5 flex flex-col border border-[rgba(244,241,234,0.04)]`}
    >
      <p className="font-sans text-[14px] text-bone leading-[1.4] whitespace-pre-wrap [overflow-wrap:anywhere]">
        {message.content}
      </p>
      <div className={`mt-1 flex items-center gap-1 ${tsAlign}`}>
        <span className="font-sans text-[11px] text-stone-soft leading-none tabular-nums">
          {message.timestamp}
        </span>
        {isSent && receiptState ? (
          <span className="flex items-center justify-center">
            <ReadReceipt state={receiptState} />
          </span>
        ) : null}
      </div>
    </div>
  );

  if (reduce) {
    return <div className={`w-full flex ${rowAlign}`}>{bubbleInner}</div>;
  }

  return (
    <motion.div
      initial={BUBBLE_INITIAL}
      animate={BUBBLE_ANIMATE}
      transition={BUBBLE_TRANSITION}
      className={`w-full flex ${rowAlign}`}
    >
      {bubbleInner}
    </motion.div>
  );
}
