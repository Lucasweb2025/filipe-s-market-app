import type { Product, ProductInput } from "@/models/product";

/**
 * Contrato de persistência de produtos.
 * A implementação local usa estado em memória; amanhã será substituída por Firestore.
 */
export interface ProductRepository {
  list(): Product[];
  create(input: ProductInput): Product;
  remove(id: string): Product[];
}

export function createLocalProductRepository(initialProducts: Product[]): ProductRepository {
  let products = [...initialProducts];

  return {
    list: () => products,
    create(input) {
      const product: Product = { ...input, id: `p${Date.now()}` };
      products = [product, ...products];
      return product;
    },
    remove(id) {
      products = products.filter((product) => product.id !== id);
      return products;
    },
  };
}
