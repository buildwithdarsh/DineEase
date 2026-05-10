"use client";

/**
 * Returns false immediately so content is visible during SSR (crawlable).
 * Simulated loading delays were artificial — real loading states should
 * use Suspense with actual async data fetching.
 */
export function useSimulatedLoading(_delay: number = 1000): boolean {
  return false;
}
