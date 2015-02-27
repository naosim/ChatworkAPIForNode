var https = require('https');
var get = function(token, path, body, callback) { return request(token, "GET", path, body, callback); };
var post = function(token, path, body, callback) { return request(token, "POST", path, body, callback); };
var put = function(token, path, body, callback) { return request(token, "PUT", path, body, callback); };

var request = function(token, method, path, body, callback) {
  var headers, options, request;
  headers = {
    "Host": 'api.chatwork.com',
    "X-ChatWorkToken": token
  };
  options = {
    "agent": false,
    "host": 'api.chatwork.com',
    "port": 443,
    "path": "/v1" + path,
    "method": method,
    "headers": headers
  };
  body = new Buffer(body);
  options.headers["Content-Length"] = body.length;
  options.headers["Content-Type"] = "application/x-www-form-urlencoded";
  request = https.request(options, function(response) {
    var data;
    data = "";
    response.on("data", function(chunk) { return data += chunk; });
    response.on("end", function() {
      var e, json;
      if (response.statusCode >= 400) {
        switch (response.statusCode) {
        case 401:
          throw new Error("Invalid access token provided");
        default:
          console.error("Chatwork HTTPS status code: " + response.statusCode);
          console.error("Chatwork HTTPS response data: " + data);
        }
      }
      if (callback) {
        json = (function() {
          try {
            return JSON.parse(data);
          } catch (_error) {
            e = _error;
            return data || {};
          }
        })();
        return callback(null, json);
      }
    });
    return response.on("error", function(err) {
      console.error("Chatwork HTTPS response error: " + err);
      return callback(err, {});
    });
  });
  request.end(body, 'binary');
  return request.on("error", function(err) {
    return console.error("Chatwork request error: " + err);
  });
};

module.exports = {
  get: get,
  post: post,
  put: put
};
