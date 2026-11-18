import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// shadcn/ui button, restyled with the site palette: square corners, a fill that rises on hover.
const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap font-sans text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-500 ease-soft isolate disabled:pointer-events-none disabled:opacity-50 before:absolute before:inset-0 before:-z-10 before:translate-y-full before:transition-transform before:duration-500 before:ease-soft hover:before:translate-y-0",
  {
    variants: {
      variant: {
        brand: "bg-brand text-white before:bg-ink hover:text-white",
        dark: "bg-ink text-white before:bg-brand hover:text-white",
        light: "border border-paper/80 text-paper before:bg-white hover:text-ink",
        outline: "border border-ink text-ink before:bg-ink hover:text-paper",
      },
      size: {
        default: "h-14 px-8",
        sm: "h-11 px-5 text-xs",
        lg: "h-16 px-10",
      },
    },
    defaultVariants: { variant: "brand", size: "default" },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
