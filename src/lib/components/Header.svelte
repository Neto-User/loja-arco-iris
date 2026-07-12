<script lang="ts">
	import { page } from '$app/state';
	import { cart } from '$lib/cart.svelte';

	let menuOpen = $state(false);

	const links = [
		{ href: '/produtos', label: 'Todas as peças' },
		{ href: '/categorias/aneis', label: 'Anéis' },
		{ href: '/categorias/brincos', label: 'Brincos' },
		{ href: '/categorias/colares', label: 'Colares' },
		{ href: '/categorias/pulseiras', label: 'Pulseiras' },
		{ href: '/categorias/conjuntos', label: 'Conjuntos' },
		{ href: '/sobre', label: 'Sobre' }
	];
</script>

<header
	class="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[var(--color-cream)]/95 backdrop-blur"
>
	<div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
		<a href="/" class="flex items-center gap-2 shrink-0">
			<span class="font-display text-2xl leading-none text-[var(--color-ink)]">Arco-íris</span>
			<span class="font-display text-2xl leading-none text-[var(--color-gold-deep)] italic"
				>Styles</span
			>
		</a>

		<nav class="hidden items-center gap-6 lg:flex" aria-label="Principal">
			{#each links as link (link.href)}
				<a
					href={link.href}
					class="text-sm font-medium transition-colors hover:text-[var(--color-gold-deep)] {page.url
						.pathname === link.href
						? 'text-[var(--color-gold-deep)]'
						: 'text-[var(--color-ink-soft)]'}"
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<div class="flex items-center gap-2">
			<a
				href="/carrinho"
				class="relative flex items-center gap-2 rounded-full border border-[var(--color-line)] px-3 py-2 text-sm font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold-deep)]"
				aria-label="Ver carrinho"
			>
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					class="size-5"
					aria-hidden="true"
				>
					<path
						d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<span class="hidden sm:inline">Carrinho</span>
				{#if cart.count > 0}
					<span
						class="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-[var(--color-gold-deep)] text-[11px] font-semibold text-white"
					>
						{cart.count}
					</span>
				{/if}
			</a>

			<button
				type="button"
				class="rounded-full border border-[var(--color-line)] p-2 lg:hidden"
				aria-label="Abrir menu"
				aria-expanded={menuOpen}
				onclick={() => (menuOpen = !menuOpen)}
			>
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					class="size-5"
					aria-hidden="true"
				>
					{#if menuOpen}
						<path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
					{:else}
						<path
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					{/if}
				</svg>
			</button>
		</div>
	</div>

	{#if menuOpen}
		<nav
			class="border-t border-[var(--color-line)] px-4 py-4 lg:hidden"
			aria-label="Principal (mobile)"
		>
			<ul class="flex flex-col gap-1">
				{#each links as link (link.href)}
					<li>
						<a
							href={link.href}
							class="block rounded-lg px-2 py-2.5 text-sm font-medium text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)]"
							onclick={() => (menuOpen = false)}
						>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
</header>
