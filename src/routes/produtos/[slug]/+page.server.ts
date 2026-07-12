import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getProductBySlug, getRelatedProducts } from '$lib/server/db/queries';

export const load: PageServerLoad = async ({ params }) => {
	const product = await getProductBySlug(params.slug);
	if (!product) error(404, 'Peça não encontrada');

	const related = await getRelatedProducts(product.categoryId, product.slug);

	return { product, related };
};
