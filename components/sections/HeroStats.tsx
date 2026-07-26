import CountUp from "@/components/ui/CountUp";
import { pick, type Locale, type LocalizedString } from "@/sanity/lib/fetch";

/** Parse "500+" → {to:500, suffix:"+"}, "4.9★" → {to:4.9, decimals:1, suffix:"★"}. */
function parseValue(value: string) {
  const m = value.trim().match(/^([\d.]+)(.*)$/);
  if (!m) return { to: 0, decimals: 0, suffix: value };
  const numStr = m[1];
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { to: parseFloat(numStr), decimals, suffix: m[2] };
}

/**
 * Count-up stats band under the hero. Numbers are editable from Sanity Studio
 * (Site Settings → Hero Stats). Renders nothing if the owner hasn't added any.
 */
export default function HeroStats({
  stats,
  locale,
}: {
  stats?: { value?: string; label?: LocalizedString }[];
  locale: Locale;
}) {
  const items = (stats ?? []).filter((s) => s.value);
  if (items.length === 0) return null;

  return (
    <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
      {items.map((s, i) => {
        const { to, decimals, suffix } = parseValue(s.value!);
        return (
          <div key={i}>
            <div className="text-4xl md:text-5xl font-bold tracking-tight tabular-nums text-navy">
              <CountUp to={to} decimals={decimals} suffix={suffix} />
            </div>
            <div className="mt-1.5 text-sm text-text-secondary">{pick(s.label, locale)}</div>
          </div>
        );
      })}
    </div>
  );
}
