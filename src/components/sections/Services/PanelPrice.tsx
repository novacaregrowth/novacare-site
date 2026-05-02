"use client";

import { useEffect, useState } from "react";

import { animate, useMotionValue, useMotionValueEvent } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type PanelPriceProps = {
  price: string;
  priceSubtitle: string;
  play: boolean;
  delaySec: number;
  isStatic?: boolean;
};

function parsePrice(price: string): { prefix: string; value: number } {
  const match = price.match(/^([^\d]*)([\d,]+)(.*)$/);
  if (!match) return { prefix: "", value: 0 };
  const prefix = match[1];
  const value = Number(match[2].replace(/,/g, ""));
  return { prefix, value };
}

export function PanelPrice({
  price,
  priceSubtitle,
  play,
  delaySec,
  isStatic,
}: PanelPriceProps) {
  const { prefix, value: finalValue } = parsePrice(price);
  const startValue = Math.max(0, finalValue - 100);

  const motionValue = useMotionValue(isStatic ? finalValue : startValue);
  const [display, setDisplay] = useState(isStatic ? finalValue : startValue);

  useMotionValueEvent(motionValue, "change", (latest) => {
    setDisplay(Math.round(latest));
  });

  useEffect(() => {
    if (isStatic) return;
    if (!play) return;
    const controls = animate(motionValue, finalValue, {
      delay: delaySec,
      duration: 0.6,
      ease: EASE,
    });
    return () => controls.stop();
  }, [play, finalValue, delaySec, isStatic, motionValue]);

  return (
    <div>
      <p className="font-serif font-light text-bone text-[32px] md:text-[36px] tracking-[-0.01em] leading-[1.05] tabular-nums">
        {prefix}
        {display.toLocaleString("en-US")}
      </p>
      <p className="mt-1 font-sans text-stone-soft text-[13px] leading-[1.5]">
        {priceSubtitle}
      </p>
    </div>
  );
}
