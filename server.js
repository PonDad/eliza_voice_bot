var io = require('socket.io').listen(3000);
var exec = require('child_process').exec;

io.sockets.on('connection', function(socket){
  socket.on('chat message', function(msg){
    var msg = encodeURI(msg);
    exec('curl http://192.168.0.4:1337/api?msg='+ msg, function (error, stdout, stderr) {
        if(stdout){
            console.log('stdout: ' + stdout);
            var json = JSON.parse(stdout);
            msg = json["msg"]

            io.sockets.emit('chat message', msg);
        }
        if(stderr){
            console.log('stderr: ' + stderr);
        }
        if (error !== null) {
          console.log('Exec error: ' + error);
        }
    });

  });
});
