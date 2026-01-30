import React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none",

          // Variants
          variant === "default" &&
            "bg-black text-white hover:bg-gray-800",
          variant === "outline" &&
            "border border-gray-300 bg-white hover:bg-gray-100",
          variant === "ghost" &&
            "hover:bg-gray-100",

          // Sizes
          size === "default" && "h-10 px-4 text-sm",
          size === "sm" && "h-8 px-3 text-xs",
          size === "lg" && "h-12 px-6 text-base",

          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
