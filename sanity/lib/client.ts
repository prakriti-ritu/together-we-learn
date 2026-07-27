import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Next's data cache (see `safe()` in lib/fetch.ts) handles caching + on-demand
  // revalidation, so we bypass Sanity's CDN to avoid double-caching stale content.
  useCdn: false,
});
