"use client";

import { useEffect, useRef, useState } from "react";

import { AnimatePresence, animate, motion, useReducedMotion } from "framer-motion";

import { copy } from "@/content/copy";

import { CursorDemo } from "./shared/CursorDemo";
import { SpecCaption } from "./shared/SpecCaption";

import { PageAds } from "./Tier3/PageAds";
import { PageBookings } from "./Tier3/PageBookings";
import { PageOverview } from "./Tier3/PageOverview";
import { PageRevenue } from "./Tier3/PageRevenue";
import { Sidebar, type ActivePage, type NavCursorTarget } from "./Tier3/Sidebar";

const data = copy.services.artifacts.maisonAesthetic;
const captionParts = copy.services.artifacts.specCaptions.tier3;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const COUNTER_INITIAL = data.metrics.bookings.current; // 127
const COUNTER_BURST_S = 0.6;
const COUNTER_AMBIENT_MS = 5500;

type CursorTarget = "export-pdf" | NavCursorTarget;

const PAGE_SCHEDULE: ReadonlyArray<{
  atMs: number;
  cursorTarget?: CursorTarget;
  page?: ActivePage;
}> = [
  { atMs: 5000, cursorTarget: "export-pdf" },
  { atMs: 6500, cursorTarget: null },
  { atMs: 7500, cursorTarget: "nav-bookings" },
  { atMs: 8000, cursorTarget: null, page: "bookings" },
  { atMs: 15500, cursorTarget: "nav-ads" },
  { atMs: 16000, cursorTarget: null, page: "ads" },
  { atMs: 25500, cursorTarget: "nav-revenue" },
  { atMs: 26000, cursorTarget: null, page: "revenue" },
  { atMs: 31500, cursorTarget: "nav-overview" },
  { atMs: 32000, cursorTarget: null, page: "overview" },
];
const TIER3_CYCLE_MS = 32000;

const CURSOR_POSITIONS: Record<Exclude<CursorTarget, null>, { x: string; y: string }> = {
  "export-pdf": { x: "calc(100% - 50px)", y: "68px" },
  "nav-overview": { x: "28px", y: "71px" },
  "nav-bookings": { x: "28px", y: "101px" },
  "nav-ads": { x: "28px", y: "131px" },
  "nav-revenue": { x: "28px", y: "161px" },
};

const PAGE_LABEL: Record<ActivePage, string> = {
  overview: "Overview",
  bookings: "Bookings",
  ads: "Ads",
  revenue: "Revenue",
};

type Tier3ArtifactProps = {
  play: boolean;
};

export function Tier3Artifact({ play }: Tier3ArtifactProps) {
  const reduceMotion = useReducedMotion();
  const reduce = !!reduceMotion;

  const [activePage, setActivePage] = useState<ActivePage>("overview");
  const [cursorTarget, setCursorTarget] = useState<CursorTarget>(null);
  const [counterValue, setCounterValue] = useState<number>(reduce ? COUNTER_INITIAL : 0);
  const [pulseKey, setPulseKey] = useState<number>(0);
  const hasBurstRef = useRef(false);

  // ─── Counter: burst (first viewport entry) + ambient ticks ─────────
  useEffect(() => {
    if (reduce) return;
    if (!play) return;

    let intervalHandle: ReturnType<typeof setInterval> | null = null;
    let burstControls: { stop: () => void } | null = null;

    const startAmbient = () => {
      intervalHandle = setInterval(() => {
        setCounterValue((v) => v + 1);
        setPulseKey((k) => k + 1);
      }, COUNTER_AMBIENT_MS);
    };

    const stopAll = () => {
      if (burstControls) {
        burstControls.stop();
        burstControls = null;
      }
      if (intervalHandle) {
        clearInterval(intervalHandle);
        intervalHandle = null;
      }
    };

    const run = () => {
      stopAll();
      if (hasBurstRef.current) {
        startAmbient();
        return;
      }
      burstControls = animate(0, COUNTER_INITIAL, {
        duration: COUNTER_BURST_S,
        ease: EASE,
        onUpdate: (latest) => setCounterValue(Math.round(latest)),
        onComplete: () => {
          hasBurstRef.current = true;
          setCounterValue(COUNTER_INITIAL);
          startAmbient();
        },
      });
    };

    const onVisibility = () => {
      if (document.hidden) {
        stopAll();
      } else {
        stopAll();
        run();
      }
    };

    run();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stopAll();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [play, reduce]);

  // ─── Page rotation cycle (cursor + activePage) ─────────────────────
  useEffect(() => {
    if (reduce) return;
    if (!play) return;

    let timers: ReturnType<typeof setTimeout>[] = [];
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const clearTimers = () => {
      timers.forEach(clearTimeout);
      timers = [];
    };

    const runCycle = () => {
      clearTimers();
      setActivePage("overview");
      setCursorTarget(null);
      PAGE_SCHEDULE.forEach((step) => {
        timers.push(
          setTimeout(() => {
            if (step.cursorTarget !== undefined) setCursorTarget(step.cursorTarget);
            if (step.page !== undefined) setActivePage(step.page);
          }, step.atMs),
        );
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

    const onVisibility = () => {
      if (document.hidden) {
        stop();
      } else {
        stop();
        runCycle();
        intervalId = setInterval(runCycle, TIER3_CYCLE_MS);
      }
    };

    runCycle();
    intervalId = setInterval(runCycle, TIER3_CYCLE_MS);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [play, reduce]);

  const navCursorTarget: NavCursorTarget =
    cursorTarget === "export-pdf" || cursorTarget === null ? null : cursorTarget;
  const overviewCursorTarget: "export-pdf" | null =
    cursorTarget === "export-pdf" ? "export-pdf" : null;

  const cursorActive = cursorTarget !== null;
  const cursorPos = cursorTarget ? CURSOR_POSITIONS[cursorTarget] : { x: "50%", y: "50%" };

  return (
    <div className="flex w-full flex-col">
      <div
        className="relative w-full overflow-hidden rounded-lg bg-card"
        style={{
          aspectRatio: "16 / 10",
          boxShadow:
            "0 12px 60px -12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(244,241,234,0.06)",
        }}
      >
        <TopBar pageLabel={PAGE_LABEL[activePage]} reduce={reduce} />

        <div className="absolute inset-x-0 bottom-0 top-12 flex">
          <Sidebar
            activePage={activePage}
            cursorTarget={navCursorTarget}
            play={play}
            reduce={reduce}
          />
          <div className="relative flex-1 overflow-hidden p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                className="flex h-full flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.32, ease: EASE }}
              >
                {activePage === "overview" && (
                  <PageOverview
                    play={play}
                    reduce={reduce}
                    counterValue={counterValue}
                    pulseKey={pulseKey}
                    cursorTarget={overviewCursorTarget}
                  />
                )}
                {activePage === "bookings" && <PageBookings play={play} reduce={reduce} />}
                {activePage === "ads" && <PageAds play={play} reduce={reduce} />}
                {activePage === "revenue" && <PageRevenue play={play} reduce={reduce} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <CursorDemo
          active={cursorActive}
          x={cursorPos.x}
          y={cursorPos.y}
          reduceMotion={reduce}
        />
      </div>
      <SpecCaption parts={captionParts} />
    </div>
  );
}

// ─── Top bar ───────────────────────────────────────────────────────

function TopBar({ pageLabel, reduce }: { pageLabel: string; reduce: boolean }) {
  return (
    <div className="absolute inset-x-0 top-0 z-10 flex h-12 items-center justify-between border-b border-border-warm bg-card-elevated px-4">
      <div className="flex items-center gap-3">
        <div className="flex items-baseline gap-1">
          <span className="font-serif text-[18px] font-light text-bone">N</span>
          <span className="font-sans text-[8px] font-medium uppercase tracking-[0.18em] text-stone-soft">
            Growth
          </span>
        </div>

        <LiveIndicator reduce={reduce} />

        <span className="text-stone-soft/40">/</span>
        <span className="font-sans text-[11px] text-stone-soft">{data.brand.name}</span>
        <span className="text-stone-soft/40">/</span>
        <span className="font-sans text-[11px] text-bone">{pageLabel}</span>
      </div>
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-terracotta">
        <span className="font-serif text-[11px] text-bone">RH</span>
      </div>
    </div>
  );
}

function LiveIndicator({ reduce }: { reduce: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      {reduce ? (
        <span className="h-1.5 w-1.5 rounded-full bg-terracotta" aria-hidden="true" />
      ) : (
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-terracotta"
          aria-hidden="true"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
        />
      )}
      <span className="font-sans text-[8.5px] font-medium uppercase tracking-[0.14em] text-stone-soft">
        Live
      </span>
    </div>
  );
}

export default Tier3Artifact;
