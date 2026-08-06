import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

/** Builds a Sanity CDN image URL, auto-serving WebP/AVIF when the browser supports it. */
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format");
}
