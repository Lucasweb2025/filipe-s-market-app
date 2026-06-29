export type Category = "Hortifrúti" | "Padaria" | "Açougue" | "Bebidas" | "Mercearia";

export interface Product {
  id: string;
  name: string;
  category: Category;
  oldPrice: number;
  newPrice: number;
  image: string;
}

export type ProductInput = Omit<Product, "id">;

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
