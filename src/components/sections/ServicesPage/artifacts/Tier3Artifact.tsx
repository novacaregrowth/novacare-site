"use client";

import { useEffect, useRef, useState } from "react";

import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

import { copy } from "@/content/copy";

import { SpecCaption } from "./shared/SpecCaption";
import {
  BookingsIcon,
  ChevronDownIcon,
  ConversationsIcon,
  DownArrowSmall,
  DownloadIcon,
  GoogleGIcon,
  InstagramIcon,
  OverviewIcon,
  PatientsIcon,
  SettingsIcon,
  WhatsAppIcon,
} from "./shared/icons";

const data = copy.services.artifacts.maisonAesthetic;
const captionParts = copy.services.artifacts.specCaptions.tier3;
const chart = data.chart;
const metrics = data.metrics;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CHART_W = 300;
const CHART_H = 80;
const Y_MAX = 35;

const COUNTER_DURATION_S = 1.2;
const CHART_DRAW_DURATION_S = 1.5;
const AUTO_CYCLE_INTERVAL_MS = 9000;
const POST_INTRO_BUFFER_MS = 1200;

// ─── Catmull-Rom → Cubic Bezier conversion ─────────────────────────

function buildSmoothPath(values: readonly number[]): string {
  if (values.length < 2) return "";
  const points: [number, number][] = values.map((v, i) => [
    (i / (values.length - 1)) * CHART_W,
    CHART_H - (v / Y_MAX) * CHART_H,
  ]);
  const tension = 0.5;
  let path = `M ${points[0][0].toFixed(2)} ${points[0][1].toFixed(2)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const cp1x = p1[0] + ((p2[0] - p0[0]) * tension) / 3;
    const cp1y = p1[1] + ((p2[1] - p0[1]) * tension) / 3;
    const cp2x = p2[0] - ((p3[0] - p1[0]) * tension) / 3;
    const cp2y = p2[1] - ((p3[1] - p1[1]) * tension) / 3;
    path += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)} ${cp2x.toFixed(2)} ${cp2y.toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  return path;
}

const CHART_PATH = buildSmoothPath(chart.weeklyBookings);
const ENDPOINT_X = CHART_W;
const ENDPOINT_Y =
  CHART_H - (chart.weeklyBookings[chart.weeklyBookings.length - 1] / Y_MAX) * CHART_H;
const BASELINE_Y = CHART_H - (chart.preNovacareBaseline / Y_MAX) * CHART_H;
const INFLECTION_X =
  (chart.inflectionWeekIndex / (chart.weeklyBookings.length - 1)) * CHART_W;

// ─── Component ─────────────────────────────────────────────────────

type Tier3ArtifactProps = {
  play: boolean;
};

export function Tier3Artifact({ play }: Tier3ArtifactProps) {
  const reduce = useReducedMotion();

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
        <TopBar />
        <div className="absolute inset-x-0 bottom-0 top-12 flex">
          <Sidebar play={play} reduce={!!reduce} />
          <MainContent play={play} reduce={!!reduce} />
        </div>
      </div>
      <SpecCaption parts={captionParts} />
    </div>
  );
}

// ─── Top bar ───────────────────────────────────────────────────────

function TopBar() {
  return (
    <div className="absolute inset-x-0 top-0 z-10 flex h-12 items-center justify-between border-b border-border-warm bg-card-elevated px-4">
      <div className="flex items-center gap-3">
        <div className="flex items-baseline gap-1">
          <span className="font-serif text-[18px] font-light text-bone">N</span>
          <span className="font-sans text-[8px] font-medium uppercase tracking-[0.18em] text-stone-soft">
            Growth
          </span>
        </div>
        <span className="text-stone-soft/40">/</span>
        <span className="font-sans text-[11px] text-stone-soft">
          {data.brand.name}
        </span>
        <span className="text-stone-soft/40">/</span>
        <span className="font-sans text-[11px] text-bone">Overview</span>
      </div>
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-terracotta">
        <span className="font-serif text-[11px] text-bone">RH</span>
      </div>
    </div>
  );
}

// ─── Sidebar ───────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Overview", Icon: OverviewIcon, active: true },
  { label: "Bookings", Icon: BookingsIcon, active: false },
  { label: "Conversations", Icon: ConversationsIcon, active: false },
  { label: "Patients", Icon: PatientsIcon, active: false },
  { label: "Settings", Icon: SettingsIcon, active: false },
];

function Sidebar({ play, reduce }: { play: boolean; reduce: boolean }) {
  return (
    <nav
      aria-label="Dashboard nav"
      className="w-[120px] shrink-0 border-r border-border-warm bg-card/60 py-2"
    >
      {NAV_ITEMS.map((item, i) => {
        const content = (
          <>
            {item.active && (
              <span
                aria-hidden="true"
                className="absolute left-0 top-1.5 bottom-1.5 w-[2px] bg-terracotta"
              />
            )}
            <item.Icon
              size={13}
              className={item.active ? "text-terracotta" : "text-stone-soft"}
            />
            <span
              className={
                "font-sans text-[10.5px] " +
                (item.active ? "text-bone" : "text-stone-soft")
              }
            >
              {item.label}
            </span>
          </>
        );

        if (reduce || !play) {
          return (
            <div
              key={item.label}
              className={
                "relative flex items-center gap-2 px-3 py-2 " +
                (item.active ? "bg-card-elevated" : "")
              }
            >
              {content}
            </div>
          );
        }

        return (
          <motion.div
            key={item.label}
            className={
              "relative flex items-center gap-2 px-3 py-2 " +
              (item.active ? "bg-card-elevated" : "")
            }
            initial={{ opacity: 0.01, x: -8 }}
            animate={
              play ? { opacity: 1, x: 0 } : { opacity: 0.01, x: -8 }
            }
            transition={{
              duration: 0.35,
              ease: EASE,
              delay: 0.1 + i * 0.06,
            }}
          >
            {content}
          </motion.div>
        );
      })}
    </nav>
  );
}

// ─── Main content ──────────────────────────────────────────────────

function MainContent({ play, reduce }: { play: boolean; reduce: boolean }) {
  return (
    <div className="flex flex-1 flex-col gap-2 overflow-hidden p-4">
      <ControlRow />
      <PrimaryKpi play={play} reduce={reduce} />
      <ChartBlock play={play} reduce={reduce} />
      <SecondaryTiles play={play} reduce={reduce} />
      <ChannelsBlock play={play} reduce={reduce} />
      <RevenueTile play={play} reduce={reduce} />
    </div>
  );
}

function ControlRow() {
  return (
    <div className="flex items-center justify-between">
      <div className="inline-flex items-center gap-1.5 rounded-sm border border-border-warm bg-card-elevated px-2 py-0.5">
        <span className="font-sans text-[9px] text-stone-soft">Last 6 months</span>
        <ChevronDownIcon size={9} className="text-stone-soft" />
      </div>
      <div className="inline-flex items-center gap-1 text-stone-soft">
        <DownloadIcon size={10} />
        <span className="font-sans text-[9px] font-medium uppercase tracking-[0.12em]">
          Export PDF
        </span>
      </div>
    </div>
  );
}

// ─── Primary KPI ───────────────────────────────────────────────────

function PrimaryKpi({ play, reduce }: { play: boolean; reduce: boolean }) {
  const finalValue = metrics.bookings.current;
  const [tickAddend, setTickAddend] = useState(0);
  const motionValue = useMotionValue(reduce ? finalValue : 0);
  const [display, setDisplay] = useState(reduce ? finalValue : 0);

  useMotionValueEvent(motionValue, "change", (latest) => {
    setDisplay(Math.round(latest));
  });

  useEffect(() => {
    if (reduce) return;
    if (!play) return;

    const controls = animate(motionValue, finalValue, {
      delay: 0.3,
      duration: COUNTER_DURATION_S,
      ease: EASE,
    });
    return () => controls.stop();
  }, [play, reduce, finalValue, motionValue]);

  useEffect(() => {
    if (reduce) return;
    if (!play) return;

    let cancelled = false;
    const innerStops: ReturnType<typeof setTimeout>[] = [];
    let intervalHandle: ReturnType<typeof setInterval> | undefined;

    const start = setTimeout(() => {
      if (cancelled) return;
      intervalHandle = setInterval(() => {
        setTickAddend((prev) => {
          const next = prev + 1;
          animate(motionValue, finalValue + next, {
            duration: 0.4,
            ease: EASE,
          });
          return next;
        });
      }, AUTO_CYCLE_INTERVAL_MS);
    }, COUNTER_DURATION_S * 1000 + POST_INTRO_BUFFER_MS);

    return () => {
      cancelled = true;
      clearTimeout(start);
      innerStops.forEach(clearTimeout);
      if (intervalHandle) clearInterval(intervalHandle);
    };
  }, [play, reduce, finalValue, motionValue]);

  return (
    <div className="flex items-end justify-between gap-3 rounded-sm border border-border-warm bg-card-elevated p-3">
      <div className="flex flex-col">
        <span className="font-sans text-[8.5px] font-medium uppercase tracking-[0.12em] text-stone-soft">
          {metrics.bookings.label}
        </span>
        <div className="mt-1 flex items-baseline gap-3">
          <span className="font-serif text-[36px] font-light leading-[0.9] tracking-[-0.02em] text-bone tabular-nums">
            {display}
          </span>
          <div className="flex flex-col gap-0.5">
            <span
              className="font-sans text-[9px] font-medium"
              style={{ color: "var(--terracotta)" }}
            >
              {metrics.bookings.mom}
            </span>
            <span className="font-sans text-[9px] text-stone-soft">
              {metrics.bookings.sinceJoining}
            </span>
          </div>
        </div>
      </div>
      <Sparkline play={play} reduce={reduce} addend={tickAddend} />
    </div>
  );
}

function Sparkline({
  play,
  reduce,
  addend,
}: {
  play: boolean;
  reduce: boolean;
  addend: number;
}) {
  const recent = chart.weeklyBookings.slice(-7);
  const last = recent[recent.length - 1] + addend;
  const adjusted = [...recent.slice(0, -1), last];
  const path = buildSparkPath(adjusted);
  return (
    <svg width="60" height="22" viewBox="0 0 60 22" aria-hidden="true">
      {reduce || !play ? (
        <path
          d={path}
          stroke="var(--terracotta)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <motion.path
          d={path}
          stroke="var(--terracotta)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={play ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.6 }}
        />
      )}
    </svg>
  );
}

function buildSparkPath(values: number[]): string {
  const sparkMax = Math.max(...values) * 1.1;
  const points: [number, number][] = values.map((v, i) => [
    (i / (values.length - 1)) * 60,
    22 - (v / sparkMax) * 22,
  ]);
  let p = `M ${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
  for (let i = 1; i < points.length; i++) {
    p += ` L ${points[i][0].toFixed(1)} ${points[i][1].toFixed(1)}`;
  }
  return p;
}

// ─── Chart block ───────────────────────────────────────────────────

function ChartBlock({ play, reduce }: { play: boolean; reduce: boolean }) {
  return (
    <div className="rounded-sm border border-border-warm bg-card p-2">
      <div className="flex items-baseline justify-between">
        <span className="font-sans text-[8.5px] font-medium uppercase tracking-[0.12em] text-stone-soft">
          {chart.titleMain}
        </span>
        <span className="font-sans text-[9px] text-stone-soft">{chart.titleAside}</span>
      </div>

      <div className="relative mt-1">
        <span
          className="absolute font-sans text-[8px] font-medium"
          style={{
            left: `${(INFLECTION_X / CHART_W) * 100}%`,
            top: -2,
            color: "var(--terracotta)",
            transform: "translateX(-50%)",
          }}
        >
          <span className="inline-flex items-center gap-0.5 whitespace-nowrap">
            {chart.inflectionLabel}
            <DownArrowSmall size={7} className="text-terracotta" />
          </span>
        </span>

        <svg
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
          preserveAspectRatio="none"
          className="mt-3 h-[90px] w-full"
          aria-hidden="true"
        >
          {[0, 1, 2, 3].map((i) => {
            const y = ((i + 0.5) / 4) * CHART_H;
            return (
              <line
                key={i}
                x1="0"
                x2={CHART_W}
                y1={y}
                y2={y}
                stroke="var(--bone)"
                strokeOpacity="0.04"
                strokeWidth="0.5"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}

          <line
            x1="0"
            x2={CHART_W}
            y1={BASELINE_Y}
            y2={BASELINE_Y}
            stroke="var(--stone-soft)"
            strokeOpacity="0.5"
            strokeWidth="1"
            strokeDasharray="4 4"
            vectorEffect="non-scaling-stroke"
          />

          <line
            x1={INFLECTION_X}
            x2={INFLECTION_X}
            y1="0"
            y2={CHART_H}
            stroke="var(--terracotta)"
            strokeOpacity="0.7"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />

          {reduce || !play ? (
            <path
              d={CHART_PATH}
              stroke="var(--terracotta)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          ) : (
            <motion.path
              d={CHART_PATH}
              stroke="var(--terracotta)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={play ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{
                duration: CHART_DRAW_DURATION_S,
                ease: EASE,
                delay: 0.5,
              }}
            />
          )}

          {reduce || !play ? (
            <circle cx={ENDPOINT_X} cy={ENDPOINT_Y} r="3.5" fill="var(--terracotta)" />
          ) : (
            <motion.circle
              cx={ENDPOINT_X}
              cy={ENDPOINT_Y}
              r="3.5"
              fill="var(--terracotta)"
              initial={{ opacity: 0 }}
              animate={play ? { opacity: [0.7, 1, 0.7] } : { opacity: 0 }}
              transition={
                play
                  ? {
                      opacity: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: CHART_DRAW_DURATION_S + 0.6,
                      },
                    }
                  : { duration: 0.3 }
              }
            />
          )}
        </svg>

        <span className="absolute right-0 -bottom-1 -translate-y-[80%] rounded-sm border border-border-warm bg-card-elevated px-1.5 py-0.5 font-sans text-[8px] text-bone">
          {chart.mostRecentTooltip}
        </span>

        <span className="absolute left-1 top-[70%] font-sans text-[7.5px] text-stone-soft">
          {chart.preNovacareLabel}
        </span>
      </div>

      <div className="mt-1 flex justify-between px-0">
        {chart.monthMarkers.map((m) => (
          <span key={m} className="font-sans text-[7.5px] text-stone-soft">
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Secondary tiles ───────────────────────────────────────────────

function SecondaryTiles({ play, reduce }: { play: boolean; reduce: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {metrics.secondary.map((tile, i) => {
        const content = (
          <>
            <span className="font-sans text-[7.5px] font-medium uppercase tracking-[0.12em] text-stone-soft">
              {tile.label}
            </span>
            <span className="mt-0.5 font-serif text-[16px] font-light leading-[1] tracking-[-0.01em] text-bone tabular-nums">
              {tile.current}
            </span>
            <span className="mt-0.5 font-sans text-[8px] text-stone-soft leading-tight">
              {tile.baseline}
            </span>
          </>
        );

        if (reduce || !play) {
          return (
            <div
              key={tile.label}
              className="flex flex-col rounded-sm border border-border-warm bg-card-elevated p-2"
            >
              {content}
            </div>
          );
        }

        return (
          <motion.div
            key={tile.label}
            className="flex flex-col rounded-sm border border-border-warm bg-card-elevated p-2"
            initial={{ opacity: 0.01, y: 6 }}
            animate={play ? { opacity: 1, y: 0 } : { opacity: 0.01, y: 6 }}
            transition={{
              duration: 0.4,
              ease: EASE,
              delay: 0.8 + i * 0.08,
            }}
          >
            {content}
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Channel breakdown ─────────────────────────────────────────────

function ChannelsBlock({ play, reduce }: { play: boolean; reduce: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-sans text-[8.5px] font-medium uppercase tracking-[0.12em] text-stone-soft">
        {metrics.channels.title}
      </span>
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
            <span className="w-[78px] font-sans text-[9px] text-bone">{item.name}</span>
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
                  animate={play ? { width: targetWidth } : { width: "0%" }}
                  transition={{
                    duration: 0.7,
                    ease: EASE,
                    delay: 1.0 + i * 0.1,
                  }}
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
  );
}

// ─── Revenue tile ──────────────────────────────────────────────────

function RevenueTile({ play, reduce }: { play: boolean; reduce: boolean }) {
  const content = (
    <>
      <div className="flex flex-col">
        <span className="font-sans text-[8.5px] font-medium uppercase tracking-[0.12em] text-stone-soft">
          {metrics.revenue.label}
        </span>
        <span className="mt-0.5 font-serif text-[20px] font-light leading-[1] tracking-[-0.02em] text-bone tabular-nums">
          {metrics.revenue.current}
        </span>
      </div>
      <span
        className="font-sans text-[10px] font-medium"
        style={{ color: "var(--terracotta)" }}
      >
        {metrics.revenue.trend}
      </span>
    </>
  );

  if (reduce || !play) {
    return (
      <div className="flex items-center justify-between rounded-sm border border-border-warm bg-card-elevated p-3">
        {content}
      </div>
    );
  }

  return (
    <motion.div
      className="flex items-center justify-between rounded-sm border border-border-warm bg-card-elevated p-3"
      initial={{ opacity: 0.01, y: 6 }}
      animate={play ? { opacity: 1, y: 0 } : { opacity: 0.01, y: 6 }}
      transition={{ duration: 0.4, ease: EASE, delay: 1.4 }}
    >
      {content}
    </motion.div>
  );
}

export default Tier3Artifact;
