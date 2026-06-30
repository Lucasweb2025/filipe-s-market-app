import type { CartLineInput, CatalogItem, Category, Product, ProductVariant } from "@/models/product";

const CATEGORY_IMAGES: Record<Category, string> = {
  Hortifrúti: "",
  Padaria: "",
  Açougue: "",
  Bebidas: "",
  Mercearia: "",
};

export function registerCategoryImages(images: Record<Category, string>) {
  Object.assign(CATEGORY_IMAGES, images);
}

export function getCatalogImage(item: CatalogItem, categoryImages: Record<Category, string>): string {
  if (item.image) return item.image;
  return categoryImages[item.category] ?? categoryImages.Mercearia;
}

export function getPickerFromPrice(item: CatalogItem): number {
  if (!item.variants?.length) return item.newPrice ?? 0;
  return Math.min(...item.variants.map((variant) => variant.newPrice));
}

export function formatCatalogLineName(item: CatalogItem, variant?: ProductVariant): string {
  if (variant) return `${item.name} — ${variant.brand}`;
  if (item.brand) return `${item.name} — ${item.brand}`;
  return item.name;
}

export function toCartLine(
  item: CatalogItem,
  categoryImages: Record<Category, string>,
  variant?: ProductVariant,
): CartLineInput {
  const price = variant?.newPrice ?? item.newPrice ?? 0;

  return {
    productId: variant?.id ?? item.id,
    name: formatCatalogLineName(item, variant),
    price,
    image: getCatalogImage(item, categoryImages),
  };
}

export function flattenCatalogToProducts(
  catalog: CatalogItem[],
  categoryImages: Record<Category, string>,
): Product[] {
  const products: Product[] = [];

  for (const item of catalog) {
    if (item.display === "featured" || item.display === "list") {
      products.push({
        id: item.id,
        name: formatCatalogLineName(item),
        category: item.category,
        oldPrice: item.oldPrice ?? 0,
        newPrice: item.newPrice ?? 0,
        image: getCatalogImage(item, categoryImages),
      });
      continue;
    }

    for (const variant of item.variants ?? []) {
      products.push({
        id: variant.id,
        name: formatCatalogLineName(item, variant),
        category: item.category,
        oldPrice: variant.oldPrice,
        newPrice: variant.newPrice,
        image: getCatalogImage(item, categoryImages),
      });
    }
  }

  return products;
}
