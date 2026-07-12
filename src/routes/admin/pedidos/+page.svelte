<script lang="ts">
	import { formatBRL } from '$lib/utils';

	let { data } = $props();

	const statusLabel: Record<string, string> = {
		NOVO: 'Novo',
		EM_ATENDIMENTO: 'Em atendimento',
		CONCLUIDO: 'Concluído',
		CANCELADO: 'Cancelado'
	};

	const statusColor: Record<string, string> = {
		NOVO: 'bg-[var(--color-gold-soft)] text-[var(--color-ink)]',
		EM_ATENDIMENTO: 'bg-[var(--color-rose)] text-white',
		CONCLUIDO: 'bg-green-600 text-white',
		CANCELADO: 'bg-gray-300 text-[var(--color-ink)]'
	};
</script>

<svelte:head>
	<title>Pedidos — Painel Arco-íris Styles</title>
</svelte:head>

<section class="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
	<h1 class="font-display text-3xl text-[var(--color-ink)]">Pedidos recebidos</h1>
	<p class="mt-2 text-sm text-[var(--color-ink-soft)]">
		Pedidos enviados pelo carrinho do site, antes de serem fechados no WhatsApp.
	</p>

	{#if data.orders.length === 0}
		<p class="mt-10 text-[var(--color-ink-soft)]">Nenhum pedido ainda.</p>
	{:else}
		<div class="mt-8 space-y-4">
			{#each data.orders as order (order.id)}
				<div class="rounded-2xl border border-[var(--color-line)] p-5">
					<div class="flex flex-wrap items-center justify-between gap-2">
						<div>
							<p class="font-display text-lg text-[var(--color-ink)]">
								Pedido #{order.code} — {order.customerName}
							</p>
							<p class="text-sm text-[var(--color-ink-soft)]">
								{order.customerPhone} · {new Date(order.createdAt).toLocaleString('pt-BR')}
							</p>
						</div>
						<span class="rounded-full px-3 py-1 text-xs font-semibold {statusColor[order.status]}">
							{statusLabel[order.status]}
						</span>
					</div>

					<ul class="mt-4 space-y-1 text-sm text-[var(--color-ink)]">
						{#each order.items as item (item.id)}
							<li>
								{item.quantity}x {item.nameSnapshot} — {formatBRL(
									item.priceCentsSnapshot * item.quantity
								)}
							</li>
						{/each}
					</ul>

					{#if order.notes}
						<p class="mt-3 text-sm text-[var(--color-ink-soft)] italic">"{order.notes}"</p>
					{/if}

					<p class="mt-3 font-semibold text-[var(--color-ink)]">
						Total: {formatBRL(order.totalCents)}
					</p>
				</div>
			{/each}
		</div>
	{/if}
</section>
