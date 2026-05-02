"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import { copy } from "@/content/copy";

import { type ReceiptState } from "./AIAnswerScene/ChatMessage";
import { CONVERSATION } from "./AIAnswerScene/conversation";
import { Phone, type TypingSide } from "./AIAnswerScene/Phone";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const VIGNETTE_GRADIENT =
  "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)";

const GLOW_1_GRADIENT =
  "radial-gradient(circle, rgba(200,109,79,0.55) 0%, rgba(200,109,79,0.18) 35%, rgba(200,109,79,0) 70%)";

const GLOW_2_GRADIENT =
  "radial-gradient(circle, rgba(200,109,79,0.55) 0%, rgba(200,109,79,0.10) 40%, rgba(200,109,79,0) 70%)";

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

function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const sync = () => setIsTouch(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return isTouch;
}

function useIsMd() {
  const [isMd, setIsMd] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsMd(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return isMd;
}

function StaticAIAnswerScene() {
  const headlineText = copy.home.aiAnswerScene.headline;
  const headlineWords = headlineText.split(" ");

  const finalReceiptStates: Record<string, ReceiptState> = {
    m1: "double-bone",
    m3: "double-bone",
    m5: "double-bone",
  };

  return (
    <section
      aria-labelledby="ai-answer-heading"
      className="relative bg-ink min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden"
    >
      <h2 id="ai-answer-heading" className="sr-only">
        How Novacare answers
      </h2>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ backgroundImage: VIGNETTE_GRADIENT }}
      />

      {/* Scene-transition fade from Beat 2 into Beat 4 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[20] h-[120px] bg-gradient-to-b from-transparent to-ink"
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 max-w-[1200px] w-full">
        <div className="relative flex items-center justify-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
            style={{
              opacity: 0.45,
              backgroundImage: GLOW_1_GRADIENT,
              filter: "blur(20px)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[calc(50%-30px)] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]"
            style={{
              opacity: 0.2,
              backgroundImage: GLOW_2_GRADIENT,
              filter: "blur(15px)",
            }}
          />
          <div
            className="relative z-10 rounded-[44px]"
            style={{
              boxShadow: "0 40px 80px -30px rgba(0,0,0,0.6)",
            }}
          >
            <Phone
              visibleCount={CONVERSATION.length}
              typingSide={null}
              receiptStates={finalReceiptStates}
              cardHovered={false}
              cardLanded
              reduce
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 max-w-[480px]">
          <p className="font-serif font-normal text-bone text-[28px] md:text-[48px] tracking-[-0.02em] leading-[1.1]">
            {headlineWords.map((word, i) => {
              const isAnswer =
                word.replace(/[.,]/g, "").toLowerCase() === "answer";
              const isLast = i === headlineWords.length - 1;
              return (
                <span
                  key={i}
                  className={`inline-block ${
                    isAnswer ? "text-terracotta" : "text-bone"
                  } ${isLast ? "" : "mr-[0.25em]"}`}
                >
                  {word}
                </span>
              );
            })}
          </p>
          <span className="font-sans text-[12px] tracking-[0.12em] uppercase font-medium text-stone-soft">
            {copy.home.aiAnswerScene.caption}
          </span>
        </div>
      </div>
    </section>
  );
}

export function AIAnswerScene() {
  const reduce = useReducedMotion() ?? false;
  const isLg = useIsLg();
  const isMd = useIsMd();
  const isTouch = useIsTouch();

  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [visibleCount, setVisibleCount] = useState(0);
  const [typingSide, setTypingSide] = useState<TypingSide>(null);
  const [receiptStates, setReceiptStates] = useState<
    Record<string, ReceiptState>
  >({});
  const [cardLanded, setCardLanded] = useState(false);
  const [phoneHovered, setPhoneHovered] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const firedRef = useRef<Set<number>>(new Set());

  const setReceipt = (id: string, state: ReceiptState) =>
    setReceiptStates((s) => ({ ...s, [id]: state }));

  const milestones: Array<{ threshold: number; apply: () => void }> = [
    {
      threshold: 0.25,
      apply: () => {
        setVisibleCount(1);
        setReceipt("m1", "single");
      },
    },
    { threshold: 0.27, apply: () => setReceipt("m1", "double-soft") },
    {
      threshold: 0.32,
      apply: () => {
        setTypingSide("received");
        setReceipt("m1", "double-bone");
      },
    },
    {
      threshold: 0.37,
      apply: () => {
        setVisibleCount(2);
        setTypingSide(null);
      },
    },
    {
      threshold: 0.45,
      apply: () => {
        setVisibleCount(3);
        setReceipt("m3", "single");
      },
    },
    { threshold: 0.47, apply: () => setReceipt("m3", "double-soft") },
    {
      threshold: 0.52,
      apply: () => {
        setTypingSide("received");
        setReceipt("m3", "double-bone");
      },
    },
    {
      threshold: 0.56,
      apply: () => {
        setVisibleCount(4);
        setTypingSide(null);
      },
    },
    { threshold: 0.6, apply: () => setTypingSide("sent") },
    {
      threshold: 0.63,
      apply: () => {
        setVisibleCount(5);
        setTypingSide(null);
        setReceipt("m5", "single");
      },
    },
    { threshold: 0.65, apply: () => setReceipt("m5", "double-soft") },
    {
      threshold: 0.69,
      apply: () => {
        setTypingSide("received");
        setReceipt("m5", "double-bone");
      },
    },
    {
      threshold: 0.74,
      apply: () => {
        setVisibleCount(6);
        setTypingSide(null);
      },
    },
    { threshold: 0.78, apply: () => setCardLanded(true) },
    { threshold: 0.82, apply: () => setRevealed(true) },
  ];

  // Phone entrance values (clamped)
  const phoneScale = useTransform(
    scrollYProgress,
    [0.1, 0.22, 0.5, 0.8, 1.0],
    [1.08, 1.0, 1.02, 1.0, 1.0],
    { clamp: true },
  );
  const phoneBlur = useTransform(scrollYProgress, [0.1, 0.22], [6, 0], {
    clamp: true,
  });
  const phoneFilter = useTransform(phoneBlur, (v) => `blur(${v}px)`);
  const phoneTranslateY = useTransform(scrollYProgress, [0.1, 0.22], [40, 0], {
    clamp: true,
  });
  const phoneOpacity = useTransform(scrollYProgress, [0.1, 0.22], [0, 1], {
    clamp: true,
  });
  const phoneShadowAlpha = useTransform(
    scrollYProgress,
    [0.1, 0.22],
    [0, 0.6],
    { clamp: true },
  );
  const phoneShadow = useMotionTemplate`0 40px 80px -30px rgba(0,0,0,${phoneShadowAlpha})`;

  // Glow opacity (scroll-driven)
  const glow1Opacity = useTransform(
    scrollYProgress,
    [0.05, 0.2],
    [0, 0.45],
    { clamp: true },
  );
  const glow2Opacity = useTransform(
    scrollYProgress,
    [0.05, 0.2],
    [0, 0.2],
    { clamp: true },
  );

  // Caption opacity
  const captionOpacity = useTransform(
    scrollYProgress,
    [0.85, 0.95],
    [0, 1],
    { clamp: true },
  );

  // Mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Entrance rotation (clamps at 0 after 0.22)
  const entranceRotateX = useTransform(
    scrollYProgress,
    [0.1, 0.22],
    [8, 0],
    { clamp: true },
  );
  const entranceRotateY = useTransform(
    scrollYProgress,
    [0.1, 0.22],
    [isMd ? -18 : -10, 0],
    { clamp: true },
  );

  // Mouse rotation
  const mouseRotateX = useTransform(smoothMouseY, (v) => v * -0.005);
  const mouseRotateY = useTransform(smoothMouseX, (v) => v * 0.005);

  // Composed rotation
  const combinedRotateX = useTransform(
    () => entranceRotateX.get() + mouseRotateX.get(),
  );
  const combinedRotateY = useTransform(
    () => entranceRotateY.get() + mouseRotateY.get(),
  );

  // Layered parallax (max ~1/2/4px on a 1440px viewport)
  const statusBarX = useTransform(smoothMouseX, (v) => v * 0.0014);
  const headerX = useTransform(smoothMouseX, (v) => v * 0.0028);
  const messagesX = useTransform(smoothMouseX, (v) => v * 0.0056);

  // Reflection translates inversely to mouse (glass refraction feel)
  const reflectionX = useTransform(smoothMouseX, [-200, 200], [10, -10]);
  const reflectionY = useTransform(smoothMouseY, [-200, 200], [10, -10]);

  // Milestone state machine: latched, monotonic, idempotent
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    for (let i = 0; i < milestones.length; i++) {
      if (v >= milestones[i].threshold && !firedRef.current.has(i)) {
        firedRef.current.add(i);
        milestones[i].apply();
      }
    }
  });

  // Mouse tracking
  useEffect(() => {
    if (reduce || isTouch || !isLg) return;
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
  }, [reduce, isTouch, isLg, mouseX, mouseY]);

  if (reduce) return <StaticAIAnswerScene />;

  const headlineText = copy.home.aiAnswerScene.headline;
  const headlineWords = headlineText.split(" ");

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  };
  const wordVariants = {
    hidden: { opacity: 0, y: 12, letterSpacing: "0.05em" },
    visible: {
      opacity: 1,
      y: 0,
      letterSpacing: "0em",
      transition: { duration: 0.6, ease: EASE },
    },
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="ai-answer-heading"
      className="relative bg-ink min-h-[550vh] md:min-h-[600vh] motion-reduce:min-h-screen [perspective:1200px]"
    >
      <h2 id="ai-answer-heading" className="sr-only">
        How Novacare answers
      </h2>
      {/* Scene-transition fade from Beat 1 into Beat 2 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[40vh] bg-gradient-to-b from-ink to-transparent z-[2]"
      />
      {/* Scene-transition fade from Beat 2 into Beat 4 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[20] h-[120px] bg-gradient-to-b from-transparent to-ink"
      />
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{ backgroundImage: VIGNETTE_GRADIENT }}
        />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 px-6 max-w-[1200px] w-full">
          {/* Phone column */}
          <div className="relative flex items-center justify-center">
            {/* Atmospheric glow layer 1 (800px) */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
              style={{
                opacity: glow1Opacity,
                backgroundImage: GLOW_1_GRADIENT,
                filter: "blur(20px)",
              }}
            />
            {/* Atmospheric glow layer 2 (400px, offset upward) */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[calc(50%-30px)] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]"
              style={{
                opacity: glow2Opacity,
                backgroundImage: GLOW_2_GRADIENT,
                filter: "blur(15px)",
              }}
            />
            {/* Phone wrapper: entrance + composed rotation + drop shadow */}
            <motion.div
              onHoverStart={() => setPhoneHovered(true)}
              onHoverEnd={() => setPhoneHovered(false)}
              style={{
                scale: phoneScale,
                opacity: phoneOpacity,
                filter: phoneFilter,
                y: phoneTranslateY,
                rotateX: combinedRotateX,
                rotateY: combinedRotateY,
                boxShadow: phoneShadow,
                transformStyle: "preserve-3d",
              }}
              className="relative z-10 rounded-[44px]"
            >
              <Phone
                visibleCount={visibleCount}
                typingSide={typingSide}
                receiptStates={receiptStates}
                cardHovered={phoneHovered && cardLanded}
                cardLanded={cardLanded}
                reduce={false}
                statusBarX={statusBarX}
                headerX={headerX}
                messagesX={messagesX}
                reflectionX={reflectionX}
                reflectionY={reflectionY}
              />
            </motion.div>
          </div>

          {/* Headline */}
          <motion.p
            variants={containerVariants}
            initial="hidden"
            animate={revealed ? "visible" : "hidden"}
            className="font-serif font-normal text-[28px] md:text-[48px] tracking-[-0.02em] leading-[1.1] max-w-[480px] text-center md:text-left"
          >
            {headlineWords.map((word, i) => {
              const isAnswer =
                word.replace(/[.,]/g, "").toLowerCase() === "answer";
              const isLast = i === headlineWords.length - 1;
              return (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className={`inline-block ${
                    isAnswer ? "text-terracotta" : "text-bone"
                  } ${isLast ? "" : "mr-[0.25em]"}`}
                >
                  {word}
                </motion.span>
              );
            })}
          </motion.p>
        </div>

        {/* Caption */}
        <motion.span
          style={{ opacity: captionOpacity }}
          className="absolute bottom-6 left-6 right-6 md:right-auto md:bottom-12 md:left-12 font-sans text-[12px] tracking-[0.12em] uppercase font-medium text-stone-soft text-center md:text-left"
        >
          {copy.home.aiAnswerScene.caption}
        </motion.span>
      </div>
    </section>
  );
}
