import { Flame, Info } from "lucide-react";
import { getCatalogImage } from "@/lib/catalog";
import type { CatalogItem, Category } from "@/models/product";
import { formatBRL } from "@/services/whatsapp";

interface ProductCardProps {
  item: CatalogItem;
  categoryImages: Record<Category, string>;
  cartQuantity?: number;
  onAddToCart: (item: CatalogItem) => void;
  onShowDetails: (item: CatalogItem) => void;
}

export function ProductCard({
  item,
  categoryImages,
  cartQuantity = 0,
  onAddToCart,
  onShowDetails,
}: ProductCardProps) {
  const oldPrice = item.oldPrice ?? 0;
  const newPrice = item.newPrice ?? 0;
  const discount = oldPrice > 0 ? Math.round((1 - newPrice / oldPrice) * 100) : 0;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-soft transition hover:shadow-card active:scale-[0.98]">
      <button
        type="button"
        onClick={() => onAddToCart(item)}
        className="flex w-full flex-col text-left touch-manipulation"
        aria-label={`Adicionar ${item.name} ao pedido`}
      >
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={getCatalogImage(item, categoryImages)}
            alt=""
            className="h-full w-full object-cover transition group-hover:scale-105"
            loading="lazy"
          />
          {discount > 0 && (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-destructive px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-destructive-foreground shadow-soft">
              <Flame className="h-3 w-3" /> OFERTA -{discount}%
            </span>
          )}
          {cartQuantity > 0 && (
            <span className="absolute right-3 top-3 grid h-7 min-w-7 place-items-center rounded-full bg-primary px-1.5 text-xs font-bold text-primary-foreground shadow-soft">
              {cartQuantity}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {item.category}
          </p>
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
            {item.brand ? `${item.name} — ${item.brand}` : item.name}
          </h3>
          <div className="mt-auto pt-2">
            {oldPrice > newPrice && (
              <p className="text-xs text-muted-foreground line-through">{formatBRL(oldPrice)}</p>
            )}
            <p className="text-xl font-bold text-primary">{formatBRL(newPrice)}</p>
          </div>
          <p className="text-[11px] font-medium text-muted-foreground">Toque para adicionar</p>
        </div>
      </button>
      <button
        type="button"
        onClick={() => onShowDetails(item)}
        className="absolute bottom-4 right-4 grid h-8 w-8 place-items-center rounded-full border border-border bg-background/95 text-muted-foreground shadow-soft transition hover:bg-muted hover:text-foreground touch-manipulation"
        aria-label={`Ver detalhes de ${item.name}`}
      >
        <Info className="h-4 w-4" />
      </button>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-card shadow-soft">
      <div className="aspect-square animate-pulse bg-muted" />
      <div className="space-y-2 p-4">
        <div className="h-3 w-16 animate-pulse rounded bg-muted" />
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-6 w-20 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

export function CartEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border px-6 py-12 text-center">
      <p className="text-sm font-medium">Seu pedido está vazio</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Toque nos produtos da vitrine ou na lista para montar seu pedido.
      </p>
    </div>
  );
}
