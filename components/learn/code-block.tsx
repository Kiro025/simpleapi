// Server Component — Shiki runs at render time, no client JS needed.
import { codeToHtml } from "shiki";
import { CopyButton } from "@/components/learn/copy-button";

type Props = {
  children: string;
  language?: string;
  filename?: string;
};

export async function CodeBlock({
  children,
  language = "text",
  filename,
}: Props) {
  const code = children.trim();

  const html = await codeToHtml(code, {
    lang: language,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: false,
  });

  return (
    <div className="relative group rounded-xl border border-border overflow-hidden mb-5 shadow-xs">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/60 border-b border-border/60">
        <span className="text-[11px] font-mono text-muted-foreground/70">
          {filename ?? language}
        </span>
        <CopyButton text={code} />
      </div>
      {/* Shiki outputs a full <pre><code> block */}
      <div
        className="overflow-x-auto text-[13px] [&>pre]:p-4 [&>pre]:m-0 [&>pre]:bg-transparent [&>pre]:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
