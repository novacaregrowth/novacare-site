import { BatteryIcon, SignalIcon, WifiIcon } from "./icons";

type StatusBarProps = {
  time: string;
  batteryPercent?: number;
  className?: string;
};

export function StatusBar({
  time,
  batteryPercent = 75,
  className,
}: StatusBarProps) {
  return (
    <div
      className={
        "relative flex h-[44px] items-center justify-between px-6 " +
        (className ?? "")
      }
    >
      <span className="font-sans text-[15px] font-semibold leading-none text-bone tabular-nums">
        {time}
      </span>
      <div className="flex items-center gap-1 text-bone">
        <SignalIcon size={10} />
        <WifiIcon size={10} />
        <BatteryIcon size={9} percent={batteryPercent} />
      </div>
    </div>
  );
}

export default StatusBar;
