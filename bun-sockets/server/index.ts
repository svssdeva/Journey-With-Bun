const server = Bun.serve({
    port: 8080,
    fetch(req, server) {
        if (server.upgrade(req)) {
            return;
        }
        return new Response(`Welcome to server`);
    },
    websocket: {
        open(ws) {
            console.log('client connected');
        },
        close(ws, code, reason) {
            console.log('client disconnected');
        },
        message(ws, message) {
            console.log(message);
        },
    }
});
console.log(`Listening on ${server.port}`);
