"use client";

import { useRef } from "react";

import { motion, useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { copy } from "@/content/copy";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const T_CAPACITY_S = 0;
const T_HAIRLINE_S = 0.1;
const T_CAPACITY_LINE_S = 0.25;
const T_HEADLINE_S = 0.4;
const T_SUB_S = 0.65;
const T_PRIMARY_S = 0.85;
const T_SECONDARY_S = 0.95;

const closing = copy.services.closing;

const primaryBtnClasses = cn(
  "inline-flex items-center justify-center rounded-[var(--radius)]",
  "py-[18px] px-[28px]",
  "text-[12px] font-medium uppercase tracking-[0.12em]",
  "bg-bone text-ink hover:bg-terracotta hover:text-bone",
  "focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta",
  "transition-colors duration-300 ease-out",
);

export function ServicesClosingCTA() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  const play = inView && !reduce;

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0.01, y: 8 },
          animate: play
            ? { opacity: 1, y: 0 }
            : { opacity: 0.01, y: 8 },
          transition: { duration: 0.6, ease: EASE, delay },
        };

  return (
    <section
      ref={ref}
      aria-labelledby="services-closing-heading"
      className="relative bg-ink py-24 md:py-40"
    >
      <div className="mx-auto w-full max-w-[720px] px-6 md:px-12 text-center">
        <div className="flex flex-col items-center gap-3">
          <motion.span
            {...fade(T_CAPACITY_S)}
            className="font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-stone-soft"
          >
            {closing.sectionLabel}
          </motion.span>
          {reduce ? (
            <span aria-hidden="true" className="block h-px w-6 bg-terracotta" />
          ) : (
            <motion.span
              aria-hidden="true"
              className="block h-px w-6 bg-terracotta origin-center"
              initial={{ scaleX: 0.01 }}
              animate={play ? { scaleX: 1 } : { scaleX: 0.01 }}
              transition={{ duration: 0.6, ease: EASE, delay: T_HAIRLINE_S }}
            />
          )}
        </div>

        <motion.p
          {...fade(T_CAPACITY_LINE_S)}
          className="mt-4 font-sans text-[16px] leading-[1.5] text-stone-soft"
        >
          {closing.capacity}
        </motion.p>

        <motion.h2
          id="services-closing-heading"
          {...fade(T_HEADLINE_S)}
          className={cn(
            "mt-8 font-serif font-normal text-bone",
            "text-[32px] tracking-[-0.02em] leading-[1.1]",
            "md:text-[48px]",
          )}
        >
          {closing.h2}
        </motion.h2>

        <motion.p
          {...fade(T_SUB_S)}
          className={cn(
            "mt-6 mx-auto text-stone-soft font-normal",
            "text-[18px] leading-[1.55] md:text-[20px] md:leading-[1.5]",
            "max-w-[560px]",
          )}
        >
          {closing.sub}
        </motion.p>

        <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
          <motion.a
            {...fade(T_PRIMARY_S)}
            href={closing.primaryCta.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${closing.primaryCta.label} (opens in a new tab)`}
            className={primaryBtnClasses}
          >
            {closing.primaryCta.label}
          </motion.a>

          <motion.span
            {...fade(T_SECONDARY_S)}
            className="font-sans text-[14px] leading-[1.5] text-stone-soft"
          >
            <a
              href={closing.secondaryCta.href}
              aria-label={`Email ${closing.secondaryCta.label}`}
              className="group relative inline-block focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
            >
              <span>{closing.secondaryCta.label}</span>
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 right-0 h-px origin-left scale-x-0 bg-terracotta transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </a>
          </motion.span>
        </div>
      </div>
    </section>
  );
}

export default ServicesClosingCTA;
