var querystring = require('querystring')
, ejs = require('ejs')
, redis = require('./redis');

module.exports = function(app) {
  var client = redis.getClient();
  app.post("/save", function(req, res) {
    var name = req.body.name;
    if (name) {
      redis.saveRandom(client, name).then(function() {
	res.end("Success");
      });
    } else {
      res.end(500, "failed");
    }
  });
  app.get("/getall", function(req, res) {
    redis.getAllRandom(client).then(function(r) {
      console.log(arguments);
      res.json(r);
    })
  });
};










