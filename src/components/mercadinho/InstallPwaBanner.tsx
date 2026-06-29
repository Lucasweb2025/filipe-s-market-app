import { Download, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePwaInstall } from "@/hooks/use-pwa-install";

const DISMISS_KEY = "leblon-pwa-install-dismissed";

export function InstallPwaBanner() {
  const isMobile = useIsMobile();
  const { canInstall, isInstalled, promptInstall } = usePwaInstall();
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1");
  }, []);

  if (!isMobile || !canInstall || isInstalled || dismissed) return null;

  return (
    <div className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] left-4 right-4 z-40 mx-auto max-w-lg">
      <div className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-card p-4 shadow-card">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
          <Download className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">Instalar no celular</p>
          <p className="text-xs text-muted-foreground">Acesso rápido às ofertas como app.</p>
        </div>
        <button
          type="button"
          onClick={() => void promptInstall()}
          className="shrink-0 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"
        >
          Instalar
        </button>
        <button
          type="button"
          onClick={() => {
            sessionStorage.setItem(DISMISS_KEY, "1");
            setDismissed(true);
          }}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground"
          aria-label="Fechar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
