"use client";

import { motion } from "framer-motion";

import { copy } from "@/content/copy";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type BookingSlot = {
  readonly day: string;
  readonly time: string;
  readonly practitionerName: string;
  readonly practitionerInitials: string;
  readonly service: string;
  readonly price: string;
  readonly highlighted?: boolean;
};

const bookingSlots = copy.services.artifacts.maisonAesthetic
  .bookingSlots as readonly BookingSlot[];

// October 2025: Oct 1 is a Wednesday. Week 1 starts on Mon Sept 29. Today is Tue Oct 14.
const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"] as const;
const TODAY_INDEX = 8; // week 2, Tuesday (row 1, col 1) = day 14

type SiteBookingProps = {
  cursorTarget: string | null;
};

export function SiteBooking({ cursorTarget }: SiteBookingProps) {
  return (
    <div className="relative flex h-full w-full flex-col px-8 py-6">
      <ChapterNumeral numeral="V" />

      <div className="flex items-center gap-3">
        <span className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-stone-soft">
          Availability
        </span>
        <span className="block h-px w-6 bg-terracotta" aria-hidden="true" />
      </div>

      <div className="mt-5 grid grid-cols-[40%_1fr] gap-6 items-start">
        <MiniCalendar />

        <div className="flex flex-col gap-2">
          {bookingSlots.map((slot, i) => (
            <SlotRow
              key={`${slot.day}-${slot.time}`}
              slot={slot}
              isHovered={!!slot.highlighted && cursorTarget === "booking-friday"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniCalendar() {
  return (
    <div className="flex flex-col">
      <p className="font-serif text-[14px] leading-tight text-bone">October 2025</p>
      <div className="mt-2 grid grid-cols-7 gap-y-1">
        {DAY_LABELS.map((d, i) => (
          <span
            key={i}
            className="text-center font-sans text-[7px] font-medium uppercase tracking-[0.08em] text-stone-soft"
          >
            {d}
          </span>
        ))}
        {Array.from({ length: 28 }).map((_, idx) => {
          // Offset: Oct 1 (Wed) is at index 2. Day number = idx - 2 + 1.
          const dayNum = idx - 2 + 1;
          const isCurrentWeek = idx >= 7 && idx < 14;
          const isToday = idx === TODAY_INDEX;
          const isPast = idx < TODAY_INDEX;
          const valid = dayNum >= 1 && dayNum <= 31;
          return (
            <span
              key={idx}
              className="relative flex h-5 items-center justify-center font-sans text-[8px] tabular-nums"
              style={{
                color: !valid
                  ? "rgba(138,131,120,0.3)"
                  : isToday
                  ? "var(--bone)"
                  : isCurrentWeek
                  ? "var(--bone)"
                  : isPast
                  ? "rgba(138,131,120,0.45)"
                  : "var(--stone-soft)",
              }}
            >
              {valid ? dayNum : ""}
              {isToday && (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 rounded-full bg-terracotta"
                  style={{ width: 4, height: 4 }}
                />
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function SlotRow({ slot, isHovered }: { slot: BookingSlot; isHovered: boolean }) {
  const highlighted = !!slot.highlighted;
  return (
    <motion.div
      className="relative flex items-center gap-3 rounded-sm px-2 py-1.5"
      animate={{
        y: isHovered ? -2 : 0,
        backgroundColor: highlighted
          ? "var(--card-elevated)"
          : "rgba(31,24,18,0)",
      }}
      transition={{ duration: 0.22, ease: EASE }}
      style={{
        boxShadow: highlighted
          ? isHovered
            ? "inset 2px 0 0 var(--terracotta), 0 4px 12px -4px rgba(200,109,79,0.25)"
            : "inset 2px 0 0 var(--terracotta)"
          : "none",
      }}
    >
      <div
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-terracotta"
        aria-hidden="true"
      >
        <span className="font-serif text-[9px] text-bone">
          {slot.practitionerInitials}
        </span>
      </div>
      <div className="flex min-w-0 flex-col">
        <p className="font-sans text-[10px] leading-tight text-bone">
          <span className="font-medium">{slot.day}</span>
          <span className="mx-1 text-stone-soft">·</span>
          {slot.time}
          <span className="mx-1 text-stone-soft">·</span>
          <span className="text-bone/80">{slot.practitionerName}</span>
        </p>
        <p className="mt-0.5 font-sans text-[8.5px] text-stone-soft">
          {slot.service}
          <span className="mx-1 opacity-50">·</span>
          {slot.price}
        </p>
      </div>
    </motion.div>
  );
}

function ChapterNumeral({ numeral }: { numeral: string }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute right-6 top-4 select-none font-serif font-light text-terracotta"
      style={{
        fontSize: 96,
        lineHeight: 1,
        opacity: 0.05,
      }}
    >
      {numeral}
    </span>
  );
}

export default SiteBooking;
