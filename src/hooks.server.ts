import type { Handle } from '@sveltejs/kit';
import { ADMIN_PASSWORD } from '$env/static/private';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/admin')) {
		const auth = event.request.headers.get('authorization');
		const expected = 'Basic ' + Buffer.from(`admin:${ADMIN_PASSWORD}`).toString('base64');

		if (!ADMIN_PASSWORD || auth !== expected) {
			return new Response('Área restrita', {
				status: 401,
				headers: { 'WWW-Authenticate': 'Basic realm="Arco-íris Styles Admin"' }
			});
		}
	}

	return resolve(event);
};
