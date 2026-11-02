# Mi Backlog

Gestor personal de backlog de videojuegos. Web instalable (PWA): funciona en el móvil Android y en el PC, y sin conexión una vez cargada.

## Qué hace (versión 1)

- Cinco listas: Jugando, Backlog, En espera, Abandonados y Completados.
- Tarjetas con portada, plataforma y barra de progreso. La barra se arrastra directamente en la tarjeta.
- «Jugar» / «Completar» / «Rejugar» con un toque. Al llegar al 100 % pasa solo a Completados.
- Búsqueda de juegos y portadas con SteamGridDB (tu clave personal) y selector de portadas alternativas. También puedes pegar una URL o subir una imagen.
- Filtro por plataforma, orden y buscador sobre todas tus listas.
- Exportar e importar copia de seguridad (JSON).

Los datos se guardan **solo en el navegador del dispositivo**. No hay sincronización todavía: usa Exportar/Importar para pasar datos entre móvil y PC, y haz copias de vez en cuando.

## Publicarla en GitHub Pages (gratis)

1. Crea un repositorio nuevo en GitHub (público; si quieres que sea privado, GitHub Pages lo permite según el plan).
2. Sube **todos los archivos de esta carpeta** a la raíz del repositorio (`index.html`, `sw.js`, `manifest.webmanifest`, `icon.svg`, `icon-192.png`, `icon-512.png`; `worker.js` y este README son opcionales).
3. En el repositorio: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)`. Guarda.
4. En uno o dos minutos tendrás una dirección tipo `https://TU-USUARIO.github.io/NOMBRE-REPO/`.

Alternativa más rápida: arrastrar la carpeta a https://app.netlify.com/drop.

## Instalarla en el móvil (Android)

Abre la dirección en Chrome → menú ⋮ → **Instalar aplicación** (o «Añadir a pantalla de inicio»). En el PC, Chrome/Edge muestran un icono de instalación en la barra de direcciones.

## Configurar SteamGridDB

1. Entra en https://www.steamgriddb.com/profile/preferences/api y copia tu clave API.
2. En la app: icono de ajustes → pega la clave → **Probar conexión**.
   - Si dice «Conexión correcta», ya puedes buscar juegos con portada.
   - Si falla con un mensaje de conexión/CORS, sigue con el siguiente apartado.

> Importante: esta versión no se ha podido probar contra el servidor real de SteamGridDB (el entorno donde se construyó no tenía acceso). Todo lo demás se probó con una simulación de su API. El botón «Probar conexión» sirve justo para comprobarlo en tu primer uso.

La clave se guarda solo en tu navegador. Cualquiera con acceso a tu navegador podría verla; no la compartas ni la subas al repositorio.

## Plan B: proxy CORS (solo si «Probar conexión» falla)

Si el navegador bloquea las llamadas directas a SteamGridDB:

1. Crea una cuenta gratuita en Cloudflare → Workers & Pages → Create → Worker.
2. Pega el contenido de `worker.js` y cambia `ORIGIN` por tu dirección de GitHub Pages **sin barra final y sin la ruta del repositorio** (por ejemplo `https://tu-usuario.github.io`).
3. Despliega y copia la URL del worker.
4. En los ajustes de la app, en «Proxy CORS», pega: `https://TU-WORKER.workers.dev/?url=`

El worker solo reenvía a `www.steamgriddb.com` y solo acepta peticiones de tu propia web.

## Pendiente para próximas versiones

Sincronización entre dispositivos, listas personalizadas, importación CSV y estadísticas. La integración con tu cuenta de Backloggd queda descartada: no ofrece API ni exportación oficial.
