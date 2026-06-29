import { useCallback, useEffect, useRef } from "react";

/** Ignora resultados de operações async iniciadas antes da mais recente. */
export function useStaleGuard() {
  const generationRef = useRef(0);

  const nextGeneration = useCallback(() => {
    generationRef.current += 1;
    return generationRef.current;
  }, []);

  const isStale = useCallback((generation: number) => generation !== generationRef.current, []);

  const invalidate = useCallback(() => {
    generationRef.current += 1;
  }, []);

  useEffect(() => invalidate, [invalidate]);

  return { nextGeneration, isStale, invalidate };
}
