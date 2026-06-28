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
  {
    id: "p1",
    name: "Coca-Cola 2L",
    category: "Bebidas",
    oldPrice: 12.9,
    newPrice: 8.99,
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&q=80",
  },
  {
    id: "p2",
    name: "Banana Nanica (kg)",
    category: "Hortifrúti",
    oldPrice: 6.49,
    newPrice: 3.99,
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&q=80",
  },
  {
    id: "p3",
    name: "Leite Integral 1L",
    category: "Mercearia",
    oldPrice: 5.49,
    newPrice: 3.89,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&q=80",
  },
  {
    id: "p4",
    name: "Pão Francês (kg)",
    category: "Padaria",
    oldPrice: 18.9,
    newPrice: 13.9,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80",
  },
  {
    id: "p5",
    name: "Picanha Bovina (kg)",
    category: "Açougue",
    oldPrice: 89.9,
    newPrice: 69.9,
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80",
  },
  {
    id: "p6",
    name: "Cerveja Heineken Long Neck",
    category: "Bebidas",
    oldPrice: 7.99,
    newPrice: 4.99,
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&q=80",
  },
  {
    id: "p7",
    name: "Tomate Italiano (kg)",
    category: "Hortifrúti",
    oldPrice: 9.9,
    newPrice: 6.49,
    image: "https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=600&q=80",
  },
  {
    id: "p8",
    name: "Arroz Tio João 5kg",
    category: "Mercearia",
    oldPrice: 32.9,
    newPrice: 24.9,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80",
  },
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
