import { cn } from "@/lib/utils";
import { Info, AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react";

type Variant = "info" | "warning" | "success" | "tip";

const VARIANT_CONFIG: Record<
  Variant,
  { icon: React.ComponentType<{ className?: string }>; className: string }
> = {
  info: {
    icon: Info,
    className:
      "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/30 dark:border-blue-800 dark:text-blue-100",
  },
  warning: {
    icon: AlertTriangle,
    className:
      "bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-950/30 dark:border-yellow-800 dark:text-yellow-100",
  },
  success: {
    icon: CheckCircle2,
    className:
      "bg-green-50 border-green-200 text-green-900 dark:bg-green-950/30 dark:border-green-800 dark:text-green-100",
  },
  tip: {
    icon: Lightbulb,
    className:
      "bg-purple-50 border-purple-200 text-purple-900 dark:bg-purple-950/30 dark:border-purple-800 dark:text-purple-100",
  },
};

type Props = {
  variant?: Variant;
  title?: string;
  children: React.ReactNode;
};

export function Callout({ variant = "info", title, children }: Props) {
  const { icon: Icon, className } = VARIANT_CONFIG[variant];
  return (
    <div className={cn("flex gap-3 rounded-lg border p-4 mb-4", className)}>
      <Icon className="size-5 shrink-0 mt-0.5" />
      <div>
        {title && <p className="font-semibold mb-1">{title}</p>}
        <div className="text-sm [&>p]:mb-0">{children}</div>
      </div>
    </div>
  );
}
