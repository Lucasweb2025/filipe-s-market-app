# Mercadinho do Leblon

Aplicação SaaS de comércio local com vitrine de ofertas, carrinho de delivery e pedidos via WhatsApp.

## Arquitetura (MVC)

- **Model:** `src/models/` — tipos de domínio (`Product`, `CartItem`)
- **Data:** `src/data/` — seed estático (será substituído por Firestore)
- **Services:** `src/services/` — WhatsApp, repositório de produtos
- **Controller:** `src/hooks/` + `src/providers/` — estado centralizado
- **View:** `src/components/mercadinho/` — UI pública e admin

## Próximos passos

- Integrar Firebase Firestore para produtos dinâmicos
- Integrar Firebase Storage para upload de imagens no painel admin (usar `compressedImage.file` de `image-compression.ts`)
