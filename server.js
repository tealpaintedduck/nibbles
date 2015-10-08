var express = require('express');
var app = express();
var server = require('http').createServer(app);

app.use(express.static('public'));

app.get('/', function(request, response){
  response.sendfile('/index.html')
});

server.listen(process.env.PORT || 3000, function() {
  console.log("Server listening on port 3000")
});

module.exports = server