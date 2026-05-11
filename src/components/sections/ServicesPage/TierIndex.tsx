"use client";

import { motion } from "framer-motion";

import { copy } from "@/content/copy";

import {
  MarkAIReception,
  MarkGrowth,
  MarkSite,
} from "./artifacts/shared/icons";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const HEADER_AT_S = 1.0;
const ENTRY_BASE_AT_S = 1.2;
const ENTRY_STAGGER_S = 0.12;
const MARK_LEAD_S = 0.1; // mark fires shortly after entry text fades up
const HAIRLINE_AT_S = 1.44;

const tierIndex = copy.services.hero.tierIndex;

type Entry = (typeof tierIndex.entries)[number];

type TierIndexProps = {
  play: boolean;
};

export function TierIndex({ play }: TierIndexProps) {
  if (!play) {
    return <StaticTierIndex />;
  }

  return (
    <div className="flex w-full flex-col">
      <Header />

      {tierIndex.entries.map((entry, i) => {
        const entryAt = ENTRY_BASE_AT_S + i * ENTRY_STAGGER_S;
        const markAt = entryAt + MARK_LEAD_S;
        const isLast = i === tierIndex.entries.length - 1;
        return (
          <div key={entry.numeral} className="flex flex-col">
            <TierEntry
              entry={entry}
              entryAt={entryAt}
              markAt={markAt}
              isFirst={i === 0}
            />
            {!isLast && <Hairline />}
          </div>
        );
      })}
    </div>
  );
}

function StaticTierIndex() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col">
        <span className="font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-stone-soft">
          {tierIndex.label}
        </span>
        <span className="mt-2 block h-px w-6 bg-terracotta" aria-hidden="true" />
      </div>
      <div className="mt-5 flex flex-col">
        {tierIndex.entries.map((entry, i) => {
          const isLast = i === tierIndex.entries.length - 1;
          return (
            <div key={entry.numeral} className="flex flex-col">
              <EntryContent entry={entry} play={false} markDelay={0} />
              {!isLast && (
                <div
                  aria-hidden="true"
                  className="my-3.5 h-px w-[70%] bg-border-warm"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="flex flex-col">
      <motion.span
        className="font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-stone-soft"
        initial={{ opacity: 0.01, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: EASE, delay: HEADER_AT_S }}
      >
        {tierIndex.label}
      </motion.span>
      <motion.span
        aria-hidden="true"
        className="mt-2 block h-px w-6 origin-left bg-terracotta"
        initial={{ scaleX: 0.01, opacity: 0.01 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: EASE, delay: HEADER_AT_S + 0.05 }}
      />
    </div>
  );
}

function TierEntry({
  entry,
  entryAt,
  markAt,
  isFirst,
}: {
  entry: Entry;
  entryAt: number;
  markAt: number;
  isFirst: boolean;
}) {
  return (
    <motion.div
      className={isFirst ? "mt-5 flex flex-col" : "mt-8 flex flex-col"}
      initial={{ opacity: 0.01, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: EASE, delay: entryAt }}
    >
      <EntryContent entry={entry} play={true} markDelay={markAt} />
    </motion.div>
  );
}

function EntryContent({
  entry,
  play,
  markDelay,
}: {
  entry: Entry;
  play: boolean;
  markDelay: number;
}) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-serif font-light leading-[1] tracking-[-0.02em] text-bone text-[40px] md:text-[48px]">
          {entry.numeral}
        </span>
        <span className="text-stone-soft">
          {renderMark(entry.markId, play, markDelay)}
        </span>
      </div>
      <span className="mt-3 font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-bone">
        {entry.name}
      </span>
      <p className="mt-1.5 font-sans text-[13px] italic leading-[1.5] text-stone-soft">
        {entry.descriptor}
      </p>
    </>
  );
}

function renderMark(
  markId: Entry["markId"],
  play: boolean,
  delaySec: number,
) {
  const props = { play, delaySec, size: 24 } as const;
  switch (markId) {
    case "site":
      return <MarkSite {...props} />;
    case "ai-reception":
      return <MarkAIReception {...props} />;
    case "growth-system":
      return <MarkGrowth {...props} />;
  }
}

function Hairline() {
  return (
    <motion.div
      aria-hidden="true"
      className="my-3.5 h-px w-[70%] bg-border-warm"
      initial={{ opacity: 0.01 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: EASE, delay: HAIRLINE_AT_S }}
    />
  );
}

export default TierIndex;
