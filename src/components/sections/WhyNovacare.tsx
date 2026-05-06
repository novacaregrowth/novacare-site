"use client";

import { useRef } from "react";

import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { copy } from "@/content/copy";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PRE_PILLARS_DELAY_S = 0.8;
const PILLAR_STAGGER_S = 0.4;

const WORD_DURATION_S = 0.3;
const WORD_STAGGER_S = 0.08;
const POST_HEADING_GAP_S = 0.2;
const BODY_DURATION_S = 0.5;
const HAIRLINE_DURATION_S = 0.5;

function bodyDelayForTitle(title: string): number {
  const wordCount = title.split(" ").length;
  return WORD_DURATION_S + (wordCount - 1) * WORD_STAGGER_S + POST_HEADING_GAP_S;
}

function StaticWhyNovacare() {
  const why = copy.home.why;
  return (
    <section
      aria-labelledby="why-heading"
      className="bg-ink py-20 md:py-32"
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

        <div className="mt-16 md:mt-24 flex flex-col gap-16 md:gap-24">
          {why.points.map((p, i) => (
            <article
              key={p.title}
              className={`md:max-w-[60%] ${i % 2 === 0 ? "md:self-start" : "md:self-end"}`}
            >
              <div aria-hidden="true" className="h-px w-8 bg-terracotta" />
              <h3 className="mt-4 font-serif font-normal text-bone text-[24px] md:text-[32px] tracking-[-0.02em] leading-[1.2]">
                {p.title}
              </h3>
              <p className="mt-6 max-w-[880px] md:max-w-[520px] font-sans font-normal text-stone-soft text-[18px] md:text-[20px] leading-[1.5]">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyNovacare() {
  const reduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.05 });

  if (reduce) return <StaticWhyNovacare />;

  const why = copy.home.why;

  const headerLineVariants: Variants = {
    hidden: { width: 0 },
    visible: {
      width: 48,
      transition: { duration: 0.3, ease: EASE },
    },
  };

  const captionVariants: Variants = {
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

  const pillarVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0 },
    },
  };

  const pillarHairlineVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: HAIRLINE_DURATION_S, ease: EASE },
    },
  };

  const headingContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: WORD_STAGGER_S },
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

  return (
    <section
      ref={sectionRef}
      aria-labelledby="why-heading"
      className="bg-ink py-20 md:py-32"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <h2 id="why-heading" className="sr-only">
          {why.label}
        </h2>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex items-center gap-4"
        >
          <motion.div
            variants={headerLineVariants}
            aria-hidden="true"
            className="h-px bg-terracotta"
          />
          <motion.span
            variants={captionVariants}
            className="font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-stone-soft"
          >
            {why.label}
          </motion.span>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={pillarsContainerVariants}
          className="mt-16 md:mt-24 flex flex-col gap-16 md:gap-24"
        >
          {why.points.map((p, i) => {
            const words = p.title.split(" ");
            const bodyDelay = bodyDelayForTitle(p.title);

            const bodyVariants: Variants = {
              hidden: { opacity: 0.01, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: bodyDelay,
                  duration: BODY_DURATION_S,
                  ease: EASE,
                },
              },
            };

            return (
              <motion.article
                key={p.title}
                variants={pillarVariants}
                className={`md:max-w-[60%] ${i % 2 === 0 ? "md:self-start" : "md:self-end"}`}
              >
                <motion.div
                  variants={pillarHairlineVariants}
                  aria-hidden="true"
                  className="h-px w-8 origin-left bg-terracotta"
                />
                <motion.h3
                  variants={headingContainerVariants}
                  aria-label={p.title}
                  className="mt-4 font-serif font-normal text-bone text-[24px] md:text-[32px] tracking-[-0.02em] leading-[1.2]"
                >
                  {words.map((word, i) => {
                    const isLast = i === words.length - 1;
                    return (
                      <motion.span
                        key={i}
                        aria-hidden="true"
                        variants={wordVariants}
                        className={
                          isLast ? "inline-block" : "mr-[0.25em] inline-block"
                        }
                      >
                        {word}
                      </motion.span>
                    );
                  })}
                </motion.h3>
                <motion.p
                  variants={bodyVariants}
                  className="mt-6 max-w-[880px] md:max-w-[520px] font-sans font-normal text-stone-soft text-[18px] md:text-[20px] leading-[1.5]"
                >
                  {p.body}
                </motion.p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
