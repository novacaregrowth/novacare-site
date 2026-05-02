"use client";

import { useRef } from "react";

import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { copy } from "@/content/copy";

import { AddOnNote } from "./Services/AddOnNote";
import { SectionSweep } from "./Services/SectionSweep";
import { Tier1Panel } from "./Services/Tier1Panel";
import { Tier2Panel } from "./Services/Tier2Panel";
import { Tier3Panel } from "./Services/Tier3Panel";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const HEADLINE_WORD_STAGGER = 0.04;
const HEADLINE_WORD_DURATION = 0.25;
const T_HEADLINE_START = 0.55;

function StaticServices() {
  const services = copy.home.services;
  return (
    <section
      aria-labelledby="services-heading"
      className="bg-ink pb-32 md:pb-40"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12">
        <div className="relative pt-20 pb-24 md:pt-40">
          <div className="relative flex flex-col items-center text-center">
            <div aria-hidden="true" className="h-px w-12 bg-terracotta" />
            <span className="mt-4 font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-stone-soft">
              {services.sectionLabel}
            </span>
            <h2
              id="services-heading"
              className="mt-6 font-serif font-normal text-bone text-[32px] md:text-[48px] tracking-[-0.02em] leading-[1.1]"
            >
              {services.headline}
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-stone-soft text-[18px] md:text-[20px] leading-[1.5]">
              {services.subhead}
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="relative z-[1] grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            <Tier1Panel play={false} isStatic />
            <Tier2Panel play={false} isStatic />
            <Tier3Panel play={false} isStatic />
          </div>
        </div>

        <div className="mt-16">
          <AddOnNote />
        </div>
      </div>
    </section>
  );
}

export function Services() {
  const reduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.05 });

  if (reduce) return <StaticServices />;

  const services = copy.home.services;
  const headlineWords = services.headline.split(" ");
  const headlineEnd =
    T_HEADLINE_START +
    (headlineWords.length - 1) * HEADLINE_WORD_STAGGER +
    HEADLINE_WORD_DURATION;

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

  const headlineGroupVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: T_HEADLINE_START,
        staggerChildren: HEADLINE_WORD_STAGGER,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0.01, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: HEADLINE_WORD_DURATION, ease: EASE },
    },
  };

  const subheadVariants: Variants = {
    hidden: { opacity: 0.01, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: headlineEnd, duration: 0.25, ease: EASE },
    },
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="services-heading"
      className="bg-ink pb-32 md:pb-40"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12">
        <div className="relative pt-20 pb-24 md:pt-40">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative flex flex-col items-center text-center"
          >
            <motion.div
              variants={headerLineVariants}
              aria-hidden="true"
              className="h-px bg-terracotta"
            />
            <motion.span
              variants={captionVariants}
              className="mt-4 font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-stone-soft"
            >
              {services.sectionLabel}
            </motion.span>
            <motion.h2
              id="services-heading"
              variants={headlineGroupVariants}
              aria-label={services.headline}
              className="mt-6 font-serif font-normal text-bone text-[32px] md:text-[48px] tracking-[-0.02em] leading-[1.1]"
            >
              {headlineWords.map((word, i) => {
                const isLast = i === headlineWords.length - 1;
                return (
                  <motion.span
                    key={i}
                    aria-hidden="true"
                    variants={wordVariants}
                    className={
                      isLast ? "inline-block" : "inline-block mr-[0.25em]"
                    }
                  >
                    {word}
                  </motion.span>
                );
              })}
            </motion.h2>
            <motion.p
              variants={subheadVariants}
              className="mt-6 max-w-[60ch] font-sans text-stone-soft text-[18px] md:text-[20px] leading-[1.5]"
            >
              {services.subhead}
            </motion.p>
          </motion.div>
        </div>

        <div className="relative overflow-hidden">
          <SectionSweep play={inView} />
          <div className="relative z-[1] grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            <Tier1Panel play={inView} />
            <Tier2Panel play={inView} />
            <Tier3Panel play={inView} />
          </div>
        </div>

        <div className="mt-16">
          <AddOnNote />
        </div>
      </div>
    </section>
  );
}
