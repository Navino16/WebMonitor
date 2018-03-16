const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const info = require('./info');

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
    init();
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

function init() {
  info.host(cmdCallback, "updateHost");
  info.date(cmdCallback, "updateDate");
  info.hostname(cmdCallback, "updateHostname");
  info.uptime(cmdCallback, "updateUptime")
  info.dataR(cmdCallback, "updateDataR", "wlo1");
  info.dataS(cmdCallback, "updateDataS", "wlo1");
  info.CPUName(cmdCallback, "updateCPUName");
  info.CPUTemp(cmdCallback, "updateCPUTemp");
  info.CPUfreq(cmdCallback, "updateCPUTfreq");
  info.loadAvg(cmdCallback, "updateLoadAvg");
  info.disk(cmdCallback, "updateDisk");
  info.listServices(cmdCallback, "updateListServices");
  info.listProcess(cmdCallback, "updateListProcess");
}

const cmdCallback = function(type, data, err) {
  if (err) {
      console.log(data);
      return;
    }
  for (var i = 0; i < clients.length; i++) {
    clients[i].emit(type, data);
  }
};

server.listen(3000);
console.log('Web Monitor running at http://localhost:3000/');