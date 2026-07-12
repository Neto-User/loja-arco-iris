<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import { whatsappUrl } from '$lib/utils';

	let { data } = $props();
</script>

<svelte:head>
	<title>Arco-íris Styles — Semijoias em banho a ouro 18K e prata 925</title>
</svelte:head>

<!-- Hero -->
<section class="relative overflow-hidden">
	<div
		class="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24"
	>
		<div>
			<p class="text-sm font-semibold tracking-[0.2em] text-[var(--color-gold-deep)] uppercase">
				Semijoias autorais
			</p>
			<h1
				class="mt-4 font-display text-4xl leading-[1.1] text-[var(--color-ink)] sm:text-5xl lg:text-6xl"
			>
				Moda e acessórios que contam <span class="text-[var(--color-gold-deep)] italic"
					>histórias reais</span
				>.
			</h1>
			<p class="mt-6 max-w-md text-base text-[var(--color-ink-soft)]">
				Peças em banho a ouro 18K e prata 925, escolhidas a dedo para quem gosta de brilhar sem
				exagero. Atendimento exclusivo, com hora marcada, do jeito que uma boa loja deveria ser.
			</p>
			<div class="mt-8 flex flex-wrap items-center gap-4">
				<a
					href="/produtos"
					class="rounded-full bg-[var(--color-ink)] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-gold-deep)]"
				>
					Ver todas as peças
				</a>
				<a
					href={whatsappUrl('Olá! Vim pelo site e quero agendar um atendimento 💛')}
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-full border border-[var(--color-ink)] px-7 py-3.5 text-sm font-semibold text-[var(--color-ink)] transition-colors hover:border-[var(--color-gold-deep)] hover:text-[var(--color-gold-deep)]"
				>
					Agendar atendimento
				</a>
			</div>
		</div>

		<div class="relative mx-auto aspect-square w-full max-w-md">
			<div
				class="absolute inset-0 rounded-full border border-[var(--color-gold)]"
				aria-hidden="true"
			></div>
			<div
				class="absolute inset-6 rounded-full border border-[var(--color-line)]"
				aria-hidden="true"
			></div>
			<div
				class="absolute inset-14 flex items-center justify-center rounded-full bg-[var(--color-cream-deep)]"
			>
				<div class="text-center">
					<p class="font-display text-5xl text-[var(--color-gold-deep)]">18K</p>
					<p
						class="mt-2 text-xs font-semibold tracking-[0.25em] text-[var(--color-ink-soft)] uppercase"
					>
						Banho nobre
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Categorias em medalhão -->
<section class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
	<div class="flex items-baseline justify-between">
		<h2 class="font-display text-2xl text-[var(--color-ink)] sm:text-3xl">Compre por categoria</h2>
		<a href="/produtos" class="text-sm font-semibold text-[var(--color-gold-deep)] hover:underline">
			Ver tudo →
		</a>
	</div>

	<div class="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
		{#each data.categories as categoria (categoria.id)}
			<a
				href={`/categorias/${categoria.slug}`}
				class="group flex flex-col items-center gap-3 text-center"
			>
				<span
					class="flex size-24 items-center justify-center overflow-hidden rounded-full border border-[var(--color-line)] bg-[var(--color-cream-deep)] transition-colors group-hover:border-[var(--color-gold)] sm:size-28"
				>
					<img src={categoria.imageUrl} alt="" class="size-full object-cover" />
				</span>
				<span
					class="text-sm font-medium text-[var(--color-ink)] group-hover:text-[var(--color-gold-deep)]"
				>
					{categoria.name}
				</span>
			</a>
		{/each}
	</div>
</section>

<!-- Destaques -->
<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
	<div class="flex items-baseline justify-between">
		<h2 class="font-display text-2xl text-[var(--color-ink)] sm:text-3xl">Destaques da semana</h2>
		<a href="/produtos" class="text-sm font-semibold text-[var(--color-gold-deep)] hover:underline">
			Ver tudo →
		</a>
	</div>

	<div class="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
		{#each data.featured as produto (produto.id)}
			<ProductCard product={produto} />
		{/each}
	</div>
</section>

<!-- Banner de confiança -->
<section class="bg-[var(--color-ink)] py-16 text-[var(--color-cream)]">
	<div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
		<p class="font-display text-2xl italic sm:text-3xl">
			"Peças que parecem joia de verdade, com atendimento de quem entende do assunto."
		</p>
		<p class="mt-4 text-sm text-[var(--color-gold-soft)]">
			Compra 100% acompanhada, do início ao fim.
		</p>
		<a
			href={whatsappUrl('Olá! Quero saber mais sobre as semijoias da Arco-íris Styles 💛')}
			target="_blank"
			rel="noopener noreferrer"
			class="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-7 py-3.5 text-sm font-semibold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-gold-soft)]"
		>
			Falar com a loja no WhatsApp
		</a>
	</div>
</section>
