// The redis entrypoint - you can include other files as required
var redis = require('redis');
var bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

/**
This has the hashing function, the sort funcs and the key names
*/
const RedisUtil = {
  getClient: () => {
    var client = redis.createClient();
    return client;
  },
  // Map of table names to their key prefix
  tableNames: {
    "users": "info:users:"
  },
  createUser: (client, username, password, details) => {
    console.log(this.tableNames.users);
    var key = this.tableNames.users + username;
    // Check if key exists
    if (this.hasKey(key)) {
      return Promise(false);
    } else {
      return client.hsetAsync(key, "password", password, "details", details);
    }
  },
  saveRandom: (client, str) => {
    return client.lpushAsync("somelist", str);
  },
  getAllRandom: (client) => {
    return client.lrangeAsync("somelist", 0, -1);
  }
};

module.exports = RedisUtil;
