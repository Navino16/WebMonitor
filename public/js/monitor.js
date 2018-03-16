  var socket = io.connect();
  socket.emit('join');

  socket.once('connect', function () {});

  socket.on('reconnect', function () {
    socket.emit('join', pseudo);
  })