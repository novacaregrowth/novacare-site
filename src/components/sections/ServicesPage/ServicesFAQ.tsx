"use client";

import { useId, useRef, useState } from "react";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { copy } from "@/content/copy";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const T_HEADER_S = 0.0;
const T_HAIRLINE_S = 0.1;
const T_HEADLINE_S = 0.15;
const T_INTRO_S = 0.4;
const T_ITEMS_START_S = 0.55;
const ITEM_STAGGER_S = 0.05;
const ITEM_DURATION_S = 0.4;

const faq = copy.services.faq;
const itemCount = faq.items.length;

export function ServicesFAQ() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.05, once: true });
  const play = inView && !reduce;

  if (reduce) {
    return (
      <section
        ref={ref}
        aria-labelledby="services-faq-heading"
        className="relative overflow-hidden bg-ink py-24 md:py-40"
      >
        <BackgroundLayers />
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-y-12 md:gap-y-16 lg:grid-cols-[1fr_2fr] lg:gap-x-16 lg:gap-y-0 lg:items-start">
            <FAQHeader play={false} reduce />
            <ul>
              {faq.items.map((item, i) => (
                <StaticFAQItem
                  key={item.q}
                  q={item.q}
                  a={item.a}
                  index={i}
                />
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      aria-labelledby="services-faq-heading"
      className="relative overflow-hidden bg-ink py-24 md:py-40"
    >
      <BackgroundLayers />
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <div className="grid grid-cols-1 gap-y-12 md:gap-y-16 lg:grid-cols-[1fr_2fr] lg:gap-x-16 lg:gap-y-0 lg:items-start">
          <FAQHeader play={play} reduce={false} />
          <ul>
            {faq.items.map((item, i) => (
              <FAQItem
                key={item.q}
                q={item.q}
                a={item.a}
                index={i}
                play={play}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function FAQHeader({ play, reduce }: { play: boolean; reduce: boolean }) {
  const captionText = `${faq.sectionLabel} · ${itemCount} QUESTIONS`;

  if (reduce) {
    return (
      <header>
        <div className="flex items-center gap-3">
          <span className="font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-stone-soft">
            {captionText}
          </span>
          <span aria-hidden="true" className="block h-px w-6 bg-terracotta" />
        </div>
        <h2
          id="services-faq-heading"
          className="mt-8 max-w-[14ch] font-serif text-[32px] font-normal leading-[1.1] tracking-[-0.02em] text-bone md:text-[48px]"
        >
          {faq.headline}
        </h2>
        <p className="mt-6 max-w-[36ch] font-sans text-[18px] leading-[1.55] text-stone-soft md:text-[20px] md:leading-[1.5]">
          {faq.intro}
        </p>
      </header>
    );
  }

  return (
    <header>
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0.01, y: 8 }}
        animate={play ? { opacity: 1, y: 0 } : { opacity: 0.01, y: 8 }}
        transition={{ duration: 0.4, ease: EASE, delay: T_HEADER_S }}
      >
        <span className="font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-stone-soft">
          {captionText}
        </span>
        <motion.span
          aria-hidden="true"
          className="block h-px w-6 origin-left bg-terracotta"
          initial={{ scaleX: 0.01 }}
          animate={play ? { scaleX: 1 } : { scaleX: 0.01 }}
          transition={{ duration: 0.5, ease: EASE, delay: T_HAIRLINE_S }}
        />
      </motion.div>
      <motion.h2
        id="services-faq-heading"
        className="mt-8 max-w-[14ch] font-serif text-[32px] font-normal leading-[1.1] tracking-[-0.02em] text-bone md:text-[48px]"
        initial={{ opacity: 0.01, y: 8 }}
        animate={play ? { opacity: 1, y: 0 } : { opacity: 0.01, y: 8 }}
        transition={{ duration: 0.5, ease: EASE, delay: T_HEADLINE_S }}
      >
        {faq.headline}
      </motion.h2>
      <motion.p
        className="mt-6 max-w-[36ch] font-sans text-[18px] leading-[1.55] text-stone-soft md:text-[20px] md:leading-[1.5]"
        initial={{ opacity: 0.01, y: 8 }}
        animate={play ? { opacity: 1, y: 0 } : { opacity: 0.01, y: 8 }}
        transition={{ duration: 0.45, ease: EASE, delay: T_INTRO_S }}
      >
        {faq.intro}
      </motion.p>
    </header>
  );
}

function StaticFAQItem({
  q,
  a,
  index,
}: {
  q: string;
  a: string;
  index: number;
}) {
  const numeral = (index + 1).toString().padStart(2, "0");
  return (
    <li
      className={cn(
        "grid grid-cols-[40px_1fr] gap-x-3 py-8 md:grid-cols-[64px_1fr] md:gap-x-6",
        index > 0 && "border-t border-border-warm",
      )}
    >
      <span
        aria-hidden="true"
        className="pt-1 font-serif text-[22px] font-light leading-none text-stone-soft tabular-nums md:text-[24px]"
      >
        {numeral}.
      </span>
      <div>
        <h3 className="font-serif text-[20px] font-normal leading-[1.3] tracking-[-0.01em] text-bone md:text-[22px]">
          {q}
        </h3>
        <p className="mt-4 font-sans text-[15px] leading-[1.6] text-bone/90">
          {a}
        </p>
      </div>
    </li>
  );
}

function FAQItem({
  q,
  a,
  index,
  play,
}: {
  q: string;
  a: string;
  index: number;
  play: boolean;
}) {
  const [open, setOpen] = useState(false);
  const reactId = useId();
  const buttonId = `services-faq-button-${reactId}`;
  const panelId = `services-faq-panel-${reactId}`;
  const numeral = (index + 1).toString().padStart(2, "0");

  return (
    <motion.li
      initial={{ opacity: 0.01, y: 8 }}
      animate={play ? { opacity: 1, y: 0 } : { opacity: 0.01, y: 8 }}
      transition={{
        duration: ITEM_DURATION_S,
        ease: EASE,
        delay: T_ITEMS_START_S + index * ITEM_STAGGER_S,
      }}
      className={cn(
        "relative grid grid-cols-[40px_1fr] gap-x-3 md:grid-cols-[64px_1fr] md:gap-x-6",
        index > 0 && "border-t border-border-warm",
      )}
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-4 -left-4 w-[2px] origin-top bg-terracotta"
        initial={false}
        animate={{ scaleY: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
      <span
        aria-hidden="true"
        className="pt-8 font-serif text-[22px] font-light leading-none text-stone-soft tabular-nums md:text-[24px]"
      >
        {numeral}.
      </span>
      <div>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((prev) => !prev)}
          className="group flex w-full items-start justify-between gap-4 py-8 text-left focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
        >
          <h3 className="font-serif text-[20px] font-normal leading-[1.3] tracking-[-0.01em] text-bone md:text-[22px]">
            {q}
          </h3>
          <motion.span
            aria-hidden="true"
            className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center text-stone-soft group-hover:text-bone"
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Plus size={16} strokeWidth={1.5} />
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="overflow-hidden"
            >
              <p className="pb-8 font-sans text-[15px] leading-[1.6] text-bone/90">
                {a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.li>
  );
}

function BackgroundLayers() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 0% 30%, rgba(200,109,79,0.05) 0%, rgba(10,10,10,0) 70%)",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute z-[1] hidden select-none font-serif font-light text-stone lg:block"
        style={{
          right: "-8vw",
          bottom: "4%",
          fontSize: "clamp(420px, 48vw, 680px)",
          lineHeight: 1,
          opacity: 0.035,
          letterSpacing: "-0.04em",
        }}
      >
        ?
      </span>
    </>
  );
}

export default ServicesFAQ;
