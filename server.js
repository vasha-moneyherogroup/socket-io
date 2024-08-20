const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 8000;
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('answer', (value) => {
    socket.emit('answer', value);
    socket.broadcast.emit('answer', value);
  });

  socket.on('next', () => {
    socket.emit('next');
    socket.broadcast.emit('next');
  });
});

http.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
