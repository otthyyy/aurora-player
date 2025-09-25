// src/app/api/search/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim() ?? "";
    const limit = Number(searchParams.get("limit") ?? 20);

    if (!q) return NextResponse.json({ items: [] }, { status: 200 });

    const clientId = process.env.JAMENDO_CLIENT_ID;
    if (!clientId) {
      return NextResponse.json({ error: "Missing JAMENDO_CLIENT_ID" }, { status: 500 });
    }

    const api = new URL("https://api.jamendo.com/v3.0/tracks");
    api.searchParams.set("client_id", clientId);
    api.searchParams.set("format", "json");
    api.searchParams.set("limit", String(limit));
    api.searchParams.set("fuzzysearch", q);
    api.searchParams.set("audiodlformat", "mp31");
    api.searchParams.set("include", "musicinfo+stats+licenses");
    api.searchParams.set("audioformat", "mp31");
    api.searchParams.set("order", "popularity_total");

    const r = await fetch(api.toString(), { cache: "no-store" });
    if (!r.ok) return NextResponse.json({ error: await r.text() }, { status: 502 });
    const data = await r.json();

    const items = (data?.results ?? []).map((t: any) => ({
      id: String(t.id),
      title: t.name,
      artist: t.artist_name,
      cover: t.image ?? "/placeholder.svg",
      url: t.audio,
      duration: t.duration ?? 0,
      license: t.license_cc ?? null,
      source: "jamendo" as const,
    }));

    return NextResponse.json({ items }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}
