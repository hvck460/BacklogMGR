// Proxy CORS para Cloudflare Workers: permite que la app consulte SteamGridDB desde el navegador.
// Solo reenvía a SteamGridDB y solo acepta peticiones de las direcciones de tu app.
const ALLOWED_HOSTS = ['www.steamgriddb.com'];
// Direcciones desde las que se abre la app (solo https://dominio, sin barra final ni ruta)
const ALLOWED_ORIGINS = [
  'https://hvck460.github.io',
  'https://backlogmgr.sluacesmartin.workers.dev'
];

export default {
  async fetch(req) {
    const origin = req.headers.get('Origin') || '';
    const allowed = ALLOWED_ORIGINS.includes(origin);
    const cors = {
      'Access-Control-Allow-Origin': allowed ? origin : ALLOWED_ORIGINS[0],
      'Access-Control-Allow-Headers': 'Authorization, Content-Type',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Vary': 'Origin'
    };
    if (req.method === 'OPTIONS') return new Response(null, {status: 204, headers: cors});
    if (req.method !== 'GET') return new Response('method not allowed', {status: 405, headers: cors});
    if (!allowed) return new Response('forbidden origin: ' + origin, {status: 403, headers: cors});

    let target;
    try { target = new URL(new URL(req.url).searchParams.get('url')); }
    catch (_) { return new Response('bad url', {status: 400, headers: cors}); }
    if (target.protocol !== 'https:' || !ALLOWED_HOSTS.includes(target.hostname))
      return new Response('forbidden host', {status: 403, headers: cors});

    const h = new Headers({'Accept': 'application/json', 'User-Agent': 'mi-backlog-proxy'});
    const auth = req.headers.get('Authorization');
    if (auth) h.set('Authorization', auth);
    try {
      const r = await fetch(target.toString(), {headers: h});
      const res = new Response(r.body, r);
      for (const [k, v] of Object.entries(cors)) res.headers.set(k, v);
      return res;
    } catch (e) {
      return new Response('upstream error: ' + e.message, {status: 502, headers: cors});
    }
  }
};
