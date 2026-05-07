"use client";

import { useRef } from "react";

import Image from "next/image";

import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { cn } from "@/lib/utils";
import { copy } from "@/content/copy";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const HAIRLINE_DURATION_S = 0.4;
const CAPTION_DELAY_S = 0.4;
const CAPTION_DURATION_S = 0.3;
const HEADLINE_START_S = 0.7;
const WORD_DURATION_S = 0.3;
const WORD_STAGGER_S = 0.08;
const POST_HEADLINE_GAP_S = 0.2;
const SUBHEAD_DURATION_S = 0.5;
const POST_SUBHEAD_GAP_S = 0.3;
const CTA_DURATION_S = 0.5;

const sharedBtn = cn(
  "inline-flex items-center justify-center rounded-[var(--radius)]",
  "py-[18px] px-[28px]",
  "text-[12px] font-medium uppercase tracking-[0.12em]",
  "focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta",
  "transition-colors duration-300 ease-out",
);

const primaryBtnClasses = cn(
  sharedBtn,
  "bg-bone text-ink hover:bg-terracotta hover:text-bone",
);

const closing = copy.home.closing;

function StaticClosingCTA() {
  return (
    <section
      aria-labelledby="closing-heading"
      className="relative flex min-h-[120svh] items-center overflow-hidden bg-ink"
    >
      <Image
        src="/beat-6-amber-smoke-poster.jpg"
        alt=""
        aria-hidden={true}
        fill
        sizes="100vw"
        className="absolute inset-0 object-cover z-0"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to right, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.45) 50%, rgba(10,10,10,0.2) 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[30%] pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,1) 0%, rgba(10,10,10,0.85) 30%, rgba(10,10,10,0.4) 70%, rgba(10,10,10,0) 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[30%] pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(10,10,10,0.4) 30%, rgba(10,10,10,0.85) 70%, rgba(10,10,10,1) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-24 md:px-12 md:py-40 lg:px-24">
        <div className="flex max-w-[1200px] flex-col items-start">
          <div className="flex items-center gap-4">
            <div aria-hidden="true" className="h-px w-8 bg-terracotta" />
            <span className="font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-stone-soft">
              {closing.capacity}
            </span>
          </div>

          <h2
            id="closing-heading"
            className="mt-12 max-w-[20ch] font-serif text-[44px] font-normal leading-[1.05] tracking-[-0.02em] text-bone md:mt-16 md:text-[64px]"
          >
            {closing.h2}
          </h2>

          <p className="mt-6 max-w-[40ch] font-sans text-[18px] font-normal leading-[1.5] text-stone-soft md:text-[20px]">
            {closing.sub}
          </p>

          <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
            <a
              href={closing.primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message us on WhatsApp (opens in a new tab)"
              className={cn(primaryBtnClasses, "w-full sm:w-auto")}
            >
              {closing.primaryCta.label}
            </a>

            <a
              href={closing.secondaryCta.href}
              aria-label={`Email ${closing.secondaryCta.label}`}
              className="group relative inline-block font-sans text-[18px] leading-[1.5] text-bone focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta md:text-[20px]"
            >
              <span>{closing.secondaryCta.label}</span>
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 right-0 h-px origin-left scale-x-0 bg-terracotta transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ClosingCTA() {
  const reduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  if (reduce) return <StaticClosingCTA />;

  const h2Words = closing.h2.split(" ");

  const subheadDelayS =
    HEADLINE_START_S +
    (h2Words.length - 1) * WORD_STAGGER_S +
    WORD_DURATION_S +
    POST_HEADLINE_GAP_S;

  const ctaDelayS = subheadDelayS + SUBHEAD_DURATION_S + POST_SUBHEAD_GAP_S;

  const hairlineVariants: Variants = {
    hidden: { width: 0 },
    visible: {
      width: 32,
      transition: { duration: HAIRLINE_DURATION_S, ease: EASE },
    },
  };

  const captionVariants: Variants = {
    hidden: { opacity: 0.01, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: CAPTION_DELAY_S,
        duration: CAPTION_DURATION_S,
        ease: EASE,
      },
    },
  };

  const headlineGroupVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: HEADLINE_START_S,
        staggerChildren: WORD_STAGGER_S,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0.01, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: WORD_DURATION_S, ease: EASE },
    },
  };

  const subheadVariants: Variants = {
    hidden: { opacity: 0.01, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: subheadDelayS,
        duration: SUBHEAD_DURATION_S,
        ease: EASE,
      },
    },
  };

  const ctaPairVariants: Variants = {
    hidden: { opacity: 0.01, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: ctaDelayS,
        duration: CTA_DURATION_S,
        ease: EASE,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="closing-heading"
      className="relative flex min-h-[120svh] items-center overflow-hidden bg-ink"
    >
      <video
        src="/beat-6-amber-smoke.mp4"
        poster="/beat-6-amber-smoke-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to right, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.45) 50%, rgba(10,10,10,0.2) 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[30%] pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,1) 0%, rgba(10,10,10,0.85) 30%, rgba(10,10,10,0.4) 70%, rgba(10,10,10,0) 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[30%] pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(10,10,10,0.4) 30%, rgba(10,10,10,0.85) 70%, rgba(10,10,10,1) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-24 md:px-12 md:py-40 lg:px-24">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex max-w-[1200px] flex-col items-start"
        >
          <div className="flex items-center gap-4">
            <motion.div
              variants={hairlineVariants}
              aria-hidden="true"
              className="h-px bg-terracotta"
            />
            <motion.span
              variants={captionVariants}
              className="font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-stone-soft"
            >
              {closing.capacity}
            </motion.span>
          </div>

          <motion.h2
            id="closing-heading"
            variants={headlineGroupVariants}
            aria-label={closing.h2}
            className="mt-12 max-w-[20ch] font-serif text-[44px] font-normal leading-[1.05] tracking-[-0.02em] text-bone md:mt-16 md:text-[64px]"
          >
            {h2Words.map((word, i) => {
              const isLast = i === h2Words.length - 1;
              return (
                <motion.span
                  key={i}
                  aria-hidden="true"
                  variants={wordVariants}
                  className={isLast ? "inline-block" : "mr-[0.25em] inline-block"}
                >
                  {word}
                </motion.span>
              );
            })}
          </motion.h2>

          <motion.p
            variants={subheadVariants}
            className="mt-6 max-w-[40ch] font-sans text-[18px] font-normal leading-[1.5] text-stone-soft md:text-[20px]"
          >
            {closing.sub}
          </motion.p>

          <motion.div
            variants={ctaPairVariants}
            className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8"
          >
            <a
              href={closing.primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message us on WhatsApp (opens in a new tab)"
              className={cn(primaryBtnClasses, "w-full sm:w-auto")}
            >
              {closing.primaryCta.label}
            </a>

            <a
              href={closing.secondaryCta.href}
              aria-label={`Email ${closing.secondaryCta.label}`}
              className="group relative inline-block font-sans text-[18px] leading-[1.5] text-bone focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta md:text-[20px]"
            >
              <span>{closing.secondaryCta.label}</span>
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 right-0 h-px origin-left scale-x-0 bg-terracotta transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
