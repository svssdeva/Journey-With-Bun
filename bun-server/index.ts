const product = {
    pcode: 1111,
    pname: 'Apple'
}

const server = Bun.serve({
    port: 2000,
    fetch(req, server) {
        // console.log(req);
        // console.log(server);
        // setTimeout(() => {
        //     server.stop()
        // }, 3000);
        const url = new URL(req.url);
        console.log(url)
        switch (url.pathname) {
            case "/products":
                return new Response(JSON.stringify(product), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            //return new Response('Products Route: ' + req.url);
            default:
                return new Response("Hello Server via Bun!" + req.url);
        }
    }
});

console.log(`Listening on ${server.port}`);