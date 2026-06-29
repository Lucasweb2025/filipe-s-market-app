/** Barrel de compatibilidade — preferir imports diretos das camadas novas. */
export type { Category, Product, ProductInput, CartItem } from "@/models/product";
export { STORE } from "@/config/store";
export { REVIEWS, ALL_CATEGORY_IMAGE, BANNERS, INITIAL_PRODUCTS, CATEGORIES } from "@/data/catalog";
export {
  formatBRL,
  whatsappProductUrl,
  whatsappCartUrl,
  whatsappContactUrl,
} from "@/services/whatsapp";

/** @deprecated Use whatsappProductUrl */
export { whatsappProductUrl as whatsappOrderUrl } from "@/services/whatsapp";
