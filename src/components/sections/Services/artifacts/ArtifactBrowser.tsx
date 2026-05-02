"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const REST_Y = -40;
const HOVER_Y = -70;

type Props = {
  playIntro: boolean;
  introDelaySec: number;
  cardHovered: boolean;
  isStatic?: boolean;
};

export function ArtifactBrowser({
  playIntro,
  introDelaySec,
  cardHovered,
  isStatic,
}: Props) {
  const targetY = isStatic
    ? REST_Y
    : cardHovered
      ? HOVER_Y
      : playIntro
        ? REST_Y
        : 0;

  const transition = isStatic
    ? { duration: 0 }
    : cardHovered
      ? { duration: 0.6, ease: EASE }
      : playIntro
        ? { delay: introDelaySec, duration: 1.2, ease: EASE }
        : { duration: 0 };

  return (
    <div className="w-full h-full flex flex-col rounded-[6px] overflow-hidden border border-border-warm bg-ink">
      <div className="flex items-center gap-2 px-3 py-1 bg-card-elevated">
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-stone-soft/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-stone-soft/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-stone-soft/60" />
        </div>
        <div className="flex-1 h-4 rounded-[2px] bg-ink" />
      </div>

      <div className="relative flex-1 overflow-hidden bg-ink">
        <motion.div
          className="absolute inset-x-0 top-0 flex flex-col gap-2 px-3 py-2"
          initial={{ y: isStatic ? REST_Y : 0 }}
          animate={{ y: targetY }}
          transition={transition}
        >
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-6 rounded-[1px] bg-stone-soft/40" />
            <div className="h-1.5 w-8 rounded-[1px] bg-stone-soft/40" />
            <div className="h-1.5 w-6 rounded-[1px] bg-stone-soft/40" />
            <div className="h-1.5 w-7 rounded-[1px] bg-stone-soft/40" />
          </div>

          <div className="relative h-12 rounded-[2px] bg-card-elevated">
            <div className="absolute bottom-1.5 left-2 h-1.5 w-8 rounded-[1px] bg-stone-soft/60" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <div className="h-1.5 w-full rounded-[1px] bg-stone-soft/30" />
              <div className="h-1.5 w-3/4 rounded-[1px] bg-stone-soft/30" />
              <div className="h-1.5 w-2/3 rounded-[1px] bg-stone-soft/30" />
            </div>
            <div className="space-y-1">
              <div className="h-1.5 w-full rounded-[1px] bg-stone-soft/30" />
              <div className="h-1.5 w-5/6 rounded-[1px] bg-stone-soft/30" />
              <div className="h-1.5 w-2/3 rounded-[1px] bg-stone-soft/30" />
            </div>
          </div>

          <div className="h-8 rounded-[2px] bg-card-elevated" />
          <div className="space-y-1">
            <div className="h-1.5 w-full rounded-[1px] bg-stone-soft/30" />
            <div className="h-1.5 w-4/5 rounded-[1px] bg-stone-soft/30" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
