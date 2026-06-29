import { ClipboardList, Home } from "lucide-react";

interface MobileBottomNavProps {
  cartItemCount: number;
  onOpenCart: () => void;
}

export function MobileBottomNav({ cartItemCount, onOpenCart }: MobileBottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 px-2">
        <button
          type="button"
          className="inline-flex min-h-14 flex-col items-center justify-center gap-1 px-4 py-2 text-xs font-semibold text-primary touch-manipulation"
        >
          <Home className="h-6 w-6" />
          Início
        </button>
        <button
          type="button"
          onClick={onOpenCart}
          className="relative inline-flex min-h-14 flex-col items-center justify-center gap-1 px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:text-primary touch-manipulation"
        >
          <ClipboardList className="h-6 w-6" />
          Pedidos
          {cartItemCount > 0 && (
            <span className="absolute right-[calc(50%-1.75rem)] top-2 grid h-5 min-w-5 place-items-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
