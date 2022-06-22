const express = require('express');
const { ExpressPeerServer } = require('peer');

const app = express();

app.get('/', (req, res, next) => res.send('Hello world!'));

// =======

const server = app.listen(9000);
const peerServer = ExpressPeerServer(server, {
    path: '/myapp',
    // alive_timeout:''
});
// 当对等点连接到服务器时会发出该事件。
peerServer.on('connection', (client) => {
    console.log('服务器已经连接');
    console.log(client)
});
// 当对等方与服务器断开连接或无法再到达对等方时，将发出该事件。
peerServer.on('disconnect', (client) => {
    console.log(client)
});
peerServer.on('message',(client => {
    console.log(client)
}))
peerServer.on('error',(error => {
    console.log(error)
}))
app.use('/peerjs', peerServer);
