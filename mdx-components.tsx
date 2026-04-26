import type { MDXComponents } from "mdx/types";
import { RequestPlayground } from "@/components/learn/request-playground";
import { CodeBlock } from "@/components/learn/code-block";
import { Callout } from "@/components/learn/callout";
import { MethodBadge } from "@/components/learn/method-badge";

export function useMDXComponents(): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold tracking-tight mb-4 mt-8 text-foreground">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold tracking-tight mb-3 mt-6 border-b border-border pb-2 text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mb-2 mt-5 text-foreground">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="leading-7 mb-4 text-foreground/90">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-1 text-foreground/90">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-1 text-foreground/90">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-7">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary/40 pl-4 italic text-muted-foreground mb-4">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm border-collapse">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border border-border px-3 py-2 bg-muted text-left font-semibold text-foreground">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-border px-3 py-2 text-foreground/90">
        {children}
      </td>
    ),
    // Inline code vs fenced code blocks
    code: ({ children, className }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground">
            {children}
          </code>
        );
      }
      // Fenced block — language comes from the className (e.g. "language-js")
      const language = className?.replace("language-", "") ?? "text";
      return (
        <CodeBlock language={language}>{String(children)}</CodeBlock>
      );
    },
    // CodeBlock handles its own <pre>, so strip the outer one
    pre: ({ children }) => <>{children}</>,
    // Custom MDX components usable as JSX inside .mdx files
    RequestPlayground,
    Callout,
    MethodBadge,
  };
}
