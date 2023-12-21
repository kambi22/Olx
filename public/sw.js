let chachedata = "AppV1";

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(chachedata).then((cache) => {
            cache.addAll([
                "/static/js/bundle.js",
                "/static/js/main.chunk.js",
                "/static/js/0.chunk.js",
                "/index.html",
                "/"
            ])
        })
    )
})

self.addEventListener("fetch",(event)=>{
        if(!navigator.onLine){
            event.respondWith(
                caches.match(event.request).then((result)=>{
                    if(result){
                        return result;
                    }
                })
            )
        }
})