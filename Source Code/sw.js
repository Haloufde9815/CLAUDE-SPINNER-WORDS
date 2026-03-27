/**
 * Filename: sw.js
 * Author: Amey Thakur
 * GitHub: https://github.com/Amey-Thakur
 * Repository: https://github.com/Amey-Thakur/CLAUDE-SPINNER-WORDS
 * Release Date: March 27 2026
 * License: MIT
 * 
 * Description:
 * Core service worker for the Claude Thinking Simulator. 
 * Implements a robust "Cache-First" strategy for high-performance offline access.
 */

const CACHE_NAME = 'claude-spinner-cache-v2';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './assets/favicon.svg',
    './css/base.css',
    './css/layout.css',
    './css/terminal.css',
    './css/simulation.css',
    './css/loader.css',
    './css/state_sim.css',
    './css/navigation.css',
    './js/dist/bundle.min.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return cached response if found, otherwise fetch from network
            return response || fetch(event.request).then((networkResponse) => {
                // Return network response immediately if caching is not appropriate
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic' && !event.request.url.startsWith('http')) {
                    return networkResponse;
                }

                // Dynamically cache external requests like Google Fonts
                return caches.open(CACHE_NAME).then((cache) => {
                    if (event.request.url.startsWith('http')) {
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                });
            });
        })
    );
});
