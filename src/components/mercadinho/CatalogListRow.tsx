import { Plus } from "lucide-react";
import type { CatalogItem } from "@/models/product";
import { formatBRL } from "@/services/whatsapp";

interface CatalogListRowProps {
  item: CatalogItem;
  cartQuantity: number;
  onAdd: (item: CatalogItem) => void;
}

export function CatalogListRow({ item, cartQuantity, onAdd }: CatalogListRowProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-card px-4 py-3 shadow-soft">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold leading-snug">{item.name}</p>
        <p className="truncate text-xs text-muted-foreground">
          {item.brand ? `${item.brand} · ` : ""}
          {item.oldPrice ? (
            <>
              <span className="line-through">{formatBRL(item.oldPrice)}</span>{" "}
            </>
          ) : null}
          <span className="font-semibold text-primary">{formatBRL(item.newPrice ?? 0)}</span>
        </p>
      </div>
      <button
        type="button"
        onClick={() => onAdd(item)}
        className="relative inline-flex min-h-10 min-w-10 shrink-0 items-center justify-center rounded-full bg-primary px-3 text-primary-foreground shadow-soft transition hover:opacity-90 touch-manipulation"
        aria-label={`Adicionar ${item.name}`}
      >
        <Plus className="h-4 w-4" />
        {cartQuantity > 0 && (
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
            {cartQuantity}
          </span>
        )}
      </button>
    </div>
  );
}
