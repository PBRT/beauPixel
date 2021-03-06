var compression = require('compression');
var debug = require('debug')('beaupixel:server');
var http = require('http');
var express = require('express');
var favicon = require('serve-favicon');
var app = express();

app.use(compression());
app.use(favicon(__dirname + '/assets/images/favico.ico'));

if (app.get('env') === 'development') {
  app.use(express.static(__dirname+'/build'));
} else {
  app.use(express.static(__dirname+'/dist'));
}

app.get('/', function(req, res){
    res.sendfile(__dirname + '/index.html');
});
app.get('/sitemap.xml', function(req, res){
    res.sendfile('./sitemap.xml');
});

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
