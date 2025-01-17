// websocket.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3001, path: '/ws' });

wss.on('connection', (ws) => {
    console.log('A new client connected');

    ws.on('message', (message) => {
        console.log('received: %s', message);
    });

    ws.send('Welcome to the WebSocket server!');
});

console.log('WebSocket server is running on ws://localhost:3001/ws');