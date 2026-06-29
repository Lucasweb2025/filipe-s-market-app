import { STORE } from "@/config/store";
import type { CartItem } from "@/models/product";

export const formatBRL = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const whatsappProductUrl = (productName: string, price: number) => {
  const message = encodeURIComponent(
    `Olá ${STORE.name}! Tenho interesse em: *${productName}* — ${formatBRL(price)}. Está disponível?`,
  );
  return `https://wa.me/${STORE.whatsapp}?text=${message}`;
};

export const whatsappCartUrl = (items: CartItem[]) => {
  const lines = items.map(
    (item) => `• ${item.name} — ${item.quantity}x — ${formatBRL(item.price * item.quantity)}`,
  );
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const message = encodeURIComponent(
    [
      `Olá, ${STORE.name}! Quero fazer um pedido:`,
      "",
      ...lines,
      "",
      `Subtotal: ${formatBRL(total)}`,
      "",
      "Endereço para entrega: ",
      "Forma de pagamento: Pix / Dinheiro / Cartão na entrega",
    ].join("\n"),
  );

  return `https://wa.me/${STORE.whatsapp}?text=${message}`;
};

export const whatsappContactUrl = () => `https://wa.me/${STORE.whatsapp}`;
