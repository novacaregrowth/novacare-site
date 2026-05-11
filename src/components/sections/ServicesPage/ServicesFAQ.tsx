"use client";

import { useRef } from "react";

import { motion, useInView, useReducedMotion } from "framer-motion";

import { copy } from "@/content/copy";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const PAIR_STAGGER_S = 0.05;
const PAIR_DURATION_S = 0.4;

const faqLabel = copy.services.faqLabel;
const faq = copy.services.faq;

export function ServicesFAQ() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.05, once: true });
  const play = inView && !reduce;

  return (
    <section
      ref={ref}
      aria-labelledby="services-faq-heading"
      className="relative bg-ink pt-20 pb-16 md:pt-32 md:pb-24"
    >
      <div className="mx-auto w-full max-w-[880px] px-6 md:px-12">
        <h2 id="services-faq-heading" className="sr-only">
          Frequently asked questions
        </h2>

        <div className="flex flex-col items-center gap-3">
          {reduce ? (
            <>
              <span className="font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-stone-soft">
                {faqLabel}
              </span>
              <span className="block h-px w-6 bg-terracotta" />
            </>
          ) : (
            <>
              <motion.span
                initial={{ opacity: 0.01, y: 8 }}
                animate={play ? { opacity: 1, y: 0 } : { opacity: 0.01, y: 8 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-stone-soft"
              >
                {faqLabel}
              </motion.span>
              <motion.span
                aria-hidden="true"
                className="block h-px w-6 bg-terracotta origin-center"
                initial={{ scaleX: 0.01 }}
                animate={play ? { scaleX: 1 } : { scaleX: 0.01 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
              />
            </>
          )}
        </div>

        <ul className="mt-16 flex flex-col">
          {faq.map((item, i) => (
            <FAQItem
              key={item.q}
              q={item.q}
              a={item.a}
              index={i}
              play={play}
              reduce={!!reduce}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function FAQItem({
  q,
  a,
  index,
  play,
  reduce,
}: {
  q: string;
  a: string;
  index: number;
  play: boolean;
  reduce: boolean;
}) {
  const isFirst = index === 0;

  const pairContent = (
    <>
      <h3 className="font-serif font-normal text-bone text-[20px] md:text-[24px] tracking-[-0.01em] leading-[1.3]">
        {q}
      </h3>
      <p className="mt-6 font-sans text-[16px] leading-[1.6] text-bone/90">
        {a}
      </p>
    </>
  );

  if (reduce) {
    return (
      <li
        className={
          isFirst
            ? "pb-12"
            : "pt-12 pb-12 border-t border-border-warm"
        }
      >
        {pairContent}
      </li>
    );
  }

  return (
    <motion.li
      className={
        isFirst
          ? "pb-12"
          : "pt-12 pb-12 border-t border-border-warm"
      }
      initial={{ opacity: 0.01, y: 8 }}
      animate={play ? { opacity: 1, y: 0 } : { opacity: 0.01, y: 8 }}
      transition={{
        duration: PAIR_DURATION_S,
        ease: EASE,
        delay: 0.3 + index * PAIR_STAGGER_S,
      }}
    >
      {pairContent}
    </motion.li>
  );
}

export default ServicesFAQ;
