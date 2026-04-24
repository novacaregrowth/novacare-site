"use client";
// TODO: replace WhatsApp placeholder in copy.ts once real number is issued.

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { copy } from "@/content/copy";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const PER_WORD_STAGGER_S = 0.06;
const WORD_DURATION_S = 0.6;
const SUBHEAD_BUFFER_MS = 400;
const SUBHEAD_TO_CTA_MS = 400;

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

const secondaryBtnClasses = cn(
  sharedBtn,
  "bg-transparent border border-bone/25 text-bone hover:bg-bone hover:text-ink hover:border-bone",
);

const hero = copy.home.hero;
const words = hero.h1.split(" ");
const subheadDelayMs =
  Math.round(
    (words.length * PER_WORD_STAGGER_S * 1000 + SUBHEAD_BUFFER_MS) / 100,
  ) * 100;
const ctaDelayMs = subheadDelayMs + SUBHEAD_TO_CTA_MS;

const ctaContainer = {
  hidden: { opacity: 0.01, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: ctaDelayMs / 1000,
      duration: 0.5,
      ease: EASE,
      staggerChildren: 0.1,
    },
  },
};

const ctaItem = {
  hidden: { opacity: 0.01, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-label="Novacare introduction"
      className="relative overflow-hidden bg-ink min-h-screen flex items-center"
    >
      {reduce ? (
        <Image
          src="/hero-poster.jpg"
          alt=""
          aria-hidden={true}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover z-0"
        />
      ) : (
        <video
          src="/hero-bg.mp4"
          poster="/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to right, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.45) 50%, rgba(10,10,10,0.2) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-24 py-24 lg:py-32">
        <div className="flex max-w-[1200px] flex-col justify-center">
          <h1
            aria-label={hero.h1}
            className={cn(
              "font-serif font-light text-bone max-w-[16ch]",
              "text-[36px] tracking-[-0.02em] leading-[1.08]",
              "md:text-[52px] md:tracking-[-0.025em] md:leading-[1.02]",
              "lg:text-[64px] lg:leading-[1.0]",
            )}
          >
            {words.map((word, i) => (
              <span key={i}>
                <motion.span
                  aria-hidden="true"
                  className="inline-block"
                  initial={reduce ? false : { opacity: 0.01, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: WORD_DURATION_S,
                    ease: EASE,
                    delay: i * PER_WORD_STAGGER_S,
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
              "max-w-full md:max-w-[560px]",
            )}
            initial={reduce ? false : { opacity: 0.01, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: EASE,
              delay: subheadDelayMs / 1000,
            }}
          >
            {hero.subhead}
          </motion.p>

          <motion.div
            variants={ctaContainer}
            initial={reduce ? "visible" : "hidden"}
            animate="visible"
            className="mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <motion.a
              variants={ctaItem}
              href={hero.primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Start a project on WhatsApp (opens in a new tab)"
              className={primaryBtnClasses}
            >
              {hero.primaryCta.label}
            </motion.a>
            <motion.span variants={ctaItem} className="inline-flex">
              <Link href="/work" className={secondaryBtnClasses}>
                {hero.secondaryCta.label}
              </Link>
            </motion.span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
