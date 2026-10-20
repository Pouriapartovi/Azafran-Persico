import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      "flex h-14 w-full border-0 border-b border-ink/25 bg-transparent px-0 text-base text-ink placeholder:text-ink-soft/60 transition-colors focus-visible:border-saffron-deep focus-visible:outline-none focus-visible:ring-0 aria-[invalid=true]:border-pomegranate disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
