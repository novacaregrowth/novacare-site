"use client";

import { motion } from "framer-motion";

import { copy } from "@/content/copy";

const rev = copy.services.artifacts.maisonAesthetic.revenueChart;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Props = {
  play: boolean;
  reduce: boolean;
};

const CHART_BAR_MAX_VALUE = Math.max(...rev.monthly.map((m) => m.value));

export function PageRevenue({ play, reduce }: Props) {
  return (
    <div className="flex flex-1 flex-col gap-3 overflow-hidden">
      <SectionHeader play={play} reduce={reduce} />
      <HeadlineTile play={play} reduce={reduce} />
      <BarChart play={play} reduce={reduce} />
    </div>
  );
}

function SectionHeader({ play, reduce }: { play: boolean; reduce: boolean }) {
  if (reduce || !play) {
    return (
      <div className="flex flex-col gap-1">
        <span className="font-sans text-[8.5px] font-medium uppercase tracking-[0.12em] text-stone-soft">
          {rev.caption}
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
        {rev.caption}
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

function HeadlineTile({ play, reduce }: { play: boolean; reduce: boolean }) {
  const content = (
    <div className="flex flex-col rounded-sm border border-border-warm bg-card-elevated p-3">
      <span className="font-sans text-[8.5px] font-medium uppercase tracking-[0.12em] text-stone-soft">
        {rev.headline.label}
      </span>
      <span className="mt-1 font-serif text-[36px] font-light leading-[0.9] tracking-[-0.02em] text-bone tabular-nums">
        {rev.headline.value}
      </span>
      <span
        className="mt-1.5 font-sans text-[10px] font-medium tabular-nums"
        style={{ color: "var(--terracotta)" }}
      >
        {rev.growthLine}
      </span>
    </div>
  );

  if (reduce || !play) return content;

  return (
    <motion.div
      initial={{ opacity: 0.01, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE, delay: 0.2 }}
    >
      {content}
    </motion.div>
  );
}

function BarChart({ play, reduce }: { play: boolean; reduce: boolean }) {
  return (
    <div className="flex flex-1 flex-col rounded-sm border border-border-warm bg-card p-3">
      <div className="relative flex flex-1 items-end gap-2">
        {rev.monthly.map((m, i) => {
          const heightPct = (m.value / CHART_BAR_MAX_VALUE) * 100;
          const isBaseline = i === 0;
          const isCurrent = i === rev.monthly.length - 1;

          const fill = isBaseline
            ? "bg-stone-soft/30"
            : isCurrent
            ? "bg-gradient-to-t from-terracotta to-terracotta/70"
            : "bg-gradient-to-t from-terracotta/70 to-terracotta/40";

          return (
            <div
              key={m.month}
              className="relative flex h-full flex-1 flex-col items-center justify-end gap-1"
            >
              <div className="relative flex h-[80px] w-full items-end justify-center">
                {reduce || !play ? (
                  <div
                    className={"w-full rounded-t-sm " + fill}
                    style={{ height: `${heightPct}%` }}
                    aria-hidden="true"
                  />
                ) : (
                  <motion.div
                    className={"w-full rounded-t-sm " + fill}
                    aria-hidden="true"
                    initial={{ height: "0%" }}
                    animate={{ height: `${heightPct}%` }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.35 + i * 0.07 }}
                  />
                )}
                {isCurrent && play && !reduce && (
                  <motion.span
                    className="absolute -top-7 right-0 whitespace-nowrap rounded-sm border border-border-warm bg-card-elevated px-1.5 py-0.5 font-sans text-[8px] text-bone"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE, delay: 1.0 }}
                  >
                    {rev.tooltip}
                  </motion.span>
                )}
                {isCurrent && (reduce || !play) && (
                  <span className="absolute -top-7 right-0 whitespace-nowrap rounded-sm border border-border-warm bg-card-elevated px-1.5 py-0.5 font-sans text-[8px] text-bone">
                    {rev.tooltip}
                  </span>
                )}
              </div>
              <span
                className={
                  "font-sans text-[8.5px] tabular-nums " +
                  (isCurrent ? "text-bone" : "text-stone-soft")
                }
              >
                {m.month}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PageRevenue;
