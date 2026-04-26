"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyButton({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      aria-label="Copy code"
      className={cn(
        "flex items-center gap-1 rounded px-1.5 py-0.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors",
        className
      )}
    >
      {copied ? (
        <>
          <Check className="size-3 text-green-500" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Copy className="size-3" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}
