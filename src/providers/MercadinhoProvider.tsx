import { createContext, useContext, type ReactNode } from "react";
import { useCart, type Cart } from "@/hooks/use-cart";
import { useProductCatalog, type ProductCatalog } from "@/hooks/use-product-catalog";

type MercadinhoContextValue = {
  catalog: ProductCatalog;
  cart: Cart;
};

const MercadinhoContext = createContext<MercadinhoContextValue | null>(null);

export function MercadinhoProvider({ children }: { children: ReactNode }) {
  const catalog = useProductCatalog();
  const cart = useCart();

  return (
    <MercadinhoContext.Provider value={{ catalog, cart }}>{children}</MercadinhoContext.Provider>
  );
}

export function useMercadinho() {
  const context = useContext(MercadinhoContext);
  if (!context) {
    throw new Error("useMercadinho deve ser usado dentro de MercadinhoProvider");
  }
  return context;
}
