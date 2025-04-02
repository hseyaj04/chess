const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
  console.log('Connected to the server');
  ws.send('Hello Server');
});

ws.on('message', (data) => {
  console.log('Message from server:', data);
});

ws.on('error', (err) => {
  console.error('Connection error:', err);
});

ws.on('close', () => {
  console.log('Connection closed');
});