import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-xl border border-white/10 bg-midnight-light/50 backdrop-blur-sm p-6 shadow-sm transition-all hover:border-white/20",
            className
        )}
        {...props}
    />
));
Card.displayName = "Card";

export { Card };
