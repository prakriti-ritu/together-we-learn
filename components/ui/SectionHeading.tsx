interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
  icon?: React.ReactNode;
  /** Heading level. Use "h1" for the page's primary heading (standalone pages),
   *  "h2" (default) for a section on a page that already has an h1. */
  as?: "h1" | "h2";
}

export default function SectionHeading({
  title,
  subtitle,
  className = "",
  light,
  icon,
  as = "h2",
}: SectionHeadingProps) {
  const Heading = as;
  return (
    <div className={`text-center mb-10 md:mb-14 ${className}`}>
      {icon && (
        <div className="flex justify-center mb-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${light ? "bg-white/10" : "bg-gold/10"}`}>
            <div className={light ? "text-gold-light" : "text-gold"}>{icon}</div>
          </div>
        </div>
      )}
      <Heading
        className={`font-serif text-3xl md:text-4xl font-bold mb-1 tracking-tight gold-underline ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </Heading>
      {subtitle && (
        <p
          className={`text-lg max-w-2xl mx-auto mt-5 ${
            light ? "text-white/80" : "text-text-secondary"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
