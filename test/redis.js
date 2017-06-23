var assert = require('assert');
var redis = require('redis');

var bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

describe('redis connection tests', function() {
  it("Should connect", function(done) {
    var client = redis.createClient();
    client.on("connect", function () {
      done();
    });
  });
});








