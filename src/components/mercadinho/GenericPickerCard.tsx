import { Layers } from "lucide-react";
import { getCatalogImage, getPickerFromPrice } from "@/lib/catalog";
import type { CatalogItem, Category } from "@/models/product";
import { formatBRL } from "@/services/whatsapp";

interface GenericPickerCardProps {
  item: CatalogItem;
  categoryImages: Record<Category, string>;
  onOpen: (item: CatalogItem) => void;
}

export function GenericPickerCard({ item, categoryImages, onOpen }: GenericPickerCardProps) {
  const fromPrice = getPickerFromPrice(item);
  const variantCount = item.variants?.length ?? 0;

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group flex w-full flex-col overflow-hidden rounded-2xl bg-card text-left shadow-soft transition hover:shadow-card active:scale-[0.98] touch-manipulation"
      aria-label={`Escolher marca de ${item.name}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={getCatalogImage(item, categoryImages)}
          alt=""
          className="h-full w-full object-cover transition group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold text-foreground shadow-soft">
          <Layers className="h-3 w-3" />
          {variantCount} marcas
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {item.category}
        </p>
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug">{item.name}</h3>
        <p className="mt-auto pt-1 text-sm text-muted-foreground">
          A partir de <span className="font-bold text-primary">{formatBRL(fromPrice)}</span>
        </p>
        <p className="text-[11px] font-medium text-muted-foreground">Toque para escolher a marca</p>
      </div>
    </button>
  );
}
