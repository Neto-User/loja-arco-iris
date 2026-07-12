import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getProductsByCategorySlug } from '$lib/server/db/queries';

export const load: PageServerLoad = async ({ params }) => {
	const { category, items } = await getProductsByCategorySlug(params.slug);
	if (!category) error(404, 'Categoria não encontrada');
	return { category, items };
};
