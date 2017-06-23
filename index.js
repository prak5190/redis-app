const express = require('express')
const app = express()

// include modules
const socketio = require('socket.io');
const cors = require('cors');
const compression = require('compression');
const cluster = require('cluster');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const ejs = require('ejs');
const multer = require('multer');
// create app, server, sockets
const methodOverride = require('method-override');
const errorhandler = require('errorhandler');

app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/public/favicon.ico'));
app.use(cookieParser("iei122ei12!@&#*(!@#ansdajsdnajs213"));

app.set('views', './views')
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
app.use(logger('dev'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(compression());
var upload = multer({ dest: './uploads' });

// configure enviroments
if ('development' == app.get('env')) {
  app.use(errorhandler({ dumpExceptions: true, showStack: true }));
} else if ('production' == app.get('env')) {
  app.use(errorhandler());
};

//Enable CORS on all routes
app.use(cors());
// restful api routes
require('./app/routes')(app);
// include modules
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})
