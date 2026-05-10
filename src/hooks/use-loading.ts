"use client";

import { useState, useCallback } from "react";

/**
 * Returns false immediately so content is visible during SSR (crawlable).
 * Simulated loading delays were artificial — real loading states should
 * use Suspense with actual async data fetching.
 */
export function useLoading(_delayMs: number = 1000) {
  return false;
}

export function useActionLoading() {
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(async (fn?: () => void) => {
    setIsLoading(true);
    const delay = Math.floor(Math.random() * 300) + 400;
    await new Promise((resolve) => setTimeout(resolve, delay));
    fn?.();
    setIsLoading(false);
  }, []);

  return { isLoading, execute };
}
