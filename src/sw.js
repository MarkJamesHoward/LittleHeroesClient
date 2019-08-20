if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.skipWaiting();
workbox.clientsClaim();

self.addEventListener("push", function(event) {
  console.log("[Service Worker] Push Received2.");
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = "LittleHeroes";
  const options = {
    body: event.data.text(),
    icon: "images/icon.png",
    badge: "images/badge.png"
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function(event) {
  console.log("[Service Worker] Notification click Received.");

  event.notification.close();

  event.waitUntil(clients.openWindow("https://www.littlehereos.online"));
});

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

// Register example path e.g. https://localhost:3000/example
workbox.routing.registerRoute("/", workbox.strategies.networkFirst());
workbox.routing.registerRoute("/welcome", workbox.strategies.networkFirst());
workbox.routing.registerRoute("/children", workbox.strategies.networkFirst());
