"use client";

import { useRef } from "react";

import { motion, useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { copy } from "@/content/copy";
import { useIsDesktop } from "@/lib/useIsDesktop";

import { PanelPrice } from "@/components/sections/Services/PanelPrice";
import { FeaturesCapabilities } from "@/components/sections/Services/features/FeaturesCapabilities";
import { ArtifactDashboard } from "@/components/sections/Services/artifacts/ArtifactDashboard";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ARTIFACT_DURATION_S = 0.6;
const T_NAME_S = 0.4;
const T_PRICE_S = 0.5;
const T_TAGLINE_S = 0.6;
const T_INCLUDES_LABEL_S = 0.7;
const T_FEATURES_BASE_S = 0.8;
const T_META_S = 1.2;
const T_CTA_S = 1.4;
const T_ADDON_S = 1.55;

const tier = copy.services.tiers[2];
const dashboardData = copy.home.services.tiers[2].dashboard;

const primaryBtnClasses = cn(
  "inline-flex items-center justify-center rounded-[var(--radius)]",
  "py-[16px] px-[24px]",
  "text-[12px] font-medium uppercase tracking-[0.12em]",
  "bg-bone text-ink hover:bg-terracotta hover:text-bone",
  "focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta",
  "transition-colors duration-300 ease-out",
);

export function Tier3Section() {
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
      aria-labelledby="tier-3-heading"
      className="relative bg-ink py-20 md:py-32 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
        {animateCascade ? (
          <div className="grid grid-cols-12 gap-12 items-start">
            <motion.div
              className="col-span-5 col-start-1"
              initial={{ opacity: 0.01, scale: 0.98 }}
              animate={play ? { opacity: 1, scale: 1 } : { opacity: 0.01, scale: 0.98 }}
              transition={{ duration: ARTIFACT_DURATION_S, ease: EASE }}
            >
              <ArtifactDashboard
                data={dashboardData}
                play={play}
                introDelaySec={0.2}
                hovered={false}
                enableIntros={true}
                enableAutoCycle={true}
              />
            </motion.div>

            <div className="col-span-6 col-start-7">
              <CopyColumn
                play={play}
                useStaticInner={useStaticInner}
                animate
              />
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
        <div>
          <ArtifactDashboard
            data={dashboardData}
            play={false}
            introDelaySec={0}
            hovered={false}
            enableIntros={false}
            enableAutoCycle={false}
          />
        </div>
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
      <div>
        <ArtifactDashboard
          data={dashboardData}
          play={play}
          introDelaySec={0.2}
          hovered={false}
          enableIntros={true}
          enableAutoCycle={true}
        />
      </div>
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
        TIER 3 · {tier.name.toUpperCase()}
      </motion.span>

      <h2 id="tier-3-heading" className="sr-only">
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
        <FeaturesCapabilities
          features={tier.includes}
          play={play}
          baseDelaySec={T_FEATURES_BASE_S}
          isStatic={useStaticInner}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5">
        <div>
          <motion.span
            {...fade(T_META_S)}
            className="font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-stone-soft"
          >
            TIMELINE
          </motion.span>
          <motion.p
            {...fade(T_META_S + 0.05)}
            className="mt-1.5 font-sans text-[14px] leading-[1.5] text-bone/90"
          >
            {tier.timeline}
          </motion.p>
        </div>
        <div>
          <motion.span
            {...fade(T_META_S + 0.1)}
            className="font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-stone-soft"
          >
            IDEAL FOR
          </motion.span>
          <motion.p
            {...fade(T_META_S + 0.15)}
            className="mt-1.5 font-sans text-[14px] leading-[1.5] text-bone/90"
          >
            {tier.idealFor}
          </motion.p>
        </div>
      </div>

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

      {tier.addOn && (
        <div className="mt-12">
          <motion.div
            {...fade(T_ADDON_S)}
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--border-warm) 30%, var(--border-warm) 70%, transparent)",
            }}
          />
          <motion.span
            {...fade(T_ADDON_S + 0.05)}
            className="mt-6 block font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-stone-soft"
          >
            OPTIONAL ADD-ON
          </motion.span>
          <motion.p
            {...fade(T_ADDON_S + 0.1)}
            className="mt-3 font-sans text-[14px] leading-[1.6] text-bone/85 max-w-[560px]"
          >
            {tier.addOn}
          </motion.p>
        </div>
      )}
    </div>
  );
}

export default Tier3Section;
