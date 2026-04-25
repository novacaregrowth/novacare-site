"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
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

function ChevronLeftIcon({ size = 10 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className="text-current"
    >
      <path
        d="M15 6L9 12L15 18"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CameraIcon({ size = 18 }: { size?: number }) {
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
        y="7"
        width="18"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M9 7L10 4H14L15 7"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="13.5"
        r="3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

function NewChatIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className="text-current"
    >
      <path
        d="M11 4H6C4.9 4 4 4.9 4 6V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V13"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M16.5 3.5L20.5 7.5L13 15H9V11L16.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MoreIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className="text-current"
    >
      <circle cx="12" cy="6" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="18" r="1.5" fill="currentColor" />
    </svg>
  );
}

function SearchIconSmall({ size = 14 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      aria-hidden="true"
      className="text-stone-soft flex-shrink-0"
    >
      <circle
        cx="7"
        cy="7"
        r="4.6"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
      />
      <path
        d="M10.5 10.5L14 14"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
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

function ChatsTabIcon({ size = 20 }: { size?: number }) {
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

function UpdatesIcon({ size = 20 }: { size?: number }) {
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
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="2 3"
      />
      <circle cx="12" cy="12" r="2.6" fill="currentColor" />
    </svg>
  );
}

function CommunitiesIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className="text-current"
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="6"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <rect
        x="4"
        y="13"
        width="16"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <line
        x1="7"
        y1="16.5"
        x2="14"
        y2="16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconButton({
  children,
  reduce,
}: {
  children: ReactNode;
  reduce: boolean;
}) {
  return (
    <motion.div
      className="relative w-8 h-8 flex items-center justify-center cursor-pointer flex-shrink-0"
      initial="rest"
      animate="rest"
      whileHover={reduce ? undefined : "hover"}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[rgba(244,241,234,0.06)]"
        variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
        transition={{ duration: 0.2 }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

function ClinicAvatar({
  initial,
  reduce,
}: {
  initial: string;
  reduce: boolean;
}) {
  return (
    <motion.div
      className="w-8 h-8 rounded-full flex items-center justify-center font-sans font-semibold text-bone text-[14px] flex-shrink-0 cursor-pointer"
      style={{ backgroundImage: AVATAR_GRADIENTS[0] }}
      initial={{ scale: 1, boxShadow: "0 0 0 rgba(200,109,79,0)" }}
      whileHover={
        reduce
          ? undefined
          : { scale: 1.05, boxShadow: "0 0 12px rgba(200,109,79,0.25)" }
      }
      transition={{ duration: 0.2 }}
      aria-hidden="true"
    >
      {initial}
    </motion.div>
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

function AppHeaderInstagram({
  phone,
  countMV,
  staticCount,
  reduce,
}: {
  phone: Phone;
  countMV?: MotionValue<number>;
  staticCount?: number;
  reduce: boolean;
}) {
  const initial = phone.username.charAt(0).toUpperCase();
  return (
    <div className="h-[50px] lg:h-[60px] px-4 flex items-center justify-between [border-bottom:0.5px_solid_rgba(244,241,234,0.06)]">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="flex items-center gap-1 text-bone flex-shrink-0">
          <ChevronLeftIcon size={10} />
          {countMV ? (
            <motion.span className="text-bone text-[13px] font-semibold tabular-nums font-sans leading-none">
              {countMV}
            </motion.span>
          ) : (
            <span className="text-bone text-[13px] font-semibold tabular-nums font-sans leading-none">
              {staticCount ?? 0}
            </span>
          )}
        </div>
        <ClinicAvatar initial={initial} reduce={reduce} />
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
      <div className="text-bone flex-shrink-0">
        <IconButton reduce={reduce}>
          <CameraIcon size={18} />
        </IconButton>
      </div>
    </div>
  );
}

function AppHeaderWhatsApp({ reduce }: { reduce: boolean }) {
  return (
    <div className="h-[56px] lg:h-[64px] px-4 flex items-center justify-between [border-bottom:0.5px_solid_rgba(244,241,234,0.06)]">
      <span className="font-serif font-light text-bone text-[24px] leading-none">
        Chats
      </span>
      <div className="flex items-center gap-1 text-bone">
        <IconButton reduce={reduce}>
          <CameraIcon size={18} />
        </IconButton>
        <IconButton reduce={reduce}>
          <NewChatIcon size={18} />
        </IconButton>
        <IconButton reduce={reduce}>
          <MoreIcon size={18} />
        </IconButton>
      </div>
    </div>
  );
}

function SearchField({
  placeholder,
  reduce,
}: {
  placeholder: string;
  reduce: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div
      tabIndex={0}
      onClick={() => {
        if (!reduce) setIsFocused(true);
      }}
      onBlur={() => setIsFocused(false)}
      className={`h-9 mx-4 my-2 px-3 rounded-[10px] bg-[rgba(244,241,234,0.06)] flex items-center gap-2 cursor-text border outline-none transition-colors duration-200 ${
        isFocused && !reduce
          ? "border-[rgba(200,109,79,0.5)]"
          : "border-transparent"
      }`}
    >
      <SearchIconSmall />
      <span className="text-stone-soft text-[13px] font-sans select-none">
        {placeholder}
      </span>
    </div>
  );
}

function MessageRowInstagram({
  slot,
  scrollYProgress,
  isStatic,
  reduce,
}: {
  slot: Slot;
  scrollYProgress: MotionValue<number>;
  isStatic?: boolean;
  reduce: boolean;
}) {
  const hoursAgoMV = useTransform(
    scrollYProgress,
    slot.curveProgress,
    slot.curveHours,
  );
  const tsMV = useTransform(hoursAgoMV, formatTimestamp);
  const finalTs = formatTimestamp(slot.curveHours[slot.curveHours.length - 1]);
  const initialName = slot.name.charAt(0);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout="position"
      initial={isStatic ? false : { opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={
        reduce ? undefined : { backgroundColor: "rgba(244,241,234,0.04)" }
      }
      onHoverStart={() => {
        if (!reduce) setIsHovered(true);
      }}
      onHoverEnd={() => {
        if (!reduce) setIsHovered(false);
      }}
      transition={{
        duration: 0.4,
        ease: EASE,
        backgroundColor: { duration: 0.2 },
      }}
      className="flex items-center gap-3 px-4 py-2.5 [border-bottom:0.5px_solid_rgba(244,241,234,0.06)] cursor-pointer"
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
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {isStatic ? (
              <span className="text-stone-soft text-[12px] tabular-nums font-sans">
                {finalTs}
              </span>
            ) : (
              <motion.span className="text-stone-soft text-[12px] tabular-nums font-sans">
                {tsMV}
              </motion.span>
            )}
            <motion.span
              aria-hidden="true"
              className="w-[7px] h-[7px] rounded-full bg-destructive flex-shrink-0"
              animate={
                isHovered && !reduce ? { scale: [1, 1.3, 1] } : { scale: 1 }
              }
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>
        </div>
        <p className="text-stone-soft text-[13px] mt-0.5 line-clamp-1 font-sans">
          {slot.text}
        </p>
      </div>
    </motion.div>
  );
}

function MessageRowWhatsApp({
  slot,
  scrollYProgress,
  isStatic,
  reduce,
}: {
  slot: Slot;
  scrollYProgress: MotionValue<number>;
  isStatic?: boolean;
  reduce: boolean;
}) {
  const hoursAgoMV = useTransform(
    scrollYProgress,
    slot.curveProgress,
    slot.curveHours,
  );
  const tsMV = useTransform(hoursAgoMV, formatTimestamp);
  const finalTs = formatTimestamp(slot.curveHours[slot.curveHours.length - 1]);
  const initialName = slot.name.charAt(0);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout="position"
      initial={isStatic ? false : { opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={
        reduce ? undefined : { backgroundColor: "rgba(244,241,234,0.04)" }
      }
      onHoverStart={() => {
        if (!reduce) setIsHovered(true);
      }}
      onHoverEnd={() => {
        if (!reduce) setIsHovered(false);
      }}
      transition={{
        duration: 0.4,
        ease: EASE,
        backgroundColor: { duration: 0.2 },
      }}
      className="flex items-center gap-3 px-4 py-2.5 [border-bottom:0.5px_solid_rgba(244,241,234,0.06)] cursor-pointer"
    >
      <div
        className="w-[42px] h-[42px] rounded-full flex items-center justify-center font-sans font-semibold text-bone text-[16px] flex-shrink-0"
        style={{ backgroundImage: slot.gradient }}
        aria-hidden="true"
      >
        {initialName}
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-bone text-[15px] font-semibold truncate font-sans block">
          {slot.name}
        </span>
        <p className="text-stone-soft text-[13px] mt-0.5 line-clamp-1 font-sans">
          {slot.text}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        {isStatic ? (
          <span className="text-[#25D366] text-[12px] tabular-nums font-sans leading-none">
            {finalTs}
          </span>
        ) : (
          <motion.span className="text-[#25D366] text-[12px] tabular-nums font-sans leading-none">
            {tsMV}
          </motion.span>
        )}
        <motion.span
          aria-hidden="true"
          className="bg-[#25D366] text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1.5 flex items-center justify-center font-sans tabular-nums leading-none"
          animate={
            isHovered && !reduce ? { scale: [1, 1.3, 1] } : { scale: 1 }
          }
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          1
        </motion.span>
      </div>
    </motion.div>
  );
}

function HomeIndicator() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] lg:w-[134px] h-[4px] lg:h-[5px] rounded-[3px] bg-[rgba(244,241,234,0.35)] z-[15]"
    />
  );
}

function TabBarWhatsApp({
  countMV,
  staticCount,
}: {
  countMV?: MotionValue<number>;
  staticCount?: number;
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[56px] lg:h-[64px] [border-top:0.5px_solid_rgba(244,241,234,0.06)] backdrop-blur-md bg-[rgba(15,15,15,0.92)]">
      <div className="relative flex h-full items-stretch px-2">
        <div className="flex-1 relative flex flex-col items-center justify-center gap-0.5 text-bone">
          <div className="relative">
            <ChatsTabIcon size={20} />
            <div
              className="absolute -top-1 -right-2 min-w-[18px] h-[18px] px-[5px] rounded-full bg-[#25D366] flex items-center justify-center text-white text-[11px] font-bold tabular-nums leading-none font-sans"
              aria-label="unread chats"
            >
              {countMV ? (
                <motion.span aria-hidden="true">{countMV}</motion.span>
              ) : (
                staticCount ?? 0
              )}
            </div>
          </div>
          <span className="text-[10px] leading-none font-sans">Chats</span>
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-7 h-[2px] bg-[#25D366]"
          />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-0.5 text-stone-soft">
          <UpdatesIcon size={20} />
          <span className="text-[10px] leading-none font-sans">Updates</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-0.5 text-stone-soft">
          <CommunitiesIcon size={20} />
          <span className="text-[10px] leading-none font-sans">
            Communities
          </span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-0.5 text-stone-soft">
          <PhoneGlyphIcon size={20} />
          <span className="text-[10px] leading-none font-sans">Calls</span>
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
      className="relative w-[220px] h-[430px] lg:w-[260px] lg:h-[520px] rounded-[44px]"
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
        {isWhatsApp ? (
          <>
            <AppHeaderWhatsApp reduce={reduce} />
            <SearchField placeholder="Search messages" reduce={reduce} />
            <div className="flex flex-col">
              <AnimatePresence initial={false}>
                {visibleSlots.map(({ slot, index }) => (
                  <MessageRowWhatsApp
                    key={`${phone.variant}-${index}`}
                    slot={slot}
                    scrollYProgress={scrollYProgress}
                    isStatic={reduce}
                    reduce={reduce}
                  />
                ))}
              </AnimatePresence>
            </div>
            <TabBarWhatsApp
              countMV={reduce ? undefined : badgeCountMV ?? undefined}
              staticCount={reduce ? phone.badgeEnd : undefined}
            />
          </>
        ) : (
          <>
            <AppHeaderInstagram
              phone={phone}
              countMV={reduce ? undefined : badgeCountMV ?? undefined}
              staticCount={reduce ? phone.badgeEnd : undefined}
              reduce={reduce}
            />
            <SearchField placeholder="Search" reduce={reduce} />
            <div className="flex flex-col">
              <AnimatePresence initial={false}>
                {visibleSlots.map(({ slot, index }) => (
                  <MessageRowInstagram
                    key={`${phone.variant}-${index}`}
                    slot={slot}
                    scrollYProgress={scrollYProgress}
                    isStatic={reduce}
                    reduce={reduce}
                  />
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
        <HomeIndicator />
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
          <motion.div
            whileTap={{ scale: 0.99, filter: "brightness(0.95)" }}
            transition={{ duration: 0.15 }}
          >
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
  const opacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);
  const y = useTransform(scrollYProgress, [0.7, 0.85], [20, 0]);

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

  const headlineOverlayOpacity = useTransform(
    scrollYProgress,
    [0.7, 0.85],
    [0, 1],
  );

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
      className="relative bg-ink min-h-[280vh] lg:min-h-[240vh] motion-reduce:min-h-screen"
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
        <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col items-center justify-center px-6 py-16 lg:py-0 pt-8 lg:pt-12 [perspective:1200px]">
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
