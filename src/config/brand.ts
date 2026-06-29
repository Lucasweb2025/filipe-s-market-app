import logo from "@/assets/brand/logo.png";
import { STORE } from "@/config/store";

export const BRAND = {
  logo,
  themeColor: "#2f6f3f",
  backgroundColor: "#fafaf8",
  shortName: "Leblon",
  description: "Ofertas da semana e pedidos de delivery pelo WhatsApp.",
  name: STORE.name,
} as const;
