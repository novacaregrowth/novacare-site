"use client";

import type { SVGProps } from "react";

import { motion } from "framer-motion";

type IconProps = {
  size?: number;
  className?: string;
};

type StrokeIconProps = IconProps & {
  strokeWidth?: number;
};

type MarkProps = {
  play?: boolean;
  delaySec?: number;
  size?: number;
  className?: string;
};

const MARK_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const MARK_DURATION_S = 0.6;
const MARK_PATH_STAGGER_S = 0.15;

const base = (size: number): Pick<SVGProps<SVGSVGElement>, "width" | "height" | "aria-hidden"> => ({
  width: size,
  height: size,
  "aria-hidden": true,
});

// ─── Browser chrome ────────────────────────────────────────────────

export function TrafficLights({ size = 12 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2" aria-hidden="true">
      <span className="rounded-full" style={{ width: size, height: size, background: "#FF5F57" }} />
      <span className="rounded-full" style={{ width: size, height: size, background: "#FEBC2E" }} />
      <span className="rounded-full" style={{ width: size, height: size, background: "#28C840" }} />
    </div>
  );
}

export function PadlockIcon({ size = 12, className, strokeWidth = 1.3 }: StrokeIconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 14 14" className={className}>
      <path
        d="M4 6.5V4.5a3 3 0 0 1 6 0V6.5M3.2 6.5h7.6a1 1 0 0 1 1 1v4.3a1 1 0 0 1-1 1H3.2a1 1 0 0 1-1-1V7.5a1 1 0 0 1 1-1z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RefreshIcon({ size = 12, className, strokeWidth = 1.3 }: StrokeIconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 14 14" className={className}>
      <path
        d="M11.5 6.5A4.5 4.5 0 1 0 12 8.7"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M9 6.5h2.8V3.7"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ShareIcon({ size = 12, className, strokeWidth = 1.3 }: StrokeIconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 14 14" className={className}>
      <path
        d="M7 8.5V1.5M7 1.5L4.5 4M7 1.5L9.5 4M3 7v4.5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Status bar (iPhone) ───────────────────────────────────────────

export function SignalIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={(size * 14) / 11} height={size} viewBox="0 0 14 11" aria-hidden="true" className={className}>
      <rect x="0" y="7" width="3" height="4" rx="0.5" fill="currentColor" />
      <rect x="4" y="4" width="3" height="7" rx="0.5" fill="currentColor" />
      <rect x="8" y="1" width="3" height="10" rx="0.5" fill="currentColor" />
    </svg>
  );
}

export function WifiIcon({ size = 14, className }: IconProps) {
  return (
    <svg width={(size * 14) / 11} height={size} viewBox="0 0 14 11" aria-hidden="true" className={className}>
      <path d="M1 4.2 A6 6 0 0 1 13 4.2" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M3 6.4 A4 4 0 0 1 11 6.4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M5 8.5 A2 2 0 0 1 9 8.5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <circle cx="7" cy="10" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function BatteryIcon({
  size = 14,
  percent = 75,
  className,
}: IconProps & { percent?: number }) {
  const safePercent = Math.max(0, Math.min(100, percent));
  const fillWidth = (safePercent / 100) * 18.8;
  return (
    <svg
      width={(size * 24) / 11}
      height={size}
      viewBox="0 0 24 11"
      aria-hidden="true"
      className={className}
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
      <rect x="22.4" y="3.4" width="1.2" height="4.2" rx="0.6" fill="currentColor" opacity="0.45" />
      <rect x="1.6" y="1.6" width={fillWidth} height="7.8" rx="1" fill="currentColor" />
    </svg>
  );
}

// ─── Chat header + composer (Tier 2) ───────────────────────────────

export function ChevronLeftIcon({ size = 16, className, strokeWidth = 1.5 }: StrokeIconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 16 16" className={className}>
      <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function VideoCallIcon({ size = 18, className, strokeWidth = 1.4 }: StrokeIconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 22 16" className={className}>
      <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth={strokeWidth} fill="none" />
      <path d="M15 7l5-3v8l-5-3z" stroke="currentColor" strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" />
    </svg>
  );
}

export function VoiceCallIcon({ size = 18, className, strokeWidth = 1.4 }: StrokeIconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 18 18" className={className}>
      <path
        d="M3 2.5h3l1.5 4-2 1.2a10 10 0 0 0 4.8 4.8l1.2-2L15.5 12v3a1 1 0 0 1-1 1A12 12 0 0 1 2 3.5a1 1 0 0 1 1-1z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AttachIcon({ size = 18, className, strokeWidth = 1.4 }: StrokeIconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 18 18" className={className}>
      <circle cx="9" cy="9" r="7.2" stroke="currentColor" strokeWidth={strokeWidth} fill="none" />
      <path d="M9 5.5v7M5.5 9h7" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export function EmojiIcon({ size = 18, className, strokeWidth = 1.4 }: StrokeIconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 18 18" className={className}>
      <circle cx="9" cy="9" r="7.2" stroke="currentColor" strokeWidth={strokeWidth} fill="none" />
      <circle cx="6.5" cy="7.5" r="0.9" fill="currentColor" />
      <circle cx="11.5" cy="7.5" r="0.9" fill="currentColor" />
      <path d="M6 11.2a4 4 0 0 0 6 0" stroke="currentColor" strokeWidth={strokeWidth} fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function MicIcon({ size = 18, className, strokeWidth = 1.4 }: StrokeIconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 18 18" className={className}>
      <rect x="6.5" y="2" width="5" height="9" rx="2.5" stroke="currentColor" strokeWidth={strokeWidth} fill="none" />
      <path d="M3.5 9a5.5 5.5 0 0 0 11 0M9 14.5v2" stroke="currentColor" strokeWidth={strokeWidth} fill="none" strokeLinecap="round" />
    </svg>
  );
}

// ─── Dashboard sidebar (Tier 3) ────────────────────────────────────

export function OverviewIcon({ size = 16, className, strokeWidth = 1.3 }: StrokeIconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 16 16" className={className}>
      <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth={strokeWidth} fill="none" />
      <rect x="9" y="2" width="5" height="3" rx="1" stroke="currentColor" strokeWidth={strokeWidth} fill="none" />
      <rect x="9" y="7" width="5" height="7" rx="1" stroke="currentColor" strokeWidth={strokeWidth} fill="none" />
      <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth={strokeWidth} fill="none" />
    </svg>
  );
}

export function BookingsIcon({ size = 16, className, strokeWidth = 1.3 }: StrokeIconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 16 16" className={className}>
      <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth={strokeWidth} fill="none" />
      <path d="M2 6.5h12M5 1.5v3M11 1.5v3" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export function ConversationsIcon({ size = 16, className, strokeWidth = 1.3 }: StrokeIconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 16 16" className={className}>
      <path
        d="M3 3h10a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H7l-3 2.5V11H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PatientsIcon({ size = 16, className, strokeWidth = 1.3 }: StrokeIconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 16 16" className={className}>
      <circle cx="6" cy="6" r="2.4" stroke="currentColor" strokeWidth={strokeWidth} fill="none" />
      <circle cx="11.2" cy="6.5" r="1.8" stroke="currentColor" strokeWidth={strokeWidth} fill="none" />
      <path d="M2 13.2c0-2.2 1.8-3.6 4-3.6s4 1.4 4 3.6M10 13c0-1.6 1.2-2.6 2.8-2.6s2.2.8 2.2 2" stroke="currentColor" strokeWidth={strokeWidth} fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function SettingsIcon({ size = 16, className, strokeWidth = 1.3 }: StrokeIconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 16 16" className={className}>
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth={strokeWidth} fill="none" />
      <path
        d="M8 1.5v2M8 12.5v2M14.5 8h-2M3.5 8h-2M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4M12.6 12.6l-1.4-1.4M4.8 4.8L3.4 3.4"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DownloadIcon({ size = 14, className, strokeWidth = 1.3 }: StrokeIconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 14 14" className={className}>
      <path d="M7 1.5v8M3.5 6.5L7 10l3.5-3.5M2 12h10" stroke="currentColor" strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronDownIcon({ size = 12, className, strokeWidth = 1.3 }: StrokeIconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 12 12" className={className}>
      <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DownArrowSmall({ size = 10, className, strokeWidth = 1.2 }: StrokeIconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 10 10" className={className}>
      <path d="M5 1v7M2.5 5.5L5 8l2.5-2.5" stroke="currentColor" strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Channel icons (Tier 1 + Tier 3) ───────────────────────────────

export function WhatsAppIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 16 16" className={className}>
      <path
        d="M8 1.5a6.5 6.5 0 0 0-5.6 9.8L1.5 14.5l3.4-0.9A6.5 6.5 0 1 0 8 1.5z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        strokeLinejoin="round"
      />
      <path
        d="M5.6 5.5c0-0.3 0.2-0.5 0.5-0.5h0.6c0.3 0 0.5 0.2 0.6 0.4l0.4 1.1a0.5 0.5 0 0 1-0.15 0.55l-0.4 0.35a4 4 0 0 0 1.9 1.9l0.35-0.4a0.5 0.5 0 0 1 0.55-0.15l1.1 0.4c0.2 0.1 0.4 0.3 0.4 0.6v0.6c0 0.3-0.2 0.5-0.5 0.5A4.8 4.8 0 0 1 5.6 5.5z"
        fill="currentColor"
      />
    </svg>
  );
}

export function InstagramIcon({ size = 16, className, strokeWidth = 1.3 }: StrokeIconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 16 16" className={className}>
      <rect x="2" y="2" width="12" height="12" rx="3.2" stroke="currentColor" strokeWidth={strokeWidth} fill="none" />
      <circle cx="8" cy="8" r="2.8" stroke="currentColor" strokeWidth={strokeWidth} fill="none" />
      <circle cx="11.6" cy="4.4" r="0.7" fill="currentColor" />
    </svg>
  );
}

export function GoogleGIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 16 16" className={className}>
      <path
        d="M14.4 8.17c0-.5-.04-.98-.13-1.45H8v2.74h3.6a3.08 3.08 0 0 1-1.34 2.02v1.68h2.16c1.27-1.17 2-2.9 2-4.99z"
        fill="currentColor"
      />
      <path
        d="M8 14.5c1.8 0 3.32-.6 4.42-1.62l-2.16-1.68c-.6.4-1.36.64-2.26.64-1.74 0-3.2-1.18-3.73-2.76H2.04v1.74A6.5 6.5 0 0 0 8 14.5z"
        fill="currentColor"
        opacity="0.7"
      />
      <path
        d="M4.27 9.08a3.9 3.9 0 0 1 0-2.16V5.18H2.04a6.5 6.5 0 0 0 0 5.64l2.23-1.74z"
        fill="currentColor"
        opacity="0.5"
      />
      <path
        d="M8 4.16c.98 0 1.85.34 2.54 1l1.91-1.91A6.5 6.5 0 0 0 2.04 5.18l2.23 1.74C4.8 5.34 6.26 4.16 8 4.16z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}

export function MapsMarkerIcon({ size = 16, className, strokeWidth = 1.3 }: StrokeIconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 16 16" className={className}>
      <path d="M8 1.5C5.2 1.5 3 3.6 3 6.4c0 3.4 5 8.1 5 8.1s5-4.7 5-8.1c0-2.8-2.2-4.9-5-4.9z" stroke="currentColor" strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" />
      <circle cx="8" cy="6.4" r="1.6" stroke="currentColor" strokeWidth={strokeWidth} fill="none" />
    </svg>
  );
}

// ─── Service-card marks (Tier 1) ───────────────────────────────────

export function DermatologyMark({ size = 24, className, strokeWidth = 1.2 }: StrokeIconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 24 24" className={className}>
      <path d="M3 7c3-3 6-3 9 0s6 3 9 0M3 13c3-3 6-3 9 0s6 3 9 0M3 19c3-3 6-3 9 0s6 3 9 0" stroke="currentColor" strokeWidth={strokeWidth} fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function InjectablesMark({ size = 24, className, strokeWidth = 1.2 }: StrokeIconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 24 24" className={className}>
      <path d="M14 4l6 6M16 6l-9 9-3.5.5L4 12l9-9 3 3z" stroke="currentColor" strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M9 11l4 4" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export function HydraFacialMark({ size = 24, className, strokeWidth = 1.2 }: StrokeIconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 24 24" className={className}>
      <path d="M12 3c-3 4-5 7-5 10a5 5 0 0 0 10 0c0-3-2-6-5-10z" stroke="currentColor" strokeWidth={strokeWidth} fill="none" strokeLinejoin="round" />
      <path d="M10 14a2 2 0 0 0 2 2" stroke="currentColor" strokeWidth={strokeWidth} fill="none" strokeLinecap="round" />
    </svg>
  );
}

// ─── Confirmation tick (Tier 2) ────────────────────────────────────

export function ConfirmTickIcon({ size = 12, className, strokeWidth = 1.4 }: StrokeIconProps) {
  return (
    <svg {...base(size)} viewBox="0 0 12 12" className={className}>
      <path d="M2.5 6.2L5 8.7L9.5 3.5" stroke="currentColor" strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Tier index marks (Services hero) ──────────────────────────────

function markPathAnim(play: boolean, delaySec: number, pathIndex: number) {
  const start = delaySec + pathIndex * MARK_PATH_STAGGER_S;
  return {
    initial: { pathLength: play ? 0 : 1 },
    animate: { pathLength: 1 },
    transition: { duration: MARK_DURATION_S, ease: MARK_EASE, delay: start },
  };
}

export function MarkSite({
  play = false,
  delaySec = 0,
  size = 24,
  className,
}: MarkProps) {
  return (
    <svg
      {...base(size)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <motion.path d="M 4 5 L 20 5 L 20 19 L 4 19 Z" pathLength={1} {...markPathAnim(play, delaySec, 0)} />
      <motion.path d="M 7 10 L 17 10" pathLength={1} {...markPathAnim(play, delaySec, 1)} />
      <motion.path d="M 7 14 L 13 14" pathLength={1} {...markPathAnim(play, delaySec, 2)} />
    </svg>
  );
}

export function MarkAIReception({
  play = false,
  delaySec = 0,
  size = 24,
  className,
}: MarkProps) {
  return (
    <svg
      {...base(size)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <motion.path
        d="M 12 4 A 8 8 0 1 1 11.99 4"
        pathLength={1}
        {...markPathAnim(play, delaySec, 0)}
      />
      <motion.path d="M 8.5 12 L 9 12" pathLength={1} {...markPathAnim(play, delaySec, 1)} />
      <motion.path d="M 11.75 12 L 12.25 12" pathLength={1} {...markPathAnim(play, delaySec, 1)} />
      <motion.path d="M 15 12 L 15.5 12" pathLength={1} {...markPathAnim(play, delaySec, 1)} />
    </svg>
  );
}

export function MarkGrowth({
  play = false,
  delaySec = 0,
  size = 24,
  className,
}: MarkProps) {
  return (
    <svg
      {...base(size)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <motion.path d="M 4 17 L 9 17" pathLength={1} {...markPathAnim(play, delaySec, 0)} />
      <motion.path d="M 10 12 L 16 12" pathLength={1} {...markPathAnim(play, delaySec, 1)} />
      <motion.path d="M 17 7 L 22 7" pathLength={1} {...markPathAnim(play, delaySec, 2)} />
      <motion.path
        d="M 6 17 L 20 7"
        pathLength={1}
        opacity={0.35}
        {...markPathAnim(play, delaySec, 3)}
      />
    </svg>
  );
}
