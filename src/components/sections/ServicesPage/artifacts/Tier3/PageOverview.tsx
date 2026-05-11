"use client";

import { motion } from "framer-motion";

import { copy } from "@/content/copy";

import { ChevronDownIcon, DownArrowSmall, DownloadIcon } from "../shared/icons";

const data = copy.services.artifacts.maisonAesthetic;
const chart = data.chart;
const metrics = data.metrics;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CHART_W = 300;
const CHART_H = 80;
const Y_MAX = 35;

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

const CHART_PATH = buildSmoothPath(chart.weeklyBookings);
const CHART_FILL_PATH = `${CHART_PATH} L ${CHART_W} ${CHART_H} L 0 ${CHART_H} Z`;
const ENDPOINT_X = CHART_W;
const ENDPOINT_Y =
  CHART_H - (chart.weeklyBookings[chart.weeklyBookings.length - 1] / Y_MAX) * CHART_H;
const BASELINE_Y = CHART_H - (chart.preNovacareBaseline / Y_MAX) * CHART_H;
const INFLECTION_X =
  (chart.inflectionWeekIndex / (chart.weeklyBookings.length - 1)) * CHART_W;

const CHART_DRAW_DURATION_S = 1.5;

type Props = {
  play: boolean;
  reduce: boolean;
  counterValue: number;
  pulseKey: number;
  cursorTarget: "export-pdf" | null;
};

export function PageOverview({ play, reduce, counterValue, pulseKey, cursorTarget }: Props) {
  return (
    <div className="flex flex-1 flex-col gap-2 overflow-hidden">
      <ControlRow cursorTarget={cursorTarget} reduce={reduce} />
      <PrimaryKpi
        play={play}
        reduce={reduce}
        counterValue={counterValue}
        pulseKey={pulseKey}
      />
      <ChartBlock play={play} reduce={reduce} />
    </div>
  );
}

function ControlRow({
  cursorTarget,
  reduce,
}: {
  cursorTarget: "export-pdf" | null;
  reduce: boolean;
}) {
  const isHovered = cursorTarget === "export-pdf";

  const buttonStyle = isHovered
    ? "border-terracotta/55 text-bone"
    : "border-transparent text-stone-soft";

  if (reduce) {
    return (
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 rounded-sm border border-border-warm bg-card-elevated px-2 py-0.5">
          <span className="font-sans text-[9px] text-stone-soft">Last 6 months</span>
          <ChevronDownIcon size={9} className="text-stone-soft" />
        </div>
        <div className="inline-flex items-center gap-1 rounded-sm border border-transparent px-2 py-0.5 text-stone-soft">
          <DownloadIcon size={10} />
          <span className="font-sans text-[9px] font-medium uppercase tracking-[0.12em]">
            Export PDF
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <div className="inline-flex items-center gap-1.5 rounded-sm border border-border-warm bg-card-elevated px-2 py-0.5">
        <span className="font-sans text-[9px] text-stone-soft">Last 6 months</span>
        <ChevronDownIcon size={9} className="text-stone-soft" />
      </div>
      <motion.div
        className={
          "inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 transition-colors " +
          buttonStyle
        }
        animate={{ y: isHovered ? -2 : 0 }}
        transition={{ duration: 0.25, ease: EASE }}
      >
        <DownloadIcon size={10} />
        <span className="font-sans text-[9px] font-medium uppercase tracking-[0.12em]">
          Export PDF
        </span>
      </motion.div>
    </div>
  );
}

function PrimaryKpi({
  play,
  reduce,
  counterValue,
  pulseKey,
}: {
  play: boolean;
  reduce: boolean;
  counterValue: number;
  pulseKey: number;
}) {
  const baseMoM = metrics.bookings.baseMoM;
  const baseSince = metrics.bookings.baseSinceJoining;
  const momPct = Math.round(((counterValue - baseMoM) / baseMoM) * 100);
  const sincePct = Math.round(((counterValue - baseSince) / baseSince) * 100);

  const momLine = reduce ? metrics.bookings.mom : `↑ ${momPct}% vs last month`;
  const sinceLine = reduce ? metrics.bookings.sinceJoining : `↑ ${sincePct}% since Apr`;

  const hasPulsed = pulseKey > 0;

  return (
    <div className="flex items-end justify-between gap-3 rounded-sm border border-border-warm bg-card-elevated p-3">
      <div className="flex flex-col">
        <span className="font-sans text-[8.5px] font-medium uppercase tracking-[0.12em] text-stone-soft">
          {metrics.bookings.label}
        </span>
        <div className="mt-1 flex items-baseline gap-3">
          {reduce ? (
            <span className="font-serif text-[36px] font-light leading-[0.9] tracking-[-0.02em] text-bone tabular-nums">
              {counterValue}
            </span>
          ) : (
            <motion.span
              key={pulseKey}
              initial={false}
              animate={hasPulsed ? { scale: [1, 1.04, 1] } : { scale: 1 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="font-serif text-[36px] font-light leading-[0.9] tracking-[-0.02em] text-bone tabular-nums origin-bottom-left inline-block"
            >
              {counterValue}
            </motion.span>
          )}
          <div className="flex flex-col gap-0.5">
            <span
              className="font-sans text-[9px] font-medium tabular-nums"
              style={{ color: "var(--terracotta)" }}
            >
              {momLine}
            </span>
            <span className="font-sans text-[9px] text-stone-soft tabular-nums">
              {sinceLine}
            </span>
          </div>
        </div>
      </div>
      <Sparkline play={play} reduce={reduce} />
    </div>
  );
}

function Sparkline({ play, reduce }: { play: boolean; reduce: boolean }) {
  const recent = chart.weeklyBookings.slice(-7);
  const path = buildSparkPath([...recent]);
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
          <defs>
            <linearGradient id="overview-chart-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--terracotta)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="var(--terracotta)" stopOpacity="0" />
            </linearGradient>
          </defs>

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
            <>
              <path d={CHART_FILL_PATH} fill="url(#overview-chart-fill)" />
              <path
                d={CHART_PATH}
                stroke="var(--terracotta)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </>
          ) : (
            <>
              <motion.path
                d={CHART_FILL_PATH}
                fill="url(#overview-chart-fill)"
                initial={{ opacity: 0 }}
                animate={play ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  duration: 0.8,
                  ease: EASE,
                  delay: 0.5 + CHART_DRAW_DURATION_S * 0.6,
                }}
              />
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
            </>
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

export default PageOverview;
