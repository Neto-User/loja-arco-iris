import type { PageServerLoad } from './$types';
import { getCategories, getFeaturedProducts } from '$lib/server/db/queries';

export const load: PageServerLoad = async () => {
	const [categories, featured] = await Promise.all([getCategories(), getFeaturedProducts(8)]);

	return { categories, featured };
};
