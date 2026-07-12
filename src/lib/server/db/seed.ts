import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL não definida no .env');

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

async function main() {
	console.log('🌈 Semeando o banco da Arco-íris Styles...');

	await db.delete(schema.orderItems);
	await db.delete(schema.orders);
	await db.delete(schema.reviews);
	await db.delete(schema.products);
	await db.delete(schema.categories);

	const [aneis, brincos, colares, pulseiras, conjuntos] = await db
		.insert(schema.categories)
		.values([
			{
				slug: 'aneis',
				name: 'Anéis',
				description: 'Do minimalista ao statement, para todos os dedos e todas as ocasiões.',
				imageUrl: '/produtos/anel.svg',
				sortOrder: 1
			},
			{
				slug: 'brincos',
				name: 'Brincos',
				description: 'Argolas, ear cuffs e pontos de luz para iluminar o rosto.',
				imageUrl: '/produtos/brinco.svg',
				sortOrder: 2
			},
			{
				slug: 'colares',
				name: 'Colares',
				description: 'Peças para usar sozinhas ou compor no seu mix autoral.',
				imageUrl: '/produtos/colar.svg',
				sortOrder: 3
			},
			{
				slug: 'pulseiras',
				name: 'Pulseiras',
				description: 'Delicadas ou marcantes, para empilhar do jeito que quiser.',
				imageUrl: '/produtos/pulseira.svg',
				sortOrder: 4
			},
			{
				slug: 'conjuntos',
				name: 'Conjuntos',
				description: 'Combinações prontas pensadas a dedo para looks completos.',
				imageUrl: '/produtos/conjunto.svg',
				sortOrder: 5
			}
		])
		.returning();

	await db.insert(schema.products).values([
		{
			slug: 'anel-solitario-zirconia-ouro',
			name: 'Anel Solitário Zircônia',
			description:
				'Anel solitário com zircônia cristal cravejada à mão e banho a ouro 18K espesso. Uma peça atemporal que vai do dia a dia ao evento especial sem esforço.',
			material: 'OURO_18K',
			priceCents: 8900,
			compareAtPriceCents: 11900,
			images: ['/produtos/anel.svg'],
			highlights: [
				'Banho a ouro 18K de alta espessura',
				'Zircônia cristal lapidação brilhante',
				'Livre de níquel'
			],
			categoryId: aneis.id,
			stock: 24,
			featured: true
		},
		{
			slug: 'anel-aro-liso-duplo',
			name: 'Anel Aro Liso Duplo',
			description:
				'Dois aros lisos e finos unidos em um só anel, pensados para empilhar com outras peças ou usar puro. Design minimalista que nunca sai de moda.',
			material: 'PRATA_925',
			priceCents: 6900,
			images: ['/produtos/anel.svg'],
			highlights: ['Prata 925 maciça', 'Formato ajustável', 'Acabamento polido espelhado'],
			categoryId: aneis.id,
			stock: 30,
			featured: false
		},
		{
			slug: 'anel-flor-cravejado',
			name: 'Anel Flor Cravejada',
			description:
				'Anel em formato de flor com pontos de zircônia cravejados, delicado e romântico, perfeito para compor com outros anéis.',
			material: 'OURO_18K',
			priceCents: 9900,
			images: ['/produtos/anel.svg'],
			highlights: ['Banho a ouro 18K', 'Design floral exclusivo', 'Zircônias cravejadas à mão'],
			categoryId: aneis.id,
			stock: 18,
			featured: false
		},
		{
			slug: 'brinco-argola-texturizada',
			name: 'Brinco Argola Texturizada',
			description:
				'Argola média com textura martelada que captura a luz de um jeito único. Leve no dia a dia, presente todos os dias.',
			material: 'OURO_18K',
			priceCents: 7900,
			images: ['/produtos/brinco.svg'],
			highlights: ['Banho a ouro 18K', 'Textura martelada artesanal', 'Fecho click seguro'],
			categoryId: brincos.id,
			stock: 40,
			featured: true
		},
		{
			slug: 'brinco-ear-cuff-folha',
			name: 'Ear Cuff Folha Dourada',
			description:
				'Ear cuff em formato de folha, não fura a orelha e dá aquele toque autoral no visual em segundos.',
			material: 'OURO_18K',
			priceCents: 5900,
			images: ['/produtos/brinco.svg'],
			highlights: ['Não precisa de furo', 'Ajuste universal', 'Banho a ouro 18K'],
			categoryId: brincos.id,
			stock: 22,
			featured: false
		},
		{
			slug: 'brinco-ponto-luz-zirconia',
			name: 'Brinco Ponto de Luz',
			description:
				'O clássico ponto de luz, com zircônia cristal e brilho discreto para usar todos os dias, com tudo.',
			material: 'PRATA_925',
			priceCents: 4900,
			compareAtPriceCents: 6400,
			images: ['/produtos/brinco.svg'],
			highlights: ['Prata 925', 'Zircônia cristal', 'Hipoalergênico'],
			categoryId: brincos.id,
			stock: 55,
			featured: true
		},
		{
			slug: 'colar-corrente-cartier',
			name: 'Colar Corrente Cartier',
			description:
				'Corrente elo cartier em tamanho médio, a base perfeita para pingentes ou para usar sozinha com decote em V.',
			material: 'OURO_18K',
			priceCents: 12900,
			images: ['/produtos/colar.svg'],
			highlights: ['Banho a ouro 18K espesso', 'Elos reforçados', '45cm + extensor 5cm'],
			categoryId: colares.id,
			stock: 20,
			featured: true
		},
		{
			slug: 'colar-ponto-luz-gravata',
			name: 'Colar Gravatinha Ponto de Luz',
			description:
				'Colar fino estilo gravatinha com pingente ponto de luz, discreto e versátil para o dia a dia.',
			material: 'OURO_18K',
			priceCents: 8400,
			images: ['/produtos/colar.svg'],
			highlights: ['Banho a ouro 18K', 'Corrente veneziana fina', 'Pingente zircônia'],
			categoryId: colares.id,
			stock: 26,
			featured: false
		},
		{
			slug: 'colar-choker-veneziana',
			name: 'Choker Veneziana',
			description:
				'Choker justo ao pescoço em corrente veneziana, para um visual moderno e statement.',
			material: 'PRATA_925',
			priceCents: 7400,
			images: ['/produtos/colar.svg'],
			highlights: ['Prata 925', 'Fecho regulável em 3 posições', 'Acabamento espelhado'],
			categoryId: colares.id,
			stock: 15,
			featured: false
		},
		{
			slug: 'pulseira-riviera-zirconia',
			name: 'Pulseira Riviera',
			description:
				'Pulseira riviera com zircônias em fileira única, elegante o suficiente para uma festa e discreta para o trabalho.',
			material: 'OURO_18K',
			priceCents: 9900,
			images: ['/produtos/pulseira.svg'],
			highlights: ['Banho a ouro 18K', 'Zircônias cristal', 'Fecho tipo gaveta'],
			categoryId: pulseiras.id,
			stock: 17,
			featured: true
		},
		{
			slug: 'pulseira-elos-portugueses',
			name: 'Pulseira Elos Portugueses',
			description:
				'Elos entrelaçados clássicos em pulseira de peso médio, uma peça que dura anos de uso diário.',
			material: 'PRATA_925',
			priceCents: 6400,
			images: ['/produtos/pulseira.svg'],
			highlights: ['Prata 925 maciça', 'Elos reforçados', '18cm + extensor'],
			categoryId: pulseiras.id,
			stock: 28,
			featured: false
		},
		{
			slug: 'conjunto-flor-completo',
			name: 'Conjunto Flor Completo',
			description:
				'Colar, brinco e anel no mesmo design floral cravejado — o mix perfeito já pronto, sem precisar combinar nada.',
			material: 'OURO_18K',
			priceCents: 18900,
			compareAtPriceCents: 22700,
			images: ['/produtos/conjunto.svg'],
			highlights: [
				'3 peças no mesmo design',
				'Banho a ouro 18K',
				'Economia frente à compra separada'
			],
			categoryId: conjuntos.id,
			stock: 12,
			featured: true
		},
		{
			slug: 'conjunto-basico-diario',
			name: 'Conjunto Básico do Dia a Dia',
			description:
				'Colar gravatinha e brinco ponto de luz em conjunto, o básico que nunca falta na bolsa nem no joalheiro.',
			material: 'PRATA_925',
			priceCents: 10900,
			images: ['/produtos/conjunto.svg'],
			highlights: ['2 peças combinando', 'Prata 925', 'Ideal para presentear'],
			categoryId: conjuntos.id,
			stock: 20,
			featured: false
		}
	]);

	console.log('✅ Categorias e produtos inseridos com sucesso.');
}

main()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error('❌ Erro ao semear o banco:', err);
		process.exit(1);
	});
