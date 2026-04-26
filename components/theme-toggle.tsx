"use client";

import { useTheme } from "@/hooks/use-theme";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const cycle = () => {
    setTheme(
      theme === "light" ? "dark" : theme === "dark" ? "system" : "light"
    );
  };

  return (
    <button
      onClick={cycle}
      aria-label={`Theme: ${theme}. Click to cycle.`}
      className={cn(
        "size-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-150",
        className
      )}
    >
      {theme === "dark" ? (
        <Moon className="size-4" />
      ) : theme === "light" ? (
        <Sun className="size-4" />
      ) : (
        <Monitor className="size-4" />
      )}
    </button>
  );
}
