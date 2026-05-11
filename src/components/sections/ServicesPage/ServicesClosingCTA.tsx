"use client";

import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useRef, useState } from "react";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";

import { cn } from "@/lib/utils";
import { copy } from "@/content/copy";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const T_H2_S = 0.0;
const T_VISUALIZER_S = 0.15;
const T_SUB_S = 0.3;
const T_PRIMARY_S = 0.6;
const T_SECONDARY_S = 0.7;

const closing = copy.services.closing;
const quarters = closing.slots.quarters;
type QuarterKey = keyof typeof quarters;

const primaryBtnClasses = cn(
  "inline-flex items-center justify-center rounded-[var(--radius)]",
  "py-[18px] px-[28px] min-w-[220px]",
  "text-[12px] font-medium uppercase tracking-[0.12em]",
  "bg-bone text-ink hover:bg-terracotta hover:text-bone",
  "focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta",
  "transition-colors duration-300 ease-out",
);

const outlineBtnClasses = cn(
  "inline-flex items-center justify-center rounded-[var(--radius)]",
  "py-[18px] px-[28px] min-w-[220px]",
  "text-[12px] font-medium uppercase tracking-[0.12em]",
  "border border-bone/25 bg-transparent text-bone",
  "hover:border-bone hover:bg-bone hover:text-ink",
  "focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta",
  "transition-colors duration-300 ease-out",
);

export function ServicesClosingCTA() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  const play = inView && !reduce;

  if (reduce) {
    return (
      <section
        ref={ref}
        aria-labelledby="services-closing-heading"
        className="relative overflow-hidden bg-ink py-24 md:py-32"
      >
        <BottomGradient />
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-[7fr_5fr] lg:items-center lg:gap-x-16">
            <ClosingCopy reduce />
            <SlotsVisualizer reduce />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      aria-labelledby="services-closing-heading"
      className="relative overflow-hidden bg-ink py-24 md:py-32"
    >
      <BottomGradient />
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-[7fr_5fr] lg:items-center lg:gap-x-16">
          <ClosingCopy reduce={false} play={play} />
          <SlotsVisualizer reduce={false} play={play} />
        </div>
      </div>
    </section>
  );
}

function BottomGradient() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[60%]"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(200,109,79,0.06) 0%, rgba(10,10,10,0) 70%)",
      }}
    />
  );
}

type CopyProps =
  | { reduce: true; play?: undefined }
  | { reduce: false; play: boolean };

function ClosingCopy(props: CopyProps) {
  const headingClasses = cn(
    "font-serif font-normal text-bone",
    "text-[32px] tracking-[-0.02em] leading-[1.1]",
    "md:text-[48px]",
    "max-w-[18ch]",
  );
  const subClasses = cn(
    "mt-6 font-normal text-stone-soft",
    "text-[18px] leading-[1.55] md:text-[20px] md:leading-[1.5]",
    "max-w-[48ch]",
  );

  if (props.reduce) {
    return (
      <div>
        <h2 id="services-closing-heading" className={headingClasses}>
          {closing.h2}
        </h2>
        <p className={subClasses}>{closing.sub}</p>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:gap-6">
          <a
            href={closing.primaryCta.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${closing.primaryCta.label} (opens in a new tab)`}
            className={primaryBtnClasses}
          >
            {closing.primaryCta.label}
          </a>
          <a
            href={closing.secondaryCta.href}
            aria-label={`Email ${closing.secondaryCta.label}`}
            className={outlineBtnClasses}
          >
            {closing.secondaryCta.label}
          </a>
        </div>
      </div>
    );
  }

  const { play } = props;

  return (
    <div>
      <motion.h2
        id="services-closing-heading"
        className={headingClasses}
        initial={{ opacity: 0.01, y: 8 }}
        animate={play ? { opacity: 1, y: 0 } : { opacity: 0.01, y: 8 }}
        transition={{ duration: 0.5, ease: EASE, delay: T_H2_S }}
      >
        {closing.h2}
      </motion.h2>
      <motion.p
        className={subClasses}
        initial={{ opacity: 0.01, y: 8 }}
        animate={play ? { opacity: 1, y: 0 } : { opacity: 0.01, y: 8 }}
        transition={{ duration: 0.45, ease: EASE, delay: T_SUB_S }}
      >
        {closing.sub}
      </motion.p>
      <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:gap-6">
        <motion.a
          href={closing.primaryCta.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${closing.primaryCta.label} (opens in a new tab)`}
          className={primaryBtnClasses}
          initial={{ opacity: 0.01, y: 8 }}
          animate={play ? { opacity: 1, y: 0 } : { opacity: 0.01, y: 8 }}
          transition={{ duration: 0.4, ease: EASE, delay: T_PRIMARY_S }}
        >
          {closing.primaryCta.label}
        </motion.a>
        <motion.a
          href={closing.secondaryCta.href}
          aria-label={`Email ${closing.secondaryCta.label}`}
          className={outlineBtnClasses}
          initial={{ opacity: 0.01, y: 8 }}
          animate={play ? { opacity: 1, y: 0 } : { opacity: 0.01, y: 8 }}
          transition={{ duration: 0.4, ease: EASE, delay: T_SECONDARY_S }}
        >
          {closing.secondaryCta.label}
        </motion.a>
      </div>
    </div>
  );
}

type VisualizerProps =
  | { reduce: true; play?: undefined }
  | { reduce: false; play: boolean };

const PANEL_ID = "services-closing-quarter-panel";
const tabId = (which: QuarterKey) => `services-closing-tab-${which}`;

function SlotsVisualizer(props: VisualizerProps) {
  const [activeQuarter, setActiveQuarter] = useState<QuarterKey>(
    closing.slots.defaultQuarter,
  );
  const active = quarters[activeQuarter];

  // Build cells with per-available-cell pulse offset (1.25s between phases).
  let availableIdx = 0;
  const cellNodes = active.cells.map((cell, i) => {
    let pulseOffset = 0;
    if (cell.state === "available") {
      pulseOffset = availableIdx * 1.25;
      availableIdx++;
    }
    return (
      <SlotCell
        key={`${cell.state}-${i}`}
        state={cell.state}
        label={cell.label}
        pulseOffset={pulseOffset}
        reduce={props.reduce}
      />
    );
  });

  const cellsListClass = "grid grid-cols-1 gap-3";
  const cellsAriaLabel = `${active.label} slots`;
  const captionClass =
    "mt-5 text-center font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-stone-soft tabular-nums";

  if (props.reduce) {
    return (
      <div>
        <QuarterToggle
          activeQuarter={activeQuarter}
          setActiveQuarter={setActiveQuarter}
        />
        <div
          role="tabpanel"
          id={PANEL_ID}
          aria-labelledby={tabId(activeQuarter)}
          tabIndex={0}
          className="focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
        >
          <ul aria-label={cellsAriaLabel} className={cellsListClass}>
            {cellNodes}
          </ul>
          <div aria-live="polite">
            <p className={captionClass}>{active.caption}</p>
          </div>
        </div>
      </div>
    );
  }

  const { play } = props;

  return (
    <motion.div
      initial={{ opacity: 0.01, scale: 0.95 }}
      animate={
        play ? { opacity: 1, scale: 1 } : { opacity: 0.01, scale: 0.95 }
      }
      transition={{ duration: 0.5, ease: EASE, delay: T_VISUALIZER_S }}
    >
      <QuarterToggle
        activeQuarter={activeQuarter}
        setActiveQuarter={setActiveQuarter}
      />
      <div
        role="tabpanel"
        id={PANEL_ID}
        aria-labelledby={tabId(activeQuarter)}
        tabIndex={0}
        className="focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.ul
            key={activeQuarter}
            aria-label={cellsAriaLabel}
            className={cellsListClass}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            {cellNodes}
          </motion.ul>
        </AnimatePresence>
        <div aria-live="polite">
          <p className={captionClass}>{active.caption}</p>
        </div>
      </div>
    </motion.div>
  );
}

function QuarterToggle({
  activeQuarter,
  setActiveQuarter,
}: {
  activeQuarter: QuarterKey;
  setActiveQuarter: (q: QuarterKey) => void;
}) {
  const q1Ref = useRef<HTMLButtonElement>(null);
  const q2Ref = useRef<HTMLButtonElement>(null);

  const activate = (which: QuarterKey) => {
    setActiveQuarter(which);
    (which === "q1" ? q1Ref : q2Ref).current?.focus();
  };

  const handleKeyDown = (
    e: ReactKeyboardEvent<HTMLButtonElement>,
    which: QuarterKey,
  ) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      activate(which === "q1" ? "q2" : "q1");
    } else if (e.key === "Home") {
      e.preventDefault();
      activate("q1");
    } else if (e.key === "End") {
      e.preventDefault();
      activate("q2");
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Quarter capacity"
      className="mb-4 flex items-center justify-center gap-6 lg:justify-end"
    >
      <QuarterTab
        which="q1"
        label={quarters.q1.label}
        isActive={activeQuarter === "q1"}
        buttonRef={q1Ref}
        onActivate={() => setActiveQuarter("q1")}
        onKeyDown={(e) => handleKeyDown(e, "q1")}
      />
      <span aria-hidden="true" className="select-none text-stone">
        ·
      </span>
      <QuarterTab
        which="q2"
        label={quarters.q2.label}
        isActive={activeQuarter === "q2"}
        buttonRef={q2Ref}
        onActivate={() => setActiveQuarter("q2")}
        onKeyDown={(e) => handleKeyDown(e, "q2")}
      />
    </div>
  );
}

function QuarterTab({
  which,
  label,
  isActive,
  buttonRef,
  onActivate,
  onKeyDown,
}: {
  which: QuarterKey;
  label: string;
  isActive: boolean;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  onActivate: () => void;
  onKeyDown: (e: ReactKeyboardEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      ref={buttonRef}
      id={tabId(which)}
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={PANEL_ID}
      tabIndex={isActive ? 0 : -1}
      onClick={onActivate}
      onKeyDown={onKeyDown}
      className={cn(
        "inline-flex items-center font-sans text-[12px] font-medium uppercase tracking-[0.12em] transition-colors duration-200 ease-out",
        "focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta",
        isActive
          ? "text-bone"
          : "text-stone-soft hover:text-bone",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "mr-2 inline-block h-1.5 w-1.5 rounded-full bg-terracotta transition-opacity duration-200 ease-out",
          isActive ? "opacity-100" : "opacity-0",
        )}
      />
      {label}
    </button>
  );
}

type SlotCellProps = {
  state: "booked" | "available";
  label: string;
  pulseOffset: number;
  reduce: boolean;
};

const cellBaseClasses = cn(
  "grid place-items-center rounded-md border p-6 min-h-[88px]",
  "text-center font-sans text-[12px] font-medium uppercase tracking-[0.12em]",
);

function SlotCell({ state, label, pulseOffset, reduce }: SlotCellProps) {
  if (state === "booked") {
    return (
      <li
        className={cn(
          cellBaseClasses,
          "border-border-warm bg-card/30 text-stone-soft",
        )}
      >
        {label}
      </li>
    );
  }

  if (reduce) {
    return (
      <li
        className={cn(
          cellBaseClasses,
          "border-terracotta bg-terracotta/5 text-bone",
        )}
      >
        {label}
      </li>
    );
  }

  return (
    <motion.li
      className={cn(cellBaseClasses, "bg-terracotta/5 text-bone")}
      initial={{ borderColor: "rgba(200,109,79,0.6)" }}
      animate={{
        borderColor: [
          "rgba(200,109,79,0.6)",
          "rgba(200,109,79,1)",
          "rgba(200,109,79,0.6)",
        ],
      }}
      transition={{
        duration: 2.5,
        ease: "easeInOut",
        repeat: Infinity,
        delay: 1.0 + pulseOffset,
      }}
      style={{ borderWidth: 1, borderStyle: "solid" }}
    >
      {label}
    </motion.li>
  );
}

export default ServicesClosingCTA;
