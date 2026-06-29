import {
  Search,
  Lock,
  MapPin,
  Phone,
  Clock,
  Star,
  MessageCircle,
  ShoppingBag,
  Home,
  ClipboardList,
} from "lucide-react";
import { useState } from "react";
import { CartSheet } from "@/components/mercadinho/CartSheet";
import { ProductCard, ProductCardSkeleton } from "@/components/mercadinho/ProductCard";
import { STORE } from "@/config/store";
import { ALL_CATEGORY_IMAGE, BANNERS, CATEGORIES, REVIEWS } from "@/data/catalog";
import type { Cart } from "@/hooks/use-cart";
import type { Product } from "@/models/product";
import { whatsappContactUrl } from "@/services/whatsapp";

interface Props {
  products: Product[];
  isLoading?: boolean;
  cart: Cart;
  onAdminClick: () => void;
}

export function PublicPage({ products, isLoading = false, cart, onAdminClick }: Props) {
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = activeCat ? products.filter((product) => product.category === activeCat) : products;

  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4 sm:px-6">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-primary shadow-glow">
            <ShoppingBag className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-bold tracking-tight sm:text-lg">{STORE.name}</h1>
            <p className="truncate text-xs text-muted-foreground">Jardim São Roque · SP</p>
          </div>
          <button
            onClick={onAdminClick}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-border bg-card text-muted-foreground transition hover:bg-muted"
            aria-label="Acesso restrito"
          >
            <Lock className="h-4 w-4" />
          </button>
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
          <div className="flex items-center gap-3 rounded-2xl bg-input px-4 py-3.5 text-muted-foreground">
            <Search className="h-4 w-4 shrink-0" />
            <span className="truncate text-sm">Busque no mercadinho...</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6">
        <section className="mt-6 -mx-4 px-4 sm:-mx-6 sm:px-6">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {BANNERS.map((banner) => (
              <div
                key={banner.id}
                className="relative flex h-52 w-[85%] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-3xl shadow-card sm:w-[60%] md:w-[45%]"
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="relative p-6 text-white">
                  <h3 className="text-xl font-bold leading-tight">{banner.title}</h3>
                  <p className="mt-1 text-sm text-white/90">{banner.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 text-lg font-bold tracking-tight">Categorias</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <CategoryButton
              image={ALL_CATEGORY_IMAGE}
              label="Todos"
              active={activeCat === null}
              onClick={() => setActiveCat(null)}
            />
            {CATEGORIES.map((category) => (
              <CategoryButton
                key={category.name}
                image={category.image}
                label={category.name}
                active={activeCat === category.name}
                onClick={() => setActiveCat(category.name)}
              />
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-tight">Ofertas da Semana</h2>
              <p className="text-sm text-muted-foreground">
                {isLoading
                  ? "Carregando vitrine..."
                  : `${filtered.length} ${filtered.length === 1 ? "produto" : "produtos"}`}
              </p>
            </div>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border p-10 text-center text-muted-foreground">
              Nenhum produto nesta categoria ainda.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(item) => {
                    cart.addItem(item);
                    setCartOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </section>

        <section className="mt-14">
          <div className="mb-6 flex items-center gap-2">
            <h2 className="text-lg font-bold tracking-tight">O que dizem nossos clientes</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {REVIEWS.map((review, index) => (
              <div key={index} className="rounded-3xl bg-card p-6 shadow-soft">
                <div className="mb-3 flex gap-0.5 text-warning">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-card-foreground">&quot;{review.text}&quot;</p>
                <p className="mt-4 text-xs font-medium text-muted-foreground">— {review.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="mb-4 text-lg font-bold tracking-tight">Onde estamos</h2>
          <div className="grid gap-4 lg:grid-cols-5">
            <div className="space-y-3 lg:col-span-2">
              <InfoRow icon={<MapPin className="h-5 w-5" />} title="Endereço" text={STORE.address} />
              <InfoRow icon={<Phone className="h-5 w-5" />} title="Telefone / WhatsApp" text={STORE.phone} />
              <div className="rounded-3xl bg-card p-5 shadow-soft">
                <div className="mb-3 flex items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-secondary text-primary">
                    <Clock className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">Horários</h3>
                </div>
                <ul className="space-y-1.5 text-sm">
                  {STORE.hours.map((hour) => (
                    <li key={hour.day} className="flex justify-between">
                      <span className="text-muted-foreground">{hour.day}</span>
                      <span className="font-medium">{hour.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl bg-card shadow-soft lg:col-span-3">
              <iframe
                title={`Mapa ${STORE.name}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(STORE.address)}&output=embed`}
                className="h-72 w-full lg:h-full"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <footer className="mt-16 border-t border-border pt-8 pb-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {STORE.name}. Delivery pelo site, atendimento no Jardim São Roque.
        </footer>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/60 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-4 py-3 sm:px-6">
          <button
            type="button"
            className="inline-flex flex-col items-center gap-1 text-xs font-semibold text-primary"
          >
            <Home className="h-5 w-5" />
            Início
          </button>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative inline-flex flex-col items-center gap-1 text-xs font-semibold text-muted-foreground transition hover:text-primary"
          >
            <ClipboardList className="h-5 w-5" />
            Pedidos
            {cart.itemCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                {cart.itemCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      <a
        href={whatsappContactUrl()}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-24 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-success text-success-foreground shadow-glow transition hover:scale-105"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      <CartSheet open={cartOpen} onOpenChange={setCartOpen} cart={cart} />
    </div>
  );
}

function CategoryButton({
  image,
  label,
  active,
  onClick,
}: {
  image: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="flex shrink-0 flex-col items-center gap-2">
      <span
        className={`relative grid h-20 w-20 place-items-center overflow-hidden rounded-full shadow-soft transition ${
          active ? "ring-4 ring-primary shadow-glow scale-105" : "ring-1 ring-border"
        }`}
      >
        <img src={image} alt={label} className="h-full w-full object-cover" loading="lazy" />
      </span>
      <span className={`text-xs font-medium ${active ? "text-primary" : "text-muted-foreground"}`}>
        {label}
      </span>
    </button>
  );
}

function InfoRow({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-3xl bg-card p-5 shadow-soft">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-secondary text-primary">
        {icon}
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
