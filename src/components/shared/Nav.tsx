"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { copy } from "@/content/copy";

const { links, cta } = copy.nav;

const linkClasses = cn(
  "relative inline-block py-1",
  "text-[12px] font-medium uppercase tracking-[0.12em]",
  "text-bone/85 hover:text-bone transition-colors duration-200",
  "after:pointer-events-none after:absolute after:left-0 after:bottom-[-6px]",
  "after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-terracotta",
  "after:transition-transform after:duration-[250ms] after:ease-out",
  "hover:after:scale-x-100 focus-visible:after:scale-x-100",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta focus:outline-none",
);

const ctaClasses = cn(
  "ml-10 inline-flex items-center rounded-lg",
  "px-[22px] py-[14px] text-[12px] font-medium uppercase tracking-[0.12em]",
  "border border-bone/25 bg-transparent text-bone",
  "hover:bg-bone hover:text-ink hover:border-bone",
  "transition-all duration-300 ease-out",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta focus:outline-none",
);

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex items-baseline gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta focus:outline-none"
      aria-label="Novacare Growth — home"
    >
      <span className="font-serif text-[18px] font-normal leading-none text-bone">
        Novacare
      </span>
      <span className="font-sans text-[10px] font-medium uppercase tracking-[0.15em] text-stone-soft">
        GROWTH
      </span>
    </Link>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const overlayMotion = reduce
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
      }
    : {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
        transition: { duration: 0.3, ease: "easeOut" as const },
      };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 h-20",
          "border-b transition-[background-color,backdrop-filter,border-color] duration-300 ease-out",
          scrolled
            ? "bg-ink/75 backdrop-blur-md border-border-warm"
            : "bg-transparent border-transparent",
        )}
      >
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-6 lg:px-12">
          <Wordmark />

          <nav className="hidden lg:flex items-center gap-10" aria-label="Primary">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={linkClasses}>
                {link.label}
              </Link>
            ))}
            <a
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className={ctaClasses}
            >
              {cta.label}
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="lg:hidden inline-flex items-center justify-center p-2 -mr-2 text-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta focus:outline-none"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-overlay"
            {...overlayMotion}
            className="fixed inset-0 z-50 flex flex-col bg-ink lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="flex h-20 items-center justify-between px-6">
              <Wordmark onClick={() => setOpen(false)} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex items-center justify-center p-2 -mr-2 text-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta focus:outline-none"
              >
                <X size={24} aria-hidden="true" />
              </button>
            </div>

            <nav
              className="flex flex-1 flex-col items-start justify-center gap-8 px-6"
              aria-label="Primary mobile"
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-serif text-[40px] font-light leading-none text-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta focus:outline-none"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="px-6 pb-10">
              <a
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-lg border border-terracotta bg-transparent px-8 py-5 text-[12px] font-medium uppercase tracking-[0.12em] text-bone transition-colors duration-300 ease-out hover:bg-terracotta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta focus:outline-none"
              >
                {cta.label}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
