import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-amber-gold text-midnight shadow-[0_8px_30px_rgba(216,171,85,0.28)] hover:bg-amber-gold/90 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(216,171,85,0.35)] focus-visible:ring-amber-gold/50",
  secondary:
    "bg-warm-white/10 text-warm-white border border-warm-white/20 hover:bg-warm-white/15 hover:border-warm-white/35 hover:-translate-y-0.5 focus-visible:ring-warm-white/30",
  ghost:
    "bg-transparent text-warm-white hover:bg-warm-white/10 focus-visible:ring-warm-white/20",
  outline:
    "bg-transparent text-amber-gold border border-amber-gold/40 hover:border-amber-gold/70 hover:bg-amber-gold/10 hover:-translate-y-0.5 focus-visible:ring-amber-gold/30",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", href, children, ...props }, ref) => {
    const classes = `inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-midnight disabled:opacity-50 ${variants[variant]} ${className}`;

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
