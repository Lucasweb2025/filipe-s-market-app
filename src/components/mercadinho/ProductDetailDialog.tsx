import { Flame, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getCatalogImage } from "@/lib/catalog";
import type { CatalogItem, Category } from "@/models/product";
import { formatBRL } from "@/services/whatsapp";

interface ProductDetailDialogProps {
  item: CatalogItem | null;
  categoryImages: Record<Category, string>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart: (item: CatalogItem) => void;
}

export function ProductDetailDialog({
  item,
  categoryImages,
  open,
  onOpenChange,
  onAddToCart,
}: ProductDetailDialogProps) {
  if (!item) return null;

  const oldPrice = item.oldPrice ?? 0;
  const newPrice = item.newPrice ?? 0;
  const discount = oldPrice > 0 ? Math.round((1 - newPrice / oldPrice) * 100) : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm gap-0 overflow-hidden rounded-3xl p-0">
        <div className="relative aspect-square bg-muted">
          <img
            src={getCatalogImage(item, categoryImages)}
            alt=""
            className="h-full w-full object-cover"
          />
          {discount > 0 && (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-destructive px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-destructive-foreground shadow-soft">
              <Flame className="h-3 w-3" /> OFERTA -{discount}%
            </span>
          )}
        </div>
        <div className="space-y-4 p-5">
          <DialogHeader className="space-y-1 text-left">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {item.category}
            </p>
            <DialogTitle className="text-lg leading-snug">
              {item.brand ? `${item.name} — ${item.brand}` : item.name}
            </DialogTitle>
            <DialogDescription className="sr-only">Detalhes do produto</DialogDescription>
          </DialogHeader>
          <div>
            {oldPrice > newPrice && (
              <p className="text-sm text-muted-foreground line-through">{formatBRL(oldPrice)}</p>
            )}
            <p className="text-2xl font-bold text-primary">{formatBRL(newPrice)}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              onAddToCart(item);
              onOpenChange(false);
            }}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90 touch-manipulation"
          >
            <Plus className="h-4 w-4" />
            Adicionar ao pedido
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
