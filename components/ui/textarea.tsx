import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[112px] w-full resize-y border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-base text-ink placeholder:text-ink-soft/60 transition-colors focus-visible:border-saffron-deep focus-visible:outline-none focus-visible:ring-0",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
