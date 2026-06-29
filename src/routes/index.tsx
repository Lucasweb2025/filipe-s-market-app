import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PublicPage } from "@/components/mercadinho/PublicPage";
import { AdminPanel } from "@/components/mercadinho/AdminPanel";
import { MercadinhoProvider, useMercadinho } from "@/providers/MercadinhoProvider";
import { STORE } from "@/config/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${STORE.name} — Jardim São Roque, SP` },
      {
        name: "description",
        content:
          "Mercadinho de bairro no Jardim São Roque com hortifrúti fresquinho, padaria, açougue, bebidas geladas e delivery pelo WhatsApp.",
      },
      { property: "og:title", content: STORE.name },
      {
        property: "og:description",
        content: "Ofertas da semana e pedidos de delivery direto pelo WhatsApp.",
      },
    ],
  }),
  component: App,
});

function App() {
  return (
    <MercadinhoProvider>
      <MercadinhoApp />
    </MercadinhoProvider>
  );
}

function MercadinhoApp() {
  const { catalog, cart } = useMercadinho();
  const [view, setView] = useState<"public" | "admin">("public");

  if (view === "admin") {
    return (
      <AdminPanel
        products={catalog.products}
        onAdd={catalog.addProduct}
        onDelete={catalog.deleteProduct}
        onBack={() => setView("public")}
      />
    );
  }

  return (
    <PublicPage
      products={catalog.products}
      isLoading={catalog.isLoading}
      cart={cart}
      onAdminClick={() => setView("admin")}
    />
  );
}
