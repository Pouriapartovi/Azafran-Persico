import { Fragment, type ElementType } from "react";
import { cn } from "@/lib/utils";

// Big serif headline. Periods and ampersands get the soft saffron italic treatment.
export function Display({ as: Tag = "h2", text, className }: { as?: ElementType; text: string; className?: string }) {
  const parts = text.split(/(&|\.)/);
  return (
    <Tag className={cn("font-display font-medium text-balance", className)}>
      {parts.map((p, i) =>
        p === "&" || p === "." ? (
          <span key={i} className="soft-mark" aria-hidden={false}>
            {p}
          </span>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        )
      )}
    </Tag>
  );
}

export function SectionIntro({ eyebrow, title, children, className, dark }: { eyebrow?: string; title: string; children?: React.ReactNode; className?: string; dark?: boolean }) {
  return (
    <div className={cn("max-w-3xl", dark && "on-dark", className)}>
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <Display text={title} className={cn("text-display-lg", dark ? "text-cream" : "text-ink")} />
      {children && <div className={cn("mt-6 max-w-xl text-lg", dark ? "text-cream/85" : "text-ink-soft")}>{children}</div>}
    </div>
  );
}
