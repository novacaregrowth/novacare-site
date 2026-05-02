"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { copy } from "@/content/copy";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function StaticAddOnNote() {
  const addon = copy.home.services.addon;
  return (
    <div className="mx-auto max-w-[60ch] text-center">
      <div
        aria-hidden="true"
        className="mx-auto h-px w-4 bg-terracotta"
      />
      <span className="mt-2 inline-block font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-stone-soft">
        {addon.label}
      </span>
      <p className="mt-3 font-sans text-stone-soft text-[14px] leading-[1.5]">
        {addon.body}
      </p>
    </div>
  );
}

export function AddOnNote() {
  const reduce = useReducedMotion() ?? false;

  if (reduce) return <StaticAddOnNote />;

  const addon = copy.home.services.addon;

  const variants: Variants = {
    hidden: { opacity: 0.01, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: EASE },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={variants}
      className="mx-auto max-w-[60ch] text-center"
    >
      <div
        aria-hidden="true"
        className="mx-auto h-px w-4 bg-terracotta"
      />
      <span className="mt-2 inline-block font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-stone-soft">
        {addon.label}
      </span>
      <p className="mt-3 font-sans text-stone-soft text-[14px] leading-[1.5]">
        {addon.body}
      </p>
    </motion.div>
  );
}
