import React from "react";
import { cn } from "@/lib/utils";

/* Card Wrapper */
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border bg-white text-gray-950 shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

/* Card Content */
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

export { Card, CardContent };

