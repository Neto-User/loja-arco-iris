<script lang="ts">
	import { formatBRL, MATERIAL_LABEL } from '$lib/utils';
	import { cart } from '$lib/cart.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	import StarRating from '$lib/components/StarRating.svelte';

	let { data } = $props();
	let product = $derived(data.product);

	const ringSizes = ['12', '14', '16', '18', '20', '22', '24', '26'];
	let selectedSize = $state<string | undefined>(undefined);
	let justAdded = $state(false);

	let avgRating = $derived(
		product.reviews.length > 0
			? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
			: 0
	);

	function addToCart() {
		cart.add(
			{
				productId: product.id,
				slug: product.slug,
				name: product.name,
				priceCents: product.priceCents,
				image: product.images[0],
				size: selectedSize
			},
			1
		);
		justAdded = true;
		setTimeout(() => (justAdded = false), 2500);
	}
</script>

<svelte:head>
	<title>{product.name} — Arco-íris Styles</title>
	<meta name="description" content={product.description} />
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
	<nav class="text-sm text-[var(--color-ink-soft)]" aria-label="Breadcrumb">
		<a href="/" class="hover:text-[var(--color-gold-deep)]">Início</a>
		<span class="mx-2">/</span>
		<a href={`/categorias/${product.category.slug}`} class="hover:text-[var(--color-gold-deep)]">
			{product.category.name}
		</a>
		<span class="mx-2">/</span>
		<span>{product.name}</span>
	</nav>

	<div class="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
		<div class="aspect-square overflow-hidden rounded-3xl bg-[var(--color-cream-deep)]">
			<img src={product.images[0]} alt={product.name} class="size-full object-cover" />
		</div>

		<div>
			<p class="text-xs font-semibold tracking-[0.2em] text-[var(--color-gold-deep)] uppercase">
				{MATERIAL_LABEL[product.material]}
			</p>
			<h1 class="mt-2 font-display text-3xl text-[var(--color-ink)] sm:text-4xl">{product.name}</h1>

			{#if product.reviews.length > 0}
				<div class="mt-3 flex items-center gap-2">
					<StarRating rating={avgRating} size="sm" />
					<span class="text-sm text-[var(--color-ink-soft)]"
						>{product.reviews.length} avaliações</span
					>
				</div>
			{/if}

			<div class="mt-5 flex items-baseline gap-3">
				<p class="font-display text-3xl text-[var(--color-ink)]">{formatBRL(product.priceCents)}</p>
				{#if product.compareAtPriceCents}
					<p class="text-base text-[var(--color-ink-soft)] line-through">
						{formatBRL(product.compareAtPriceCents)}
					</p>
				{/if}
			</div>
			<p class="mt-1 text-sm text-[var(--color-ink-soft)]">
				ou até 3x de {formatBRL(Math.round(product.priceCents / 3))} sem juros
			</p>

			<p class="mt-6 text-base text-[var(--color-ink-soft)]">{product.description}</p>

			{#if product.highlights.length > 0}
				<ul class="mt-6 space-y-2">
					{#each product.highlights as destaque (destaque)}
						<li class="flex items-start gap-2 text-sm text-[var(--color-ink)]">
							<svg
								viewBox="0 0 20 20"
								fill="currentColor"
								class="mt-0.5 size-4 shrink-0 text-[var(--color-gold-deep)]"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
									clip-rule="evenodd"
								/>
							</svg>
							{destaque}
						</li>
					{/each}
				</ul>
			{/if}

			{#if product.category.slug === 'aneis'}
				<fieldset class="mt-8">
					<legend class="text-sm font-medium text-[var(--color-ink)]">Tamanho do anel (aro)</legend>
					<div class="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-8">
						{#each ringSizes as size (size)}
							<button
								type="button"
								onclick={() => (selectedSize = size)}
								class="rounded-lg border py-2 text-sm font-medium transition-colors {selectedSize ===
								size
									? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-white'
									: 'border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-gold)]'}"
							>
								{size}
							</button>
						{/each}
					</div>
					<p class="mt-2 text-xs text-[var(--color-ink-soft)]">
						Não sabe o seu tamanho? A gente te ajuda a medir pelo WhatsApp.
					</p>
				</fieldset>
			{/if}

			<button
				type="button"
				onclick={addToCart}
				disabled={product.category.slug === 'aneis' && !selectedSize}
				class="mt-8 flex w-full items-center justify-center rounded-full bg-[var(--color-ink)] px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[var(--color-gold-deep)] disabled:cursor-not-allowed disabled:opacity-40"
			>
				{justAdded ? 'Adicionado ✓' : 'Adicionar ao carrinho'}
			</button>

			{#if product.stock <= 5}
				<p class="mt-3 text-sm text-[var(--color-rose-deep)]">
					Últimas {product.stock} unidades em estoque.
				</p>
			{/if}
		</div>
	</div>

	<!-- Avaliações -->
	{#if product.reviews.length > 0}
		<div class="mt-20 border-t border-[var(--color-line)] pt-10">
			<h2 class="font-display text-2xl text-[var(--color-ink)]">Avaliações de clientes</h2>
			<div class="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
				{#each product.reviews as review (review.id)}
					<div class="rounded-2xl border border-[var(--color-line)] p-6">
						<StarRating rating={review.rating} size="sm" />
						<p class="mt-3 text-sm text-[var(--color-ink)]">{review.comment}</p>
						<p class="mt-3 text-sm font-medium text-[var(--color-ink-soft)]">{review.authorName}</p>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Relacionados -->
	{#if data.related.length > 0}
		<div class="mt-20 border-t border-[var(--color-line)] pt-10">
			<h2 class="font-display text-2xl text-[var(--color-ink)]">Combina também com</h2>
			<div class="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
				{#each data.related as produto (produto.id)}
					<ProductCard product={produto} />
				{/each}
			</div>
		</div>
	{/if}
</section>
