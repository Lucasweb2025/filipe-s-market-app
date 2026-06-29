import { MessageCircle, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CartEmptyState } from "@/components/mercadinho/ProductCard";
import { STORE } from "@/config/store";
import type { Cart } from "@/hooks/use-cart";
import { formatBRL, whatsappCartUrl } from "@/services/whatsapp";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cart: Cart;
}

export function CartSheet({ open, onOpenChange, cart }: CartSheetProps) {
  const { items, total, updateQuantity, removeItem, clearCart } = cart;
  const canCheckout = items.length > 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[90vh] overflow-y-auto rounded-t-3xl px-4 pb-8 pt-6">
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center gap-2 text-lg">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Seu pedido
          </SheetTitle>
          <SheetDescription>
            Revise os itens e envie o pedido formatado para o WhatsApp do {STORE.name}.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {items.length === 0 ? (
            <CartEmptyState />
          ) : (
            <>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={item.productId}
                    className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl bg-card p-3 shadow-soft"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-14 w-14 shrink-0 rounded-2xl object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{formatBRL(item.price)} un.</p>
                      <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-surface px-2 py-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="grid h-7 w-7 place-items-center rounded-full bg-background text-foreground transition hover:bg-muted"
                          aria-label={`Diminuir ${item.name}`}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[1.5rem] text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="grid h-7 w-7 place-items-center rounded-full bg-background text-foreground transition hover:bg-muted"
                          aria-label={`Aumentar ${item.name}`}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="text-sm font-bold text-primary">
                        {formatBRL(item.price * item.quantity)}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        className="grid h-8 w-8 place-items-center rounded-xl bg-destructive/10 text-destructive transition hover:bg-destructive hover:text-destructive-foreground"
                        aria-label={`Remover ${item.name}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="rounded-3xl bg-surface p-5 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total do pedido</span>
                  <span className="text-xl font-bold text-primary">{formatBRL(total)}</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Delivery via WhatsApp · informe endereço e pagamento na mensagem.
                </p>
              </div>

              <div className="grid gap-2">
                <a
                  href={whatsappCartUrl(items)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => onOpenChange(false)}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-success px-6 py-4 text-sm font-semibold text-success-foreground shadow-glow transition hover:opacity-95 touch-manipulation"
                >
                  <MessageCircle className="h-5 w-5" />
                  Finalizar no WhatsApp
                </a>
                <button
                  type="button"
                  onClick={clearCart}
                  className="w-full rounded-2xl border border-border bg-background px-6 py-3 text-sm font-medium text-muted-foreground transition hover:bg-muted"
                >
                  Limpar carrinho
                </button>
              </div>
            </>
          )}

          {!canCheckout && (
            <p className="text-center text-xs text-muted-foreground">
              Toque nos produtos da vitrine para adicionar ao pedido.
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
