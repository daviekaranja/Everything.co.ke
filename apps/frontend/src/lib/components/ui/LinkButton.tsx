import Link, { LinkProps } from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const buttonVariants = {
  base: "inline-flex items-center justify-center gap-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] min-h-[48px] px-6 py-3 w-full sm:w-auto",
  main: "bg-accent text-white hover:bg-accent-hover hover:shadow-lg hover:shadow-orange-500/20 rounded-2xl",
  secondary:
    "bg-accent-soft text-accent-text hover:bg-orange-200 dark:hover:bg-orange-900/30",
  outline:
    "bg-transparent border-2 border-card-border text-text-main hover:border-accent hover:text-accent",
};

interface LinkButtonProps extends LinkProps {
  children: React.ReactNode;
  variant?: "main" | "secondary" | "outline";
  icon?: LucideIcon;
  iconPlacement?: "left" | "right";
  className?: string;
  id?: string;
}

/**
 * LinkButton Component
 * Optimized for SEO (Next.js Link) and UX (Button Styling).
 * Use this for internal navigation to maintain SPA speed.
 */
export function LinkButton({
  children,
  variant = "main",
  icon: Icon,
  iconPlacement = "right",
  className,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      {...props}
      className={cn(buttonVariants.base, buttonVariants[variant], className)}
    >
      {Icon && iconPlacement === "left" && (
        <Icon
          size={16}
          className="shrink-0 transition-transform group-hover:-translate-x-1"
        />
      )}

      <span className="relative z-10">{children}</span>

      {Icon && iconPlacement === "right" && (
        <Icon
          size={16}
          className="shrink-0 transition-transform group-hover:translate-x-1"
        />
      )}
    </Link>
  );
}
