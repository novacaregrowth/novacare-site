"use client";

import { motion, useReducedMotion } from "framer-motion";

import { copy } from "@/content/copy";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Positioning() {
  const reduce = useReducedMotion();
  const { label, body } = copy.home.positioning;
  // If the pull quote sentence is ever removed from copy.ts, this
  // regex no-ops and the paragraph renders in full. Safe fallback.
  const problemText = body[0]
    .replace(/These are not design problems\. They are revenue problems\.\s*$/, "")
    .trim();

  return (
    <section
      aria-labelledby="positioning-heading"
      className="relative bg-ink"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-24 py-32 md:py-40 lg:py-48">
        <div className="flex flex-col lg:flex-row lg:gap-16">
          <div className="lg:w-[160px] lg:flex-shrink-0">
            <motion.div
              aria-hidden="true"
              className="font-serif font-light text-stone-soft/60 text-[72px] lg:text-[140px] leading-none tracking-[-0.04em]"
              initial={reduce ? false : { opacity: 0.01, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0 }}
            >
              02
            </motion.div>
          </div>

          <motion.div
            aria-hidden="true"
            className="hidden lg:block w-px bg-terracotta/30 self-stretch origin-top"
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
          />

          <div className="flex-1 max-w-[640px] mt-12 lg:mt-0 lg:pt-4">
            <motion.h2
              id="positioning-heading"
              className="font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-stone-soft"
              initial={reduce ? false : { opacity: 0.01, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            >
              {label}
            </motion.h2>

            <motion.div
              aria-hidden="true"
              className="h-px w-16 bg-terracotta mt-4"
              style={{ transformOrigin: "left" }}
              initial={reduce ? false : { opacity: 0.01, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
            />

            <div className="mt-16 flex flex-col">
              <motion.div
                className="flex flex-col gap-8"
                initial={reduce ? false : { opacity: 0.01, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
              >
                <p className="font-serif font-light text-[20px] md:text-[24px] lg:text-[26px] leading-[1.5] tracking-[-0.01em] text-bone">
                  {problemText}
                </p>
              </motion.div>

              <motion.blockquote
                className="my-16 lg:my-20 font-serif font-normal italic text-[28px] md:text-[34px] lg:text-[40px] leading-[1.25] tracking-[-0.02em] text-bone border-l-2 border-terracotta pl-6 lg:pl-8"
                initial={reduce ? false : { opacity: 0.01, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.0, ease: EASE, delay: 0 }}
              >
                These are not design problems. They are revenue problems.
              </motion.blockquote>

              <motion.div
                initial={reduce ? false : { opacity: 0.01, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0 }}
              >
                <p className="font-serif font-light text-[20px] md:text-[24px] lg:text-[26px] leading-[1.5] tracking-[-0.01em] text-bone">
                  {body[1]}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
