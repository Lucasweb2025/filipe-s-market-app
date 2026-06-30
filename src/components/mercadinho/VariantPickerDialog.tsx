import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getCatalogImage } from "@/lib/catalog";
import type { CatalogItem, Category, ProductVariant } from "@/models/product";
import { formatBRL } from "@/services/whatsapp";

interface VariantPickerDialogProps {
  item: CatalogItem | null;
  categoryImages: Record<Category, string>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectVariant: (item: CatalogItem, variant: ProductVariant) => void;
}

export function VariantPickerDialog({
  item,
  categoryImages,
  open,
  onOpenChange,
  onSelectVariant,
}: VariantPickerDialogProps) {
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm gap-0 overflow-hidden rounded-3xl p-0">
        <div className="relative aspect-[16/10] bg-muted">
          <img
            src={getCatalogImage(item, categoryImages)}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="space-y-4 p-5">
          <DialogHeader className="space-y-1 text-left">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {item.category}
            </p>
            <DialogTitle className="text-lg leading-snug">{item.name}</DialogTitle>
            <DialogDescription>Escolha a marca disponível</DialogDescription>
          </DialogHeader>
          <ul className="space-y-2">
            {(item.variants ?? []).map((variant) => (
              <li key={variant.id}>
                <button
                  type="button"
                  onClick={() => {
                    onSelectVariant(item, variant);
                    onOpenChange(false);
                  }}
                  className="flex w-full items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-left transition hover:bg-muted touch-manipulation"
                >
                  <div>
                    <p className="text-sm font-semibold">{variant.brand}</p>
                    <p className="text-xs text-muted-foreground line-through">
                      {formatBRL(variant.oldPrice)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-primary">
                      {formatBRL(variant.newPrice)}
                    </span>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
                      <Plus className="h-4 w-4" />
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
