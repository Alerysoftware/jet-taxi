// Service Worker for Elite Taxi PWA
const CACHE_NAME = 'jet-taxi-v1.0.0'
const STATIC_CACHE = 'jet-taxi-static-v1.0.0'
const DYNAMIC_CACHE = 'jet-taxi-dynamic-v1.0.0'

// Static assets to cache
const STATIC_ASSETS = [
  '/',
  '/offline',
  '/manifest.json',
  '/images/JetTaxi.jpg',
  '/images/mercedes-eclass-main.jpg',
  '/images/vito-front-angle.jpg',
  '/images/taxi-exterior-day.jpg'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log('Static assets cached successfully')
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('Failed to cache static assets:', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('Service Worker activated')
        return self.clients.claim()
      })
  )
})

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Skip external requests
  if (!url.origin.startsWith(self.location.origin)) {
    return
  }

  // Handle different types of requests
  if (request.destination === 'image') {
    event.respondWith(handleImageRequest(request))
  } else if (request.destination === 'document') {
    event.respondWith(handleDocumentRequest(request))
  } else if (request.destination === 'script' || request.destination === 'style') {
    event.respondWith(handleAssetRequest(request))
  } else {
    event.respondWith(handleDefaultRequest(request))
  }
})

// Handle image requests with cache-first strategy
async function handleImageRequest(request) {
  try {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    console.error('Image fetch failed:', error)
    // Return a placeholder image if available
    const placeholderResponse = await caches.match('/images/placeholder.jpg')
    if (placeholderResponse) {
      return placeholderResponse
    }
    throw error
  }
}

// Handle document requests with network-first strategy
async function handleDocumentRequest(request) {
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    console.error('Document fetch failed:', error)
    
    // Try to serve from cache
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    // Serve offline page
    if (request.url.includes('/offline')) {
      return caches.match('/offline')
    }

    // Redirect to offline page
    return Response.redirect('/offline')
  }
}

// Handle asset requests with stale-while-revalidate strategy
async function handleAssetRequest(request) {
  try {
    const cachedResponse = await caches.match(request)
    const networkPromise = fetch(request).then(async (response) => {
      if (response.ok) {
        const cache = await caches.open(DYNAMIC_CACHE)
        cache.put(request, response.clone())
      }
      return response
    })

    if (cachedResponse) {
      // Return cached response immediately, update cache in background
      networkPromise.catch(() => {}) // Ignore network errors
      return cachedResponse
    }

    return networkPromise
  } catch (error) {
    console.error('Asset fetch failed:', error)
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    throw error
  }
}

// Handle default requests with cache-first strategy
async function handleDefaultRequest(request) {
  try {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    console.error('Default fetch failed:', error)
    throw error
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  try {
    // Sync offline data when connection is restored
    console.log('Background sync started')
    
    // You can implement offline data sync here
    // For example, sync offline reviews or bookings
    
  } catch (error) {
    console.error('Background sync failed:', error)
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: '/images/JetTaxi.jpg',
      badge: '/images/JetTaxi.jpg',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {
          action: 'explore',
          title: 'View Details',
          icon: '/images/JetTaxi.jpg'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/images/JetTaxi.jpg'
        }
      ]
    }

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    )
  }
})

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
