"use client";

import { useCallback, useState, type MouseEvent } from "react";

import Link from "next/link";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { ArtifactBrowser } from "./artifacts/ArtifactBrowser";
import { ArtifactChart } from "./artifacts/ArtifactChart";
import { ArtifactPhone } from "./artifacts/ArtifactPhone";
import { PanelFeatures } from "./PanelFeatures";
import { PanelPrice } from "./PanelPrice";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SPRING_CONFIG = { stiffness: 100, damping: 20 } as const;

const HAIRLINE_OFFSETS_SEC = [0.3, 0.4, 0.5] as const;
const PRICE_DELAY_OFFSET_SEC = 0.3;

export type TierData = {
  readonly label: string;
  readonly headline: string;
  readonly price: string;
  readonly priceSubtitle: string;
  readonly positioning: string;
  readonly features: readonly string[];
  readonly meta: string;
  readonly ctaLabel: string;
  readonly ctaHref: string;
  readonly featured: boolean;
};

type TierPanelProps = {
  tier: TierData;
  index: number;
  materializeDelaySec: number;
  artifactIntroDelaySec: number;
  play: boolean;
  isStatic?: boolean;
};

const linkClasses = cn(
  "group block h-full rounded-[var(--radius)]",
  "transition-transform duration-300 ease-out",
  "motion-safe:hover:-translate-y-1",
  "focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta",
);

const ctaClasses = cn(
  "inline-flex w-full items-center justify-center rounded-[var(--radius)]",
  "py-[14px] px-[20px]",
  "font-sans text-[12px] font-medium uppercase tracking-[0.12em]",
  "border border-bone/25 bg-transparent text-bone",
  "transition-colors duration-300 ease-out",
  "group-hover:border-terracotta group-hover:bg-bone group-hover:text-ink",
  "group-focus-visible:border-terracotta group-focus-visible:bg-bone group-focus-visible:text-ink",
);

function isExternal(href: string) {
  return href.startsWith("http");
}

function selectArtifact(
  index: number,
  props: {
    playIntro: boolean;
    introDelaySec: number;
    cardHovered: boolean;
    isStatic?: boolean;
  },
) {
  if (index === 0) return <ArtifactBrowser {...props} />;
  if (index === 1) return <ArtifactPhone {...props} />;
  return <ArtifactChart {...props} />;
}

function makeHairlineVariants(materializeDelaySec: number, offsetSec: number): Variants {
  return {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        delay: materializeDelaySec + offsetSec,
        duration: 0.2,
        ease: EASE,
      },
    },
  };
}

function makePanelVariants(materializeDelaySec: number): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: materializeDelaySec,
        duration: 0.6,
        ease: EASE,
      },
    },
  };
}

const staticVariants: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

const staticHairlineVariants: Variants = {
  hidden: { scaleX: 1 },
  visible: { scaleX: 1 },
};

function PanelInner({
  tier,
  index,
  materializeDelaySec,
  artifactIntroDelaySec,
  play,
  cardHovered,
  isStatic,
  artifactX,
  artifactY,
  headlineX,
  headlineY,
  positioningX,
  featuresX,
  ctaX,
}: {
  tier: TierData;
  index: number;
  materializeDelaySec: number;
  artifactIntroDelaySec: number;
  play: boolean;
  cardHovered: boolean;
  isStatic: boolean;
  artifactX: MotionValue<number>;
  artifactY: MotionValue<number>;
  headlineX: MotionValue<number>;
  headlineY: MotionValue<number>;
  positioningX: MotionValue<number>;
  featuresX: MotionValue<number>;
  ctaX: MotionValue<number>;
}) {
  const hairline1 = isStatic
    ? staticHairlineVariants
    : makeHairlineVariants(materializeDelaySec, HAIRLINE_OFFSETS_SEC[0]);
  const hairline2 = isStatic
    ? staticHairlineVariants
    : makeHairlineVariants(materializeDelaySec, HAIRLINE_OFFSETS_SEC[1]);
  const hairline3 = isStatic
    ? staticHairlineVariants
    : makeHairlineVariants(materializeDelaySec, HAIRLINE_OFFSETS_SEC[2]);

  return (
    <Card
      className={cn(
        "relative flex h-full flex-col gap-0 overflow-visible py-0 ring-0",
        "rounded-[var(--radius)] border border-border-warm",
        "p-8 md:p-10",
        "transition-colors duration-300 ease-out",
        "group-hover:border-bone/15",
        tier.featured ? "bg-card-elevated" : "bg-card",
      )}
    >
      {tier.featured && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-terracotta/90 transition-colors duration-300 ease-out group-hover:bg-terracotta"
        />
      )}

      <motion.div
        style={{ x: artifactX, y: artifactY }}
        className="h-[120px] w-full"
      >
        {selectArtifact(index, {
          playIntro: play,
          introDelaySec: artifactIntroDelaySec,
          cardHovered,
          isStatic,
        })}
      </motion.div>

      <motion.div style={{ x: headlineX, y: headlineY }} className="mt-6">
        <span className="font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-stone-soft">
          {tier.label}
        </span>
        <h3 className="mt-2 font-serif font-normal text-bone text-[24px] md:text-[28px] tracking-[-0.02em] leading-[1.15]">
          {tier.headline}
        </h3>
        <div className="mt-6">
          <PanelPrice
            price={tier.price}
            priceSubtitle={tier.priceSubtitle}
            play={play}
            delaySec={materializeDelaySec + PRICE_DELAY_OFFSET_SEC}
            isStatic={isStatic}
          />
        </div>
      </motion.div>

      <motion.div
        variants={hairline1}
        aria-hidden="true"
        className="mt-8 h-px bg-border-warm"
        style={{ originX: 0 }}
      />

      <motion.div style={{ x: positioningX }} className="mt-6">
        <p className="font-sans text-bone text-[14px] leading-[1.5]">
          {tier.positioning}
        </p>
      </motion.div>

      <motion.div
        variants={hairline2}
        aria-hidden="true"
        className="mt-8 h-px bg-border-warm"
        style={{ originX: 0 }}
      />

      <motion.div style={{ x: featuresX }} className="mt-6">
        <PanelFeatures features={tier.features} />
      </motion.div>

      <motion.div
        variants={hairline3}
        aria-hidden="true"
        className="mt-8 h-px bg-border-warm"
        style={{ originX: 0 }}
      />

      <motion.div
        style={{ x: ctaX }}
        className="mt-6 flex flex-1 flex-col"
      >
        <p className="font-sans text-stone-soft text-[12px] leading-[1.5]">
          {tier.meta}
        </p>
        <div className="mt-auto pt-8">
          <span className={ctaClasses}>
            {tier.ctaLabel}{" "}
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </motion.div>
    </Card>
  );
}

export function TierPanel({
  tier,
  index,
  materializeDelaySec,
  artifactIntroDelaySec,
  play,
  isStatic = false,
}: TierPanelProps) {
  const [cardHovered, setCardHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, SPRING_CONFIG);
  const springY = useSpring(mouseY, SPRING_CONFIG);

  const artifactX = useTransform(springX, [-1, 1], [-2, 2]);
  const artifactY = useTransform(springY, [-1, 1], [-1, 1]);
  const headlineX = useTransform(springX, [-1, 1], [-1, 1]);
  const headlineY = useTransform(springY, [-1, 1], [-0.5, 0.5]);
  const positioningX = useTransform(springX, [-1, 1], [-0.5, 0.5]);
  const featuresX = useTransform(springX, [-1, 1], [-0.5, 0.5]);
  const ctaX = useTransform(springX, [-1, 1], [-0.25, 0.25]);

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (isStatic) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const nx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const ny = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      mouseX.set(Math.max(-1, Math.min(1, nx)));
      mouseY.set(Math.max(-1, Math.min(1, ny)));
    },
    [mouseX, mouseY, isStatic],
  );

  const onMouseEnter = useCallback(() => {
    if (isStatic) return;
    setCardHovered(true);
  }, [isStatic]);

  const onMouseLeave = useCallback(() => {
    if (isStatic) return;
    setCardHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY, isStatic]);

  const external = isExternal(tier.ctaHref);

  const inner = (
    <PanelInner
      tier={tier}
      index={index}
      materializeDelaySec={materializeDelaySec}
      artifactIntroDelaySec={artifactIntroDelaySec}
      play={play}
      cardHovered={cardHovered}
      isStatic={isStatic}
      artifactX={artifactX}
      artifactY={artifactY}
      headlineX={headlineX}
      headlineY={headlineY}
      positioningX={positioningX}
      featuresX={featuresX}
      ctaX={ctaX}
    />
  );

  const link = external ? (
    <a
      href={tier.ctaHref}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClasses}
    >
      {inner}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={tier.ctaHref} className={linkClasses}>
      {inner}
    </Link>
  );

  return (
    <motion.div
      variants={isStatic ? staticVariants : makePanelVariants(materializeDelaySec)}
      initial={isStatic ? "visible" : "hidden"}
      animate={isStatic ? "visible" : play ? "visible" : "hidden"}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="h-full"
    >
      {link}
    </motion.div>
  );
}
