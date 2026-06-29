import { useCallback, useMemo, useState } from "react";
import type { CartItem, Product } from "@/models/product";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((product: Product) => {
    setItems((current) => {
      const existing = current.find((item) => item.productId === product.id);
      if (existing) {
        return current.map((item) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [
        ...current,
        {
          productId: product.id,
          name: product.name,
          price: product.newPrice,
          image: product.image,
          quantity: 1,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((current) => current.filter((item) => item.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((current) => current.filter((item) => item.productId !== productId));
      return;
    }
    setItems((current) =>
      current.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  return useMemo(
    () => ({
      items,
      itemCount,
      total,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [items, itemCount, total, addItem, removeItem, updateQuantity, clearCart],
  );
}

export type Cart = ReturnType<typeof useCart>;
