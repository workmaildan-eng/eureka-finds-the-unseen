import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-eureka-purple text-warm-white shadow-[0_8px_30px_rgba(122,46,192,0.28)] hover:bg-eureka-purple/90 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(122,46,192,0.35)] focus-visible:ring-eureka-purple/50",
  secondary:
    "bg-warm-white/10 text-warm-white border border-warm-white/20 hover:bg-warm-white/15 hover:border-warm-white/35 hover:-translate-y-0.5 focus-visible:ring-warm-white/30",
  ghost:
    "bg-transparent text-warm-white hover:bg-warm-white/10 focus-visible:ring-warm-white/20",
  outline:
    "bg-transparent text-eureka-purple border border-eureka-purple/40 hover:border-eureka-purple/70 hover:bg-eureka-purple/10 hover:-translate-y-0.5 focus-visible:ring-eureka-purple/30",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", href, children, ...props }, ref) => {
    const classes = `inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] max-md:px-5 max-md:tracking-[0.12em] max-md:whitespace-normal max-md:text-center max-md:leading-snug transition-all duration-300 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-midnight disabled:opacity-50 ${variants[variant]} ${className}`;

    if (href) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
