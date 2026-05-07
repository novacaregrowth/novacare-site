"use client";

import { useRef } from "react";

import Image from "next/image";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

import { cn } from "@/lib/utils";
import { copy } from "@/content/copy";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PRE_PILLARS_DELAY_S = 0.8;
const PILLAR_STAGGER_S = 0.4;

const WORD_DURATION_S = 0.3;
const WORD_STAGGER_S = 0.08;
const POST_HEADING_GAP_S = 0.2;

const BODY_DURATION_S = 0.5;
const NUMERAL_DURATION_S = 0.5;

const BODY_OPACITY_RANGE = [0, 0.4, 0.6, 1];
const BODY_OPACITY_OUTPUT = [0.3, 1, 1, 0.3];

const HAIRLINE_DURATION_S = 0.4;
const CLOSING_CAPTION_DELAY_S = 0.4;
const CLOSING_CAPTION_DURATION_S = 0.3;
const HEADLINE_START_S = 0.7;
const POST_HEADLINE_GAP_S = 0.2;
const SUBHEAD_DURATION_S = 0.5;
const POST_SUBHEAD_GAP_S = 0.3;
const CTA_DURATION_S = 0.5;
const POST_CTA_GAP_S = 0.3;
const EMAIL_CAPTION_DURATION_S = 0.3;

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

const TOP_FADE_FROM_INK =
  "linear-gradient(to bottom, rgba(10,10,10,1) 0%, rgba(10,10,10,0.85) 30%, rgba(10,10,10,0.4) 70%, rgba(10,10,10,0) 100%)";
const WASH_LEFT =
  "linear-gradient(to right, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.45) 50%, rgba(10,10,10,0.2) 100%)";
const BOTTOM_FADE_TO_INK =
  "linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(10,10,10,0.4) 30%, rgba(10,10,10,0.85) 70%, rgba(10,10,10,1) 100%)";

function bodyDelayForTitle(title: string): number {
  const wordCount = title.split(" ").length;
  return WORD_DURATION_S + (wordCount - 1) * WORD_STAGGER_S + POST_HEADING_GAP_S;
}

type WhyPillar = (typeof copy.home.why)["points"][number];

function StaticClosingArc() {
  const why = copy.home.why;
  const closing = copy.home.closing;

  return (
    <section className="relative bg-ink overflow-hidden">
      <section
        aria-labelledby="why-heading"
        className="relative pt-20 md:pt-32"
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
          <h2 id="why-heading" className="sr-only">
            {why.label}
          </h2>

          <div className="flex items-center gap-4">
            <div aria-hidden="true" className="h-px w-12 bg-terracotta" />
            <span className="font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-stone-soft">
              {why.label}
            </span>
          </div>

          <div className="mt-16 md:mt-24 grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 md:gap-x-16 md:gap-y-24">
            {why.points.map((p, i) => (
              <article key={p.title}>
                <span
                  aria-hidden="true"
                  className="block font-serif font-light text-stone-soft text-[36px] md:text-[48px] tracking-[-0.02em] leading-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-serif font-normal text-bone text-[24px] md:text-[32px] tracking-[-0.02em] leading-[1.2]">
                  {p.title}
                </h3>
                <p className="mt-6 max-w-[880px] font-sans font-normal text-stone-soft text-[18px] md:text-[20px] leading-[1.5]">
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="closing-heading"
        className="relative pt-[12vh] md:pt-[16vh] overflow-hidden"
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
          className="absolute inset-x-0 top-0 h-[12vh] md:h-[16vh] pointer-events-none z-[1]"
          style={{ background: TOP_FADE_FROM_INK }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{ background: WASH_LEFT }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[36svh] pointer-events-none z-[1]"
          style={{ background: BOTTOM_FADE_TO_INK }}
        />

        <div className="relative z-10 flex min-h-[70svh] items-center">
          <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-12 md:py-40 lg:px-24">
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

              <a
                href={closing.primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message us on WhatsApp (opens in a new tab)"
                className={cn(primaryBtnClasses, "mt-24 w-full sm:w-auto")}
              >
                {closing.primaryCta.label}
              </a>

              <p className="mt-6 font-sans text-[14px] leading-[1.5] text-stone-soft">
                {closing.secondaryCtaPrefix}
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
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

function PillarMotion({
  point,
  index,
}: {
  point: WhyPillar;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bodyOpacity = useTransform(
    scrollYProgress,
    BODY_OPACITY_RANGE,
    BODY_OPACITY_OUTPUT,
  );

  const numeral = String(index + 1).padStart(2, "0");
  const words = point.title.split(" ");
  const bodyDelay = bodyDelayForTitle(point.title);

  const pillarVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0 } },
  };

  const pillarNumeralVariants: Variants = {
    hidden: { opacity: 0.01, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: NUMERAL_DURATION_S, ease: EASE },
    },
  };

  const headingContainerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: WORD_STAGGER_S } },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0.01, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: WORD_DURATION_S, ease: EASE },
    },
  };

  const bodyVariants: Variants = {
    hidden: { y: 16 },
    visible: {
      y: 0,
      transition: { delay: bodyDelay, duration: BODY_DURATION_S, ease: EASE },
    },
  };

  return (
    <motion.article ref={ref} variants={pillarVariants}>
      <motion.span
        variants={pillarNumeralVariants}
        aria-hidden="true"
        className="block font-serif font-light text-stone-soft text-[36px] md:text-[48px] tracking-[-0.02em] leading-none"
      >
        {numeral}
      </motion.span>
      <motion.h3
        variants={headingContainerVariants}
        aria-label={point.title}
        className="mt-4 font-serif font-normal text-bone text-[24px] md:text-[32px] tracking-[-0.02em] leading-[1.2]"
      >
        {words.map((word, i) => {
          const isLast = i === words.length - 1;
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
      </motion.h3>
      <motion.p
        variants={bodyVariants}
        style={{ opacity: bodyOpacity }}
        className="mt-6 max-w-[880px] font-sans font-normal text-stone-soft text-[18px] md:text-[20px] leading-[1.5]"
      >
        {point.body}
      </motion.p>
    </motion.article>
  );
}

export function ClosingArc() {
  const reduce = useReducedMotion() ?? false;
  const pillarsRef = useRef<HTMLElement>(null);
  const closingContentRef = useRef<HTMLDivElement>(null);
  const pillarsInView = useInView(pillarsRef, { once: true, amount: 0.05 });
  const closingInView = useInView(closingContentRef, {
    once: true,
    amount: 0.1,
  });

  if (reduce) return <StaticClosingArc />;

  const why = copy.home.why;
  const closing = copy.home.closing;

  const headerLineVariants: Variants = {
    hidden: { width: 0 },
    visible: {
      width: 48,
      transition: { duration: 0.3, ease: EASE },
    },
  };

  const whyCaptionVariants: Variants = {
    hidden: { opacity: 0.01, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.4, duration: 0.2, ease: EASE },
    },
  };

  const pillarsContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: PRE_PILLARS_DELAY_S,
        staggerChildren: PILLAR_STAGGER_S,
      },
    },
  };

  const h2Words = closing.h2.split(" ");

  const subheadDelayS =
    HEADLINE_START_S +
    (h2Words.length - 1) * WORD_STAGGER_S +
    WORD_DURATION_S +
    POST_HEADLINE_GAP_S;
  const ctaDelayS = subheadDelayS + SUBHEAD_DURATION_S + POST_SUBHEAD_GAP_S;
  const emailCaptionDelayS = ctaDelayS + CTA_DURATION_S + POST_CTA_GAP_S;

  const hairlineVariants: Variants = {
    hidden: { width: 0 },
    visible: {
      width: 32,
      transition: { duration: HAIRLINE_DURATION_S, ease: EASE },
    },
  };

  const closingCaptionVariants: Variants = {
    hidden: { opacity: 0.01, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: CLOSING_CAPTION_DELAY_S,
        duration: CLOSING_CAPTION_DURATION_S,
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

  const ctaVariants: Variants = {
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

  const emailCaptionVariants: Variants = {
    hidden: { opacity: 0.01, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: emailCaptionDelayS,
        duration: EMAIL_CAPTION_DURATION_S,
        ease: EASE,
      },
    },
  };

  return (
    <section className="relative bg-ink overflow-hidden">
      <section
        ref={pillarsRef}
        aria-labelledby="why-heading"
        className="relative pt-20 md:pt-32"
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
          <h2 id="why-heading" className="sr-only">
            {why.label}
          </h2>

          <motion.div
            initial="hidden"
            animate={pillarsInView ? "visible" : "hidden"}
            className="flex items-center gap-4"
          >
            <motion.div
              variants={headerLineVariants}
              aria-hidden="true"
              className="h-px bg-terracotta"
            />
            <motion.span
              variants={whyCaptionVariants}
              className="font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-stone-soft"
            >
              {why.label}
            </motion.span>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={pillarsInView ? "visible" : "hidden"}
            variants={pillarsContainerVariants}
            className="mt-16 md:mt-24 grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 md:gap-x-16 md:gap-y-24"
          >
            {why.points.map((p, i) => (
              <PillarMotion key={p.title} point={p} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      <section
        aria-labelledby="closing-heading"
        className="relative pt-[12vh] md:pt-[16vh] overflow-hidden"
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
          className="absolute inset-x-0 top-0 h-[12vh] md:h-[16vh] pointer-events-none z-[1]"
          style={{ background: TOP_FADE_FROM_INK }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{ background: WASH_LEFT }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[36svh] pointer-events-none z-[1]"
          style={{ background: BOTTOM_FADE_TO_INK }}
        />

        <div
          ref={closingContentRef}
          className="relative z-10 flex min-h-[70svh] items-center"
        >
          <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-12 md:py-40 lg:px-24">
            <motion.div
              initial="hidden"
              animate={closingInView ? "visible" : "hidden"}
              className="flex max-w-[1200px] flex-col items-start"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  variants={hairlineVariants}
                  aria-hidden="true"
                  className="h-px bg-terracotta"
                />
                <motion.span
                  variants={closingCaptionVariants}
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

              <motion.a
                href={closing.primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message us on WhatsApp (opens in a new tab)"
                variants={ctaVariants}
                className={cn(primaryBtnClasses, "mt-24 w-full sm:w-auto")}
              >
                {closing.primaryCta.label}
              </motion.a>

              <motion.p
                variants={emailCaptionVariants}
                className="mt-6 font-sans text-[14px] leading-[1.5] text-stone-soft"
              >
                {closing.secondaryCtaPrefix}
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
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>
    </section>
  );
}
