interface CardProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  accent?: boolean;
}

export default function Card({ children, className = "", dark, accent }: CardProps) {
  return (
    <div
      className={`rounded-2xl p-6 md:p-8 ${
        dark
          ? "bg-panel text-white"
          : "bg-card-white border border-border-warm shadow-card"
      } ${
        accent ? "border-t-[3px] border-t-gold" : ""
      } transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-card-hover ${className}`}
    >
      {children}
    </div>
  );
}
