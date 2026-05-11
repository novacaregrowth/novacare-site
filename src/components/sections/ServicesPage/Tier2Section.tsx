"use client";

import { useRef } from "react";

import { motion, useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { copy } from "@/content/copy";
import { useIsDesktop } from "@/lib/useIsDesktop";

import { PanelPrice } from "@/components/sections/Services/PanelPrice";
import { FeaturesConversation } from "@/components/sections/Services/features/FeaturesConversation";
import { Tier2Artifact } from "./artifacts/Tier2Artifact";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const HAIRLINE_DURATION_S = 0.6;
const T_NAME_S = 0.4;
const T_PRICE_S = 0.5;
const T_TAGLINE_S = 0.6;
const T_INCLUDES_LABEL_S = 0.7;
const T_FEATURES_BASE_S = 0.8;
const T_META_S = 1.2;
const T_CTA_S = 1.4;

const tier = copy.services.tiers[1];

const primaryBtnClasses = cn(
  "inline-flex items-center justify-center rounded-[var(--radius)]",
  "py-[16px] px-[24px]",
  "text-[12px] font-medium uppercase tracking-[0.12em]",
  "bg-bone text-ink hover:bg-terracotta hover:text-bone",
  "focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta",
  "transition-colors duration-300 ease-out",
);

export function Tier2Section() {
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktop();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.1, once: true });

  const animateCascade = !!isDesktop && !reduce;
  const useStaticInner = !animateCascade;
  const play = inView;

  return (
    <section
      ref={ref}
      aria-labelledby="tier-2-heading"
      className="relative bg-card-elevated py-20 md:py-24 overflow-hidden"
    >
      {reduce ? (
        <div className="absolute left-0 right-0 top-0 h-px bg-terracotta" aria-hidden="true" />
      ) : (
        <motion.div
          aria-hidden="true"
          className="absolute left-0 right-0 top-0 h-px bg-terracotta origin-left"
          initial={{ scaleX: 0.01 }}
          animate={play ? { scaleX: 1 } : { scaleX: 0.01 }}
          transition={{ duration: HAIRLINE_DURATION_S, ease: EASE }}
        />
      )}

      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
        {animateCascade ? (
          <div className="grid grid-cols-12 gap-12 items-start">
            <div className="col-span-6 col-start-1">
              <CopyColumn
                play={play}
                useStaticInner={useStaticInner}
                animate
              />
            </div>

            <div className="col-span-5 col-start-8">
              <Tier2Artifact play={play} />
            </div>
          </div>
        ) : (
          <MobileOrReducedLayout
            play={play}
            reduce={!!reduce}
            useStaticInner={useStaticInner}
          />
        )}
      </div>
    </section>
  );
}

function MobileOrReducedLayout({
  play,
  reduce,
  useStaticInner,
}: {
  play: boolean;
  reduce: boolean;
  useStaticInner: boolean;
}) {
  if (reduce) {
    return (
      <div className="flex flex-col gap-10">
        <Tier2Artifact play={false} />
        <CopyColumn play={false} useStaticInner={useStaticInner} animate={false} />
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col gap-10"
      initial={{ opacity: 0.01, y: 12 }}
      animate={play ? { opacity: 1, y: 0 } : { opacity: 0.01, y: 12 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <Tier2Artifact play={play} />
      <CopyColumn play={play} useStaticInner={useStaticInner} animate={false} />
    </motion.div>
  );
}

function CopyColumn({
  play,
  useStaticInner,
  animate,
}: {
  play: boolean;
  useStaticInner: boolean;
  animate: boolean;
}) {
  const fade = (delay: number) =>
    animate
      ? {
          initial: { opacity: 0.01, y: 8 },
          animate: play
            ? { opacity: 1, y: 0 }
            : { opacity: 0.01, y: 8 },
          transition: { duration: 0.5, ease: EASE, delay },
        }
      : {};

  return (
    <div className="flex flex-col">
      <motion.span
        {...fade(T_NAME_S)}
        className="font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-stone-soft"
      >
        TIER 2 · {tier.name.toUpperCase()}
      </motion.span>

      <h2 id="tier-2-heading" className="sr-only">
        {tier.name}
      </h2>

      <div className="mt-5">
        <PanelPrice
          price={tier.price}
          priceSubtitle={tier.priceSubtitle}
          play={play}
          delaySec={T_PRICE_S}
          isStatic={useStaticInner}
        />
      </div>

      <motion.p
        {...fade(T_TAGLINE_S)}
        className="mt-6 italic font-serif font-light text-stone-soft text-[18px] md:text-[20px] leading-[1.5] max-w-[480px]"
      >
        {tier.tagline}
      </motion.p>

      <motion.span
        {...fade(T_INCLUDES_LABEL_S)}
        className="mt-8 font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-stone-soft"
      >
        {tier.includesLabel}
      </motion.span>

      <div className="mt-4">
        <FeaturesConversation
          features={tier.includes}
          play={play}
          baseDelaySec={T_FEATURES_BASE_S}
          isStatic={useStaticInner}
        />
      </div>

      <motion.div
        {...fade(T_META_S)}
        className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-2 font-sans text-[13px] leading-[1.5] text-bone/90"
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone-soft">
          TIMELINE
        </span>
        <span>{tier.timeline}</span>
        <span className="text-stone-soft/40" aria-hidden="true">·</span>
        <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-stone-soft">
          IDEAL FOR
        </span>
        <span>{tier.idealFor}</span>
      </motion.div>

      <div className="mt-10">
        <motion.a
          {...fade(T_CTA_S)}
          href={tier.cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className={primaryBtnClasses}
        >
          {tier.cta.label}
        </motion.a>
      </div>
    </div>
  );
}

export default Tier2Section;
