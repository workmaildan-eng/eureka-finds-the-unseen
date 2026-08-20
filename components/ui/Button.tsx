import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-amber-gold text-midnight hover:bg-amber-gold/90 focus-visible:ring-amber-gold/50",
  secondary:
    "bg-warm-white/10 text-warm-white border border-warm-white/20 hover:bg-warm-white/20 focus-visible:ring-warm-white/30",
  ghost:
    "bg-transparent text-warm-white hover:bg-warm-white/10 focus-visible:ring-warm-white/20",
  outline:
    "bg-transparent text-amber-gold border border-amber-gold/40 hover:bg-amber-gold/10 focus-visible:ring-amber-gold/30",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", href, children, ...props }, ref) => {
    const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-midnight disabled:opacity-50 ${variants[variant]} ${className}`;

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
