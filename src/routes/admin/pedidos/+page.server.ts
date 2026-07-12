import type { PageServerLoad } from './$types';
import { getAllOrders } from '$lib/server/db/queries';

export const load: PageServerLoad = async () => {
	const orders = await getAllOrders();
	return { orders };
};
