import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

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

  // Revalidate everything under the root layout (all locales + routes).
  revalidatePath("/", "layout");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
