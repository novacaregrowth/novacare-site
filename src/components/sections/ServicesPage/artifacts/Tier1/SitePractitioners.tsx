"use client";

import { copy } from "@/content/copy";

const team = copy.services.artifacts.maisonAesthetic.team;

export function SitePractitioners() {
  return (
    <div className="relative flex h-full w-full flex-col px-8 py-6">
      <ChapterNumeral numeral="IV" />

      <div className="flex items-center gap-3">
        <span className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-stone-soft">
          Practitioners
        </span>
        <span className="block h-px w-6 bg-terracotta" aria-hidden="true" />
      </div>

      <div className="mt-5 flex flex-col gap-4">
        {team.map((member, i) => (
          <div
            key={member.name}
            className="grid grid-cols-[56px_1fr_auto] items-center gap-4"
          >
            <PortraitGradient seed={i} />
            <div className="flex flex-col">
              <p className="font-serif text-[16px] leading-tight text-bone">
                {member.name}
              </p>
              <p className="mt-0.5 font-sans text-[8.5px] font-medium uppercase tracking-[0.12em] text-stone-soft">
                {member.title}
              </p>
              <p className="mt-1.5 font-serif text-[11px] italic leading-[1.4] text-stone-soft">
                {member.bio}
              </p>
            </div>
            <p className="font-serif text-[11px] italic text-stone-soft">
              <span className="relative inline-block">
                Book with {member.firstName}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-0 right-0 h-px bg-terracotta opacity-50"
                />
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PortraitGradient({ seed }: { seed: number }) {
  const angles = [165, 155, 175];
  const angle = angles[seed % angles.length];
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-sm"
      style={{
        width: 56,
        height: 70,
        background: `linear-gradient(${angle}deg, #322a22 0%, #1A1410 45%, #0A0A0A 100%)`,
      }}
    />
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

export default SitePractitioners;
