import { v4 as uuidv4 } from "uuid";
const clientMap = new Map();
let onlineUsers = 0;
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
            onlineUsers++;
            console.log('client connected :' + clientId);
            ws.send(`client connected : ${clientId}`);
            ws.send(`online users : ${onlineUsers}`);
            // ws.subscribe('welcome');
            // server.publish('welcome', `Welcome to server  ${clientId}`);

            ws.subscribe('usersConnected');
            server.publish('usersConnected', `User joined the chat: ${clientId}`);
        },
        close(ws, code, reason) {
            const clientId = clientMap.get(ws) || 'unknown';
            console.log('client disconnected :' + clientId);
            clientMap.delete(ws);
            onlineUsers--;
            ws.send(`online users : ${onlineUsers}`);
            server.publish('usersConnected', `User left the chat: ${clientId}`);
            //  ws.unsubscribe('welcome');
        },
        message(ws, message) {
            console.log(message);
        },
    }
});
console.log(`Listening on ${server.port}`);
