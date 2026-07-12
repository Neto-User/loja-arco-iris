export function formatBRL(cents: number): string {
	return (cents / 100).toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL'
	});
}

export const MATERIAL_LABEL: Record<string, string> = {
	OURO_18K: 'Banho a ouro 18K',
	PRATA_925: 'Prata 925'
};

// Link oficial de mensagem da loja (extraído da bio do Instagram @arcoirisstyless)
export const WHATSAPP_BASE_URL = 'https://wa.me/message/5W3AR63HLY6GI1';

export function whatsappUrl(message: string): string {
	return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}

export function slugify(text: string): string {
	return text
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}
