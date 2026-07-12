<script lang="ts">
	import { WHATSAPP_BASE_URL } from '$lib/utils';

	const selos = [
		{ title: 'Banho a ouro 18K', text: 'Peças com banho nobre e acabamento em prata 925.' },
		{
			title: 'Atendimento com hora marcada',
			text: 'Cada pedido é acompanhado de perto, do início ao fim.'
		},
		{ title: 'Envio para todo o Brasil', text: 'Sua peça chega com cuidado onde você estiver.' }
	];
</script>

<footer class="mt-24 border-t border-[var(--color-line)] bg-[var(--color-cream-deep)]">
	<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-10 sm:grid-cols-3">
			{#each selos as selo (selo.title)}
				<div class="flex items-start gap-4">
					<span
						class="flex size-12 shrink-0 items-center justify-center rounded-full border border-[var(--color-gold)] text-[var(--color-gold-deep)]"
						aria-hidden="true"
					>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							class="size-5"
						>
							<path
								d="M12 3l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4L7.5 17l.9-5-3.6-3.5 5-.7L12 3z"
								stroke-linejoin="round"
							/>
						</svg>
					</span>
					<div>
						<p class="font-display text-base text-[var(--color-ink)]">{selo.title}</p>
						<p class="mt-1 text-sm text-[var(--color-ink-soft)]">{selo.text}</p>
					</div>
				</div>
			{/each}
		</div>

		<div
			class="mt-14 flex flex-col items-start justify-between gap-6 border-t border-[var(--color-line)] pt-8 sm:flex-row sm:items-end"
		>
			<div>
				<p class="font-display text-2xl text-[var(--color-ink)]">
					Arco-íris <span class="text-[var(--color-gold-deep)] italic">Styles</span>
				</p>
				<p class="mt-2 max-w-sm text-sm text-[var(--color-ink-soft)]">
					Moda e acessórios que contam histórias reais. Semijoias em banho a ouro 18K e prata 925.
				</p>
			</div>

			<div class="flex flex-col gap-3 sm:items-end">
				<a
					href={WHATSAPP_BASE_URL}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 rounded-full bg-[var(--color-gold-deep)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-ink)]"
				>
					Fale conosco no WhatsApp
				</a>
				<a
					href="https://www.instagram.com/arcoirisstyless/"
					target="_blank"
					rel="noopener noreferrer"
					class="text-sm font-medium text-[var(--color-ink-soft)] hover:text-[var(--color-gold-deep)]"
				>
					@arcoirisstyless no Instagram
				</a>
			</div>
		</div>

		<p class="mt-10 text-xs text-[var(--color-ink-soft)]">
			© {new Date().getFullYear()} Arco-íris Styles. Todos os direitos reservados.
		</p>
	</div>
</footer>
