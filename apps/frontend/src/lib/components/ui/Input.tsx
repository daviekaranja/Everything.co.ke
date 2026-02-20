import { InputHTMLAttributes, forwardRef } from "react";
import { LucideIcon } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** * Utility to merge tailwind classes safely
 * Context Strictness: Included per protocol as /lib/utils.ts not provided.
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  helperText?: string;
  containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      icon: Icon,
      helperText,
      containerClassName,
      id,
      ...props
    },
    ref,
  ) => {
    // Generate a consistent ID for A11y
    const inputId =
      id || `input-${label?.replace(/\s+/g, "-").toLowerCase() || "field"}`;

    return (
      <div className={cn("flex flex-col gap-1 w-full", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="font-semibold text-text-main ml-1 tracking-tight"
          >
            {label}
          </label>
        )}

        <div className="relative group">
          {Icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-header group-focus-within:text-accent transition-colors duration-200">
              <Icon size={18} strokeWidth={2.5} />
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            className={cn(
              // Layout & Typography
              "flex w-full   bg-card-bg px-2 py-3 text-base transition-all duration-300 outline-none",
              "min-h-13 placeholder:text-text-header/60",
              // Theming using provided @theme variables
              "border-card-border text-text-main shadow-sm",
              "focus:border-accent focus:ring-4 focus:ring-accent/10",
              // Error States
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                : "hover:border-accent/30",
              // Icon Offset
              Icon && "pl-12",
              className,
            )}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper`
                  : undefined
            }
            {...props}
          />
        </div>

        {error ? (
          <p
            id={`${inputId}-error`}
            className="text-xs font-bold text-red-500 ml-1 mt-0.5 animate-in fade-in slide-in-from-top-1"
          >
            {error}
          </p>
        ) : helperText ? (
          <p
            id={`${inputId}-helper`}
            className="text-xs text-text-muted ml-1 mt-0.5"
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
