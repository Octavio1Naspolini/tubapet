const CACHE = 'tubapet-v1';
const ARQUIVOS = [
  './', 'index.html', 'animais.html', 'lista.html', 'css/style.css',
  'js/storage.js', 'js/cadastro.js', 'js/animais.js', 'js/lista.js', 'js/pwa.js',
  'manifest.json', 'icons/icon-192.png', 'icons/icon-512.png'
];
async function semRedirecionamento(resposta) {
  if (!resposta.redirected) return resposta;
  const corpo = await resposta.blob();
  return new Response(corpo, {
    status: resposta.status,
    statusText: resposta.statusText,
    headers: resposta.headers
  });
}
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then(async (cache) => {
      for (const arquivo of ARQUIVOS) {
        const resposta = await fetch(arquivo);
        if (!resposta.ok) throw new Error('Falha ao baixar ' + arquivo);
        await cache.put(arquivo, await semRedirecionamento(resposta));
      }
    })
  );
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((chaves) => {
      return Promise.all(chaves.filter((c) => c !== CACHE).map((c) => caches.delete(c)));
    })
  );
  self.clients.claim();
});
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((emCache) =>
      emCache || fetch(event.request).then(semRedirecionamento)
    )
  );
});
