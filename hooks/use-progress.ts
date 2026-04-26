"use client";

import { useState, useEffect, useCallback } from "react";
import type { Module } from "@/content/curriculum";

const STORAGE_KEY = "api-learn-progress";

type ProgressState = Record<string, boolean>; // key: "moduleSlug:lessonSlug"

function makeKey(moduleSlug: string, lessonSlug: string) {
  return `${moduleSlug}:${lessonSlug}`;
}

export function useProgress(curriculum: Module[]) {
  const [state, setState] = useState<ProgressState>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setState(JSON.parse(stored));
    } catch {
      // localStorage unavailable or corrupt — start fresh
    }
  }, []);

  const markComplete = useCallback(
    (moduleSlug: string, lessonSlug: string) => {
      setState((prev) => {
        const next = { ...prev, [makeKey(moduleSlug, lessonSlug)]: true };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    []
  );

  const markIncomplete = useCallback(
    (moduleSlug: string, lessonSlug: string) => {
      setState((prev) => {
        const next = { ...prev };
        delete next[makeKey(moduleSlug, lessonSlug)];
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    []
  );

  const isCompleted = useCallback(
    (moduleSlug: string, lessonSlug: string) =>
      !!state[makeKey(moduleSlug, lessonSlug)],
    [state]
  );

  const totalLessons = curriculum.reduce(
    (sum, mod) => sum + mod.lessons.length,
    0
  );
  const completedLessons = Object.values(state).filter(Boolean).length;

  return {
    isCompleted,
    markComplete,
    markIncomplete,
    completedLessons,
    totalLessons,
  };
}
