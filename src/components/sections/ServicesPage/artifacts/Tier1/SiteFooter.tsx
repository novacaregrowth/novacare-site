"use client";

import { copy } from "@/content/copy";

import {
  InstagramIcon,
  MapsMarkerIcon,
  WhatsAppIcon,
} from "../shared/icons";

const brand = copy.services.artifacts.maisonAesthetic.brand;

export function SiteFooter() {
  return (
    <div className="relative flex h-full w-full flex-col justify-center border-t border-border-warm bg-card-elevated px-8 py-6">
      <ChapterNumeral numeral="VI" />

      <div className="flex w-full items-center justify-between">
        <span className="inline-flex items-center gap-2 font-sans text-[9px] font-medium uppercase tracking-[0.12em] text-stone-soft">
          EN
          <span
            aria-hidden="true"
            className="block h-3 w-px bg-terracotta opacity-60"
          />
          عربي
        </span>

        <span className="font-serif text-[14px] tracking-[-0.02em] text-bone">
          {brand.name}
        </span>

        <div className="flex items-center gap-3 text-stone-soft">
          <InstagramIcon size={12} />
          <WhatsAppIcon size={12} />
          <MapsMarkerIcon size={12} />
        </div>
      </div>

      <p className="mt-3 text-center font-sans text-[9px] text-stone">
        © 2025 {brand.name} · Dubai
      </p>
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

export default SiteFooter;
