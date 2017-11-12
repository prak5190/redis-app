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
const fs = require('fs');

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

var port = 8080;
// Get file paths from react build
// configure enviroments
if ('development' == app.get('env')) {
  app.use(errorhandler({ dumpExceptions: true, showStack: true }));
} else if ('production' == app.get('env')) {
  app.use(errorhandler());
};

//Enable CORS on all routes
app.use(cors());
// a middleware with no mount path; gets executed for every request to the app
app.use(function(req, res, next) {
  res.setHeader('Cache-Control', 'public, max-age=0');
  res.setHeader("Last-Modified", new Date(Date.now()).toUTCString());
  next();
});
// restful api routes
require('./app/routes')(app);
app.use('/rbuild/',express.static(__dirname + '/public/build'));

const js = fs.readdirSync("./public/build/static/js").filter((x) => /main.*\.js$/.test(x))[0];  // Get first js file
const css = fs.readdirSync("./public/build/static/css").filter((x) => /main.*\.css$/.test(x))[0];

// include modules
app.get('/', function (req, res) {
  res.render('index', { js, css });
})

app.listen(port, function () {
  console.log('Example app listening on port '+ port)
})
