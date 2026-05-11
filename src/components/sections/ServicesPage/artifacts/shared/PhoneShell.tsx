import type { ReactNode } from "react";

const FRAME_GRADIENT =
  "linear-gradient(180deg, #322a22 0%, #221c17 50%, #161210 100%)";

const FRAME_BOX_SHADOW = [
  "0 0 0 1px rgba(244,241,234,0.15)",
  "inset 0 0 0 1px rgba(244,241,234,0.06)",
  "inset 0 1px 0 rgba(244,241,234,0.14)",
  "inset 0 -1px 0 rgba(0,0,0,0.4)",
  "0 30px 60px -20px rgba(0,0,0,0.55)",
].join(", ");

const REFLECTION_GRADIENT =
  "linear-gradient(135deg, rgba(244,241,234,0.04) 0%, rgba(244,241,234,0.01) 30%, rgba(244,241,234,0) 50%)";

type PhoneShellProps = {
  width: number;
  height: number;
  children: ReactNode;
  className?: string;
};

export function PhoneShell({
  width,
  height,
  children,
  className,
}: PhoneShellProps) {
  return (
    <div
      className={"relative " + (className ?? "")}
      style={{
        width,
        height,
        borderRadius: 44,
        backgroundImage: FRAME_GRADIENT,
        boxShadow: FRAME_BOX_SHADOW,
      }}
    >
      <div
        className="absolute inset-[3px] overflow-hidden bg-ink"
        style={{ borderRadius: 41 }}
      >
        <div className="relative flex h-full flex-col">{children}</div>

        <DynamicIsland />
        <HomeIndicator />
        <ScreenReflection />
      </div>
    </div>
  );
}

function DynamicIsland() {
  return (
    <div
      aria-hidden="true"
      className="absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-[16px] bg-black"
      style={{ width: 84, height: 24 }}
    />
  );
}

function HomeIndicator() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-2 left-1/2 z-[15] -translate-x-1/2 rounded-[3px]"
      style={{
        width: 100,
        height: 4,
        background: "rgba(244,241,234,0.35)",
      }}
    />
  );
}

function ScreenReflection() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10"
      style={{ backgroundImage: REFLECTION_GRADIENT }}
    />
  );
}

export default PhoneShell;
