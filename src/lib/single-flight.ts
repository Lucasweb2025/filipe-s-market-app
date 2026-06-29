/**
 * Garante que apenas uma execução async roda por vez (ex.: load Firestore, upload).
 * Chamadas extras recebem a mesma Promise em andamento — sem loop e sem cota duplicada.
 */
export function createSingleFlight<TArgs extends unknown[], TResult>() {
  let inFlight: Promise<TResult> | null = null;

  return (runner: (...args: TArgs) => Promise<TResult>) => {
    return (...args: TArgs): Promise<TResult> => {
      if (inFlight) return inFlight;

      inFlight = runner(...args).finally(() => {
        inFlight = null;
      });

      return inFlight;
    };
  };
}
