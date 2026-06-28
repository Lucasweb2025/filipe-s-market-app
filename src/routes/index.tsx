import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PublicPage } from "@/components/mercadinho/PublicPage";
import { AdminPanel } from "@/components/mercadinho/AdminPanel";
import { INITIAL_PRODUCTS, type Product } from "@/lib/mercadinho-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mercadinho Filipe — Jardim São Roque, SP" },
      {
        name: "description",
        content:
          "Mercadinho de bairro no Jardim São Roque com hortifrúti fresquinho, padaria, açougue, bebidas geladas e atendimento que é a cara da vizinhança.",
      },
      { property: "og:title", content: "Mercadinho Filipe" },
      {
        property: "og:description",
        content: "Ofertas da semana e pedidos direto pelo WhatsApp.",
      },
    ],
  }),
  component: App,
});

function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [view, setView] = useState<"public" | "admin">("public");

  const addProduct = (p: Omit<Product, "id">) =>
    setProducts((prev) => [{ ...p, id: `p${Date.now()}` }, ...prev]);

  const deleteProduct = (id: string) =>
    setProducts((prev) => prev.filter((p) => p.id !== id));

  if (view === "admin") {
    return (
      <AdminPanel
        products={products}
        onAdd={addProduct}
        onDelete={deleteProduct}
        onBack={() => setView("public")}
      />
    );
  }

  return <PublicPage products={products} onAdminClick={() => setView("admin")} />;
}
