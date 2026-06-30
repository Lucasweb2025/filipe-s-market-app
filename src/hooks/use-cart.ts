import { useCallback, useMemo, useState } from "react";
import type { CartItem, CartLineInput } from "@/models/product";

const FALLBACK_IMAGE = "";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addLine = useCallback((line: CartLineInput) => {
    setItems((current) => {
      const existing = current.find((item) => item.productId === line.productId);
      if (existing) {
        return current.map((item) =>
          item.productId === line.productId ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [
        ...current,
        {
          productId: line.productId,
          name: line.name,
          price: line.price,
          image: line.image ?? FALLBACK_IMAGE,
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
      addLine,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [items, itemCount, total, addLine, removeItem, updateQuantity, clearCart],
  );
}

export type Cart = ReturnType<typeof useCart>;
