// Require annyang
const annyang = require('annyang');
var socket = require('socket.io-client')('http://localhost:3000');

var commands = {'*i': function() {console.log("実行")}};

if (annyang) {
  annyang.addCommands(commands);
  annyang.setLanguage('ja');
  annyang.start();
  console.log('録音開始');
  annyang.addCallback('resultMatch', function(userSaid) {
    console.log('録音: ' + userSaid);
    socket.emit('chat message', userSaid);
  });
};

socket.on('chat message', function(msg){
  console.log('返信: ' + msg);
  say(msg);
});

function say(msg, callback) {
  console.log('発話: ' + msg);
  document.getElementById('caption').textContent = msg;
  annyang.abort();
  console.log('録音停止');

  function voiceErrorCallback() {
      console.log("発話エラー");
      annyang.start();
      console.log('録音再開');
  }

  function voiceEndCallback() {
      console.log('Resume annyang');
  }

  responsiveVoice.speak(msg, 'Japanese Female');
    annyang.start();
    console.log('録音再開');
  };
