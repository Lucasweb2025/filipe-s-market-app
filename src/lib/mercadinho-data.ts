import cocaImg from "@/assets/products/coca-2l.jpg";
import bananaImg from "@/assets/products/banana.jpg";
import leiteImg from "@/assets/products/leite.jpg";
import paoImg from "@/assets/products/pao.jpg";
import picanhaImg from "@/assets/products/picanha.jpg";
import heinekenImg from "@/assets/products/heineken.jpg";
import tomateImg from "@/assets/products/tomate.jpg";
import arrozImg from "@/assets/products/arroz.jpg";

export type Category = "Hortifrúti" | "Padaria" | "Açougue" | "Bebidas" | "Mercearia";

export interface Product {
  id: string;
  name: string;
  category: Category;
  oldPrice: number;
  newPrice: number;
  image: string;
}

export const STORE = {
  name: "Mercadinho Filipe",
  address: "Rua João Maxímiano, 232 - Vila Franca - Jardim São Roque, São Paulo - SP, 05776-530",
  shortAddress: "Rua João Maxímiano, 232 — Jd. São Roque",
  phone: "(11) 97021-9221",
  whatsapp: "5511970219221",
  hours: [
    { day: "Segunda a Sexta", time: "07:00 — 22:00" },
    { day: "Sábado", time: "07:00 — 22:00" },
    { day: "Domingo", time: "08:00 — 20:00" },
  ],
};

export const REVIEWS = [
  {
    name: "Cliente Google",
    text: "Eles são todos atenciosos, mercado atende nossa necessidade, tem preço justo.",
  },
  {
    name: "Cliente Google",
    text: "Excelente atendimento, bons preços, produtos de qualidade, variedade.",
  },
  {
    name: "Cliente Google",
    text: "Melhor mercadinho da região, ambiente e pessoas maravilhosas.",
  },
];

export const BANNERS = [
  {
    id: "b1",
    title: "Quarta do Hortifrúti",
    subtitle: "Frutas, legumes e verduras com até 40% OFF",
    emoji: "🥬",
    gradient: "from-emerald-500 to-green-600",
  },
  {
    id: "b2",
    title: "Cerveja Trincando 🍺",
    subtitle: "Pack gelado pro fim de semana com preço de amigo",
    emoji: "🍻",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    id: "b3",
    title: "Pão Quentinho Toda Manhã",
    subtitle: "Padaria fresca a partir das 6h30",
    emoji: "🥖",
    gradient: "from-rose-500 to-red-600",
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  { id: "p1", name: "Refrigerante Cola 2L", category: "Bebidas", oldPrice: 12.9, newPrice: 8.99, image: cocaImg },
  { id: "p2", name: "Banana Nanica (kg)", category: "Hortifrúti", oldPrice: 6.49, newPrice: 3.99, image: bananaImg },
  { id: "p3", name: "Leite Integral 1L", category: "Mercearia", oldPrice: 5.49, newPrice: 3.89, image: leiteImg },
  { id: "p4", name: "Pão Francês (kg)", category: "Padaria", oldPrice: 18.9, newPrice: 13.9, image: paoImg },
  { id: "p5", name: "Picanha Bovina (kg)", category: "Açougue", oldPrice: 89.9, newPrice: 69.9, image: picanhaImg },
  { id: "p6", name: "Cerveja Long Neck 355ml", category: "Bebidas", oldPrice: 7.99, newPrice: 4.99, image: heinekenImg },
  { id: "p7", name: "Tomate Italiano (kg)", category: "Hortifrúti", oldPrice: 9.9, newPrice: 6.49, image: tomateImg },
  { id: "p8", name: "Arroz Branco 5kg", category: "Mercearia", oldPrice: 32.9, newPrice: 24.9, image: arrozImg },
];

export const CATEGORIES: { name: Category; emoji: string }[] = [
  { name: "Hortifrúti", emoji: "🥬" },
  { name: "Padaria", emoji: "🥖" },
  { name: "Açougue", emoji: "🥩" },
  { name: "Bebidas", emoji: "🍺" },
  { name: "Mercearia", emoji: "🛒" },
];

export const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const whatsappOrderUrl = (productName: string, price: number) => {
  const msg = encodeURIComponent(
    `Olá Mercadinho Filipe! Tenho interesse em: *${productName}* — ${formatBRL(price)}. Está disponível?`,
  );
  return `https://wa.me/${STORE.whatsapp}?text=${msg}`;
};
