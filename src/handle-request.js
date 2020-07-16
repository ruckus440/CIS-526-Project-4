const serveStandards = require('./serve-standards');
const fs = require('fs');
const path = require('path');
const serveFile = require('./serve-file');
const listDirectory = require('./list-directory.js');

/** @function handleRequest 
 * Handles incoming requests by deciding what 
 * kind of response to send
 * @param {http.IncomingMessage} req - the request object
 * @param {http.ServerResponse} res - the response object
 */
function handleRequest(req, res) {
  if(req.method !== 'GET') return res.writeHead(501).end();
  var pathname = new URL(req.url, 'http://localhost').pathname;  
  if (req.url === "/standards" || req.url === "/standards.html") {
    serveStandards(req, res);
  }
  else {
    fs.stat(path.join("public", pathname), (err, stat) => {
      if(err) {
        res.writeHead(404);
        res.end();
        return;
      }
      if(stat.isFile()) return serveFile(req, res);
      if(stat.isDirectory()) return listDirectory(req, res);
      return res.writeHead(404).end();
    });
  }
}

module.exports = handleRequest;