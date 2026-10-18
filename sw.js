var C='trenirovki-v5';
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(['./','index.html','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png'])}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==C}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET')return;
 if(r.mode==='navigate'||r.url.indexOf('index.html')>=0){e.respondWith(fetch(r).then(function(res){var cp=res.clone();caches.open(C).then(function(c){c.put('index.html',cp)});return res}).catch(function(){return caches.match('index.html')}));return}
 e.respondWith(caches.match(r).then(function(m){return m||fetch(r).then(function(res){if(res&&(res.ok||res.type==='opaque')){var cp=res.clone();caches.open(C).then(function(c){c.put(r,cp)})}return res})}))});
