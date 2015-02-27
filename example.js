var token = 'xxxxxx';// set your api token
var roomId = 0000000;// set the room where you want to send
var msgBody = 'HELLO';

var chatworkAPI = require('./lib/ChatworkAPI.js')(token);
chatworkAPI.sendToRoom(roomId, msgBody, function(err, data) {
  if(err) {
    console.error("send response: " + err);
  } else {
    console.error("send response: " + data);
  }
});
