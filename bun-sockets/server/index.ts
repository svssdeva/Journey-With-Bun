import { v4 as uuidv4 } from "uuid";
const clientMap = new Map();
const server = Bun.serve({
    port: 8080,
    fetch(req, server) {
        if (server.upgrade(req)) {
            return;
        }
        return new Response(Bun.file('./public/index.html'));
    },
    websocket: {
        open(ws) {
            const clientId = uuidv4();
            clientMap.set(ws, clientId);
            console.log('client connected :' + clientId);
            ws.send('client connected :' + String(clientId));
        },
        close(ws, code, reason) {
            const clientId = clientMap.get(ws) || 'unknown';
            console.log('client disconnected :' + clientId);
            clientMap.delete(ws);
        },
        message(ws, message) {
            console.log(message);
        },
    }
});
console.log(`Listening on ${server.port}`);
