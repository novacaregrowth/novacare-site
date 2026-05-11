"use client";

import { useEffect, useState } from "react";

import { motion, useReducedMotion } from "framer-motion";

import { copy } from "@/content/copy";

import { CursorDemo } from "./shared/CursorDemo";
import { SpecCaption } from "./shared/SpecCaption";
import {
  PadlockIcon,
  RefreshIcon,
  ShareIcon,
  TrafficLights,
} from "./shared/icons";

import { SiteHero } from "./Tier1/SiteHero";
import { SiteTreatments } from "./Tier1/SiteTreatments";
import { SiteApproach } from "./Tier1/SiteApproach";
import { SitePractitioners } from "./Tier1/SitePractitioners";
import { SiteBooking } from "./Tier1/SiteBooking";
import { SiteFooter } from "./Tier1/SiteFooter";

const data = copy.services.artifacts.maisonAesthetic;
const captionParts = copy.services.artifacts.specCaptions.tier1;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// 16s active scroll + 1s repeatDelay = 17s cycle total
const SCROLL_DURATION_S = 16;
const SCROLL_REPEAT_DELAY_S = 1;
const CYCLE_MS = (SCROLL_DURATION_S + SCROLL_REPEAT_DELAY_S) * 1000;

// 12-stop keyframe pattern with explicit dwell holds at each section.
const SCROLL_KEYFRAMES = [
  "0%", "0%",
  "-100%", "-100%",
  "-200%", "-200%",
  "-300%", "-300%",
  "-400%", "-400%",
  "-500%", "-500%",
];
// Times as fractions of SCROLL_DURATION_S (16s)
const SCROLL_TIMES = [
  0,        // 0.0s : Hero arrives
  0.1875,   // 3.0s : End of hero dwell
  0.2375,   // 3.8s : Treatments arrives
  0.35625,  // 5.7s : End of treatments dwell
  0.40625,  // 6.5s : Approach arrives
  0.5,      // 8.0s : End of approach dwell
  0.55,     // 8.8s : Practitioners arrives
  0.64375,  // 10.3s : End of practitioners dwell
  0.69375,  // 11.1s : Booking arrives
  0.8375,   // 13.4s : End of booking dwell
  0.8875,   // 14.2s : Footer arrives
  1.0,      // 16.0s : End of footer dwell
];

const THUMB_KEYFRAMES = [
  "0%", "0%",
  "16.6667%", "16.6667%",
  "33.3333%", "33.3333%",
  "50%", "50%",
  "66.6667%", "66.6667%",
  "83.3333%", "83.3333%",
];

type CursorTarget =
  | "hero-cta"
  | "treatment-injectables"
  | "booking-friday"
  | null;

const CURSOR_TARGETS: Record<Exclude<CursorTarget, null>, { x: string; y: string }> = {
  "hero-cta": { x: "48%", y: "70%" },
  "treatment-injectables": { x: "55%", y: "50%" },
  "booking-friday": { x: "78%", y: "82%" },
};

const CURSOR_SCHEDULE: ReadonlyArray<{ atMs: number; target: CursorTarget }> = [
  { atMs: 1800, target: "hero-cta" },
  { atMs: 2800, target: null },
  { atMs: 4500, target: "treatment-injectables" },
  { atMs: 5500, target: null },
  { atMs: 12000, target: "booking-friday" },
  { atMs: 13200, target: null },
];

type Tier1ArtifactProps = {
  play: boolean;
};

export function Tier1Artifact({ play }: Tier1ArtifactProps) {
  const reduce = useReducedMotion();
  const [cursorTarget, setCursorTarget] = useState<CursorTarget>(null);

  useEffect(() => {
    if (reduce || !play) return;

    let timers: ReturnType<typeof setTimeout>[] = [];
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const clearTimers = () => {
      timers.forEach(clearTimeout);
      timers = [];
    };

    const runCycle = () => {
      clearTimers();
      setCursorTarget(null);
      CURSOR_SCHEDULE.forEach(({ atMs, target }) => {
        timers.push(setTimeout(() => setCursorTarget(target), atMs));
      });
    };

    const stop = () => {
      clearTimers();
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
      setCursorTarget(null);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        stop();
        runCycle();
        intervalId = setInterval(runCycle, CYCLE_MS);
      }
    };

    runCycle();
    intervalId = setInterval(runCycle, CYCLE_MS);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [play, reduce]);

  const cursorActive = cursorTarget !== null;
  const cursorPosition = cursorTarget ? CURSOR_TARGETS[cursorTarget] : { x: "50%", y: "50%" };

  return (
    <div className="flex w-full flex-col">
      <div
        className="relative w-full overflow-hidden rounded-lg bg-card"
        style={{
          aspectRatio: "16 / 10",
          boxShadow: "0 12px 60px -12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(244,241,234,0.06)",
        }}
      >
        <BrowserChrome />

        <div className="absolute inset-x-0 bottom-0 top-9 overflow-hidden">
          {reduce || !play ? (
            <div className="grid h-full">
              <SiteHero cursorTarget={null} />
            </div>
          ) : (
            <>
              <motion.div
                className="absolute left-0 right-0 grid"
                style={{
                  height: "600%",
                  gridTemplateRows: "repeat(6, 1fr)",
                }}
                initial={{ top: "0%" }}
                animate={{ top: SCROLL_KEYFRAMES }}
                transition={{
                  duration: SCROLL_DURATION_S,
                  times: SCROLL_TIMES,
                  ease: EASE,
                  repeat: Infinity,
                  repeatDelay: SCROLL_REPEAT_DELAY_S,
                }}
              >
                <SiteHero cursorTarget={cursorTarget} />
                <SiteTreatments cursorTarget={cursorTarget} />
                <SiteApproach />
                <SitePractitioners />
                <SiteBooking cursorTarget={cursorTarget} />
                <SiteFooter />
              </motion.div>

              <CursorDemo
                active={cursorActive}
                x={cursorPosition.x}
                y={cursorPosition.y}
                reduceMotion={!!reduce}
              />
            </>
          )}

          <ScrollRail reduce={!!reduce || !play} />
        </div>
      </div>

      <SpecCaption parts={captionParts} />
    </div>
  );
}

// ─── Browser chrome ────────────────────────────────────────────────

function BrowserChrome() {
  return (
    <div className="absolute inset-x-0 top-0 z-10 flex h-9 items-center gap-2 border-b border-border-warm bg-card-elevated px-3">
      <TrafficLights size={9} />

      <div className="ml-3 flex items-center gap-1">
        <Tab active label={data.brand.name} />
        <Tab label="Cal.com · Bookings" />
        <Tab label="Instagram" />
      </div>

      <div className="ml-3 flex flex-1 items-center gap-2 rounded-sm border border-border-warm bg-ink/40 px-2 py-0.5">
        <PadlockIcon size={9} className="text-stone-soft" />
        <span className="font-sans text-[10px] text-stone-soft">{data.brand.domain}</span>
        <div className="ml-auto flex items-center gap-1.5 text-stone-soft">
          <RefreshIcon size={9} />
          <ShareIcon size={9} />
        </div>
      </div>

      <div className="ml-2 flex items-center gap-1.5">
        <div className="h-3.5 w-3.5 rounded-full bg-terracotta" />
        <div className="h-1.5 w-1.5 rounded-full bg-stone-soft/40" />
        <div className="h-1.5 w-1.5 rounded-full bg-stone-soft/40" />
        <div className="h-1.5 w-1.5 rounded-full bg-stone-soft/40" />
      </div>
    </div>
  );
}

function Tab({ label, active }: { label: string; active?: boolean }) {
  return (
    <div
      className={
        "flex items-center gap-1.5 rounded-t-sm px-2 py-0.5 font-sans text-[9px] " +
        (active
          ? "bg-ink text-bone border-x border-t border-border-warm"
          : "text-stone-soft")
      }
    >
      {active && (
        <span className="font-serif text-[10px] text-terracotta">M</span>
      )}
      <span className="max-w-[80px] truncate">{label}</span>
    </div>
  );
}

// ─── Scrollbar rail (decorative) ───────────────────────────────────

function ScrollRail({ reduce }: { reduce: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-1 top-2 bottom-2 w-1 rounded-full bg-card-elevated"
    >
      {reduce ? (
        <div
          className="absolute inset-x-0 top-0 rounded-full bg-stone-soft/40"
          style={{ height: "16.6667%" }}
        />
      ) : (
        <motion.div
          className="absolute inset-x-0 rounded-full bg-stone-soft/40"
          style={{ height: "16.6667%" }}
          initial={{ top: "0%" }}
          animate={{ top: THUMB_KEYFRAMES }}
          transition={{
            duration: SCROLL_DURATION_S,
            times: SCROLL_TIMES,
            ease: EASE,
            repeat: Infinity,
            repeatDelay: SCROLL_REPEAT_DELAY_S,
          }}
        />
      )}
    </div>
  );
}

export default Tier1Artifact;
