export type CartItem = {
	productId: string;
	slug: string;
	name: string;
	priceCents: number;
	image: string;
	size?: string;
	quantity: number;
};

const STORAGE_KEY = 'arco-iris:carrinho';

function loadInitial(): CartItem[] {
	if (typeof localStorage === 'undefined') return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as CartItem[]) : [];
	} catch {
		return [];
	}
}

class Cart {
	items = $state<CartItem[]>(loadInitial());

	total = $derived(this.items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0));
	count = $derived(this.items.reduce((sum, i) => sum + i.quantity, 0));

	#persist() {
		if (typeof localStorage === 'undefined') return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
	}

	add(item: Omit<CartItem, 'quantity'>, quantity = 1) {
		const existing = this.items.find((i) => i.productId === item.productId && i.size === item.size);
		if (existing) {
			existing.quantity += quantity;
		} else {
			this.items.push({ ...item, quantity });
		}
		this.#persist();
	}

	updateQuantity(productId: string, size: string | undefined, quantity: number) {
		const item = this.items.find((i) => i.productId === productId && i.size === size);
		if (!item) return;
		if (quantity <= 0) {
			this.remove(productId, size);
			return;
		}
		item.quantity = quantity;
		this.#persist();
	}

	remove(productId: string, size?: string) {
		this.items = this.items.filter((i) => !(i.productId === productId && i.size === size));
		this.#persist();
	}

	clear() {
		this.items = [];
		this.#persist();
	}
}

export const cart = new Cart();
