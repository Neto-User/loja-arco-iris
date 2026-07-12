<script lang="ts">
	import { formatBRL, MATERIAL_LABEL } from '$lib/utils';

	type Props = {
		product: {
			slug: string;
			name: string;
			priceCents: number;
			compareAtPriceCents: number | null;
			images: string[];
			material: string;
		};
	};

	let { product }: Props = $props();
</script>

<a href={`/produtos/${product.slug}`} class="group block">
	<div class="relative aspect-square overflow-hidden rounded-2xl bg-[var(--color-cream-deep)]">
		<img
			src={product.images[0]}
			alt={product.name}
			loading="lazy"
			class="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
		/>
		{#if product.compareAtPriceCents}
			<span
				class="absolute top-3 left-3 rounded-full bg-[var(--color-rose-deep)] px-2.5 py-1 text-[11px] font-semibold text-white"
			>
				Oferta
			</span>
		{/if}
	</div>
	<div class="mt-3">
		<p class="text-xs tracking-wide text-[var(--color-gold-deep)] uppercase">
			{MATERIAL_LABEL[product.material]}
		</p>
		<h3
			class="mt-1 font-display text-base text-[var(--color-ink)] group-hover:text-[var(--color-gold-deep)]"
		>
			{product.name}
		</h3>
		<div class="mt-1 flex items-baseline gap-2">
			<p class="text-sm font-semibold text-[var(--color-ink)]">{formatBRL(product.priceCents)}</p>
			{#if product.compareAtPriceCents}
				<p class="text-xs text-[var(--color-ink-soft)] line-through">
					{formatBRL(product.compareAtPriceCents)}
				</p>
			{/if}
		</div>
	</div>
</a>
