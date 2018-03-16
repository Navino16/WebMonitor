const util = require('util');
const exec = util.promisify(require('child_process').exec);

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index.ejs');
})
.use(function(req, res){
  res.redirect('/');
});

var clients = [];

io.sockets.on('connection', function (socket) {
  socket.on('join', function () {
    console.log("Client join");
    clients.push(socket);
  });

  socket.on('disconnect', function() {
    for (var i = 0; i < clients.length; i++) {
        if (clients[i] === socket)
          break;
      }
      clients.splice(i, 1);
      console.log("Client leave");
  });
});

async function exec_cmd(cmd) {
  await exec(cmd).then(((state) => {
    console.log(state.stdout);
    return state.stdout;
  })).catch((error) => {
    console.log('stderr:', error);
  });;
}

server.listen(3000);
console.log('Web Monitor running at http://localhost:3000/');