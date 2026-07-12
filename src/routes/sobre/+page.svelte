<script lang="ts">
	import { whatsappUrl } from '$lib/utils';
</script>

<svelte:head>
	<title>Sobre — Arco-íris Styles</title>
</svelte:head>

<section class="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
	<p class="text-sm font-semibold tracking-[0.2em] text-[var(--color-gold-deep)] uppercase">
		Sobre a loja
	</p>
	<h1 class="mt-3 font-display text-4xl text-[var(--color-ink)]">Arco-íris Styles</h1>
	<p class="mt-6 text-lg text-[var(--color-ink-soft)]">
		Moda e acessórios que contam histórias reais. Cada peça é escolhida a dedo — nada de catálogo
		genérico — pensando em quem vai usar no dia a dia e também nos momentos que pedem um brilho a
		mais.
	</p>

	<div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
		<div class="rounded-2xl border border-[var(--color-line)] p-6">
			<h2 class="font-display text-xl text-[var(--color-ink)]">Banho a ouro 18K &amp; prata 925</h2>
			<p class="mt-3 text-sm text-[var(--color-ink-soft)]">
				Trabalhamos com semijoias de banho nobre, pensadas para durar no uso diário sem perder o
				brilho. Peças livres de níquel, indicadas para peles sensíveis.
			</p>
		</div>
		<div class="rounded-2xl border border-[var(--color-line)] p-6">
			<h2 class="font-display text-xl text-[var(--color-ink)]">
				Atendimento exclusivo, com hora marcada
			</h2>
			<p class="mt-3 text-sm text-[var(--color-ink-soft)]">
				Cada cliente é atendida com calma, pelo WhatsApp, do primeiro "oi" até a peça chegar na sua
				casa. Sem robô, sem letra miúda.
			</p>
		</div>
		<div class="rounded-2xl border border-[var(--color-line)] p-6">
			<h2 class="font-display text-xl text-[var(--color-ink)]">Envio para todo o Brasil</h2>
			<p class="mt-3 text-sm text-[var(--color-ink-soft)]">
				Compre de onde estiver — enviamos para todos os estados, com o cuidado de embalagem que uma
				joia merece.
			</p>
		</div>
		<div class="rounded-2xl border border-[var(--color-line)] p-6">
			<h2 class="font-display text-xl text-[var(--color-ink)]">Feito para presentear</h2>
			<p class="mt-3 text-sm text-[var(--color-ink-soft)]">
				Ajudamos a escolher o presente certo — para você mesma ou para alguém especial — direto no
				WhatsApp.
			</p>
		</div>
	</div>

	<div class="mt-12 rounded-2xl bg-[var(--color-cream-deep)] p-8 text-center">
		<p class="font-display text-xl text-[var(--color-ink)]">Ficou com alguma dúvida?</p>
		<p class="mt-2 text-sm text-[var(--color-ink-soft)]">
			Fale com a gente, o atendimento é rapidinho.
		</p>
		<a
			href={whatsappUrl('Olá! Vi a página "Sobre" e tenho uma dúvida 💛')}
			target="_blank"
			rel="noopener noreferrer"
			class="mt-6 inline-block rounded-full bg-[var(--color-gold-deep)] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[var(--color-ink)]"
		>
			Chamar no WhatsApp
		</a>
	</div>
</section>
