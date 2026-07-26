import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * On-demand revalidation endpoint.
 *
 * Wired to a Sanity webhook (Studio → API → Webhooks) so that publishing content
 * refreshes the live site immediately, instead of waiting for the 1-day ISR window.
 * Protect it with a shared secret passed as `?secret=...` (set REVALIDATE_SECRET in
 * the environment and in the Sanity webhook URL).
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid or missing secret" }, { status: 401 });
  }

  // Purge cached Sanity queries (tag) + re-render all routes under the layout.
  // `{ expire: 0 }` forces immediate expiration — the right choice for a webhook
  // (Sanity publish) where the update must be reflected right away.
  revalidateTag("sanity", { expire: 0 });
  revalidatePath("/", "layout");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
