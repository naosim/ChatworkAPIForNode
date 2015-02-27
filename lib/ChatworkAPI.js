/*
 Chatwork API Document: http://developer.chatwork.com/ja/endpoints.html
*/
var core = require('./ChatworkRequestCore.js');
var ChatworkAPI = function(token) {
  return {
    My: function() {
      return {
        status: function(callback) {
          return core.get(token, "/my/status", "", callback);
        },
        tasks: function(opts, callback) {
          var body, params;
          params = [];
          if (opts.assignedBy != null) {
            params.push("assigned_by_account_id=" + opts.assignedBy);
          }
          if (opts.status != null) {
            params.push("status=" + opts.status);
          }
          body = params.join('&');
          return core.get(token, "/my/tasks", body, callback);
        }
      };
    },

    Room: function(roomId) {
      var baseUrl = "/rooms/" + roomId;
      return {
        Messages: function() {
          return {
            create: function(text, callback) {
              var body = "body=" + text;
              return core.post(token, "" + baseUrl + "/messages", body, callback);
            }
          };
        }
      };
    },
    // send short cut
    sendToRoom: function(roomId, msgBody, callback) {
      this.Room(roomId).Messages().create(msgBody, callback);
    }
  };
};

module.exports = ChatworkAPI;
