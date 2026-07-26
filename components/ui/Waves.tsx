/**
 * Layered-wave divider (Haikei style), inline SVG using the accent colour.
 * Pure SVG — zero runtime cost.
 */
export default function Waves({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`block w-full h-auto text-gold ${className}`}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        opacity="0.14"
        d="M0,64 C240,110 480,10 720,48 C960,86 1200,20 1440,60 L1440,120 L0,120 Z"
      />
      <path
        fill="currentColor"
        opacity="0.10"
        d="M0,80 C260,40 520,120 780,78 C1040,36 1240,96 1440,72 L1440,120 L0,120 Z"
      />
    </svg>
  );
}
