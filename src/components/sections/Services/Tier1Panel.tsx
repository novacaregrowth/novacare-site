"use client";

import { useEffect, useState } from "react";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import { copy } from "@/content/copy";

import { ArtifactBrowserLarge } from "./artifacts/ArtifactBrowserLarge";
import { FeaturesPoem } from "./features/FeaturesPoem";
import { PanelChrome } from "./PanelChrome";
import { PanelPrice } from "./PanelPrice";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ARTIFACT_INTRO_DELAY_SEC = 0;
const ARTIFACT_FADE_DUR = 0.6;

const CASCADE_START_SEC = 1.4;
const DEL_LABEL = 0;
const DEL_HEADLINE = 0.05;
const DEL_PRICE = 0.15;
const DEL_HAIRLINE_1 = 0.25;
const DEL_HAIRLINE_2 = 0.5;
const DEL_INTRO_HEADER = 0.55;
const DEL_FEATURES_BASE = 0.6;
const DEL_HAIRLINE_3 = 0.85;
const DEL_META = 0.9;
const DEL_CTA = 0.95;

const FADE_DUR = 0.4;
const HAIRLINE_DUR = 0.2;

type Props = {
  play: boolean;
  isStatic?: boolean;
};

export function Tier1Panel({ play, isStatic }: Props) {
  const tier = copy.home.services.tiers[0];
  const [hovered, setHovered] = useState(false);
  const [hasHover, setHasHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover)");
    setHasHover(mq.matches);
    const handler = (e: MediaQueryListEvent) => setHasHover(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const enableIntros = !isStatic && hasHover;
  const enableParallax = !isStatic && hasHover;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const headlineX = useTransform(springX, [-1, 1], [-2, 2]);
  const headlineY = useTransform(springY, [-1, 1], [-1, 1]);
  const artifactX = useTransform(springX, [-1, 1], [-1, 1]);
  const artifactY = useTransform(springY, [-1, 1], [-0.5, 0.5]);
  const featuresX = useTransform(springX, [-1, 1], [-0.5, 0.5]);
  const ctaX = useTransform(springX, [-1, 1], [-0.25, 0.25]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!enableParallax) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    if (enableParallax) setHovered(true);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  const isExternal = tier.ctaHref.startsWith("http");

  const fadeProps = (delaySec: number) =>
    isStatic
      ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0.01, y: 8 },
          animate: play ? { opacity: 1, y: 0 } : { opacity: 0.01, y: 8 },
          transition: {
            delay: CASCADE_START_SEC + delaySec,
            duration: FADE_DUR,
            ease: EASE,
          },
        };

  const hairlineProps = (delaySec: number) =>
    isStatic
      ? { initial: { scaleX: 1 }, animate: { scaleX: 1 } }
      : {
          initial: { scaleX: 0 },
          animate: play ? { scaleX: 1 } : { scaleX: 0 },
          transition: {
            delay: CASCADE_START_SEC + delaySec,
            duration: HAIRLINE_DUR,
            ease: EASE,
          },
        };

  return (
    <a
      href={tier.ctaHref}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={`${tier.headline} ${tier.price}. ${tier.ctaLabel}.`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative block rounded-md p-6 transition-transform duration-300 ease-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-ink md:p-8"
    >
      <PanelChrome
        tierIndex={0}
        featured={false}
        play={play}
        isStatic={isStatic}
      />

      <motion.div
        className="relative z-[1]"
        style={enableParallax ? { x: headlineX, y: headlineY } : undefined}
      >
        <motion.span
          className="block font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-stone-soft"
          {...fadeProps(DEL_LABEL)}
        >
          {tier.label}
        </motion.span>

        <motion.h3
          className="mt-3 font-serif text-[24px] font-normal text-bone leading-[1.15] tracking-[-0.02em] md:text-[28px]"
          {...fadeProps(DEL_HEADLINE)}
        >
          {tier.headline}
        </motion.h3>

        <motion.div className="mt-4" {...fadeProps(DEL_PRICE)}>
          <PanelPrice
            price={tier.price}
            priceSubtitle={tier.priceSubtitle}
            play={play}
            delaySec={CASCADE_START_SEC + DEL_PRICE}
            isStatic={isStatic}
          />
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="relative z-[1] mt-6 h-px origin-left bg-border-warm"
        {...hairlineProps(DEL_HAIRLINE_1)}
      />

      <motion.div
        className="relative z-[1] mt-6"
        style={enableParallax ? { x: artifactX, y: artifactY } : undefined}
        initial={
          isStatic ? { opacity: 1, y: 0 } : { opacity: 0.01, y: 24 }
        }
        animate={
          isStatic
            ? { opacity: 1, y: 0 }
            : play
            ? { opacity: 1, y: 0 }
            : { opacity: 0.01, y: 24 }
        }
        transition={{
          delay: ARTIFACT_INTRO_DELAY_SEC,
          duration: ARTIFACT_FADE_DUR,
          ease: EASE,
        }}
      >
        <ArtifactBrowserLarge
          hovered={hovered}
          enableIntros={enableIntros}
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="relative z-[1] mt-6 h-px origin-left bg-border-warm"
        {...hairlineProps(DEL_HAIRLINE_2)}
      />

      <motion.div
        className="relative z-[1] mt-6"
        style={enableParallax ? { x: featuresX } : undefined}
      >
        <motion.span
          className="block font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-stone-soft"
          {...fadeProps(DEL_INTRO_HEADER)}
        >
          {tier.introHeader}
        </motion.span>

        <div className="mt-4">
          <FeaturesPoem
            features={tier.features}
            play={play}
            baseDelaySec={CASCADE_START_SEC + DEL_FEATURES_BASE}
            isStatic={isStatic}
          />
        </div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="relative z-[1] mt-6 h-px origin-left bg-border-warm"
        {...hairlineProps(DEL_HAIRLINE_3)}
      />

      <motion.div
        className="relative z-[1] mt-6"
        style={enableParallax ? { x: ctaX } : undefined}
      >
        <motion.p
          className="font-sans text-[12px] text-stone-soft leading-[1.5]"
          {...fadeProps(DEL_META)}
        >
          {tier.meta}
        </motion.p>

        <motion.span
          className="mt-4 block w-full rounded-sm border border-bone/20 px-4 py-3 text-center font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-bone transition-colors duration-200 group-hover:border-terracotta group-hover:bg-terracotta group-hover:text-ink"
          {...fadeProps(DEL_CTA)}
        >
          {tier.ctaLabel} →
        </motion.span>
      </motion.div>
    </a>
  );
}
