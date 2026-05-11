"use client";

import { motion } from "framer-motion";

import { copy } from "@/content/copy";

import { GoogleGIcon, MetaLogo } from "../shared/icons";

const ads = copy.services.artifacts.maisonAesthetic.ads;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Props = {
  play: boolean;
  reduce: boolean;
};

export function PageAds({ play, reduce }: Props) {
  return (
    <div className="flex flex-1 flex-col gap-3 overflow-hidden">
      <SectionHeader play={play} reduce={reduce} />
      <KpiStrip play={play} reduce={reduce} />
      <Campaigns play={play} reduce={reduce} />
      <Footer play={play} reduce={reduce} />
    </div>
  );
}

function SectionHeader({ play, reduce }: { play: boolean; reduce: boolean }) {
  if (reduce || !play) {
    return (
      <div className="flex flex-col gap-1">
        <span className="font-sans text-[8.5px] font-medium uppercase tracking-[0.12em] text-stone-soft">
          {ads.caption}
        </span>
        <span className="h-px w-12 bg-terracotta/55" aria-hidden="true" />
      </div>
    );
  }
  return (
    <motion.div
      className="flex flex-col gap-1"
      initial={{ opacity: 0.01, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <span className="font-sans text-[8.5px] font-medium uppercase tracking-[0.12em] text-stone-soft">
        {ads.caption}
      </span>
      <motion.span
        className="block h-px w-12 bg-terracotta/55"
        aria-hidden="true"
        initial={{ scaleX: 0, transformOrigin: "left center" }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
      />
    </motion.div>
  );
}

function KpiStrip({ play, reduce }: { play: boolean; reduce: boolean }) {
  const tileBase = "flex flex-col rounded-sm border border-border-warm bg-card-elevated p-3";

  if (reduce || !play) {
    return (
      <div className="grid grid-cols-2 gap-2">
        <div className={tileBase}>
          <span className="font-sans text-[8.5px] font-medium uppercase tracking-[0.12em] text-stone-soft">
            {ads.active.label}
          </span>
          <span className="mt-1 font-serif text-[36px] font-light leading-[0.9] tracking-[-0.02em] text-bone tabular-nums">
            {ads.active.value}
          </span>
        </div>
        <div className={tileBase}>
          <span className="font-sans text-[8.5px] font-medium uppercase tracking-[0.12em] text-stone-soft">
            {ads.spend.label}
          </span>
          <span className="mt-1 font-serif text-[22px] font-light leading-[1] tracking-[-0.02em] text-bone tabular-nums">
            {ads.spend.value}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <motion.div
        className={tileBase}
        initial={{ opacity: 0.01, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE, delay: 0.2 }}
      >
        <span className="font-sans text-[8.5px] font-medium uppercase tracking-[0.12em] text-stone-soft">
          {ads.active.label}
        </span>
        <span className="mt-1 font-serif text-[36px] font-light leading-[0.9] tracking-[-0.02em] text-bone tabular-nums">
          {ads.active.value}
        </span>
      </motion.div>
      <motion.div
        className={tileBase}
        initial={{ opacity: 0.01, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE, delay: 0.28 }}
      >
        <span className="font-sans text-[8.5px] font-medium uppercase tracking-[0.12em] text-stone-soft">
          {ads.spend.label}
        </span>
        <span className="mt-1 font-serif text-[22px] font-light leading-[1] tracking-[-0.02em] text-bone tabular-nums">
          {ads.spend.value}
        </span>
      </motion.div>
    </div>
  );
}

function Campaigns({ play, reduce }: { play: boolean; reduce: boolean }) {
  return (
    <div className="flex flex-col rounded-sm border border-border-warm bg-card">
      {ads.campaigns.map((campaign, i) => {
        const Logo = campaign.channel === "meta" ? MetaLogo : GoogleGIcon;

        const row = (
          <div className="flex items-center justify-between gap-2 px-3 py-2">
            <div className="flex min-w-0 items-center gap-2">
              <Logo size={13} className="text-stone-soft shrink-0" />
              <span className="truncate font-sans text-[10.5px] font-medium text-bone">
                {campaign.name}
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-3 font-sans tabular-nums">
              <span className="font-sans text-[9.5px] text-stone-soft">{campaign.spend}</span>
              <span className="font-sans text-[9.5px] text-stone-soft">
                {campaign.bookings} bookings
              </span>
              <span className="font-sans text-[9.5px] text-bone font-medium">
                <span style={{ color: "var(--terracotta)" }}>CPB </span>
                {campaign.cpb}
              </span>
            </div>
          </div>
        );

        return (
          <div
            key={campaign.name}
            className={
              "relative " +
              (i < ads.campaigns.length - 1 ? "border-b border-border-warm" : "")
            }
          >
            {reduce || !play ? (
              row
            ) : (
              <motion.div
                initial={{ opacity: 0.01, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE, delay: 0.4 + i * 0.08 }}
              >
                {row}
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Footer({ play, reduce }: { play: boolean; reduce: boolean }) {
  const content = (
    <div className="flex items-baseline justify-between gap-3 rounded-sm border border-border-warm bg-card-elevated px-3 py-2.5">
      <div className="flex items-baseline gap-2">
        <span className="font-sans text-[8.5px] font-medium uppercase tracking-[0.12em] text-stone-soft">
          {ads.roasLabel}
        </span>
        <span
          className="font-serif text-[24px] font-light leading-[1] tracking-[-0.01em] tabular-nums"
          style={{ color: "var(--terracotta)" }}
        >
          {ads.roas}
        </span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-sans text-[9px] text-stone-soft">
          {ads.trackedRevenueLabel}
        </span>
        <span className="font-sans text-[11px] font-medium text-bone tabular-nums">
          {ads.trackedRevenue}
        </span>
      </div>
    </div>
  );

  if (reduce || !play) return content;

  return (
    <motion.div
      initial={{ opacity: 0.01, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE, delay: 0.7 }}
    >
      {content}
    </motion.div>
  );
}

export default PageAds;
