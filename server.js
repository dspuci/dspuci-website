var express = require('express');
var port = process.env.PORT || 5000;
var server = express();

server.use(express.static('public'));

server.get('/', function(request, response) {
    response.sendFile(__dirname + '/public/html/index.html');
});

server.get('/brothers', function(request, response) {
    response.sendFile(__dirname + '/public/html/brothers.html');
});

server.get('/careers', function(request, response) {
    response.sendFile(__dirname + '/public/html/careers.html');
});

server.get('/careers2014', function(request, response) {
    response.sendFile(__dirname + '/public/html/careers2014.html');
});

server.get('/careers2015', function(request, response) {
    response.sendFile(__dirname + '/public/html/careers2015.html');
});

server.get('/careers2016', function(request, response) {
    response.sendFile(__dirname + '/public/html/careers2016.html');
});

server.get('/gallery', function(request, response) {
    response.sendFile(__dirname + '/public/html/gallery.html');
});

server.get('/recruitment', function(request, response) {
    response.sendFile(__dirname + '/public/html/recruitment.html');
});

server.get('/sponsorship', function(request, response) {
    response.sendFile(__dirname + '/public/html/sponsorship.html');
});

server.get('/projects/:projectId', function(request, response) {
    response.sendFile(__dirname + '/public/html/projects/' + request.params.projectId + '.html');
});

server.listen(port, function () {
  console.log('Server listening on: ' + port);
  console.log('Please go to http://localhost:' + port);
});
