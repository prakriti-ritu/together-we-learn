import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "whatsapp" | "call" | "outline";
type ButtonSize = "default" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-panel text-white shadow-button hover:bg-panel-2 hover:shadow-button-hover hover:scale-[1.02]",
  secondary:
    "bg-gold text-white shadow-button hover:bg-gold/90 hover:shadow-button-hover hover:scale-[1.02]",
  whatsapp:
    "bg-whatsapp text-white shadow-button hover:bg-whatsapp/90 hover:shadow-button-hover hover:scale-[1.02]",
  call:
    "bg-panel text-white shadow-button hover:bg-panel-2 hover:shadow-button-hover hover:scale-[1.02]",
  outline:
    "border-2 border-navy text-navy hover:bg-panel hover:text-white hover:border-panel hover:shadow-button-hover hover:scale-[1.02]",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  variant = "primary",
  size = "default",
  href,
  external,
  children,
  className = "",
  type = "button",
  disabled,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl min-h-[48px] min-w-[48px] transition-all duration-250 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2";

  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={styles} disabled={disabled}>
      {children}
    </button>
  );
}
