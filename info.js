const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function execCmd(cmd, callback, type) {
  await exec(cmd).then(((state) => {
    callback(type, state.stdout);
    return state.stdout;
  })).catch((error) => {
    callback(type, error.stderr, 'error');
  });;
}

(function() {
  // Host
  module.exports.host = function(callback, type) {
    execCmd("uname -a", callback, type);
  }

  //Hostname
  module.exports.hostname = function(callback, type) {
    execCmd("hostname -f", callback, type);
  }

  // Date
  module.exports.date = function(callback, type) {
    execCmd("date +'%d %b %Y %T %Z'", callback, type);
  }

  // Uptime
  module.exports.uptime = function(callback, type) {
    execCmd("cat /proc/uptime", callback, type);
  }

  //Data receive
  module.exports.dataR = function(callback, type, interface) {
    execCmd("ifconfig " + interface + " | grep 'RX bytes'| cut -d: -f2 | cut -d' ' -f1", callback, type);
  }

  //Data send
  module.exports.dataS = function(callback, type, interface) {
    execCmd("ifconfig " + interface + " | grep 'TX bytes'| cut -d: -f3 | cut -d' ' -f1", callback, type);
  }

  //CPU name
  module.exports.CPUName = function(callback, type) {
    execCmd("cat /proc/cpuinfo | grep 'model name' | head -n1", callback, type);
  }

  //CPU temp
  module.exports.CPUTemp = function(callback, type) {
    execCmd("tail /sys/class/thermal/thermal_zone0/temp", callback, type);
  }

  //CPU freq
  module.exports.CPUfreq = function(callback, type) {
    execCmd("cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_cur_freq", callback, type);
  }

  //Load avg
  module.exports.loadAvg = function(callback, type) {
    execCmd("cat /proc/loadavg", callback, type);
  }

  //Disk info
  module.exports.disk = function(callback, type) {
    execCmd("df -T -l -BKB -x tmpfs -x devtmpfs -x rootfs", callback, type);
  }

  //List Services
  module.exports.listServices = function(callback, type) {
    execCmd("service --status-all", callback, type);
  }

  //List process
  module.exports.listProcess = function(callback, type) {
    execCmd("ps -eH -o user,pid,%cpu,%mem,start,etime,args --sort pid", callback, type)
  }
}());