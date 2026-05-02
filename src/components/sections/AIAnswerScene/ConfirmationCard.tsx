"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import type { CardMessage } from "./conversation";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const BASE_BOX_SHADOW = "inset 0 0 0 1px rgba(244,241,234,0.04)";
const GLOWED_BOX_SHADOW =
  "inset 0 0 0 1px rgba(244,241,234,0.04), inset 0 0 30px -10px rgba(200,109,79,0.15)";

type Props = {
  data: CardMessage["data"];
  cardHovered: boolean;
  cardLanded: boolean;
  reduce: boolean;
};

function CardBody({ data }: { data: CardMessage["data"] }) {
  return (
    <>
      <span className="font-sans text-[11px] tracking-[0.12em] uppercase text-stone-soft leading-none">
        {data.label}
      </span>
      <span className="font-sans text-[15px] font-semibold text-bone leading-tight mt-2">
        {data.date}, {data.time}
      </span>
      <span className="font-sans text-[13px] text-stone-soft leading-tight mt-1">
        {data.doctor} · {data.duration}
      </span>
      <span className="font-sans text-[13px] text-stone-soft leading-tight mt-1">
        {data.location}
      </span>
      <button
        type="button"
        className="mt-3 self-start font-sans text-[12px] tracking-[0.12em] uppercase font-medium text-bone bg-transparent border border-[rgba(244,241,234,0.25)] rounded-md px-3 py-2 transition-colors duration-200 hover:border-[rgba(244,241,234,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-card cursor-pointer"
      >
        + Add to Calendar
      </button>
    </>
  );
}

export function ConfirmationCard({
  data,
  cardHovered,
  cardLanded,
  reduce,
}: Props) {
  const [cardGlowed, setCardGlowed] = useState(false);

  useEffect(() => {
    if (!cardLanded || reduce) return;
    const id = setTimeout(() => setCardGlowed(true), 16);
    return () => clearTimeout(id);
  }, [cardLanded, reduce]);

  if (reduce) {
    return (
      <div
        role="article"
        aria-label="Appointment confirmation"
        className="relative w-[75%] max-w-[260px] rounded-[14px] bg-card p-4 flex flex-col"
        style={{ boxShadow: GLOWED_BOX_SHADOW }}
      >
        <span
          aria-hidden="true"
          className="absolute left-1 top-1/2 -translate-y-1/2 w-[2px] h-[24px] bg-terracotta"
        />
        <CardBody data={data} />
      </div>
    );
  }

  return (
    <motion.div
      role="article"
      aria-label="Appointment confirmation"
      initial={{ opacity: 0, scale: 0.94, y: 6 }}
      animate={{
        opacity: 1,
        scale: [0.94, 1.02, 1],
        y: 0,
        boxShadow: cardGlowed ? GLOWED_BOX_SHADOW : BASE_BOX_SHADOW,
      }}
      transition={{
        duration: 0.9,
        ease: EASE,
        times: [0, 0.6, 1],
        boxShadow: { duration: 0.8, ease: EASE },
      }}
      className="relative w-[75%] max-w-[260px] rounded-[14px] bg-card p-4 flex flex-col"
    >
      <motion.span
        aria-hidden="true"
        className="absolute left-1 top-1/2 -translate-y-1/2 h-[24px]"
        animate={{
          width: cardHovered ? 2 : 1,
          backgroundColor: cardHovered ? "#D77E5F" : "#C86D4F",
        }}
        transition={{ duration: 0.3, ease: EASE }}
      />
      <CardBody data={data} />
    </motion.div>
  );
}
