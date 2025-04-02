const {WebSocketServer} = require('ws');
const GameManager = require('./src/GameManager');
const wss = new WebSocketServer({ port: 8080 }, () => {
    console.log("running on port 8080");
});

const gameManager = new GameManager();

wss.on('connection', function connection(ws) {
    gameManager.addUser(ws)

    ws.on('disconnect', () => gameManager.removeUser(ws))
});