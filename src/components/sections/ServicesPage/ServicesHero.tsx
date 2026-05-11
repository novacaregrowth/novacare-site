"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { copy } from "@/content/copy";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const PER_WORD_STAGGER_S = 0.06;
const WORD_DURATION_S = 0.6;
const LABEL_DURATION_S = 0.5;
const SUBHEAD_BUFFER_MS = 400;

const hero = copy.services.hero;
const words = hero.h1.split(" ");
const h1StartS = 0.2;
const subheadDelayMs =
  Math.round(
    (h1StartS * 1000 + words.length * PER_WORD_STAGGER_S * 1000 + SUBHEAD_BUFFER_MS) / 100,
  ) * 100;

export function ServicesHero() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <section
        aria-labelledby="services-hero-heading"
        className="relative bg-ink pt-24 pb-16 md:pt-40 md:pb-24"
      >
        <div className="relative mx-auto w-full max-w-[1440px] px-6 md:px-12">
          <div className="flex items-center gap-3">
            <span className="font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-stone-soft">
              {hero.sectionLabel}
            </span>
            <span className="block h-px w-6 bg-terracotta" />
          </div>
          <h1
            id="services-hero-heading"
            className={cn(
              "mt-8 font-serif font-normal text-bone max-w-[18ch]",
              "text-[44px] tracking-[-0.02em] leading-[1.05]",
              "md:text-[72px] md:tracking-[-0.02em]",
            )}
          >
            {hero.h1}
          </h1>
          <p
            className={cn(
              "mt-6 md:mt-8 text-stone-soft font-normal",
              "text-[18px] leading-[1.55] md:text-[20px] md:leading-[1.5]",
              "max-w-full md:max-w-[680px]",
            )}
          >
            {hero.sub}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="services-hero-heading"
      className="relative bg-ink pt-24 pb-16 md:pt-40 md:pb-24"
    >
      <div className="relative mx-auto w-full max-w-[1440px] px-6 md:px-12">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0.01, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: LABEL_DURATION_S, ease: EASE, delay: 0 }}
        >
          <span className="font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-stone-soft">
            {hero.sectionLabel}
          </span>
          <motion.span
            className="block h-px w-6 bg-terracotta origin-left"
            initial={{ scaleX: 0.01 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: LABEL_DURATION_S * 0.5 }}
          />
        </motion.div>

        <h1
          id="services-hero-heading"
          aria-label={hero.h1}
          className={cn(
            "mt-8 font-serif font-normal text-bone max-w-[18ch]",
            "text-[44px] tracking-[-0.02em] leading-[1.05]",
            "md:text-[72px] md:tracking-[-0.02em]",
          )}
        >
          {words.map((word, i) => (
            <span key={i}>
              <motion.span
                aria-hidden="true"
                className="inline-block"
                initial={{ opacity: 0.01, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: WORD_DURATION_S,
                  ease: EASE,
                  delay: h1StartS + i * PER_WORD_STAGGER_S,
                }}
              >
                {word}
              </motion.span>
              {i < words.length - 1 && " "}
            </span>
          ))}
        </h1>

        <motion.p
          className={cn(
            "mt-6 md:mt-8 text-stone-soft font-normal",
            "text-[18px] leading-[1.55] md:text-[20px] md:leading-[1.5]",
            "max-w-full md:max-w-[680px]",
          )}
          initial={{ opacity: 0.01, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: EASE,
            delay: subheadDelayMs / 1000,
          }}
        >
          {hero.sub}
        </motion.p>
      </div>
    </section>
  );
}

export default ServicesHero;
