const express = require('express');
const { ExpressPeerServer } = require('peer');

const app = express();

app.get('/', (req, res, next) => res.send('Hello world!'));

// =======

const server = app.listen(9000);

const peerServer = ExpressPeerServer(server, {
    path: '/myapp'
});
// 当对等点连接到服务器时会发出该事件。
peerServer.on('connection', (client) => {
    console.log(client)
});
// 当对等方与服务器断开连接或无法再到达对等方时，将发出该事件。
peerServer.on('disconnect', (client) => {
    console.log(client)
});
app.use('/peerjs', peerServer);
