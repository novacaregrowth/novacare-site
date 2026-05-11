"use client";

import { useEffect, useState } from "react";

import { motion, useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const IDLE_Y = -40;
const HOVERED_Y = -140;

const AUTO_HOLD_IDLE_MS = 3500;
const AUTO_HOLD_HOVER_MS = 2500;
const SCROLL_DURATION_MS = 800;

type Props = {
  hovered: boolean;
  enableIntros: boolean;
  enableAutoCycle?: boolean;
};

export function ArtifactBrowserLarge({
  hovered,
  enableIntros,
  enableAutoCycle,
}: Props) {
  const reduce = useReducedMotion();
  const [autoHovered, setAutoHovered] = useState(false);

  useEffect(() => {
    if (!enableAutoCycle || reduce) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const toHovered = () => {
      if (cancelled) return;
      setAutoHovered(true);
      timer = setTimeout(toIdle, SCROLL_DURATION_MS + AUTO_HOLD_HOVER_MS);
    };

    const toIdle = () => {
      if (cancelled) return;
      setAutoHovered(false);
      timer = setTimeout(toHovered, SCROLL_DURATION_MS + AUTO_HOLD_IDLE_MS);
    };

    timer = setTimeout(toHovered, AUTO_HOLD_IDLE_MS);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [enableAutoCycle, reduce]);

  const effectiveHovered = hovered || autoHovered;
  const targetY = enableIntros && effectiveHovered ? HOVERED_Y : IDLE_Y;

  return (
    <div className="relative h-[240px] w-full overflow-hidden rounded-md border border-border-warm bg-ink">
      <div className="absolute inset-x-0 top-0 z-[1] flex items-center gap-2 border-b border-border-warm bg-ink px-3 py-2">
        <div className="flex gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-stone-soft/40" />
          <div className="h-1.5 w-1.5 rounded-full bg-stone-soft/40" />
          <div className="h-1.5 w-1.5 rounded-full bg-stone-soft/40" />
        </div>
        <div className="ml-2 flex h-3.5 flex-1 items-center justify-center rounded-sm bg-card font-sans text-[9px] tracking-[0.04em] text-stone-soft">
          novacaregrowth.com
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-[28px]"
        animate={{ y: targetY }}
        transition={{ duration: SCROLL_DURATION_MS / 1000, ease: EASE }}
      >
        <PageHomepage />
        <PageBooking />
      </motion.div>
    </div>
  );
}

function PageHomepage() {
  return (
    <div className="bg-ink">
      <div className="flex justify-around px-3 py-2 font-sans text-[9px] font-medium uppercase tracking-[0.12em] text-stone-soft">
        <span>HOME</span>
        <span>SERVICES</span>
        <span>BOOK</span>
        <span>ABOUT</span>
        <span>CONTACT</span>
      </div>

      <div className="mx-3 mt-1 flex h-[120px] flex-col items-center justify-center rounded-sm bg-card-elevated">
        <p className="font-serif text-[16px] font-light text-bone tracking-[-0.02em]">
          YOUR CLINIC
        </p>
        <div className="mt-3 rounded-sm border border-bone/25 px-3 py-1 font-sans text-[8px] font-medium uppercase tracking-[0.12em] text-bone">
          BOOK NOW
        </div>
      </div>

      <div className="mx-3 mt-2 h-5 rounded-sm bg-card" />
      <div className="mx-3 mt-1.5 h-5 rounded-sm bg-card" />
      <div className="mx-3 mt-1.5 h-5 rounded-sm bg-card" />
      <div className="mx-3 mt-1.5 h-5 rounded-sm bg-card" />
    </div>
  );
}

function PageBooking() {
  return (
    <div className="bg-ink pt-3">
      <div className="px-3 py-1 font-sans text-[9px] font-medium uppercase tracking-[0.12em] text-stone-soft">
        BOOKING
      </div>

      <div className="mx-3 mt-2 grid grid-cols-7 gap-1">
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className={
              i === 9
                ? "aspect-square rounded-sm bg-terracotta"
                : "aspect-square rounded-sm bg-card"
            }
          />
        ))}
      </div>

      <div className="mx-3 mt-3 flex gap-1.5">
        <div className="flex-1 rounded-sm border border-border-warm py-1 text-center font-sans text-[8px] font-medium uppercase tracking-[0.12em] text-stone-soft">
          2:00 PM
        </div>
        <div className="flex-1 rounded-sm border border-border-warm py-1 text-center font-sans text-[8px] font-medium uppercase tracking-[0.12em] text-stone-soft">
          3:30 PM
        </div>
        <div className="flex-1 rounded-sm border border-border-warm py-1 text-center font-sans text-[8px] font-medium uppercase tracking-[0.12em] text-stone-soft">
          4:45 PM
        </div>
      </div>

      <div className="mx-3 mt-3 flex justify-end pb-3">
        <div className="rounded-sm bg-terracotta px-3 py-1 font-sans text-[8px] font-medium uppercase tracking-[0.12em] text-bone">
          CONFIRM
        </div>
      </div>
    </div>
  );
}
