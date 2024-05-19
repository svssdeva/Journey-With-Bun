const formHtml = await Bun.file('./form.html').text();
const server = Bun.serve({
    port: 2000,
    async fetch(req, server) {
        const url = new URL(req.url);
        const method = req.method;

        if (url.pathname === '/') {
            return new Response(formHtml, {
                headers: {
                    'Content-Type': 'text/html'
                }
            })
        }
        else if (url.pathname === '/data' && method === 'POST') {
            const data = await req.text().then(body => new URLSearchParams(body));
            console.log(data);
            return new Response('Post Data: ' + req.url);
        }
        else {
            return new Response('Hello Server via Bun!' + req.url);
        }
    }
});

console.log(`Listening on ${server.port}`);