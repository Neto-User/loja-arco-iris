import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createOrder } from '$lib/server/db/queries';
import { whatsappUrl, formatBRL } from '$lib/utils';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();

	const { customerName, customerPhone, notes, items } = body as {
		customerName?: string;
		customerPhone?: string;
		notes?: string;
		items?: {
			productId: string;
			name: string;
			priceCents: number;
			quantity: number;
			size?: string;
		}[];
	};

	if (!customerName?.trim() || !customerPhone?.trim()) {
		error(400, 'Nome e telefone são obrigatórios.');
	}
	if (!items || items.length === 0) {
		error(400, 'O carrinho está vazio.');
	}

	const order = await createOrder({
		customerName: customerName.trim(),
		customerPhone: customerPhone.trim(),
		notes,
		items: items.map((i) => ({
			productId: i.productId,
			name: i.size ? `${i.name} (aro ${i.size})` : i.name,
			priceCents: i.priceCents,
			quantity: i.quantity
		}))
	});

	const lines = items.map(
		(i) =>
			`• ${i.quantity}x ${i.name}${i.size ? ` (aro ${i.size})` : ''} — ${formatBRL(i.priceCents * i.quantity)}`
	);
	const total = items.reduce((s, i) => s + i.priceCents * i.quantity, 0);

	const message = [
		`Olá! Sou ${customerName.trim()} e quero fechar o pedido *#${order.code}* 💛`,
		'',
		...lines,
		'',
		`Total: ${formatBRL(total)}`,
		notes ? `\nObservações: ${notes}` : ''
	]
		.filter(Boolean)
		.join('\n');

	return json({ orderCode: order.code, whatsappUrl: whatsappUrl(message) });
};
