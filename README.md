# Arco-íris Styles — Loja Online

Loja da **Arco-íris Styles** (semijoias, banho a ouro 18K e prata 925), construída com:

- **SvelteKit 2** + **Svelte 5** (runes) + **TypeScript**
- **Tailwind CSS v4**
- **Drizzle ORM** + **Neon Postgres** (serverless, via HTTP — sem driver nativo)
- Checkout que gera um pedido no banco e finaliza a conversa no **WhatsApp** (do jeito que a loja já atende: exclusivo, com hora marcada)
- Painel simples em `/admin/pedidos` (protegido por senha) pra acompanhar os pedidos que chegam

## Por que Drizzle e não Prisma?

Foi pedido Prisma originalmente, mas o ambiente onde este projeto foi montado não tem acesso de rede ao
`binaries.prisma.sh` (domínio usado pelo Prisma pra baixar o engine nativo), então não dava pra gerar nem
testar nada com Prisma ali. Troquei para **Drizzle ORM**, que é 100% TypeScript (zero binário nativo) e é a
combinação oficialmente recomendada pela própria Neon — inclusive roda mais rápido em ambientes serverless
(Vercel). No seu computador ou em produção, tanto faz — mas como só consegui *testar de verdade* com Drizzle,
foi o que ficou.

## 1. Instalar dependências

```bash
pnpm install
```

## 2. Configurar o banco

O arquivo `.env` já está configurado com a connection string do Neon que você me passou.

**⚠️ Recomendo fortemente trocar a senha do banco no painel do Neon** (Settings → Reset password) e atualizar
o `.env`, já que essa senha foi colada em uma conversa de chat.

Depois, gere e aplique as tabelas:

```bash
pnpm db:migrate   # cria as tabelas no Neon a partir de drizzle/0000_*.sql
pnpm db:seed      # popula categorias e ~13 produtos de exemplo
```

Se quiser abrir uma interface visual do banco:

```bash
pnpm db:studio
```

## 3. Rodar localmente

```bash
pnpm dev --open
```

## 4. Painel de pedidos

Acesse `/admin/pedidos` — vai pedir usuário `admin` e a senha definida em `ADMIN_PASSWORD` no `.env`
(**troque o valor padrão antes de publicar o site!**).

## 5. Deploy (sugestão: Vercel)

1. Suba este projeto num repositório no GitHub (o `.env` **não** vai junto — já está no `.gitignore`).
2. Importe o repositório na [Vercel](https://vercel.com).
3. Configure as variáveis de ambiente `DATABASE_URL` e `ADMIN_PASSWORD` no painel da Vercel.
4. O adapter já está configurado (`@sveltejs/adapter-node`) — funciona também em qualquer VPS/Docker rodando
   `node build`.

## Estrutura

```
src/lib/server/db/schema.ts     → tabelas (categorias, produtos, pedidos, avaliações)
src/lib/server/db/queries.ts    → funções de acesso ao banco
src/lib/server/db/seed.ts       → dados de exemplo (edite/apague antes de ir pra produção)
src/lib/cart.svelte.ts          → carrinho (localStorage, Svelte 5 runes)
src/lib/utils.ts                → formatação de preço (BRL) e link do WhatsApp
src/routes/                     → páginas (home, produtos, categorias, carrinho, sobre, admin)
static/produtos/*.svg           → ilustrações provisórias — troque por fotos reais quando tiver
```

## Próximos passos sugeridos

- Trocar as ilustrações SVG em `static/produtos` pelas fotos reais dos produtos.
- Editar/adicionar produtos direto em `src/lib/server/db/seed.ts` e rodar `pnpm db:seed` de novo
  (ou usar `pnpm db:studio` pra editar manualmente).
- Trocar `ADMIN_PASSWORD` e rotacionar a senha do Neon antes de publicar.
- Se quiser pagamento automático (Pix/cartão) no futuro, dá pra integrar Mercado Pago ou Stripe mantendo o
  fluxo de WhatsApp como opção — hoje o checkout foi pensado pro modelo de atendimento exclusivo da loja.
