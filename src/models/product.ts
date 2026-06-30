export type Category = "Hortifrúti" | "Padaria" | "Açougue" | "Bebidas" | "Mercearia";

export type CatalogDisplay = "featured" | "list" | "picker";

export interface ProductVariant {
  id: string;
  brand: string;
  oldPrice: number;
  newPrice: number;
}

export interface CatalogItem {
  id: string;
  name: string;
  category: Category;
  display: CatalogDisplay;
  image?: string;
  brand?: string;
  oldPrice?: number;
  newPrice?: number;
  variants?: ProductVariant[];
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  oldPrice: number;
  newPrice: number;
  image: string;
}

export type ProductInput = Omit<Product, "id">;

export interface CartLineInput {
  productId: string;
  name: string;
  price: number;
  image?: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
