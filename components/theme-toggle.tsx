"use client";

import { useTheme } from "@/hooks/use-theme";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

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
      aria-label="Toggle theme"
      title={`Theme: ${theme}`}
      className={cn(buttonVariants({ variant: "ghost", size: "icon" }), className)}
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
