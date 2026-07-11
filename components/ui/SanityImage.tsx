import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImage as SanityImageType } from "@/sanity/lib/fetch";

interface SanityImageProps {
  source?: SanityImageType | null;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Small caption shown inside the placeholder while no image is set. */
  placeholderLabel?: string;
  /** Custom placeholder icon; defaults to a person silhouette. */
  placeholderIcon?: React.ReactNode;
}

const defaultIcon = (
  <svg
    className="w-14 h-14 opacity-30"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

/**
 * Renders a Sanity image via next/image when one is set, otherwise a branded
 * placeholder of the same dimensions. Drop a photo into Sanity Studio and it
 * appears automatically — no code change needed.
 */
export default function SanityImage({
  source,
  alt,
  width,
  height,
  className = "",
  sizes,
  priority,
  placeholderLabel,
  placeholderIcon,
}: SanityImageProps) {
  if (source?.asset?._ref) {
    return (
      <Image
        src={urlFor(source).width(width).height(height).fit("crop").url()}
        alt={alt}
        width={width}
        height={height}
        className={className}
        sizes={sizes}
        priority={priority}
      />
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center bg-gradient-to-br from-gold/20 to-navy/10 text-text-secondary ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
      aria-label={alt}
      role="img"
    >
      {placeholderIcon ?? defaultIcon}
      {placeholderLabel && (
        <p className="text-sm opacity-50 mt-2">{placeholderLabel}</p>
      )}
    </div>
  );
}
