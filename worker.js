// Proxy CORS opcional para Cloudflare Workers (plan B si SteamGridDB bloquea las llamadas desde el navegador).
// Solo reenvía a SteamGridDB y solo acepta peticiones de tu propia web (cambia ORIGIN).
const ALLOWED_HOSTS = ['www.steamgriddb.com'];
const ORIGIN = 'https://TU-USUARIO.github.io';   // <- tu dirección de GitHub Pages (sin barra final)

export default {
  async fetch(req) {
    const cors = {
      'Access-Control-Allow-Origin': ORIGIN,
      'Access-Control-Allow-Headers': 'Authorization, Content-Type',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Vary': 'Origin'
    };
    if (req.method === 'OPTIONS') return new Response(null, {headers: cors});
    if (req.method !== 'GET') return new Response('method not allowed', {status: 405, headers: cors});
    if (req.headers.get('Origin') !== ORIGIN) return new Response('forbidden', {status: 403, headers: cors});

    let target;
    try { target = new URL(new URL(req.url).searchParams.get('url')); }
    catch (_) { return new Response('bad url', {status: 400, headers: cors}); }
    if (target.protocol !== 'https:' || !ALLOWED_HOSTS.includes(target.hostname))
      return new Response('forbidden host', {status: 403, headers: cors});

    const h = new Headers();
    const auth = req.headers.get('Authorization');
    if (auth) h.set('Authorization', auth);
    const r = await fetch(target.toString(), {headers: h});
    const res = new Response(r.body, r);
    for (const [k, v] of Object.entries(cors)) res.headers.set(k, v);
    return res;
  }
};
