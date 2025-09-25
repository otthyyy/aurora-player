"use client";
import { useEffect, useMemo, useState } from "react";
// Se hai già il PlayerContext con usePlayer:
import { usePlayer } from "@/src/hooks/PlayerContext";
// Se l'alias "@/src" non funziona, sostituisci con un import relativo: ../../hooks/PlayerContext

type SearchItem = {
  id: string;
  title: string;
  artist: string;
  cover: string;
  url: string;
  duration: number;
  source: "jamendo";
};

function useDebounced<T>(value: T, delay = 350) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}

export default function SearchBar() {
  const [q, setQ] = useState("");
  const dq = useDebounced(q);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchItem[]>([]);
  const player = usePlayer();

  useEffect(() => {
    const run = async () => {
      if (!dq) { setResults([]); return; }
      setLoading(true);
      try {
        const r = await fetch(`/api/search?q=${encodeURIComponent(dq)}&limit=25`);
        const json = await r.json();
        setResults(json.items ?? []);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [dq]);

  const empty = useMemo(() => dq && results.length === 0 && !loading, [dq, results, loading]);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cerca brani o artisti (Jamendo)…"
          className="w-full rounded-lg bg-slate-800 px-3 py-2 outline-none focus:ring-2 ring-indigo-400"
        />
        {loading && <span className="text-slate-400 text-sm self-center">Searching…</span>}
      </div>

      {empty && <div className="text-sm text-slate-400">Nessun risultato per “{dq}”.</div>}

      <div className="space-y-1 max-h-[50vh] overflow-auto pr-1">
        {results.map((t) => (
          <div
            key={`${t.source}:${t.id}`}
            className="flex items-center gap-3 p-2 rounded hover:bg-slate-800 cursor-pointer"
            onClick={() => player.load({
              id: `${t.source}:${t.id}`,
              title: t.title,
              artist: t.artist,
              cover: t.cover,
              url: t.url,
              duration: t.duration,
            }, true)}
          >
            <img src={t.cover} alt="" className="h-10 w-10 rounded object-cover" />
            <div className="min-w-0">
              <div className="truncate">{t.title}</div>
              <div className="text-xs text-slate-400 truncate">{t.artist}</div>
            </div>
            <div className="ml-auto text-xs text-slate-500">Jamendo</div>
          </div>
        ))}
      </div>
    </div>
  );
}
