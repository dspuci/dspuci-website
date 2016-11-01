var express = require('express');
var port = process.env.PORT || 5000;
var server = express();
 
server.use(express.static('public'));

server.get('/', function(request, response) {
    response.sendfile(__dirname + '/public/index.html');
}).listen(port, function () {
  console.log('Server listening on: ' + port);
  console.log('Please go to http://localhost:' + port);
});
