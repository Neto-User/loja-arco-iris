<script lang="ts">
	import { cart } from '$lib/cart.svelte';
	import { formatBRL } from '$lib/utils';

	let name = $state('');
	let phone = $state('');
	let notes = $state('');
	let loading = $state(false);
	let errorMsg = $state<string | null>(null);

	async function checkout(e: SubmitEvent) {
		e.preventDefault();
		errorMsg = null;

		if (!name.trim() || !phone.trim()) {
			errorMsg = 'Preencha seu nome e telefone para continuar.';
			return;
		}

		loading = true;
		try {
			const res = await fetch('/api/checkout', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({
					customerName: name,
					customerPhone: phone,
					notes,
					items: cart.items.map((i) => ({
						productId: i.productId,
						name: i.name,
						priceCents: i.priceCents,
						quantity: i.quantity,
						size: i.size
					}))
				})
			});

			if (!res.ok) {
				const body = await res.json().catch(() => null);
				errorMsg = body?.message ?? 'Não foi possível enviar o pedido. Tente novamente.';
				return;
			}

			const { whatsappUrl } = await res.json();
			cart.clear();
			window.location.href = whatsappUrl;
		} catch {
			errorMsg = 'Não foi possível enviar o pedido. Verifique sua conexão e tente novamente.';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Carrinho — Arco-íris Styles</title>
</svelte:head>

<section class="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
	<h1 class="font-display text-3xl text-[var(--color-ink)] sm:text-4xl">Seu carrinho</h1>

	{#if cart.items.length === 0}
		<div
			class="mt-12 rounded-2xl border border-dashed border-[var(--color-line)] py-16 text-center"
		>
			<p class="text-[var(--color-ink-soft)]">Seu carrinho está vazio por enquanto.</p>
			<a
				href="/produtos"
				class="mt-6 inline-block rounded-full bg-[var(--color-ink)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--color-gold-deep)]"
			>
				Ver as peças
			</a>
		</div>
	{:else}
		<ul class="mt-8 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
			{#each cart.items as item (item.productId + (item.size ?? ''))}
				<li class="flex gap-4 py-6">
					<div class="size-24 shrink-0 overflow-hidden rounded-xl bg-[var(--color-cream-deep)]">
						<img src={item.image} alt={item.name} class="size-full object-cover" />
					</div>
					<div class="flex flex-1 flex-col justify-between">
						<div class="flex justify-between gap-4">
							<div>
								<a
									href={`/produtos/${item.slug}`}
									class="font-medium text-[var(--color-ink)] hover:text-[var(--color-gold-deep)]"
								>
									{item.name}
								</a>
								{#if item.size}
									<p class="mt-0.5 text-sm text-[var(--color-ink-soft)]">Aro {item.size}</p>
								{/if}
							</div>
							<p class="text-sm font-semibold text-[var(--color-ink)]">
								{formatBRL(item.priceCents * item.quantity)}
							</p>
						</div>
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-2">
								<button
									type="button"
									aria-label="Diminuir quantidade"
									onclick={() => cart.updateQuantity(item.productId, item.size, item.quantity - 1)}
									class="flex size-7 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-gold)]"
								>
									−
								</button>
								<span class="w-6 text-center text-sm">{item.quantity}</span>
								<button
									type="button"
									aria-label="Aumentar quantidade"
									onclick={() => cart.updateQuantity(item.productId, item.size, item.quantity + 1)}
									class="flex size-7 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-gold)]"
								>
									+
								</button>
							</div>
							<button
								type="button"
								onclick={() => cart.remove(item.productId, item.size)}
								class="text-sm font-medium text-[var(--color-rose-deep)] hover:underline"
							>
								Remover
							</button>
						</div>
					</div>
				</li>
			{/each}
		</ul>

		<div class="mt-8 flex items-center justify-between text-lg">
			<span class="font-medium text-[var(--color-ink)]">Total</span>
			<span class="font-display text-2xl text-[var(--color-ink)]">{formatBRL(cart.total)}</span>
		</div>

		<div class="mt-10 rounded-2xl bg-[var(--color-cream-deep)] p-6 sm:p-8">
			<h2 class="font-display text-xl text-[var(--color-ink)]">Finalizar pelo WhatsApp</h2>
			<p class="mt-2 text-sm text-[var(--color-ink-soft)]">
				Preencha seus dados e a gente confirma o pagamento (PIX ou cartão) e o frete direto com
				você, com atendimento exclusivo.
			</p>

			<form class="mt-6 space-y-4" onsubmit={checkout}>
				<div>
					<label for="name" class="block text-sm font-medium text-[var(--color-ink)]"
						>Seu nome</label
					>
					<input
						id="name"
						type="text"
						bind:value={name}
						required
						class="mt-1.5 block w-full rounded-lg border border-[var(--color-line)] bg-white px-3 py-2.5 text-sm outline-none focus:border-[var(--color-gold-deep)]"
					/>
				</div>
				<div>
					<label for="phone" class="block text-sm font-medium text-[var(--color-ink)]"
						>WhatsApp / telefone</label
					>
					<input
						id="phone"
						type="tel"
						bind:value={phone}
						required
						placeholder="(00) 00000-0000"
						class="mt-1.5 block w-full rounded-lg border border-[var(--color-line)] bg-white px-3 py-2.5 text-sm outline-none focus:border-[var(--color-gold-deep)]"
					/>
				</div>
				<div>
					<label for="notes" class="block text-sm font-medium text-[var(--color-ink)]">
						Observações (endereço, cor, urgência...)
					</label>
					<textarea
						id="notes"
						bind:value={notes}
						rows="3"
						class="mt-1.5 block w-full rounded-lg border border-[var(--color-line)] bg-white px-3 py-2.5 text-sm outline-none focus:border-[var(--color-gold-deep)]"
					></textarea>
				</div>

				{#if errorMsg}
					<p class="text-sm text-[var(--color-rose-deep)]">{errorMsg}</p>
				{/if}

				<button
					type="submit"
					disabled={loading}
					class="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-gold-deep)] px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[var(--color-ink)] disabled:opacity-60"
				>
					{loading ? 'Enviando...' : 'Enviar pedido e continuar no WhatsApp'}
				</button>
			</form>
		</div>
	{/if}
</section>
