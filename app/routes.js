var querystring = require('querystring')
, ejs = require('ejs')
, redis = require('./redis');
const geoip = require('node-freegeoip');

module.exports = function(app) {
  var client = redis.getClient();
  app.post("/save", function(req, res, next) {
    var name = req.body.name;
    if (name) {
      redis.saveRandom(client, name).then(function() {
	res.end("Success");
      });
    } else {
      res.end(500, "failed");
    }
    next();
  });

  app.get("/getall", function(req, res, next) {
    redis.getAllRandom(client).then(function(r) {
      res.json(r);
      next();
    })
  });

  app.get("/remove", function(req, res, next) {
    var val = req.query.val;
    console.log(val);
    redis.delRandom(client, val).then(function(r) {
      res.json(r);
      next();
    })
  });

  app.get("/location", function(req, res, next) {
    const ip = req.ip;
    const geo = geoip.lookup(ip);
    next();
  });
};










