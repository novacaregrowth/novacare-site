"use client";

import { motion } from "framer-motion";

import { copy } from "@/content/copy";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const brand = copy.services.artifacts.maisonAesthetic.brand;

type SiteHeroProps = {
  cursorTarget: string | null;
};

export function SiteHero({ cursorTarget }: SiteHeroProps) {
  const ctaHovered = cursorTarget === "hero-cta";

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(43,31,23,0.18) 0%, rgba(10,10,10,0) 70%)",
        }}
      />

      <ChapterNumeral numeral="I" />

      <p className="relative font-serif text-[34px] font-light leading-[1] tracking-[-0.02em] text-bone md:text-[44px]">
        {brand.name}
      </p>
      <p className="relative mt-3 font-serif text-[12px] italic text-stone-soft">
        {brand.tagline}
      </p>

      <div className="relative mt-7 flex items-center gap-3">
        <motion.span
          className="rounded-sm border border-terracotta px-4 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.12em]"
          animate={{
            backgroundColor: ctaHovered ? "var(--terracotta)" : "rgba(200,109,79,0)",
            color: ctaHovered ? "var(--bone)" : "var(--terracotta)",
          }}
          transition={{ duration: 0.22, ease: EASE }}
        >
          Book Consultation
        </motion.span>
        <span className="font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-stone-soft">
          View Services
        </span>
      </div>
    </div>
  );
}

function ChapterNumeral({ numeral }: { numeral: string }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute right-6 top-4 select-none font-serif font-light text-terracotta"
      style={{
        fontSize: 96,
        lineHeight: 1,
        opacity: 0.05,
      }}
    >
      {numeral}
    </span>
  );
}

export default SiteHero;
