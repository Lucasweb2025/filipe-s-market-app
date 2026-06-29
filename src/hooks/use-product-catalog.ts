import { useCallback, useMemo, useRef, useState } from "react";
import { INITIAL_PRODUCTS } from "@/data/catalog";
import { createSingleFlight } from "@/lib/single-flight";
import type { Product, ProductInput } from "@/models/product";
import { createLocalProductRepository } from "@/services/product-repository";

type LoadOptions = {
  /** Força nova leitura mesmo se já carregou uma vez (ex.: pull-to-refresh). */
  force?: boolean;
};

/**
 * Estado centralizado da vitrine de ofertas.
 * Pronto para trocar o repositório local por Firestore sem alterar as views.
 */
export function useProductCatalog(seedProducts: Product[] = INITIAL_PRODUCTS) {
  const repositoryRef = useRef(createLocalProductRepository(seedProducts));
  const [products, setProducts] = useState<Product[]>(() => repositoryRef.current.list());
  const [isLoading, setIsLoading] = useState(false);
  const hasLoadedRef = useRef(false);
  const loadFlightRef = useRef(createSingleFlight<[() => Promise<Product[]>, LoadOptions?], void>());

  const refreshFromRepository = useCallback(() => {
    setProducts(repositoryRef.current.list());
  }, []);

  const addProduct = useCallback(
    (input: ProductInput) => {
      repositoryRef.current.create(input);
      refreshFromRepository();
    },
    [refreshFromRepository],
  );

  const deleteProduct = useCallback(
    (id: string) => {
      repositoryRef.current.remove(id);
      refreshFromRepository();
    },
    [refreshFromRepository],
  );

  const replaceProducts = useCallback((nextProducts: Product[]) => {
    repositoryRef.current = createLocalProductRepository(nextProducts);
    setProducts(nextProducts);
    hasLoadedRef.current = true;
  }, []);

  const loadProducts = useCallback(
    (loader: () => Promise<Product[]>, options: LoadOptions = {}) => {
      if (hasLoadedRef.current && !options.force) {
        return Promise.resolve();
      }

      return loadFlightRef.current(async (fetcher: () => Promise<Product[]>) => {
        setIsLoading(true);
        try {
          const nextProducts = await fetcher();
          replaceProducts(nextProducts);
        } finally {
          setIsLoading(false);
        }
      })(loader);
    },
    [replaceProducts],
  );

  /**
   * Para Firestore: registra listener uma única vez e limpa no unmount.
   * Evita múltiplos onSnapshot ativos (loop de leituras = cota estourada).
   */
  const subscribeProducts = useCallback((listener: () => Product[]) => {
    let active = true;

    const sync = () => {
      if (!active) return;
      setProducts(listener());
    };

    sync();

    return () => {
      active = false;
    };
  }, []);

  return useMemo(
    () => ({
      products,
      isLoading,
      addProduct,
      deleteProduct,
      replaceProducts,
      loadProducts,
      subscribeProducts,
    }),
    [products, isLoading, addProduct, deleteProduct, replaceProducts, loadProducts, subscribeProducts],
  );
}

export type ProductCatalog = ReturnType<typeof useProductCatalog>;
