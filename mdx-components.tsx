import type { MDXComponents } from "mdx/types";
import { RequestPlayground } from "@/components/learn/request-playground";
import { CodeBlock } from "@/components/learn/code-block";
import { Callout } from "@/components/learn/callout";
import { MethodBadge } from "@/components/learn/method-badge";
import { MonacoEditor } from "@/components/learn/monaco-editor";
import { QuizCard } from "@/components/learn/quiz-card";

export function useMDXComponents(): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold tracking-tight mb-5 mt-2 text-foreground leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-bold tracking-tight mb-3 mt-8 text-foreground pl-3 border-l-[3px] border-primary/60">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-[15px] font-semibold mb-2 mt-5 text-foreground">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="leading-7 mb-4 text-foreground/85 text-[15px]">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="mb-4 space-y-1.5 text-foreground/85 text-[15px] pl-1">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 space-y-1.5 text-foreground/85 text-[15px] pl-1">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-7 flex gap-2 items-baseline">
        <span className="size-1 rounded-full bg-primary/40 mt-[0.65rem] shrink-0" />
        <span>{children}</span>
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-primary/50 pl-4 italic text-muted-foreground mb-4 text-[15px]">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6 rounded-xl border border-border">
        <table className="w-full text-sm">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border-b border-border px-4 py-2.5 bg-muted/50 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground first:rounded-tl-xl last:rounded-tr-xl">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-b border-border/50 px-4 py-2.5 text-foreground/85 text-[13px]">
        {children}
      </td>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-foreground/80">{children}</em>
    ),
    a: ({ children, href }) => (
      <a
        href={href}
        className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary transition-colors duration-150"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    hr: () => <hr className="border-border/60 my-8" />,
    // Inline code vs fenced code blocks
    code: ({ children, className, ...props }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code className="bg-primary/8 border border-primary/15 px-1.5 py-0.5 rounded-md text-[13px] font-mono text-primary dark:text-primary">
            {children}
          </code>
        );
      }
      const language = className?.replace("language-", "") ?? "text";
      const filename = (props as { filename?: string }).filename;
      return (
        <CodeBlock language={language} filename={filename}>{String(children)}</CodeBlock>
      );
    },
    pre: ({ children }) => <>{children}</>,
    // Custom MDX components
    RequestPlayground,
    Callout,
    MethodBadge,
    MonacoEditor,
    QuizCard,
  };
}
