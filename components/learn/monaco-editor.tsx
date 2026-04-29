"use client";

import { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import { Copy, RotateCcw, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type Props = {
  initialCode: string;
  language?: string;
  height?: number;
  filename?: string;
  className?: string;
  readOnly?: boolean;
};

export function MonacoEditor({
  initialCode,
  language = "javascript",
  height = 300,
  filename,
  className,
  readOnly = false,
}: Props) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Sync Monaco theme with the app's dark mode class
  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDark(root.classList.contains("dark"));
    update();

    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(initialCode);
    editorRef.current?.setValue(initialCode);
  };

  return (
    <div className={cn("rounded-lg border border-border overflow-hidden my-5", className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-muted border-b border-border">
        <span className="text-xs text-muted-foreground font-mono">
          {filename ?? language}
        </span>
        <div className="flex gap-1">
          <button
            onClick={handleCopy}
            aria-label="Copy code"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon-xs" }),
              "gap-1 px-2 w-auto"
            )}
          >
            {copied ? (
              <><Check className="size-3 text-green-500" /><span className="text-xs">Copied</span></>
            ) : (
              <><Copy className="size-3" /><span className="text-xs">Copy</span></>
            )}
          </button>
          {!readOnly && (
            <button
              onClick={handleReset}
              aria-label="Reset to original"
              className={buttonVariants({ variant: "ghost", size: "icon-xs" })}
            >
              <RotateCcw className="size-3" />
            </button>
          )}
        </div>
      </div>

      <Editor
        height={height}
        language={language}
        value={code}
        onChange={(val) => setCode(val ?? "")}
        onMount={(ed) => {
          editorRef.current = ed;
        }}
        theme={isDark ? "vs-dark" : "vs"}
        options={{
          readOnly,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          lineNumbers: "on",
          wordWrap: "on",
          tabSize: 2,
          padding: { top: 12, bottom: 12 },
          scrollbar: { vertical: "auto", horizontal: "auto" },
        }}
      />
    </div>
  );
}
