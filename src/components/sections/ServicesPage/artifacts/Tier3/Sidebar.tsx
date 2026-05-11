"use client";

import { motion } from "framer-motion";

import {
  AdsIcon,
  BookingsIcon,
  OverviewIcon,
  RevenueIcon,
  SettingsIcon,
} from "../shared/icons";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export type ActivePage = "overview" | "bookings" | "ads" | "revenue";

export type NavCursorTarget =
  | "nav-overview"
  | "nav-bookings"
  | "nav-ads"
  | "nav-revenue"
  | null;

type NavItem = {
  page: ActivePage | "settings";
  label: string;
  Icon: (p: { size?: number; className?: string }) => React.JSX.Element;
  target: NavCursorTarget;
};

const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { page: "overview", label: "Overview", Icon: OverviewIcon, target: "nav-overview" },
  { page: "bookings", label: "Bookings", Icon: BookingsIcon, target: "nav-bookings" },
  { page: "ads", label: "Ads", Icon: AdsIcon, target: "nav-ads" },
  { page: "revenue", label: "Revenue", Icon: RevenueIcon, target: "nav-revenue" },
  { page: "settings", label: "Settings", Icon: SettingsIcon, target: null },
];

type Props = {
  activePage: ActivePage;
  cursorTarget: NavCursorTarget;
  play: boolean;
  reduce: boolean;
};

export function Sidebar({ activePage, cursorTarget, play, reduce }: Props) {
  return (
    <nav
      aria-label="Dashboard navigation"
      className="w-[120px] shrink-0 border-r border-border-warm bg-card/60 py-2"
    >
      {NAV_ITEMS.map((item, i) => {
        const isActive = item.page === activePage;
        const isHovered = item.target !== null && cursorTarget === item.target;

        const rowBg = isActive ? "bg-card-elevated" : isHovered ? "bg-card-elevated/55" : "";
        const labelColor = isActive ? "text-bone" : isHovered ? "text-bone/85" : "text-stone-soft";
        const iconColor = isActive
          ? "text-terracotta"
          : isHovered
          ? "text-terracotta/70"
          : "text-stone-soft";

        const content = (
          <>
            {isActive && (
              <span
                aria-hidden="true"
                className="absolute left-0 top-1.5 bottom-1.5 w-[2px] bg-terracotta"
              />
            )}
            {!isActive && isHovered && (
              <span
                aria-hidden="true"
                className="absolute left-0 top-2 bottom-2 w-[2px] bg-terracotta/40"
              />
            )}
            <item.Icon size={13} className={iconColor} />
            <span className={"font-sans text-[10.5px] " + labelColor}>{item.label}</span>
          </>
        );

        if (reduce || !play) {
          return (
            <div
              key={item.label}
              className={"relative flex items-center gap-2 px-3 py-2 " + rowBg}
            >
              {content}
            </div>
          );
        }

        return (
          <motion.div
            key={item.label}
            className={"relative flex items-center gap-2 px-3 py-2 transition-colors " + rowBg}
            initial={{ opacity: 0.01, x: -8 }}
            animate={play ? { opacity: 1, x: 0 } : { opacity: 0.01, x: -8 }}
            transition={{ duration: 0.35, ease: EASE, delay: 0.1 + i * 0.06 }}
          >
            {content}
          </motion.div>
        );
      })}
    </nav>
  );
}

export default Sidebar;
