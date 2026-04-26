"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Send, ChevronDown, ChevronRight, Loader2, Clock } from "lucide-react";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type Props = {
  defaultMethod?: HttpMethod;
  defaultUrl?: string;
  defaultBody?: string;
  defaultHeaders?: Record<string, string>;
  title?: string;
  description?: string;
};

const METHOD_STYLES: Record<
  HttpMethod,
  { text: string; bg: string; border: string }
> = {
  GET: {
    text: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-200 dark:border-blue-800",
  },
  POST: {
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  PUT: {
    text: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    border: "border-amber-200 dark:border-amber-800",
  },
  PATCH: {
    text: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-950/40",
    border: "border-orange-200 dark:border-orange-800",
  },
  DELETE: {
    text: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/40",
    border: "border-red-200 dark:border-red-800",
  },
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
      if (method !== "GET" && method !== "DELETE" && bodyText.trim()) {
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

  const statusInfo = response
    ? response.status < 300
      ? { color: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500" }
      : response.status < 400
        ? { color: "text-amber-600 dark:text-amber-400", dot: "bg-amber-500" }
        : { color: "text-red-600 dark:text-red-400", dot: "bg-red-500" }
    : null;

  const bodyVisible = method === "POST" || method === "PUT" || method === "PATCH";
  const methodStyle = METHOD_STYLES[method];

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden my-6 shadow-xs transition-shadow duration-300 hover:shadow-sm animate-scale-in">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-border bg-muted/40">
        <div className="size-5 rounded-md bg-primary/15 flex items-center justify-center">
          <Send className="size-2.5 text-primary" />
        </div>
        <span className="text-sm font-medium text-foreground">{title}</span>
      </div>

      <div className="p-4 space-y-3">
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        )}

        {/* Method + URL */}
        <div className="flex gap-2">
          <div className={cn("relative flex items-center rounded-lg border px-2.5 h-9", methodStyle.bg, methodStyle.border)}>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as HttpMethod)}
              className={cn(
                "appearance-none bg-transparent text-xs font-bold font-mono pr-1 focus:outline-none cursor-pointer",
                methodStyle.text
              )}
            >
              {METHODS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 h-9 rounded-lg border border-border bg-background px-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring/50 transition-shadow"
            placeholder="/api/playground/users"
          />
          <button
            onClick={send}
            disabled={loading}
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "h-9 min-w-[72px] transition-all duration-150"
            )}
          >
            {loading ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              "Send"
            )}
          </button>
        </div>

        {/* Headers toggle */}
        <div>
          <button
            onClick={() => setShowHeaders((v) => !v)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors duration-150"
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
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-ring/50 resize-y transition-shadow animate-fade-in"
              rows={3}
              placeholder={"Content-Type: application/json\nAuthorization: Bearer token"}
            />
          )}
        </div>

        {/* Body */}
        {bodyVisible && (
          <div className="animate-fade-in">
            <p className="text-xs font-medium text-muted-foreground mb-1.5">
              Request Body
              <span className="ml-1 text-muted-foreground/60 font-normal">JSON</span>
            </p>
            <textarea
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-ring/50 resize-y transition-shadow"
              rows={5}
              placeholder={'{"name": "Alice", "email": "alice@example.com"}'}
            />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-lg bg-destructive/8 border border-destructive/25 px-3 py-2.5 text-sm text-destructive animate-fade-in">
            {error}
          </div>
        )}

        {/* Response */}
        {response && statusInfo && (
          <div className="space-y-2.5 animate-fade-up">
            {/* Status bar */}
            <div className="flex items-center gap-3 py-2 px-3 rounded-lg bg-muted/50 border border-border/60">
              <span className={cn("flex items-center gap-1.5 text-sm font-semibold tabular-nums", statusInfo.color)}>
                <span className={cn("size-1.5 rounded-full", statusInfo.dot)} />
                {response.status} {response.statusText}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                <Clock className="size-3" />
                {response.durationMs}ms
              </span>
            </div>

            {/* Response headers toggle */}
            <button
              onClick={() => setShowResponseHeaders((v) => !v)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              {showResponseHeaders ? (
                <ChevronDown className="size-3" />
              ) : (
                <ChevronRight className="size-3" />
              )}
              Response Headers
            </button>
            {showResponseHeaders && (
              <div className="rounded-lg bg-muted/50 border border-border/60 p-3 text-xs font-mono space-y-0.5 animate-fade-in">
                {Object.entries(response.headers).map(([k, v]) => (
                  <div key={k} className="flex gap-2">
                    <span className="text-muted-foreground shrink-0">{k}:</span>
                    <span className="text-foreground/80 break-all">{v}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Response body */}
            <div className="rounded-lg bg-muted/50 border border-border/60 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-border/50 bg-muted/40">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                  Response Body
                </span>
              </div>
              <pre className="p-3 text-xs font-mono whitespace-pre-wrap text-foreground/85 overflow-x-auto max-h-72 leading-relaxed">
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
