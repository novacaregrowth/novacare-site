"use client";

import { copy } from "@/content/copy";

const approachParagraphs = copy.services.artifacts.maisonAesthetic.approachParagraphs;

export function SiteApproach() {
  return (
    <div className="relative flex h-full w-full flex-col px-8 py-6">
      <ChapterNumeral numeral="III" />

      <div className="flex items-center gap-3">
        <span className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-stone-soft">
          Our approach
        </span>
        <span className="block h-px w-6 bg-terracotta" aria-hidden="true" />
      </div>

      <div className="mt-5 grid grid-cols-[1fr_auto] items-start gap-8">
        <div className="flex flex-col gap-3">
          <h3 className="font-serif text-[20px] font-light leading-[1.15] tracking-[-0.02em] text-bone">
            Quiet, considered aesthetic medicine.
          </h3>
          {approachParagraphs.map((p, i) => (
            <p
              key={i}
              className="font-sans text-[10px] leading-[1.7] text-bone/85"
            >
              {p}
            </p>
          ))}
        </div>

        <ArchitecturalForm />
      </div>
    </div>
  );
}

function ArchitecturalForm() {
  return (
    <div
      aria-hidden="true"
      className="relative w-[88px] overflow-hidden rounded-sm"
      style={{
        aspectRatio: "3 / 4",
        background:
          "linear-gradient(155deg, #2B1F17 0%, #1A1410 45%, #0A0A0A 100%)",
      }}
    >
      <div
        className="absolute left-[22%] top-0 bottom-0 w-px"
        style={{ background: "rgba(244,241,234,0.08)" }}
      />
      <div
        className="absolute left-[52%] top-0 bottom-0 w-px"
        style={{ background: "rgba(244,241,234,0.06)" }}
      />
      <div
        className="absolute left-[78%] top-0 bottom-0 w-px"
        style={{ background: "rgba(244,241,234,0.04)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[28%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0.7) 100%)",
        }}
      />
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

export default SiteApproach;
