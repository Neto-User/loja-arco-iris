<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';

	let { data } = $props();
	let activeCategory = $state<string | null>(null);

	let filtered = $derived(
		activeCategory ? data.products.filter((p) => p.category.slug === activeCategory) : data.products
	);
</script>

<svelte:head>
	<title>Todas as peças — Arco-íris Styles</title>
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<div class="max-w-2xl">
		<h1 class="font-display text-3xl text-[var(--color-ink)] sm:text-4xl">Todas as peças</h1>
		<p class="mt-3 text-[var(--color-ink-soft)]">
			Semijoias em banho a ouro 18K e prata 925, escolhidas uma a uma para o seu mix.
		</p>
	</div>

	<div class="mt-8 flex flex-wrap gap-2">
		<button
			type="button"
			onclick={() => (activeCategory = null)}
			class="rounded-full border px-4 py-2 text-sm font-medium transition-colors {activeCategory ===
			null
				? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-white'
				: 'border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-gold)]'}"
		>
			Todas
		</button>
		{#each data.categories as categoria (categoria.id)}
			<button
				type="button"
				onclick={() => (activeCategory = categoria.slug)}
				class="rounded-full border px-4 py-2 text-sm font-medium transition-colors {activeCategory ===
				categoria.slug
					? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-white'
					: 'border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-gold)]'}"
			>
				{categoria.name}
			</button>
		{/each}
	</div>

	{#if filtered.length === 0}
		<p class="mt-16 text-center text-[var(--color-ink-soft)]">
			Nenhuma peça encontrada nessa categoria por enquanto — volte em breve!
		</p>
	{:else}
		<div class="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
			{#each filtered as produto (produto.id)}
				<ProductCard product={produto} />
			{/each}
		</div>
	{/if}
</section>
