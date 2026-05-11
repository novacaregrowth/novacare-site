"use client";

import { motion } from "framer-motion";

import { copy } from "@/content/copy";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const services = copy.services.artifacts.maisonAesthetic.services;
const NUMERALS = ["i", "ii", "iii"] as const;

type SiteTreatmentsProps = {
  cursorTarget: string | null;
};

export function SiteTreatments({ cursorTarget }: SiteTreatmentsProps) {
  return (
    <div className="relative flex h-full w-full flex-col px-8 py-6">
      <ChapterNumeral numeral="II" />

      <div className="flex items-center gap-3">
        <span className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-stone-soft">
          Treatments
        </span>
        <span className="block h-px w-6 bg-terracotta" aria-hidden="true" />
      </div>

      <div className="mt-5 flex flex-col gap-5">
        {services.map((service, i) => {
          const isInjectables = i === 1;
          const isHovered = isInjectables && cursorTarget === "treatment-injectables";
          return (
            <div key={service.name} className="relative">
              <div className="grid grid-cols-[28px_1fr_auto] items-baseline gap-4">
                <span className="font-serif text-[13px] font-light text-stone">
                  {NUMERALS[i]}.
                </span>
                <div className="flex flex-col">
                  <p className="relative inline-block font-serif text-[20px] font-light leading-[1.1] tracking-[-0.01em] text-bone">
                    <span className="relative inline-block">
                      {service.name}
                      <motion.span
                        aria-hidden="true"
                        className="absolute -bottom-0.5 left-0 right-0 h-px origin-left bg-terracotta"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                      />
                    </span>
                  </p>
                  <p className="mt-1 font-serif text-[11px] italic leading-[1.4] text-stone-soft">
                    {service.descriptor}
                  </p>
                </div>
                <div className="flex flex-col items-end text-right">
                  <span className="font-sans text-[12px] font-medium text-bone">
                    {service.priceFrom}
                  </span>
                  <span className="mt-0.5 font-sans text-[9px] text-stone-soft">
                    {service.subtitle}
                  </span>
                </div>
              </div>
              {i < services.length - 1 && (
                <div
                  aria-hidden="true"
                  className="mt-5 h-px w-1/2"
                  style={{ background: "rgba(200,109,79,0.3)" }}
                />
              )}
            </div>
          );
        })}
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

export default SiteTreatments;
