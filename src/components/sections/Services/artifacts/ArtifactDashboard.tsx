"use client";

import { useEffect, useRef, useState } from "react";

import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const COUNTER_START = 100;
const COUNTER_DELAY_MS = 200;
const COUNTER_DURATION_SEC = 0.8;

const DELTA_DELAY_MS = 200;
const DELTA_DURATION_MS = 200;

const CHART_DELAY_MS = 400;
const CHART_DURATION_SEC = 1.2;

const DOT_DELAY_MS = 1500;
const DOT_DURATION_MS = 200;

const SECONDARY_BASE_DELAY_MS = 600;
const SECONDARY_STAGGER_MS = 100;

const HOVER_PEAK = 134;
const HOVER_DURATION_SEC = 0.6;

const AUTO_CYCLE_INTERVAL_MS = 4500;
const AUTO_CYCLE_POST_INTRO_BUFFER_MS = 800;

type DashboardData = {
  primary: {
    label: string;
    value: number;
    delta: string;
  };
  chartPath: string;
  chartViewBox: string;
  secondary: ReadonlyArray<{
    label: string;
    value: string;
    hoverValue?: string;
  }>;
};

type Props = {
  data: DashboardData;
  play: boolean;
  introDelaySec: number;
  hovered: boolean;
  enableIntros: boolean;
  enableAutoCycle?: boolean;
};

export function ArtifactDashboard({
  data,
  play,
  introDelaySec,
  hovered,
  enableIntros,
  enableAutoCycle,
}: Props) {
  const reduce = useReducedMotion();
  const finalValue = data.primary.value;

  const motionValue = useMotionValue(enableIntros ? COUNTER_START : finalValue);
  const [display, setDisplay] = useState(
    enableIntros ? COUNTER_START : finalValue
  );
  useMotionValueEvent(motionValue, "change", (latest) => {
    setDisplay(Math.round(latest));
  });

  useEffect(() => {
    if (!enableIntros) return;
    if (!play) return;

    const controls = animate(motionValue, finalValue, {
      delay: introDelaySec + COUNTER_DELAY_MS / 1000,
      duration: COUNTER_DURATION_SEC,
      ease: EASE,
    });
    return () => controls.stop();
  }, [enableIntros, play, finalValue, introDelaySec, motionValue]);

  const [secondaryDisplay, setSecondaryDisplay] = useState(() =>
    data.secondary.map((s) => s.value)
  );

  useEffect(() => {
    if (!enableIntros) return;
    if (!hovered) return;

    const counterControls = animate(motionValue, HOVER_PEAK, {
      duration: HOVER_DURATION_SEC / 2,
      ease: EASE,
      onComplete: () => {
        animate(motionValue, finalValue, {
          duration: HOVER_DURATION_SEC / 2,
          ease: EASE,
        });
      },
    });

    const halfwayTimer = setTimeout(() => {
      setSecondaryDisplay(
        data.secondary.map((s) => s.hoverValue ?? s.value)
      );
    }, (HOVER_DURATION_SEC * 1000) / 2);

    const restoreTimer = setTimeout(() => {
      setSecondaryDisplay(data.secondary.map((s) => s.value));
    }, HOVER_DURATION_SEC * 1000);

    return () => {
      counterControls.stop();
      clearTimeout(halfwayTimer);
      clearTimeout(restoreTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered]);

  const dotPulseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enableIntros || !hovered) return;
    const el = dotPulseRef.current;
    if (!el) return;
    const controls = animate(
      el,
      {
        scale: [1, 1.4, 1],
        filter: [
          "drop-shadow(0 0 0px color-mix(in srgb, var(--terracotta) 0%, transparent))",
          "drop-shadow(0 0 6px color-mix(in srgb, var(--terracotta) 50%, transparent))",
          "drop-shadow(0 0 0px color-mix(in srgb, var(--terracotta) 0%, transparent))",
        ],
      },
      { duration: HOVER_DURATION_SEC, ease: EASE }
    );
    return () => controls.stop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered]);

  useEffect(() => {
    if (!enableAutoCycle || reduce) return;
    if (!enableIntros) return;

    const introCompleteMs =
      introDelaySec * 1000 +
      COUNTER_DELAY_MS +
      COUNTER_DURATION_SEC * 1000 +
      AUTO_CYCLE_POST_INTRO_BUFFER_MS;

    let cancelled = false;
    let cycleTimer: ReturnType<typeof setTimeout> | undefined;
    const innerTimers: ReturnType<typeof setTimeout>[] = [];

    const fireOnce = () => {
      if (cancelled) return;

      animate(motionValue, HOVER_PEAK, {
        duration: HOVER_DURATION_SEC / 2,
        ease: EASE,
        onComplete: () => {
          if (cancelled) return;
          animate(motionValue, finalValue, {
            duration: HOVER_DURATION_SEC / 2,
            ease: EASE,
          });
        },
      });

      innerTimers.push(
        setTimeout(() => {
          if (cancelled) return;
          setSecondaryDisplay(
            data.secondary.map((s) => s.hoverValue ?? s.value),
          );
        }, (HOVER_DURATION_SEC * 1000) / 2),
        setTimeout(() => {
          if (cancelled) return;
          setSecondaryDisplay(data.secondary.map((s) => s.value));
        }, HOVER_DURATION_SEC * 1000),
      );

      const el = dotPulseRef.current;
      if (el) {
        animate(
          el,
          {
            scale: [1, 1.4, 1],
            filter: [
              "drop-shadow(0 0 0px color-mix(in srgb, var(--terracotta) 0%, transparent))",
              "drop-shadow(0 0 6px color-mix(in srgb, var(--terracotta) 50%, transparent))",
              "drop-shadow(0 0 0px color-mix(in srgb, var(--terracotta) 0%, transparent))",
            ],
          },
          { duration: HOVER_DURATION_SEC, ease: EASE },
        );
      }

      cycleTimer = setTimeout(fireOnce, AUTO_CYCLE_INTERVAL_MS);
    };

    cycleTimer = setTimeout(fireOnce, introCompleteMs);

    return () => {
      cancelled = true;
      if (cycleTimer) clearTimeout(cycleTimer);
      innerTimers.forEach(clearTimeout);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableAutoCycle, enableIntros, reduce]);

  const containerInitial = enableIntros ? { opacity: 0 } : { opacity: 1 };
  const containerAnimate = play
    ? { opacity: 1 }
    : enableIntros
    ? { opacity: 0 }
    : { opacity: 1 };

  return (
    <motion.div
      className="w-full rounded-md bg-card-elevated p-4"
      initial={containerInitial}
      animate={containerAnimate}
      transition={{ delay: introDelaySec, duration: 0.3, ease: EASE }}
    >
      <div className="flex items-baseline justify-between">
        <div className="flex flex-col">
          <span className="font-sans text-[9px] font-medium uppercase tracking-[0.12em] text-stone-soft">
            {data.primary.label}
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-serif text-[32px] font-light text-bone tracking-[-0.02em] leading-[1] tabular-nums">
              {display}
            </span>
            <motion.span
              className="font-sans text-[11px] font-medium text-terracotta"
              initial={enableIntros ? { opacity: 0 } : { opacity: 1 }}
              animate={
                play
                  ? { opacity: 1 }
                  : enableIntros
                  ? { opacity: 0 }
                  : { opacity: 1 }
              }
              transition={{
                delay: introDelaySec + DELTA_DELAY_MS / 1000,
                duration: DELTA_DURATION_MS / 1000,
                ease: EASE,
              }}
            >
              {data.primary.delta}
            </motion.span>
          </div>
        </div>
      </div>

      <div className="relative mt-3 h-[64px] w-full">
        <svg
          aria-hidden="true"
          viewBox={data.chartViewBox}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          {[0, 1, 2, 3].map((i) => {
            const [vbX, vbY, , vbH] = data.chartViewBox
              .split(" ")
              .map(Number);
            const y = vbY + ((i + 0.5) / 4) * vbH;
            const x2 = vbX + Number(data.chartViewBox.split(" ")[2]);
            return (
              <line
                key={i}
                x1={vbX}
                x2={x2}
                y1={y}
                y2={y}
                stroke="var(--border-warm)"
                strokeWidth="0.5"
                strokeOpacity="0.4"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}

          <motion.path
            d={data.chartPath}
            fill="none"
            stroke="var(--bone)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={enableIntros ? { pathLength: 0 } : { pathLength: 1 }}
            animate={
              play
                ? { pathLength: 1 }
                : enableIntros
                ? { pathLength: 0 }
                : { pathLength: 1 }
            }
            transition={{
              delay: introDelaySec + CHART_DELAY_MS / 1000,
              duration: CHART_DURATION_SEC,
              ease: EASE,
            }}
          />
        </svg>

        <motion.div
          ref={dotPulseRef}
          aria-hidden="true"
          className="absolute right-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-terracotta motion-safe:animate-[chart-dot-pulse_3s_ease-in-out_infinite]"
          style={{ top: getDotTop(data.chartViewBox, data.chartPath) }}
          initial={enableIntros ? { opacity: 0 } : { opacity: 1 }}
          animate={
            play
              ? { opacity: 1 }
              : enableIntros
              ? { opacity: 0 }
              : { opacity: 1 }
          }
          transition={{
            delay: introDelaySec + DOT_DELAY_MS / 1000,
            duration: DOT_DURATION_MS / 1000,
            ease: EASE,
          }}
        />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-1 w-px bg-stone-soft/40" />
          ))}
        </div>
      </div>

      <div className="mt-3 h-px w-full bg-border-warm" />

      <div className="mt-3 grid grid-cols-3 gap-3">
        {data.secondary.map((cell, i) => (
          <motion.div
            key={cell.label}
            className="flex flex-col"
            initial={enableIntros ? { opacity: 0, y: 6 } : { opacity: 1, y: 0 }}
            animate={
              play
                ? { opacity: 1, y: 0 }
                : enableIntros
                ? { opacity: 0, y: 6 }
                : { opacity: 1, y: 0 }
            }
            transition={{
              delay:
                introDelaySec +
                (SECONDARY_BASE_DELAY_MS + i * SECONDARY_STAGGER_MS) / 1000,
              duration: 0.4,
              ease: EASE,
            }}
          >
            <span className="font-sans text-[9px] font-medium uppercase tracking-[0.12em] text-stone-soft">
              {cell.label}
            </span>
            <span className="mt-1 font-sans text-[14px] font-medium text-bone leading-none tabular-nums">
              {secondaryDisplay[i]}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function getDotTop(viewBox: string, chartPath: string): string {
  const [, vbY, , vbH] = viewBox.split(" ").map(Number);
  const matches = chartPath.match(/[ML]\s*[\d.]+\s+([\d.]+)/g);
  if (!matches || matches.length === 0) return "50%";
  const last = matches[matches.length - 1];
  const lastY = Number(last.replace(/[ML]\s*[\d.]+\s+/, ""));
  const pct = ((lastY - vbY) / vbH) * 100;
  return `${pct}%`;
}
