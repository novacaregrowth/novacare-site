"use client";

import { motion } from "framer-motion";

import { copy } from "@/content/copy";

import { GoogleGIcon, InstagramIcon, WhatsAppIcon } from "../shared/icons";

const data = copy.services.artifacts.maisonAesthetic;
const metrics = data.metrics;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Props = {
  play: boolean;
  reduce: boolean;
};

export function PageBookings({ play, reduce }: Props) {
  return (
    <div className="flex flex-1 flex-col gap-3 overflow-hidden">
      <SectionHeader play={play} reduce={reduce} />
      <SecondaryTiles play={play} reduce={reduce} />
      <ChannelsBlock play={play} reduce={reduce} />
    </div>
  );
}

function SectionHeader({ play, reduce }: { play: boolean; reduce: boolean }) {
  if (reduce || !play) {
    return (
      <div className="flex flex-col gap-1">
        <span className="font-sans text-[8.5px] font-medium uppercase tracking-[0.12em] text-stone-soft">
          RECENT BOOKINGS · OCTOBER 2025
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
        RECENT BOOKINGS · OCTOBER 2025
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

function SecondaryTiles({ play, reduce }: { play: boolean; reduce: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {metrics.secondary.map((tile, i) => {
        const content = (
          <>
            <span className="font-sans text-[7.5px] font-medium uppercase tracking-[0.12em] text-stone-soft">
              {tile.label}
            </span>
            <span className="mt-1 font-serif text-[22px] font-light leading-[1] tracking-[-0.02em] text-bone tabular-nums">
              {tile.current}
            </span>
            <span className="mt-1 font-sans text-[8.5px] text-stone-soft leading-tight">
              {tile.baseline}
            </span>
          </>
        );

        if (reduce || !play) {
          return (
            <div
              key={tile.label}
              className="flex flex-col rounded-sm border border-border-warm bg-card-elevated p-2.5"
            >
              {content}
            </div>
          );
        }

        return (
          <motion.div
            key={tile.label}
            className="flex flex-col rounded-sm border border-border-warm bg-card-elevated p-2.5"
            initial={{ opacity: 0.01, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.2 + i * 0.08 }}
          >
            {content}
          </motion.div>
        );
      })}
    </div>
  );
}

function ChannelsBlock({ play, reduce }: { play: boolean; reduce: boolean }) {
  return (
    <div className="flex flex-col gap-1.5 rounded-sm border border-border-warm bg-card p-3">
      <span className="font-sans text-[8.5px] font-medium uppercase tracking-[0.12em] text-stone-soft">
        {metrics.channels.title}
      </span>
      <div className="mt-1 flex flex-col gap-1.5">
        {metrics.channels.items.map((item, i) => {
          const Icon =
            item.name === "WhatsApp"
              ? WhatsAppIcon
              : item.name === "Instagram DMs"
              ? InstagramIcon
              : GoogleGIcon;
          const barColor = item.primary ? "var(--terracotta)" : "var(--stone-soft)";
          const targetWidth = `${item.percentage}%`;
          return (
            <div key={item.name} className="flex items-center gap-2">
              <Icon size={11} className="text-stone-soft" />
              <span className="w-[82px] font-sans text-[9px] text-bone">{item.name}</span>
              <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-ink">
                {reduce || !play ? (
                  <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ width: targetWidth, background: barColor }}
                  />
                ) : (
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: barColor }}
                    initial={{ width: "0%" }}
                    animate={{ width: targetWidth }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.4 + i * 0.1 }}
                  />
                )}
              </div>
              <span className="font-sans text-[8.5px] text-stone-soft tabular-nums">
                {item.percentage}% · {item.count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PageBookings;
