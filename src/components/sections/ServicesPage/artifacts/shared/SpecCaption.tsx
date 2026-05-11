type SpecCaptionProps = {
  parts: readonly string[];
  className?: string;
};

export function SpecCaption({ parts, className }: SpecCaptionProps) {
  return (
    <p
      className={
        "mt-4 text-center font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-stone-soft " +
        (className ?? "")
      }
    >
      {parts.map((part, i) => (
        <span key={part}>
          {part}
          {i < parts.length - 1 && <span aria-hidden="true" className="mx-2 opacity-60">·</span>}
        </span>
      ))}
    </p>
  );
}

export default SpecCaption;
