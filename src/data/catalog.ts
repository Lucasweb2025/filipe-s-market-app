import cocaImg from "@/assets/products/coca-2l.jpg";
import bananaImg from "@/assets/products/banana.jpg";
import leiteImg from "@/assets/products/leite.jpg";
import paoImg from "@/assets/products/pao.jpg";
import picanhaImg from "@/assets/products/picanha.jpg";
import heinekenImg from "@/assets/products/heineken.jpg";
import tomateImg from "@/assets/products/tomate.jpg";
import arrozImg from "@/assets/products/arroz.jpg";

import bannerHortifruti from "@/assets/banners/hortifruti.jpg";
import bannerCerveja from "@/assets/banners/cerveja.jpg";
import bannerPadaria from "@/assets/banners/padaria.jpg";

import catTodos from "@/assets/categories/todos.jpg";
import catHortifruti from "@/assets/categories/hortifruti.jpg";
import catPadaria from "@/assets/categories/padaria.jpg";
import catAcougue from "@/assets/categories/acougue.jpg";
import catBebidas from "@/assets/categories/bebidas.jpg";
import catMercearia from "@/assets/categories/mercearia.jpg";

import { flattenCatalogToProducts } from "@/lib/catalog";
import type { CatalogItem, Category } from "@/models/product";

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

export const ALL_CATEGORY_IMAGE = catTodos;

export const CATEGORY_IMAGES: Record<Category, string> = {
  Hortifrúti: catHortifruti,
  Padaria: catPadaria,
  Açougue: catAcougue,
  Bebidas: catBebidas,
  Mercearia: catMercearia,
};

export const BANNERS = [
  {
    id: "b1",
    title: "Quarta do Hortifrúti",
    subtitle: "Frutas, legumes e verduras com até 40% OFF",
    image: bannerHortifruti,
  },
  {
    id: "b2",
    title: "Cerveja Sempre Gelada",
    subtitle: "Pack pro fim de semana com preço de amigo",
    image: bannerCerveja,
  },
  {
    id: "b3",
    title: "Pão Quentinho Toda Manhã",
    subtitle: "Padaria fresca a partir das 6h30",
    image: bannerPadaria,
  },
];

export const INITIAL_CATALOG: CatalogItem[] = [
  // Destaques com foto (8)
  {
    id: "p-f1",
    name: "Refrigerante Cola 2L",
    category: "Bebidas",
    display: "featured",
    image: cocaImg,
    oldPrice: 12.9,
    newPrice: 8.99,
  },
  {
    id: "p-f2",
    name: "Banana Nanica (kg)",
    category: "Hortifrúti",
    display: "featured",
    image: bananaImg,
    oldPrice: 6.49,
    newPrice: 3.99,
  },
  {
    id: "p-f3",
    name: "Tomate Italiano (kg)",
    category: "Hortifrúti",
    display: "featured",
    image: tomateImg,
    oldPrice: 9.9,
    newPrice: 6.49,
  },
  {
    id: "p-f4",
    name: "Pão Francês (kg)",
    category: "Padaria",
    display: "featured",
    image: paoImg,
    oldPrice: 18.9,
    newPrice: 13.9,
  },
  {
    id: "p-f5",
    name: "Picanha Bovina (kg)",
    category: "Açougue",
    display: "featured",
    image: picanhaImg,
    oldPrice: 89.9,
    newPrice: 69.9,
  },
  {
    id: "p-f6",
    name: "Cerveja Long Neck 355ml",
    category: "Bebidas",
    display: "featured",
    image: heinekenImg,
    brand: "Heineken",
    oldPrice: 7.99,
    newPrice: 4.99,
  },
  {
    id: "p-f7",
    name: "Ovos Brancos (dúzia)",
    category: "Mercearia",
    display: "featured",
    image: leiteImg,
    oldPrice: 14.9,
    newPrice: 11.9,
  },
  {
    id: "p-f8",
    name: "Margarina com Sal 500g",
    category: "Mercearia",
    display: "featured",
    image: leiteImg,
    brand: "Qualy",
    oldPrice: 8.49,
    newPrice: 6.49,
  },

  // Escolha a marca — foto genérica (5)
  {
    id: "p-pk-arroz",
    name: "Arroz Branco 5kg",
    category: "Mercearia",
    display: "picker",
    image: arrozImg,
    variants: [
      { id: "p-pk-arroz-camil", brand: "Camil", oldPrice: 28.9, newPrice: 20.0 },
      { id: "p-pk-arroz-solito", brand: "Solito", oldPrice: 30.9, newPrice: 25.0 },
      { id: "p-pk-arroz-prato", brand: "Prato Fino", oldPrice: 36.9, newPrice: 30.0 },
    ],
  },
  {
    id: "p-pk-feijao",
    name: "Feijão Carioca 1kg",
    category: "Mercearia",
    display: "picker",
    variants: [
      { id: "p-pk-feijao-camil", brand: "Camil", oldPrice: 9.49, newPrice: 7.49 },
      { id: "p-pk-feijao-kicaldo", brand: "Kicaldo", oldPrice: 8.99, newPrice: 6.99 },
      { id: "p-pk-feijao-broto", brand: "Broto Legal", oldPrice: 8.49, newPrice: 6.49 },
    ],
  },
  {
    id: "p-pk-oleo",
    name: "Óleo de Soja 900ml",
    category: "Mercearia",
    display: "picker",
    variants: [
      { id: "p-pk-oleo-liza", brand: "Liza", oldPrice: 8.49, newPrice: 6.99 },
      { id: "p-pk-oleo-soya", brand: "Soya", oldPrice: 8.99, newPrice: 7.49 },
      { id: "p-pk-oleo-concordia", brand: "Concórdia", oldPrice: 7.99, newPrice: 6.49 },
    ],
  },
  {
    id: "p-pk-cafe",
    name: "Café Torrado e Moído 500g",
    category: "Mercearia",
    display: "picker",
    variants: [
      { id: "p-pk-cafe-pilao", brand: "Pilão", oldPrice: 18.9, newPrice: 14.9 },
      { id: "p-pk-cafe-melitta", brand: "Melitta", oldPrice: 19.9, newPrice: 15.9 },
      { id: "p-pk-cafe-3c", brand: "3 Corações", oldPrice: 17.9, newPrice: 13.9 },
    ],
  },
  {
    id: "p-pk-det",
    name: "Detergente Líquido 500ml",
    category: "Mercearia",
    display: "picker",
    variants: [
      { id: "p-pk-det-ype", brand: "Ypê", oldPrice: 3.49, newPrice: 2.49 },
      { id: "p-pk-det-limpol", brand: "Limpol", oldPrice: 3.29, newPrice: 2.39 },
      { id: "p-pk-det-invicto", brand: "Invicto", oldPrice: 2.99, newPrice: 2.19 },
    ],
  },

  // Lista nome / marca / valor (17)
  {
    id: "p-l1",
    name: "Leite Integral 1L",
    brand: "Piracanjuba",
    category: "Mercearia",
    display: "list",
    oldPrice: 5.49,
    newPrice: 3.89,
  },
  {
    id: "p-l2",
    name: "Macarrão Espaguete 500g",
    brand: "Galo",
    category: "Mercearia",
    display: "list",
    oldPrice: 4.99,
    newPrice: 3.49,
  },
  {
    id: "p-l3",
    name: "Açúcar Refinado 1kg",
    brand: "União",
    category: "Mercearia",
    display: "list",
    oldPrice: 5.29,
    newPrice: 3.99,
  },
  {
    id: "p-l4",
    name: "Sal Refinado 1kg",
    brand: "Cisne",
    category: "Mercearia",
    display: "list",
    oldPrice: 3.49,
    newPrice: 2.49,
  },
  {
    id: "p-l5",
    name: "Molho de Tomate 340g",
    brand: "Quero",
    category: "Mercearia",
    display: "list",
    oldPrice: 3.99,
    newPrice: 2.79,
  },
  {
    id: "p-l6",
    name: "Batata Inglesa (kg)",
    category: "Hortifrúti",
    display: "list",
    oldPrice: 7.99,
    newPrice: 5.49,
  },
  {
    id: "p-l7",
    name: "Cebola (kg)",
    category: "Hortifrúti",
    display: "list",
    oldPrice: 6.49,
    newPrice: 4.29,
  },
  {
    id: "p-l8",
    name: "Alface Americana (un)",
    category: "Hortifrúti",
    display: "list",
    oldPrice: 4.99,
    newPrice: 3.49,
  },
  {
    id: "p-l9",
    name: "Limão Tahiti (kg)",
    category: "Hortifrúti",
    display: "list",
    oldPrice: 5.99,
    newPrice: 3.99,
  },
  {
    id: "p-l10",
    name: "Pão de Forma 500g",
    brand: "Pullman",
    category: "Padaria",
    display: "list",
    oldPrice: 11.9,
    newPrice: 8.99,
  },
  {
    id: "p-l11",
    name: "Croissant Flowpack 6un",
    brand: "Bauducco",
    category: "Padaria",
    display: "list",
    oldPrice: 12.9,
    newPrice: 9.9,
  },
  {
    id: "p-l12",
    name: "Frango Inteiro (kg)",
    category: "Açougue",
    display: "list",
    oldPrice: 16.9,
    newPrice: 12.9,
  },
  {
    id: "p-l13",
    name: "Linguiça Toscana (kg)",
    category: "Açougue",
    display: "list",
    oldPrice: 24.9,
    newPrice: 19.9,
  },
  {
    id: "p-l14",
    name: "Água Mineral 1,5L",
    brand: "Crystal",
    category: "Bebidas",
    display: "list",
    oldPrice: 4.49,
    newPrice: 2.99,
  },
  {
    id: "p-l15",
    name: "Suco de Uva 1L",
    brand: "Del Valle",
    category: "Bebidas",
    display: "list",
    oldPrice: 9.99,
    newPrice: 7.49,
  },
  {
    id: "p-l16",
    name: "Energético 250ml",
    brand: "Red Bull",
    category: "Bebidas",
    display: "list",
    oldPrice: 11.9,
    newPrice: 8.99,
  },
  {
    id: "p-l17",
    name: "Cerveja Lata 350ml",
    brand: "Skol",
    category: "Bebidas",
    display: "list",
    oldPrice: 4.49,
    newPrice: 3.29,
  },
];

export const INITIAL_PRODUCTS = flattenCatalogToProducts(INITIAL_CATALOG, CATEGORY_IMAGES);

export const CATEGORIES: { name: Category; image: string }[] = [
  { name: "Hortifrúti", image: catHortifruti },
  { name: "Padaria", image: catPadaria },
  { name: "Açougue", image: catAcougue },
  { name: "Bebidas", image: catBebidas },
  { name: "Mercearia", image: catMercearia },
];
