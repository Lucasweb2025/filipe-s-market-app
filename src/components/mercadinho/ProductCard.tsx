import { Flame, MessageCircle, Plus, ShoppingCart } from "lucide-react";
import { formatBRL, whatsappProductUrl } from "@/services/whatsapp";
import type { Product } from "@/models/product";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const discount = Math.round((1 - product.newPrice / product.oldPrice) * 100);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-soft transition hover:shadow-card">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-destructive px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-destructive-foreground shadow-soft">
          <Flame className="h-3 w-3" /> OFERTA -{discount}%
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {product.category}
        </p>
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug">{product.name}</h3>
        <div className="mt-auto pt-2">
          <p className="text-xs text-muted-foreground line-through">{formatBRL(product.oldPrice)}</p>
          <p className="text-xl font-bold text-primary">{formatBRL(product.newPrice)}</p>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-2.5 text-xs font-semibold text-primary-foreground shadow-soft transition hover:opacity-90 touch-manipulation"
          >
            <Plus className="h-4 w-4" /> Carrinho
          </button>
          <a
            href={whatsappProductUrl(product.name, product.newPrice)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-success px-3 py-2.5 text-xs font-semibold text-success-foreground shadow-soft transition hover:opacity-90 touch-manipulation"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
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
      <ShoppingCart className="mb-3 h-10 w-10 text-muted-foreground" />
      <p className="text-sm font-medium">Seu carrinho está vazio</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Adicione ofertas da vitrine para montar seu pedido de delivery.
      </p>
    </div>
  );
}
