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
    // dual-theme output: emits CSS variables consumed by globals.css
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: false,
  });

  return (
    <div className="relative group rounded-lg border border-border overflow-hidden mb-4">
      {filename ? (
        <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
          <span className="text-xs text-muted-foreground font-mono">
            {filename}
          </span>
          <CopyButton text={code} />
        </div>
      ) : (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <CopyButton text={code} />
        </div>
      )}
      {/* Shiki outputs a full <pre><code> block */}
      <div
        className="overflow-x-auto text-sm [&>pre]:p-4 [&>pre]:m-0 [&>pre]:bg-transparent [&>pre]:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
