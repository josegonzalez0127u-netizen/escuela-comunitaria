// Recibir notificación push (app cerrada o en segundo plano)
self.addEventListener('push', function(event) {
  let data = { title: 'Escuela', body: 'Nuevo aviso' };

  if (event.data) {
    try { data = event.data.json(); } catch(e) {}
  }

  const options = {
    body: data.body || '',
    icon: 'icon-192.png',
    vibrate: [100, 50, 100],
    data: { url: data.url || '/' }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Al tocar la notificación
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const url = event.notification.data && event.notification.data.url ? event.notification.data.url : '/';
  event.waitUntil(clients.openWindow(url));
});
