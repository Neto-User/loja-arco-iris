import type { PageServerLoad } from './$types';
import { getAllProducts, getCategories } from '$lib/server/db/queries';

export const load: PageServerLoad = async () => {
	const [products, categories] = await Promise.all([getAllProducts(), getCategories()]);
	return { products, categories };
};
