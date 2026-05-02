"use client";
// TODO: replace WhatsApp placeholder in copy.ts once real number is issued.

import Image from "next/image";
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

const hero = copy.home.hero;
const words = hero.h1.split(" ");
const subheadDelayMs =
  Math.round(
    (words.length * PER_WORD_STAGGER_S * 1000 + SUBHEAD_BUFFER_MS) / 100,
  ) * 100;
const ctaDelayMs = subheadDelayMs + SUBHEAD_TO_CTA_MS;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-label="Novacare introduction"
      className="relative overflow-hidden bg-ink min-h-[100svh] flex items-center"
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

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[30%] pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(10,10,10,0.4) 30%, rgba(10,10,10,0.85) 70%, rgba(10,10,10,1) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-24 py-24 lg:py-32">
        <div className="flex max-w-[1200px] flex-col justify-center">
          <h1
            aria-label={hero.h1}
            className={cn(
              "font-serif font-light text-bone max-w-[16ch]",
              "text-[56px] tracking-[-0.025em] leading-[1.0]",
              "md:text-[64px] md:tracking-[-0.025em] md:leading-[1.0]",
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

          <motion.a
            href={hero.primaryCta.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Start a project on WhatsApp (opens in a new tab)"
            className={cn(primaryBtnClasses, "mt-12 w-full self-start sm:w-auto")}
            initial={reduce ? false : { opacity: 0.01, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: EASE,
              delay: ctaDelayMs / 1000,
            }}
          >
            {hero.primaryCta.label}
          </motion.a>
        </div>
      </div>
    </section>
  );
}
