# BacklogMGR

Gestor personal de backlog de videojuegos. Web instalable (PWA): funciona en el móvil Android y en el PC, y sin conexión una vez cargada.

## Qué hace

- Seis listas: Jugando, Backlog, Deseados, En espera, Abandonados y Completados.
- Tarjetas con portada, plataforma y barra de progreso que se arrastra directamente en la tarjeta.
- «Jugar» / «Completar» / «Rejugar» con un toque. Al llegar al 100 % pasa solo a Completados.
- **Fechas automáticas:** se apunta cuándo empiezas (al pasar a Jugando) y cuándo terminas (al completar). Se pueden editar a mano.
- **Valoración** de 1 a 5 estrellas y un campo de texto cuyo título cambia según la lista: «Opinión final» en Completados, «Motivo del abandono» en Abandonados, «Motivo de la pausa» en En espera.
- **Veces completado**: sube solo cada vez que completas el juego; también se puede corregir.
- **Etiquetas propias** (Co-op, Para el Deck, Cortos…) con filtro en la barra superior. Un juego puede tener varias.
- **Duración estimada** (en horas) por juego, con un enlace para consultarla en HowLongToBeat. Se muestra en la tarjeta y suma en las estadísticas.
- **¿A qué juego ahora?** (icono del dado): elige al azar un juego de tu backlog, respetando el filtro de plataforma y etiqueta activo.
- **Estadísticas** (icono de barras): completados este año y por año, tasa de abandono, nota media, media de días hasta completar, horas estimadas de backlog y reparto por lista y plataforma.
- Búsqueda de juegos y portadas con SteamGridDB (tu clave personal), selector de portadas alternativas, y opción de pegar una URL o subir una imagen.
- Filtro por plataforma, orden y buscador sobre todas tus listas.
- Exportar e importar copia de seguridad (JSON). Compatible con las copias de la versión anterior.

Los datos se guardan **solo en el navegador del dispositivo**. No hay sincronización todavía: usa Exportar/Importar para pasar datos entre móvil y PC, y haz copias de vez en cuando.

### Sobre HowLongToBeat

HowLongToBeat no ofrece una API oficial: lo que existe son herramientas de terceros que leen su web, y un navegador no puede consultarla directamente. Por eso esta versión incluye el campo manual y el enlace. Una consulta automática sería posible ampliando el proxy de Cloudflare, pero dependería de cómo esté construida su web en cada momento y podría romperse sin avisar.

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

Sincronización entre dispositivos, importación CSV y consulta automática de duraciones. La integración con tu cuenta de Backloggd queda descartada: no ofrece API ni exportación oficial.
