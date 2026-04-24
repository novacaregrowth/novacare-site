"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Battery, ChevronLeft, Signal, Wifi } from "lucide-react";

import { copy } from "@/content/copy";

// Sample patient inquiries for the clinic-loss visualization.
// Fictional, for illustration only.
type AppName = "Instagram" | "WhatsApp";
type Inquiry = { initial: string; name: string; text: string; ts: string };
type Phone = {
  app: AppName;
  inquiries: Inquiry[];
  finalUnread: number;
};

const PHONES: Phone[] = [
  {
    app: "Instagram",
    finalUnread: 7,
    inquiries: [
      {
        initial: "A",
        name: "Patient A",
        text: "Hi, I'd like to book a dermatology consultation for next week, are you available?",
        ts: "2h ago",
      },
      {
        initial: "B",
        name: "Patient B",
        text: "What are your prices for acne treatment?",
        ts: "4h ago",
      },
      {
        initial: "C",
        name: "Patient C",
        text: "Hello, do you accept walk-ins?",
        ts: "8h ago",
      },
    ],
  },
  {
    app: "WhatsApp",
    finalUnread: 14,
    inquiries: [
      {
        initial: "A",
        name: "Patient A",
        text: "Looking for a therapist for anxiety, do you have availability this month?",
        ts: "1d ago",
      },
      {
        initial: "B",
        name: "Patient B",
        text: "Can I book online or do I need to call?",
        ts: "1d ago",
      },
      {
        initial: "C",
        name: "Patient C",
        text: "Hi, is Dr. Khalid taking new patients?",
        ts: "2d ago",
      },
    ],
  },
  {
    app: "Instagram",
    finalUnread: 23,
    inquiries: [
      {
        initial: "A",
        name: "Patient A",
        text: "What dental services do you offer?",
        ts: "6h ago",
      },
      {
        initial: "B",
        name: "Patient B",
        text: "Hello, I need a filling, how soon can I come in?",
        ts: "12h ago",
      },
      {
        initial: "C",
        name: "Patient C",
        text: "Do you do teeth whitening?",
        ts: "1d ago",
      },
    ],
  },
];

function useIsLg() {
  const [isLg, setIsLg] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsLg(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return isLg;
}

function PhoneFrame({
  phone,
  count,
  satFilter,
  glowShadow,
  reduce,
}: {
  phone: Phone;
  count: MotionValue<number>;
  satFilter: MotionValue<string>;
  glowShadow: MotionValue<string>;
  reduce: boolean;
}) {
  return (
    <div className="relative w-[240px] h-[480px] lg:w-[280px] lg:h-[560px]">
      <motion.div
        className="absolute inset-0 rounded-[36px] overflow-hidden bg-card border border-border-warm shadow-[inset_0_1px_0_rgba(244,241,234,0.04)]"
        style={reduce ? undefined : { filter: satFilter, boxShadow: glowShadow }}
      >
        <div className="flex items-center justify-between px-5 pt-3 text-stone-soft text-[11px]">
          <span className="font-medium tabular-nums">9:41</span>
          <div className="flex items-center gap-1.5">
            <Signal size={12} aria-hidden="true" />
            <Wifi size={12} aria-hidden="true" />
            <Battery size={14} aria-hidden="true" />
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 mt-2 border-b border-border-warm">
          <ChevronLeft size={16} className="text-stone-soft" aria-hidden="true" />
          <span className="font-sans text-[14px] font-medium text-bone">
            {phone.app}
          </span>
        </div>

        <div className="flex flex-col">
          {phone.inquiries.map((inq) => (
            <div
              key={inq.initial}
              className="flex items-start gap-3 px-4 py-3 border-b border-border-warm/60"
            >
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-serif text-bone text-[14px] flex-shrink-0">
                {inq.initial}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-bone text-[13px] font-medium truncate">
                    {inq.name}
                  </span>
                  <span className="text-stone-soft text-[11px] flex-shrink-0">
                    {inq.ts}
                  </span>
                </div>
                <p className="text-stone-soft text-[12px] mt-0.5 line-clamp-1">
                  {inq.text}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="w-2 h-2 rounded-full bg-destructive mt-3 flex-shrink-0"
              />
            </div>
          ))}
        </div>
      </motion.div>

      <div
        className="absolute -top-3 -right-3 z-20 w-14 h-14 rounded-full bg-destructive flex items-center justify-center font-serif text-bone text-[28px] leading-none tabular-nums shadow-lg"
        aria-label={`${phone.finalUnread} unread messages`}
      >
        {reduce ? (
          phone.finalUnread
        ) : (
          <motion.span aria-hidden="true">{count}</motion.span>
        )}
      </div>
    </div>
  );
}

function Headline() {
  return (
    <p className="font-serif font-light text-bone text-center max-w-[720px] text-[28px] md:text-[40px] lg:text-[52px] tracking-[-0.02em] leading-[1.15]">
      {copy.home.phoneScene.headline}
    </p>
  );
}

export function PhoneScene() {
  const reduce = useReducedMotion() ?? false;
  const isLg = useIsLg();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Desktop entrance — phones slide in.
  const p1X = useTransform(scrollYProgress, [0, 0.2], [-200, 0]);
  const p1Opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const p2Y = useTransform(scrollYProgress, [0.1, 0.3], [100, 0]);
  const p2Opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const p3X = useTransform(scrollYProgress, [0.2, 0.4], [200, 0]);
  const p3Opacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  // Desktop unread counts.
  const p1CountRaw = useTransform(scrollYProgress, [0.2, 0.5], [3, 7]);
  const p2CountRaw = useTransform(scrollYProgress, [0.3, 0.6], [5, 14]);
  const p3CountRaw = useTransform(scrollYProgress, [0.4, 0.8], [2, 23]);
  const p1Count = useTransform(p1CountRaw, (v) => Math.round(v));
  const p2Count = useTransform(p2CountRaw, (v) => Math.round(v));
  const p3Count = useTransform(p3CountRaw, (v) => Math.round(v));

  // Mobile cycling — one visible at a time.
  const p1OpacityM = useTransform(
    scrollYProgress,
    [0, 0.05, 0.3, 0.35],
    [0, 1, 1, 0],
  );
  const p2OpacityM = useTransform(
    scrollYProgress,
    [0.3, 0.35, 0.62, 0.67],
    [0, 1, 1, 0],
  );
  const p3OpacityM = useTransform(
    scrollYProgress,
    [0.62, 0.67, 1.0, 1.0],
    [0, 1, 1, 1],
  );

  // Mobile counts re-mapped to each phone's visible window.
  const p1CountRawM = useTransform(scrollYProgress, [0.05, 0.25], [3, 7]);
  const p2CountRawM = useTransform(scrollYProgress, [0.35, 0.6], [5, 14]);
  const p3CountRawM = useTransform(scrollYProgress, [0.67, 0.85], [2, 23]);
  const p1CountM = useTransform(p1CountRawM, (v) => Math.round(v));
  const p2CountM = useTransform(p2CountRawM, (v) => Math.round(v));
  const p3CountM = useTransform(p3CountRawM, (v) => Math.round(v));

  // Shared atmospherics — desaturate + warm glow as scroll advances.
  const saturation = useTransform(scrollYProgress, [0.5, 0.8], [1, 0.6]);
  const glowSize = useTransform(scrollYProgress, [0.5, 0.8], [0, 24]);
  const satFilter = useMotionTemplate`saturate(${saturation})`;
  const glowShadow = useMotionTemplate`0 0 ${glowSize}px rgba(200, 109, 79, 0.18)`;

  // Headline reveal at the end of the arc.
  const headlineOpacity = useTransform(scrollYProgress, [0.8, 1.0], [0, 1]);
  const headlineY = useTransform(scrollYProgress, [0.8, 1.0], [20, 0]);

  const phone1Style = reduce
    ? undefined
    : isLg
      ? { x: p1X, opacity: p1Opacity }
      : { opacity: p1OpacityM };
  const phone2Style = reduce
    ? undefined
    : isLg
      ? { y: p2Y, opacity: p2Opacity }
      : { opacity: p2OpacityM };
  const phone3Style = reduce
    ? undefined
    : isLg
      ? { x: p3X, opacity: p3Opacity }
      : { opacity: p3OpacityM };

  const count1 = isLg ? p1Count : p1CountM;
  const count2 = isLg ? p2Count : p2CountM;
  const count3 = isLg ? p3Count : p3CountM;

  const phoneRow = (
    <div className="relative w-[240px] h-[480px] lg:w-auto lg:h-auto lg:flex lg:flex-row lg:gap-12 lg:items-center lg:justify-center">
      <motion.div
        className="absolute inset-0 lg:static lg:inset-auto flex items-center justify-center"
        style={phone1Style}
      >
        <PhoneFrame
          phone={PHONES[0]}
          count={count1}
          satFilter={satFilter}
          glowShadow={glowShadow}
          reduce={reduce}
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 lg:static lg:inset-auto flex items-center justify-center"
        style={phone2Style}
      >
        <PhoneFrame
          phone={PHONES[1]}
          count={count2}
          satFilter={satFilter}
          glowShadow={glowShadow}
          reduce={reduce}
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 lg:static lg:inset-auto flex items-center justify-center"
        style={phone3Style}
      >
        <PhoneFrame
          phone={PHONES[2]}
          count={count3}
          satFilter={satFilter}
          glowShadow={glowShadow}
          reduce={reduce}
        />
      </motion.div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="problem-heading"
      className="relative bg-ink min-h-[200vh] motion-reduce:min-h-screen"
    >
      <h2 id="problem-heading" className="sr-only">
        The problem
      </h2>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-6">
        {reduce ? (
          <div className="flex flex-col items-center justify-center gap-12 w-full">
            {phoneRow}
            <Headline />
          </div>
        ) : (
          <div className="relative w-full flex items-center justify-center">
            {phoneRow}
            <motion.div
              className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 z-10"
              style={{ opacity: headlineOpacity, y: headlineY }}
            >
              <Headline />
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
