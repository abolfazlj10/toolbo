"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { Trash2 } from "lucide-react";
import { ResultActions } from "@/components/result-actions";
import { Button } from "@/components/ui/button";

export type ToolHistoryEntry = {
  id: string;
  summary: string;
  createdAt: string;
};

const historyEventPrefix = "toolbo:history-updated:";
const maxEntries = 5;

function storageKey(url: string) {
  return `toolbo:history:${url}`;
}

function eventName(url: string) {
  return `${historyEventPrefix}${url}`;
}

function parseHistory(snapshot: string) {
  try {
    const parsed = JSON.parse(snapshot) as ToolHistoryEntry[];
    return Array.isArray(parsed)
      ? parsed.filter(
          (entry) =>
            typeof entry?.id === "string" &&
            typeof entry?.summary === "string" &&
            typeof entry?.createdAt === "string"
        )
      : [];
  } catch {
    return [];
  }
}

function makeSubscribe(url: string) {
  return (callback: () => void) => {
    if (typeof window === "undefined") {
      return () => {};
    }

    const name = eventName(url);
    window.addEventListener("storage", callback);
    window.addEventListener(name, callback);

    return () => {
      window.removeEventListener("storage", callback);
      window.removeEventListener(name, callback);
    };
  };
}

function makeGetSnapshot(url: string) {
  return () => {
    if (typeof window === "undefined") {
      return "[]";
    }

    return localStorage.getItem(storageKey(url)) ?? "[]";
  };
}

function emitHistoryChange(url: string) {
  window.dispatchEvent(new Event(eventName(url)));
}

export function useToolHistory(url: string) {
  const subscribe = useMemo(() => makeSubscribe(url), [url]);
  const getSnapshot = useMemo(() => makeGetSnapshot(url), [url]);
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => "[]");
  const entries = useMemo(() => parseHistory(snapshot), [snapshot]);

  const addHistory = useCallback(
    (summary: string) => {
      const trimmed = summary.trim();

      if (!trimmed || typeof window === "undefined") {
        return;
      }

      const withoutDuplicate = entries.filter((entry) => entry.summary !== trimmed);
      const next = [
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          summary: trimmed,
          createdAt: new Date().toISOString(),
        },
        ...withoutDuplicate,
      ].slice(0, maxEntries);

      localStorage.setItem(storageKey(url), JSON.stringify(next));
      emitHistoryChange(url);
    },
    [entries, url]
  );

  const clearHistory = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.removeItem(storageKey(url));
    emitHistoryChange(url);
  }, [url]);

  return { entries, addHistory, clearHistory };
}

export function ToolHistory({
  title,
  url,
  entries,
  onClear,
}: {
  title: string;
  url: string;
  entries: ToolHistoryEntry[];
  onClear: () => void;
}) {
  if (entries.length === 0) {
    return null;
  }

  return (
    <section className="tool-history" aria-label="تاریخچه نتیجه">
      <div className="tool-history-header">
        <div>
          <div className="tool-history-title">تاریخچه نتیجه</div>
          <div className="tool-history-subtitle">۵ نتیجه آخر همین ابزار</div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          title="پاک کردن تاریخچه"
          aria-label="پاک کردن تاریخچه"
          onClick={onClear}
        >
          <Trash2 />
          پاک کردن
        </Button>
      </div>
      <div className="tool-history-list">
        {entries.map((entry) => (
          <article key={entry.id} className="tool-history-item">
            <pre>{entry.summary}</pre>
            <ResultActions
              title={`${title} - تاریخچه`}
              text={entry.summary}
              filenameSlug={`${url}-history`}
              canPrint={false}
              canDownload={false}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
