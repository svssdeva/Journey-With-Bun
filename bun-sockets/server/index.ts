import { v4 as uuidv4 } from "uuid";
const clientMap = new Map();
let onlineUsers = 0;
const server = Bun.serve<{ username: string }>({
    port: 8080,
    fetch(req, server) {
        if (server.upgrade(req, {
            data: { username: `User_${Math.random().toString(16).slice(12)}` }
        })) {
            return;
        }
        return new Response(Bun.file('./public/index.html'));
    },
    websocket: {
        open(ws) {
            const clientId = uuidv4();
            const username = ws.data.username;
            clientMap.set(ws, { clientId, username });
            onlineUsers++;
            console.log('client connected :' + clientId);
            ws.send(`client connected : ${username}`);
            ws.send(`online users : ${onlineUsers}`);
            // ws.subscribe('welcome');
            // server.publish('welcome', `Welcome to server  ${clientId}`);

            ws.subscribe('usersConnected');
            server.publish('usersConnected', `User joined the chat: ${username}`);
            ws.subscribe('broadcastMsg');

            const clientInfoMessage = { clientId, username };
            ws.send(JSON.stringify(clientInfoMessage));

            const userList = Array.from(clientMap.values()).map((info) => info.username);
            ws.subscribe('usersList');
            server.publish('usersList', JSON.stringify(userList));
        },
        close(ws, code, reason) {
            const clientInfo = clientMap.get(ws);
            const clientId = clientInfo ? clientInfo.clientId : 'unknown';
            const username = clientInfo ? clientInfo.username : 'unknown user';
            console.log('client disconnected :' + clientId);
            clientMap.delete(ws);
            onlineUsers--;
            ws.send(`online users : ${onlineUsers}`);
            server.publish('usersConnected', `User left the chat: ${username}`);
            const userList = Array.from(clientMap.values()).map((info) => info.username);
            server.publish('usersList', JSON.stringify(userList));
        },
        message(ws, message) {
            const clientInfo = clientMap.get(ws);
            const clientId = clientInfo ? clientInfo.clientId : 'unknown';
            const username = clientInfo ? clientInfo.username : 'unknown user';

            const ackMsg = ws.send('Message Delivered');

            const dataToSend = `${username} - ${message}`;
            server.publish('broadcastMsg', dataToSend);

            if (ackMsg > 0) {
                console.log(`Acknowledgement sent to client ${dataToSend}`);
            } else {
                console.error(`Acknowledgement not sent to client ${dataToSend}`);
            }
        },
    }
});
console.log(`Listening on ${server.port}`);
