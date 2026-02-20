import { ButtonHTMLAttributes, forwardRef } from "react";
import { LucideIcon } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** * Utility to merge tailwind classes safely
 * Usually placed in a separate /lib/utils.ts, but included here per
 * "Context Strictness" protocol.
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "main" | "secondary" | "outline";
  icon?: LucideIcon;
  iconPlacement?: "left" | "right";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "main",
      icon: Icon,
      iconPlacement = "right",
      isLoading,
      children,
      ...props
    },
    ref,
  ) => {
    // Base styles focused on Mobile-First Touch Targets (min-h 44px)
    const baseStyles =
      "inline-flex items-center justify-center gap-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] min-h-[48px] px-6 py-3";

    const variants = {
      main: "bg-accent text-white hover:bg-accent-hover hover:shadow-lg hover:shadow-orange-500/20",
      secondary:
        "bg-accent-soft text-accent-text hover:bg-orange-200 dark:hover:bg-orange-900/30",
      outline:
        "bg-transparent border-2 border-card-border text-text-main hover:border-accent hover:text-accent",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <>
            {Icon && iconPlacement === "left" && (
              <Icon size={16} className="shrink-0" />
            )}
            <span className="relative z-10">{children}</span>
            {Icon && iconPlacement === "right" && (
              <Icon size={16} className="shrink-0" />
            )}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
