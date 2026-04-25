"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { copy } from "@/content/copy";

type AppVariant = "instagram-derma" | "whatsapp-therapy" | "instagram-dental";

type Slot = {
  name: string;
  text: string;
  appearsAt: number;
  curveProgress: number[];
  curveHours: number[];
  gradient: string;
};

type Phone = {
  variant: AppVariant;
  username: string;
  badgeStart: number;
  badgeEnd: number;
  slots: Slot[];
};

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg, #6e4a3a, #3f2920)",
  "linear-gradient(135deg, #84574a, #5a3a2c)",
  "linear-gradient(135deg, #735040, #4a3024)",
  "linear-gradient(135deg, #7d5c4d, #51382c)",
  "linear-gradient(135deg, #6a4737, #3d281e)",
  "linear-gradient(135deg, #79503e, #4d3327)",
  "linear-gradient(135deg, #674332, #3a2519)",
];

const PHONES: Phone[] = [
  {
    variant: "instagram-derma",
    username: "dr.sara.derma",
    badgeStart: 3,
    badgeEnd: 7,
    slots: [
      {
        name: "Layla Al Qasimi",
        text: "Hi, urgent — I have a skin reaction, when's the earliest slot?",
        appearsAt: 0.75,
        curveProgress: [0.75, 0.8, 1.0],
        curveHours: [0.083, 6, 12],
        gradient: AVATAR_GRADIENTS[0],
      },
      {
        name: "Omar Hassan",
        text: "Do you have appointments available on Saturday?",
        appearsAt: 0.6,
        curveProgress: [0.6, 0.8, 1.0],
        curveHours: [0.083, 9, 16],
        gradient: AVATAR_GRADIENTS[1],
      },
      {
        name: "Emma Richardson",
        text: "I need a follow-up, can I book online?",
        appearsAt: 0.45,
        curveProgress: [0.45, 0.5, 0.8, 1.0],
        curveHours: [0.083, 2, 12, 18],
        gradient: AVATAR_GRADIENTS[2],
      },
      {
        name: "Khalid Abdullah",
        text: "Is Dr. Sara seeing new patients this month?",
        appearsAt: 0.3,
        curveProgress: [0.3, 0.5, 0.8, 1.0],
        curveHours: [0.083, 4, 18, 24],
        gradient: AVATAR_GRADIENTS[3],
      },
      {
        name: "Fatima Al Mansouri",
        text: "Hi, I'd like to book a dermatology consultation for next week, are you available?",
        appearsAt: 0,
        curveProgress: [0, 0.2, 0.5, 0.8, 1.0],
        curveHours: [0, 0.083, 7, 24, 36],
        gradient: AVATAR_GRADIENTS[4],
      },
      {
        name: "James Whitfield",
        text: "What are your prices for acne treatment?",
        appearsAt: 0,
        curveProgress: [0, 0.2, 0.5, 0.8, 1.0],
        curveHours: [0, 1, 12, 48, 60],
        gradient: AVATAR_GRADIENTS[5],
      },
      {
        name: "Priya Sharma",
        text: "Hello, do you accept walk-ins?",
        appearsAt: 0,
        curveProgress: [0, 0.2, 0.5, 0.8, 1.0],
        curveHours: [0, 3, 24, 72, 96],
        gradient: AVATAR_GRADIENTS[6],
      },
    ],
  },
  {
    variant: "whatsapp-therapy",
    username: "waveclinic.therapy",
    badgeStart: 5,
    badgeEnd: 14,
    slots: [
      {
        name: "Sarah O'Brien",
        text: "Please, I really need to book something this week",
        appearsAt: 0.75,
        curveProgress: [0.75, 0.8, 1.0],
        curveHours: [0.083, 8, 14],
        gradient: AVATAR_GRADIENTS[0],
      },
      {
        name: "Raj Patel",
        text: "Do you offer online sessions?",
        appearsAt: 0.6,
        curveProgress: [0.6, 0.8, 1.0],
        curveHours: [0.083, 11, 18],
        gradient: AVATAR_GRADIENTS[1],
      },
      {
        name: "Noura Al Maktoum",
        text: "What are your session rates?",
        appearsAt: 0.45,
        curveProgress: [0.45, 0.5, 0.8, 1.0],
        curveHours: [0.083, 3, 14, 20],
        gradient: AVATAR_GRADIENTS[2],
      },
      {
        name: "Ben Klein",
        text: "I'd like to inquire about couples therapy",
        appearsAt: 0.3,
        curveProgress: [0.3, 0.5, 0.8, 1.0],
        curveHours: [0.083, 6, 20, 24],
        gradient: AVATAR_GRADIENTS[3],
      },
      {
        name: "Mohammed Al Rashid",
        text: "Looking for a therapist for anxiety, do you have availability this month?",
        appearsAt: 0,
        curveProgress: [0, 0.2, 0.5, 0.8, 1.0],
        curveHours: [0, 0.2, 9, 24, 36],
        gradient: AVATAR_GRADIENTS[4],
      },
      {
        name: "Sophie Martin",
        text: "Can I book online or do I need to call?",
        appearsAt: 0,
        curveProgress: [0, 0.2, 0.5, 0.8, 1.0],
        curveHours: [0, 2, 14, 48, 72],
        gradient: AVATAR_GRADIENTS[5],
      },
      {
        name: "Aisha Rahman",
        text: "Hi, is Dr. Khalid taking new patients?",
        appearsAt: 0,
        curveProgress: [0, 0.2, 0.5, 0.8, 1.0],
        curveHours: [0, 5, 24, 96, 120],
        gradient: AVATAR_GRADIENTS[6],
      },
    ],
  },
  {
    variant: "instagram-dental",
    username: "skylinedental.dxb",
    badgeStart: 2,
    badgeEnd: 23,
    slots: [
      {
        name: "Yousef Khoury",
        text: "Emergency — broken tooth, please help",
        appearsAt: 0.75,
        curveProgress: [0.75, 0.8, 1.0],
        curveHours: [0.083, 10, 16],
        gradient: AVATAR_GRADIENTS[0],
      },
      {
        name: "Anya Volkov",
        text: "Hi, my son needs a check-up, do you see children?",
        appearsAt: 0.6,
        curveProgress: [0.6, 0.8, 1.0],
        curveHours: [0.083, 14, 22],
        gradient: AVATAR_GRADIENTS[1],
      },
      {
        name: "Tom Richardson",
        text: "Can I book a consultation for Invisalign?",
        appearsAt: 0.45,
        curveProgress: [0.45, 0.5, 0.8, 1.0],
        curveHours: [0.083, 4, 18, 24],
        gradient: AVATAR_GRADIENTS[2],
      },
      {
        name: "Mariam Haddad",
        text: "How much is a cleaning?",
        appearsAt: 0.3,
        curveProgress: [0.3, 0.5, 0.8, 1.0],
        curveHours: [0.083, 8, 24, 36],
        gradient: AVATAR_GRADIENTS[3],
      },
      {
        name: "Hassan Al Falasi",
        text: "What dental services do you offer?",
        appearsAt: 0,
        curveProgress: [0, 0.2, 0.5, 0.8, 1.0],
        curveHours: [0, 0.333, 12, 48, 60],
        gradient: AVATAR_GRADIENTS[4],
      },
      {
        name: "Lucy Chen",
        text: "Hello, I need a filling, how soon can I come in?",
        appearsAt: 0,
        curveProgress: [0, 0.2, 0.5, 0.8, 1.0],
        curveHours: [0, 3, 18, 72, 96],
        gradient: AVATAR_GRADIENTS[5],
      },
      {
        name: "David Torres",
        text: "Do you do teeth whitening?",
        appearsAt: 0,
        curveProgress: [0, 0.2, 0.5, 0.8, 1.0],
        curveHours: [0, 7, 48, 120, 168],
        gradient: AVATAR_GRADIENTS[6],
      },
    ],
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function formatTimestamp(hoursAgo: number): string {
  if (hoursAgo < 1) {
    const mins = Math.max(1, Math.round(hoursAgo * 60));
    return `${mins}m ago`;
  }
  if (hoursAgo < 24) {
    return `${Math.round(hoursAgo)}h ago`;
  }
  return `${Math.round(hoursAgo / 24)}d ago`;
}

function formatClock(totalMinutes: number): string {
  const minutes = Math.round(totalMinutes);
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;
  const mm = m.toString().padStart(2, "0");
  const h = h24 > 12 ? h24 - 12 : h24;
  return `${h}:${mm}`;
}

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

function SignalIcon() {
  return (
    <svg
      viewBox="0 0 14 11"
      width="12"
      height="11"
      aria-hidden="true"
      className="text-bone"
    >
      <rect x="0" y="7" width="3" height="4" rx="0.5" fill="currentColor" />
      <rect x="4" y="4" width="3" height="7" rx="0.5" fill="currentColor" />
      <rect x="8" y="1" width="3" height="10" rx="0.5" fill="currentColor" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg
      viewBox="0 0 14 11"
      width="12"
      height="11"
      aria-hidden="true"
      className="text-bone"
    >
      <path
        d="M1 4.2 A6 6 0 0 1 13 4.2"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M3 6.4 A4 4 0 0 1 11 6.4"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M5 8.5 A2 2 0 0 1 9 8.5"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="7" cy="10" r="0.8" fill="currentColor" />
    </svg>
  );
}

function BatteryIcon({
  fillWidth,
  staticFill,
}: {
  fillWidth?: MotionValue<number>;
  staticFill?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 11"
      width="20"
      height="11"
      aria-hidden="true"
      className="text-bone"
    >
      <rect
        x="0.4"
        y="0.4"
        width="21.2"
        height="10.2"
        rx="2.4"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.45"
      />
      <rect
        x="22.4"
        y="3.4"
        width="1.2"
        height="4.2"
        rx="0.6"
        fill="currentColor"
        opacity="0.45"
      />
      {fillWidth !== undefined ? (
        <motion.rect
          x="1.6"
          y="1.6"
          height="7.8"
          rx="1"
          fill="currentColor"
          style={{ width: fillWidth }}
        />
      ) : (
        <rect
          x="1.6"
          y="1.6"
          width={(staticFill ?? 100) * 0.19}
          height="7.8"
          rx="1"
          fill="currentColor"
        />
      )}
    </svg>
  );
}

function PhoneGlyphIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className="text-current"
    >
      <path
        d="M5 4.5C5 3.67 5.67 3 6.5 3h2.06a1.5 1.5 0 0 1 1.49 1.31l.36 2.85a1.5 1.5 0 0 1-.42 1.27L8.4 9.94a13 13 0 0 0 5.66 5.66l1.51-1.59a1.5 1.5 0 0 1 1.27-.42l2.85.36A1.5 1.5 0 0 1 21 15.44V17.5c0 .83-.67 1.5-1.5 1.5C11.49 19 5 12.51 5 4.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VideoGlyphIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className="text-current"
    >
      <rect
        x="3"
        y="6.5"
        width="13"
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M16 10l4.4-2.5a.5.5 0 0 1 .75.43v8.14a.5.5 0 0 1-.75.43L16 14v-4z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChatsTabIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className="text-current"
    >
      <path
        d="M4 4.5C4 3.67 4.67 3 5.5 3h13c.83 0 1.5.67 1.5 1.5v10c0 .83-.67 1.5-1.5 1.5h-7.3l-3.5 3a.5.5 0 0 1-.83-.38V16H5.5C4.67 16 4 15.33 4 14.5v-10z"
        fill="currentColor"
      />
    </svg>
  );
}

function StatusTabIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className="text-current"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
    </svg>
  );
}

function GearTabIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className="text-current"
    >
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <path
        d="M12 2v3M12 19v3M22 12h-3M5 12H2M19.07 4.93l-2.12 2.12M7.05 16.95l-2.12 2.12M19.07 19.07l-2.12-2.12M7.05 7.05L4.93 4.93"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DynamicIsland() {
  return (
    <div
      aria-hidden="true"
      className="absolute top-3 left-1/2 -translate-x-1/2 w-[84px] h-[24px] rounded-[16px] bg-black z-20"
    />
  );
}

function StatusBar({
  clockMV,
  batteryFillMV,
  staticClock,
  staticBattery,
}: {
  clockMV?: MotionValue<string>;
  batteryFillMV?: MotionValue<number>;
  staticClock?: string;
  staticBattery?: number;
}) {
  return (
    <div className="relative h-[44px] px-3 lg:px-4 flex items-center justify-between text-bone text-[14px] [font-family:system-ui,-apple-system,Inter,sans-serif] font-semibold">
      {clockMV ? (
        <motion.span className="tabular-nums leading-none">
          {clockMV}
        </motion.span>
      ) : (
        <span className="tabular-nums leading-none">{staticClock ?? "9:41"}</span>
      )}
      <div className="flex items-center gap-1">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon fillWidth={batteryFillMV} staticFill={staticBattery} />
      </div>
    </div>
  );
}

function AppHeader({ phone }: { phone: Phone }) {
  const initial = phone.username.charAt(0).toUpperCase();
  return (
    <div className="h-[50px] lg:h-[60px] px-4 flex items-center justify-between [border-bottom:0.5px_solid_rgba(244,241,234,0.06)]">
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center font-sans font-semibold text-bone text-[14px] flex-shrink-0"
          style={{ backgroundImage: AVATAR_GRADIENTS[0] }}
          aria-hidden="true"
        >
          {initial}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-bone text-[15px] font-medium leading-tight font-sans truncate">
            {phone.username}
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full bg-[#34C759] flex-shrink-0"
            />
            <span className="text-stone-soft text-[11px] leading-none font-sans">
              Active now
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 text-bone flex-shrink-0">
        <PhoneGlyphIcon size={18} />
        <VideoGlyphIcon size={18} />
      </div>
    </div>
  );
}

function MessageRow({
  slot,
  scrollYProgress,
  isWhatsApp,
  isStatic,
}: {
  slot: Slot;
  scrollYProgress: MotionValue<number>;
  isWhatsApp: boolean;
  isStatic?: boolean;
}) {
  const hoursAgoMV = useTransform(
    scrollYProgress,
    slot.curveProgress,
    slot.curveHours,
  );
  const tsMV = useTransform(hoursAgoMV, formatTimestamp);

  const initialName = slot.name.charAt(0);
  const dotColor = isWhatsApp
    ? "bg-[rgba(37,211,102,0.95)]"
    : "bg-[rgba(184,86,74,0.95)]";

  const finalTs = formatTimestamp(slot.curveHours[slot.curveHours.length - 1]);

  return (
    <motion.div
      layout="position"
      initial={isStatic ? false : { opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="flex items-center gap-3 px-4 py-2.5 [border-bottom:0.5px_solid_rgba(244,241,234,0.06)]"
    >
      <div
        className="w-[38px] h-[38px] rounded-full flex items-center justify-center font-sans font-semibold text-bone text-[15px] flex-shrink-0"
        style={{ backgroundImage: slot.gradient }}
        aria-hidden="true"
      >
        {initialName}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-bone text-[15px] font-semibold truncate font-sans">
            {slot.name}
          </span>
          {isStatic ? (
            <span className="text-[rgba(244,241,234,0.4)] text-[13px] font-normal tabular-nums flex-shrink-0 font-sans">
              {finalTs}
            </span>
          ) : (
            <motion.span className="text-[rgba(244,241,234,0.4)] text-[13px] font-normal tabular-nums flex-shrink-0 font-sans">
              {tsMV}
            </motion.span>
          )}
        </div>
        <p className="text-[rgba(244,241,234,0.55)] text-[14px] font-normal mt-0.5 line-clamp-1 font-sans">
          {slot.text}
        </p>
      </div>
      <span
        aria-hidden="true"
        className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColor}`}
      />
    </motion.div>
  );
}

function HomeIndicator() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] lg:w-[134px] h-[4px] lg:h-[5px] rounded-[3px] bg-[rgba(244,241,234,0.35)]"
    />
  );
}

function TabBar({
  isWhatsApp,
  countMV,
  staticCount,
}: {
  isWhatsApp: boolean;
  countMV?: MotionValue<number>;
  staticCount?: number;
}) {
  const badgeBg = isWhatsApp ? "bg-[#25D366]" : "bg-destructive";
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[48px] lg:h-[56px] [border-top:0.5px_solid_rgba(244,241,234,0.06)] backdrop-blur-md bg-[rgba(15,15,15,0.92)]">
      <HomeIndicator />
      <div className="relative flex h-full items-center justify-around px-2">
        <div className="flex flex-col items-center gap-1 text-bone">
          <div className="relative">
            <ChatsTabIcon size={22} />
            <div
              className={`absolute -top-1 -right-2 min-w-[18px] h-[18px] px-[5px] rounded-full ${badgeBg} flex items-center justify-center text-[#fff] text-[11px] font-bold tabular-nums leading-none font-sans`}
              aria-label="unread chats"
            >
              {countMV ? (
                <motion.span aria-hidden="true">{countMV}</motion.span>
              ) : (
                staticCount ?? 0
              )}
            </div>
          </div>
          <span className="text-[9px] leading-none font-sans">Chats</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-stone-soft">
          <PhoneGlyphIcon size={22} />
          <span className="text-[9px] leading-none font-sans">Calls</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-stone-soft">
          <StatusTabIcon size={22} />
          <span className="text-[9px] leading-none font-sans">Status</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-stone-soft">
          <GearTabIcon size={22} />
          <span className="text-[9px] leading-none font-sans">Settings</span>
        </div>
      </div>
    </div>
  );
}

function ScreenReflection() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0 right-0 h-1/2 z-10"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(244,241,234,0.04) 0%, rgba(244,241,234,0.01) 50%, rgba(244,241,234,0) 100%)",
      }}
    />
  );
}

function PhoneDevice({
  phone,
  scrollYProgress,
  clockMV,
  batteryFillMV,
  visibleSlotIndices,
  badgeCountMV,
  reduce,
}: {
  phone: Phone;
  scrollYProgress: MotionValue<number>;
  clockMV: MotionValue<string> | null;
  batteryFillMV: MotionValue<number> | null;
  visibleSlotIndices: number[];
  badgeCountMV: MotionValue<number> | null;
  reduce: boolean;
}) {
  const isWhatsApp = phone.variant === "whatsapp-therapy";
  const visibleSlots = visibleSlotIndices.map((i) => ({
    slot: phone.slots[i],
    index: i,
  }));

  return (
    <div
      className="relative w-[220px] h-[450px] lg:w-[260px] lg:h-[540px] rounded-[44px]"
      style={{
        backgroundImage: "linear-gradient(180deg, #1f1a15 0%, #15110d 100%)",
        boxShadow:
          "inset 0 1px 0 rgba(244,241,234,0.08), inset 0 0 0 1px rgba(244,241,234,0.06), 0 20px 40px rgba(0,0,0,0.35), 0 8px 16px rgba(0,0,0,0.25)",
      }}
    >
      <div className="absolute inset-[3px] rounded-[41px] bg-ink overflow-hidden">
        <DynamicIsland />
        <StatusBar
          clockMV={reduce ? undefined : clockMV ?? undefined}
          batteryFillMV={reduce ? undefined : batteryFillMV ?? undefined}
          staticClock={reduce ? "8:33" : undefined}
          staticBattery={reduce ? 23 : undefined}
        />
        <AppHeader phone={phone} />
        <div className="flex flex-col">
          <AnimatePresence initial={false}>
            {visibleSlots.map(({ slot, index }) => (
              <MessageRow
                key={`${phone.variant}-${index}`}
                slot={slot}
                scrollYProgress={scrollYProgress}
                isWhatsApp={isWhatsApp}
                isStatic={reduce}
              />
            ))}
          </AnimatePresence>
        </div>
        <TabBar
          isWhatsApp={isWhatsApp}
          countMV={reduce ? undefined : badgeCountMV ?? undefined}
          staticCount={reduce ? phone.badgeEnd : undefined}
        />
        <ScreenReflection />
      </div>
    </div>
  );
}

type EntranceConfig = {
  scrollRange: [number, number];
  scaleFrom: number;
  yPoints: number[];
  yProgressPoints: number[];
  xFrom: number;
  rotateZFrom: number;
  rotateZTo: number;
};

const ENTRANCE: Record<0 | 1 | 2, EntranceConfig> = {
  0: {
    scrollRange: [0.08, 0.28],
    scaleFrom: 0.84,
    yProgressPoints: [0.08, 0.28, 1.0],
    yPoints: [140, 0, 15],
    xFrom: -20,
    rotateZFrom: -3,
    rotateZTo: -2,
  },
  1: {
    scrollRange: [0, 0.2],
    scaleFrom: 0.88,
    yProgressPoints: [0, 0.2, 1.0],
    yPoints: [120, 0, 0],
    xFrom: 0,
    rotateZFrom: 0,
    rotateZTo: 0,
  },
  2: {
    scrollRange: [0.16, 0.36],
    scaleFrom: 0.84,
    yProgressPoints: [0.16, 0.36, 1.0],
    yPoints: [140, 0, 20],
    xFrom: 20,
    rotateZFrom: 3,
    rotateZTo: 2,
  },
};

function PhoneShell({
  phone,
  index,
  scrollYProgress,
  clockMV,
  batteryFillMV,
  badgeCountMV,
  smoothMouseX,
  smoothMouseY,
  isLg,
  hoveredIndex,
  setHoveredIndex,
  reduce,
}: {
  phone: Phone;
  index: 0 | 1 | 2;
  scrollYProgress: MotionValue<number>;
  clockMV: MotionValue<string>;
  batteryFillMV: MotionValue<number>;
  badgeCountMV: MotionValue<number>;
  smoothMouseX: MotionValue<number>;
  smoothMouseY: MotionValue<number>;
  isLg: boolean;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
  reduce: boolean;
}) {
  const cfg = ENTRANCE[index];
  const [r0, r1] = cfg.scrollRange;

  const initialVisible = phone.slots
    .map((s, i) => (s.appearsAt === 0 ? i : -1))
    .filter((i) => i >= 0);
  const [visibleSlotIndices, setVisibleSlotIndices] =
    useState<number[]>(initialVisible);
  const prevCountRef = useRef(initialVisible.length);
  const pulseControls = useAnimationControls();

  useEffect(() => {
    if (reduce) return;
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      const next = phone.slots
        .map((s, i) => (progress >= s.appearsAt ? i : -1))
        .filter((i) => i >= 0);
      if (next.length !== prevCountRef.current) {
        const grew = next.length > prevCountRef.current;
        prevCountRef.current = next.length;
        setVisibleSlotIndices(next);
        if (grew) {
          pulseControls.start({
            scale: [1, 1.015, 1],
            transition: { duration: 0.22, ease: "easeOut" },
          });
        }
      }
    });
    return unsubscribe;
  }, [scrollYProgress, phone.slots, pulseControls, reduce]);

  const scaleEntrance = useTransform(
    scrollYProgress,
    [r0, r1],
    [cfg.scaleFrom, 1],
  );
  const xEntrance = useTransform(scrollYProgress, [r0, r1], [cfg.xFrom, 0]);
  const yEntrance = useTransform(
    scrollYProgress,
    cfg.yProgressPoints,
    cfg.yPoints,
  );
  const opacityEntrance = useTransform(scrollYProgress, [r0, r1], [0.15, 1]);
  const blurEntrance = useTransform(scrollYProgress, [r0, r1], [12, 0]);
  const filterEntrance = useMotionTemplate`blur(${blurEntrance}px)`;
  const rotateZEntrance = useTransform(
    scrollYProgress,
    [r0, r1],
    [cfg.rotateZFrom, cfg.rotateZTo],
  );

  const shadowSize = useTransform(scrollYProgress, [r0, r1], [0, 80]);
  const shadowAlpha = useTransform(scrollYProgress, [r0, r1], [0, 0.4]);
  const boxShadow = useMotionTemplate`0px 40px ${shadowSize}px rgba(0, 0, 0, ${shadowAlpha})`;

  const xParallaxFactor = index === 0 ? -0.015 : index === 2 ? 0.015 : 0;
  const xCombined = useTransform(
    () => xEntrance.get() + smoothMouseX.get() * xParallaxFactor,
  );

  const rotateY = useTransform(() => smoothMouseX.get() * 0.005);
  const rotateX = useTransform(() => smoothMouseY.get() * -0.003);

  const rotateZForLayout = useTransform(() =>
    isLg ? rotateZEntrance.get() : 0,
  );

  const isHovered = hoveredIndex === index;
  const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

  if (reduce) {
    return (
      <PhoneDevice
        phone={phone}
        scrollYProgress={scrollYProgress}
        clockMV={null}
        batteryFillMV={null}
        visibleSlotIndices={phone.slots.map((_, i) => i)}
        badgeCountMV={null}
        reduce
      />
    );
  }

  return (
    <motion.div
      style={{
        scale: scaleEntrance,
        x: xCombined,
        y: yEntrance,
        opacity: opacityEntrance,
        filter: filterEntrance,
        rotateZ: rotateZForLayout,
        rotateX,
        rotateY,
        boxShadow,
        borderRadius: 44,
      }}
      className="[transform-style:preserve-3d]"
    >
      <motion.div
        onHoverStart={() => isLg && setHoveredIndex(index)}
        onHoverEnd={() => isLg && setHoveredIndex(null)}
        animate={{
          scale: isHovered ? 1.02 : 1,
          filter: isOtherHovered ? "brightness(0.7)" : "brightness(1)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.div animate={pulseControls}>
          <PhoneDevice
            phone={phone}
            scrollYProgress={scrollYProgress}
            clockMV={clockMV}
            batteryFillMV={batteryFillMV}
            visibleSlotIndices={visibleSlotIndices}
            badgeCountMV={badgeCountMV}
            reduce={false}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function Headline({
  reduce,
  scrollYProgress,
}: {
  reduce: boolean;
  scrollYProgress: MotionValue<number>;
}) {
  const opacity = useTransform(scrollYProgress, [0.8, 1.0], [0, 1]);
  const y = useTransform(scrollYProgress, [0.8, 1.0], [20, 0]);

  const headlineText = copy.home.phoneScene.headline;
  const parts = headlineText.split(/(\bloses\b)/);

  const inner = (
    <p className="font-serif font-light text-bone text-center max-w-[720px] text-[28px] md:text-[40px] lg:text-[52px] tracking-[-0.02em] leading-[1.15]">
      {parts.map((part, i) =>
        part === "loses" ? (
          <span key={i} className="text-terracotta">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </p>
  );

  if (reduce) {
    return <div className="flex items-center justify-center">{inner}</div>;
  }

  return (
    <motion.div
      style={{ opacity, y }}
      className="flex items-center justify-center"
    >
      {inner}
    </motion.div>
  );
}

export function PhoneScene() {
  const reduce = useReducedMotion() ?? false;
  const isLg = useIsLg();
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const clockMinutes = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1.0],
    [581, 615, 750, 887, 1032, 1233],
  );
  const clockMV = useTransform(clockMinutes, formatClock);

  const batteryPercent = useTransform(scrollYProgress, [0, 1], [100, 23]);
  const batteryFillMV = useTransform(batteryPercent, (v) => v * 0.19);

  const badge0Raw = useTransform(
    scrollYProgress,
    [0.2, 0.8],
    [PHONES[0].badgeStart, PHONES[0].badgeEnd],
  );
  const badge1Raw = useTransform(
    scrollYProgress,
    [0.2, 0.8],
    [PHONES[1].badgeStart, PHONES[1].badgeEnd],
  );
  const badge2Raw = useTransform(
    scrollYProgress,
    [0.2, 0.8],
    [PHONES[2].badgeStart, PHONES[2].badgeEnd],
  );
  const badge0 = useTransform(badge0Raw, (v) => Math.round(v));
  const badge1 = useTransform(badge1Raw, (v) => Math.round(v));
  const badge2 = useTransform(badge2Raw, (v) => Math.round(v));

  const headlineOverlayOpacity = useTransform(scrollYProgress, [0.8, 1.0], [0, 1]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 150, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 150, damping: 25 });

  useEffect(() => {
    if (!isLg || reduce) return;
    const section = sectionRef.current;
    if (!section) return;
    const handler = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };
    section.addEventListener("mousemove", handler, { passive: true });
    return () => section.removeEventListener("mousemove", handler);
  }, [isLg, reduce, mouseX, mouseY]);

  const phoneArgs = [
    { phone: PHONES[0], index: 0 as const, badgeCountMV: badge0 },
    { phone: PHONES[1], index: 1 as const, badgeCountMV: badge1 },
    { phone: PHONES[2], index: 2 as const, badgeCountMV: badge2 },
  ];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="problem-heading"
      className="relative bg-ink min-h-[280vh] lg:min-h-[200vh] motion-reduce:min-h-screen"
    >
      <h2 id="problem-heading" className="sr-only">
        The problem
      </h2>

      {reduce ? (
        <div className="flex flex-col items-center justify-center gap-12 py-20 px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
            {phoneArgs.map(({ phone, index }) => (
              <PhoneShell
                key={index}
                phone={phone}
                index={index}
                scrollYProgress={scrollYProgress}
                clockMV={clockMV}
                batteryFillMV={batteryFillMV}
                badgeCountMV={badge0}
                smoothMouseX={smoothMouseX}
                smoothMouseY={smoothMouseY}
                isLg={isLg}
                hoveredIndex={null}
                setHoveredIndex={() => {}}
                reduce
              />
            ))}
          </div>
          <Headline reduce scrollYProgress={scrollYProgress} />
        </div>
      ) : (
        <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col items-center justify-center px-6 py-16 lg:py-0 [perspective:1200px]">
          <div className="relative flex flex-col lg:flex-row gap-16 lg:gap-12 items-center justify-center">
            {phoneArgs.map((args) => (
              <PhoneShell
                key={args.index}
                phone={args.phone}
                index={args.index}
                scrollYProgress={scrollYProgress}
                clockMV={clockMV}
                batteryFillMV={batteryFillMV}
                badgeCountMV={args.badgeCountMV}
                smoothMouseX={smoothMouseX}
                smoothMouseY={smoothMouseY}
                isLg={isLg}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                reduce={false}
              />
            ))}
            <motion.div
              className="pointer-events-none absolute inset-0 hidden lg:flex items-center justify-center px-6 z-10"
              style={{ opacity: headlineOverlayOpacity }}
            >
              <Headline reduce={false} scrollYProgress={scrollYProgress} />
            </motion.div>
          </div>
          <div className="lg:hidden mt-16">
            <Headline reduce={false} scrollYProgress={scrollYProgress} />
          </div>
        </div>
      )}
    </section>
  );
}
