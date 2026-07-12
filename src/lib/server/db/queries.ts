import { eq, desc, and } from 'drizzle-orm';
import { db } from './index';
import { categories, products, reviews, orders, orderItems } from './schema';

export async function getCategories() {
	return db.query.categories.findMany({
		orderBy: (c, { asc }) => asc(c.sortOrder)
	});
}

export async function getCategoryBySlug(slug: string) {
	return db.query.categories.findFirst({ where: eq(categories.slug, slug) });
}

export async function getFeaturedProducts(limit = 8) {
	return db.query.products.findMany({
		where: and(eq(products.featured, true), eq(products.active, true)),
		with: { category: true },
		limit,
		orderBy: desc(products.createdAt)
	});
}

export async function getProductsByCategorySlug(slug: string) {
	const category = await getCategoryBySlug(slug);
	if (!category) return { category: null, items: [] };
	const items = await db.query.products.findMany({
		where: and(eq(products.categoryId, category.id), eq(products.active, true)),
		with: { category: true }
	});
	return { category, items };
}

export async function getAllProducts() {
	return db.query.products.findMany({
		where: eq(products.active, true),
		with: { category: true },
		orderBy: desc(products.createdAt)
	});
}

export async function getProductBySlug(slug: string) {
	return db.query.products.findFirst({
		where: eq(products.slug, slug),
		with: { category: true, reviews: { where: eq(reviews.approved, true) } }
	});
}

export async function getRelatedProducts(categoryId: string, excludeSlug: string, limit = 4) {
	const items = await db.query.products.findMany({
		where: and(eq(products.categoryId, categoryId), eq(products.active, true)),
		limit: limit + 1
	});
	return items.filter((p) => p.slug !== excludeSlug).slice(0, limit);
}

export type CheckoutInput = {
	customerName: string;
	customerPhone: string;
	notes?: string;
	items: { productId: string; name: string; priceCents: number; quantity: number }[];
};

export async function createOrder(input: CheckoutInput) {
	const totalCents = input.items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0);

	const [order] = await db
		.insert(orders)
		.values({
			customerName: input.customerName,
			customerPhone: input.customerPhone,
			notes: input.notes,
			totalCents
		})
		.returning();

	if (input.items.length > 0) {
		await db.insert(orderItems).values(
			input.items.map((item) => ({
				orderId: order.id,
				productId: item.productId,
				nameSnapshot: item.name,
				priceCentsSnapshot: item.priceCents,
				quantity: item.quantity
			}))
		);
	}

	return order;
}

export async function getAllOrders() {
	return db.query.orders.findMany({
		with: { items: true },
		orderBy: desc(orders.createdAt)
	});
}
