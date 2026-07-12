<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.category.name} — Arco-íris Styles</title>
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<nav class="text-sm text-[var(--color-ink-soft)]" aria-label="Breadcrumb">
		<a href="/" class="hover:text-[var(--color-gold-deep)]">Início</a>
		<span class="mx-2">/</span>
		<span>{data.category.name}</span>
	</nav>

	<div class="mt-4 max-w-2xl">
		<h1 class="font-display text-3xl text-[var(--color-ink)] sm:text-4xl">{data.category.name}</h1>
		{#if data.category.description}
			<p class="mt-3 text-[var(--color-ink-soft)]">{data.category.description}</p>
		{/if}
	</div>

	{#if data.items.length === 0}
		<p class="mt-16 text-center text-[var(--color-ink-soft)]">
			Ainda não temos peças nessa categoria — fale com a gente no WhatsApp que a gente ajuda a
			encontrar!
		</p>
	{:else}
		<div class="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
			{#each data.items as produto (produto.id)}
				<ProductCard product={produto} />
			{/each}
		</div>
	{/if}
</section>
