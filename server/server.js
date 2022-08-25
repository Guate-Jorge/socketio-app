const io = require('socket.io')(3000, {
  cors: {
    origin: ['http://localhost:8080']
  }
});

io.on('connection', socket => {
  console.log(socket.id);
  socket.on('send-message', (message) => {
    console.log(message);
    //io.emit('receive-message', message);
    socket.broadcast.emit('receive-message', message);
  });
  socket.on('custom-event', (number, string, arr, obj) => {
    console.log(number, string);
  });
  socket.on('emojis', () => {
    socket.broadcast.emit('receive-message', '😀');
  });
  socket.on('close-conversation', (id) =>{
    
  })
})