"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, RotateCcw, HelpCircle } from "lucide-react";

type Props = {
  question: string;
  choices: string[];
  correct: number; // 0-indexed
  explanation: string;
};

export function QuizCard({ question, choices, correct, explanation }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const isCorrect = selected === correct;

  return (
    <div className="my-6 rounded-xl border border-primary/20 bg-primary/5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-primary/15 bg-primary/8">
        <HelpCircle className="size-3.5 text-primary shrink-0" />
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
          Knowledge Check
        </span>
      </div>

      <div className="p-4 space-y-3">
        <p className="text-sm font-medium text-foreground leading-snug">
          {question}
        </p>

        {/* Choices */}
        <div className="grid gap-2">
          {choices.map((choice, i) => {
            const isSelected = selected === i;
            const isTheCorrect = i === correct;

            let variant = "default";
            if (answered) {
              if (isTheCorrect) variant = "correct";
              else if (isSelected) variant = "wrong";
            }

            return (
              <button
                key={i}
                disabled={answered}
                onClick={() => setSelected(i)}
                className={cn(
                  "w-full text-left rounded-lg border px-3.5 py-2.5 text-sm transition-all duration-150 flex items-center gap-2.5",
                  !answered &&
                    "border-border bg-background hover:border-primary/40 hover:bg-primary/5 cursor-pointer",
                  variant === "correct" &&
                    "border-emerald-400/50 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-700/50",
                  variant === "wrong" &&
                    "border-red-400/50 bg-red-50 text-red-800 dark:bg-red-950/30 dark:text-red-300 dark:border-red-700/50",
                  variant === "default" && answered && "opacity-40 cursor-not-allowed"
                )}
              >
                {/* State indicator */}
                <span
                  className={cn(
                    "size-5 rounded-full border-2 flex items-center justify-center shrink-0 text-[10px] font-bold",
                    !answered && "border-border text-muted-foreground",
                    variant === "correct" &&
                      "border-emerald-500 bg-emerald-500 text-white",
                    variant === "wrong" && "border-red-500 bg-red-500 text-white",
                    variant === "default" && answered && "border-border"
                  )}
                >
                  {variant === "correct" ? (
                    <CheckCircle2 className="size-3" />
                  ) : variant === "wrong" ? (
                    <XCircle className="size-3" />
                  ) : (
                    String.fromCharCode(65 + i)
                  )}
                </span>
                {choice}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {answered && (
          <div
            className={cn(
              "rounded-lg px-3.5 py-3 text-sm leading-relaxed border animate-fade-up",
              isCorrect
                ? "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-200"
                : "bg-red-50 border-red-200 text-red-800 dark:bg-red-950/30 dark:border-red-800 dark:text-red-200"
            )}
          >
            <span className="font-semibold">
              {isCorrect ? "Correct! " : "Not quite. "}
            </span>
            {explanation}
          </div>
        )}

        {/* Retry */}
        {answered && (
          <button
            onClick={() => setSelected(null)}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            <RotateCcw className="size-3" />
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
