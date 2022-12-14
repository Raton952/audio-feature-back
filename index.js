const express = require("express")
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
 
app.use('/static', express.static('public'));
 
app.get('/**', (req, res) => {
    return res.send(path.join(__dirname + '/public/index.html'));
});
 
io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        console.log(roomId, userId);
        socket.join(roomId);
        socket.broadcast.emit('user-connected', userId);
 
        socket.on('disconnect', () => {
            socket.broadcast.emit('user-disconnected', userId);
        })
    });
})
 
server.listen(3000);