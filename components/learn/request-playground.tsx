"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Send, ChevronDown, ChevronRight } from "lucide-react";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type Props = {
  defaultMethod?: HttpMethod;
  defaultUrl?: string;
  defaultBody?: string;
  defaultHeaders?: Record<string, string>;
  title?: string;
  description?: string;
};

const METHOD_COLORS: Record<HttpMethod, string> = {
  GET: "text-blue-600 dark:text-blue-400",
  POST: "text-green-600 dark:text-green-400",
  PUT: "text-yellow-600 dark:text-yellow-400",
  PATCH: "text-orange-600 dark:text-orange-400",
  DELETE: "text-red-600 dark:text-red-400",
};

const METHODS: HttpMethod[] = ["GET", "POST", "PUT", "PATCH", "DELETE"];

type ResponseState = {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: unknown;
  durationMs: number;
} | null;

export function RequestPlayground({
  defaultMethod = "GET",
  defaultUrl = "/api/playground/users",
  defaultBody = "",
  defaultHeaders = {},
  title = "Try it yourself",
  description,
}: Props) {
  const [method, setMethod] = useState<HttpMethod>(defaultMethod);
  const [url, setUrl] = useState(defaultUrl);
  const [bodyText, setBodyText] = useState(defaultBody);
  const [headersText, setHeadersText] = useState(
    Object.entries(defaultHeaders)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n")
  );
  const [response, setResponse] = useState<ResponseState>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showHeaders, setShowHeaders] = useState(false);
  const [showResponseHeaders, setShowResponseHeaders] = useState(false);

  const send = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    const start = performance.now();

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      for (const line of headersText.split("\n").filter(Boolean)) {
        const colonIdx = line.indexOf(":");
        if (colonIdx > 0) {
          headers[line.slice(0, colonIdx).trim()] = line
            .slice(colonIdx + 1)
            .trim();
        }
      }

      const init: RequestInit = { method, headers };
      if (
        method !== "GET" &&
        method !== "DELETE" &&
        bodyText.trim()
      ) {
        init.body = bodyText;
      }

      const res = await fetch(url, init);
      const durationMs = Math.round(performance.now() - start);

      const responseHeaders: Record<string, string> = {};
      res.headers.forEach((val, key) => {
        responseHeaders[key] = val;
      });

      let body: unknown;
      const ct = res.headers.get("content-type") ?? "";
      if (ct.includes("application/json")) {
        body = await res.json();
      } else if (res.status === 204) {
        body = null;
      } else {
        body = await res.text();
      }

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: responseHeaders,
        body,
        durationMs,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setLoading(false);
    }
  };

  const statusColor = response
    ? response.status < 300
      ? "text-green-600 dark:text-green-400"
      : response.status < 400
        ? "text-yellow-600 dark:text-yellow-400"
        : "text-red-600 dark:text-red-400"
    : "";

  const bodyVisible =
    method === "POST" || method === "PUT" || method === "PATCH";

  return (
    <div className="rounded-xl border border-border bg-card my-6 overflow-hidden">
      {/* Title bar */}
      <div className="px-4 py-3 border-b border-border bg-muted/50 flex items-center gap-2">
        <Send className="size-4 text-muted-foreground" />
        <span className="font-medium text-sm">{title}</span>
      </div>

      <div className="p-4 space-y-3">
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}

        {/* Method + URL row */}
        <div className="flex gap-2">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as HttpMethod)}
            className={cn(
              "rounded-md border border-border bg-background px-2 py-1.5 text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-ring",
              METHOD_COLORS[method]
            )}
          >
            {METHODS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="/api/playground/users"
          />
          <button
            onClick={send}
            disabled={loading}
            className={buttonVariants({ variant: "default" })}
          >
            {loading ? "Sending…" : "Send"}
          </button>
        </div>

        {/* Headers toggle */}
        <div>
          <button
            onClick={() => setShowHeaders((v) => !v)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {showHeaders ? (
              <ChevronDown className="size-3" />
            ) : (
              <ChevronRight className="size-3" />
            )}
            Headers
          </button>
          {showHeaders && (
            <textarea
              value={headersText}
              onChange={(e) => setHeadersText(e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-ring resize-y"
              rows={3}
              placeholder={"Content-Type: application/json\nAuthorization: Bearer token"}
            />
          )}
        </div>

        {/* Body — only for methods that send one */}
        {bodyVisible && (
          <div>
            <p className="text-xs text-muted-foreground mb-1">
              Request Body (JSON)
            </p>
            <textarea
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-ring resize-y"
              rows={5}
              placeholder={'{"name": "Alice", "email": "alice@example.com"}'}
            />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-md bg-destructive/10 border border-destructive/30 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Response panel */}
        {response && (
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className={cn("text-sm font-semibold tabular-nums", statusColor)}>
                {response.status} {response.statusText}
              </span>
              <span className="text-xs text-muted-foreground">
                {response.durationMs}ms
              </span>
            </div>

            <button
              onClick={() => setShowResponseHeaders((v) => !v)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {showResponseHeaders ? (
                <ChevronDown className="size-3" />
              ) : (
                <ChevronRight className="size-3" />
              )}
              Response Headers
            </button>
            {showResponseHeaders && (
              <div className="rounded-md bg-muted p-3 text-xs font-mono space-y-0.5">
                {Object.entries(response.headers).map(([k, v]) => (
                  <div key={k}>
                    <span className="text-muted-foreground">{k}: </span>
                    <span>{v}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="rounded-md bg-muted p-3 overflow-x-auto">
              <pre className="text-xs font-mono whitespace-pre-wrap">
                {response.body === null
                  ? "(empty body — 204 No Content)"
                  : typeof response.body === "string"
                    ? response.body
                    : JSON.stringify(response.body, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
