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

import type { Category, Product } from "@/models/product";

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

export const CATEGORIES: { name: Category; image: string }[] = [
  { name: "Hortifrúti", image: catHortifruti },
  { name: "Padaria", image: catPadaria },
  { name: "Açougue", image: catAcougue },
  { name: "Bebidas", image: catBebidas },
  { name: "Mercearia", image: catMercearia },
];
