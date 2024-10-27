const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// Handle incoming connections
wss.on('connection', function connection(ws) {
    console.log('Client connected');

    // Listen for messages from clients
    ws.on('message', function incoming(message) {
        console.log('Received:', message);
        
        // Broadcast the message to all connected clients
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server running on ws://localhost:8080');