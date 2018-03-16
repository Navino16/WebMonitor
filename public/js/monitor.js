  var socket = io.connect();
  socket.emit("join");

  socket.once("connect", function () {
    socket.on("updateHost", function(data) {
      console.log("Host : " + data);
    });
    socket.on("updateDate", function(data) {
      console.log("Date : " + data);
    });
    socket.on("updateHostname", function (data) {
      console.log("Hostname : " + data);
    });
    socket.on("updateUptime", function(data) {
      console.log("Uptime : " + data);
    });
    socket.on("updateDataR", function(data) {
      console.log("Data Receive : " + data);
    });
    socket.on("updateDataS", function(data) {
      console.log("Data send : " + data);
    });
    socket.on("updateCPUName", function(data) {
      console.log("CPU name : " + data);
    });
    socket.on("updateCPUTemp", function(data) {
      console.log("CPU temp : " + data);
    });
    socket.on("updateCPUTfreq", function(data) {
      console.log("CPU freq : " + data);
    });
    socket.on("updateLoadAvg", function(data) {
      console.log("Load avg : " + data);
    });
    socket.on("updateDisk", function(data) {
      console.log("Disk : " + data);
    });
    socket.on("updateListServices", function(data) {
      console.log("Services : " + data);
    });
    socket.on("updateListProcess", function(data) {
      console.log("Process : " + data);
    });
  });

  socket.on("reconnect", function () {
    socket.emit("join");
  })