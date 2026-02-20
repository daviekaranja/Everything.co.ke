import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

/** * Context Strictness: Internal utility per protocol.
 */

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "interactive" | "accent";
  padding?: "none" | "sm" | "md" | "lg";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant = "default", padding = "md", children, ...props },
    ref,
  ) => {
    const variants = {
      // Standard static container
      default: "bg-card-bg border border-card-border shadow-sm",
      // High-conversion: matches your 'service-card' utility logic
      interactive:
        "bg-card-bg border border-card-border hover:border-accent/50 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 cursor-pointer active:scale-[0.99]",
      // Highlight: for "Most Popular" or "Featured" items
      accent:
        "bg-card-bg border-2 border-accent shadow-lg shadow-orange-500/10 relative",
    };

    const paddings = {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl  overflow-hidden flex flex-col h-full",
          variants[variant],
          paddings[padding],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

/** Sub-components for semantic layout */
const CardHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 mb-4", className)} {...props} />
);

const CardTitle = ({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn(
      "text-h3 font-semibold leading-none tracking-tight mb-0 text-text-main",
      className,
    )}
    {...props}
  />
);

const CardContent = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("text-text-muted text-base flex-1", className)}
    {...props}
  />
);

const CardFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center pt-6 mt-auto", className)} {...props} />
);

Card.displayName = "Card";

export { Card, CardHeader, CardTitle, CardContent, CardFooter };
