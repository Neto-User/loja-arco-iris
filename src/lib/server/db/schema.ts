import {
	pgTable,
	text,
	integer,
	boolean,
	timestamp,
	pgEnum,
	uuid,
	serial
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const materialEnum = pgEnum('material', ['OURO_18K', 'PRATA_925']);
export const orderStatusEnum = pgEnum('order_status', [
	'NOVO',
	'EM_ATENDIMENTO',
	'CONCLUIDO',
	'CANCELADO'
]);

export const categories = pgTable('categories', {
	id: uuid('id').primaryKey().defaultRandom(),
	slug: text('slug').notNull().unique(),
	name: text('name').notNull(),
	description: text('description'),
	imageUrl: text('image_url'),
	sortOrder: integer('sort_order').notNull().default(0)
});

export const products = pgTable('products', {
	id: uuid('id').primaryKey().defaultRandom(),
	slug: text('slug').notNull().unique(),
	name: text('name').notNull(),
	description: text('description').notNull(),
	material: materialEnum('material').notNull().default('OURO_18K'),
	priceCents: integer('price_cents').notNull(),
	compareAtPriceCents: integer('compare_at_price_cents'),
	images: text('images').array().notNull().default([]),
	highlights: text('highlights').array().notNull().default([]),
	categoryId: uuid('category_id')
		.notNull()
		.references(() => categories.id),
	stock: integer('stock').notNull().default(0),
	featured: boolean('featured').notNull().default(false),
	active: boolean('active').notNull().default(true),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

export const orders = pgTable('orders', {
	id: uuid('id').primaryKey().defaultRandom(),
	code: serial('code').notNull(),
	customerName: text('customer_name').notNull(),
	customerPhone: text('customer_phone').notNull(),
	status: orderStatusEnum('status').notNull().default('NOVO'),
	totalCents: integer('total_cents').notNull(),
	notes: text('notes'),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

export const orderItems = pgTable('order_items', {
	id: uuid('id').primaryKey().defaultRandom(),
	orderId: uuid('order_id')
		.notNull()
		.references(() => orders.id, { onDelete: 'cascade' }),
	productId: uuid('product_id').references(() => products.id),
	nameSnapshot: text('name_snapshot').notNull(),
	priceCentsSnapshot: integer('price_cents_snapshot').notNull(),
	quantity: integer('quantity').notNull().default(1)
});

export const reviews = pgTable('reviews', {
	id: uuid('id').primaryKey().defaultRandom(),
	productId: uuid('product_id')
		.notNull()
		.references(() => products.id, { onDelete: 'cascade' }),
	authorName: text('author_name').notNull(),
	rating: integer('rating').notNull(),
	comment: text('comment').notNull(),
	approved: boolean('approved').notNull().default(true),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

export const categoriesRelations = relations(categories, ({ many }) => ({
	products: many(products)
}));

export const productsRelations = relations(products, ({ one, many }) => ({
	category: one(categories, {
		fields: [products.categoryId],
		references: [categories.id]
	}),
	reviews: many(reviews)
}));

export const ordersRelations = relations(orders, ({ many }) => ({
	items: many(orderItems)
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
	order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
	product: one(products, { fields: [orderItems.productId], references: [products.id] })
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
	product: one(products, { fields: [reviews.productId], references: [products.id] })
}));
