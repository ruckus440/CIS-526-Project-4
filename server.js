require('./src/database');
require('./src/templates');

const http = require('http');
const port = 3000;
const handleRequest = require('./src/handle-request');

//create server
var server = http.createServer(handleRequest);

server.listen(port, function(){
  console.log("Server is listening on port " + port);
});