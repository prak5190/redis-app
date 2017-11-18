var HyperLogLog = require('./hyperloglog');
var assert = require('assert');
var hll = HyperLogLog(20);

// Insert three values, two of them distinct.
hll.add(HyperLogLog.hash("value1"));
hll.add(HyperLogLog.hash("value2"));
hll.add(HyperLogLog.hash("value1"));

var n = 100000;
for (var i = 0; i < n; i++) {
  hll.add(HyperLogLog.hash("das"+i));
}

console.log(hll.count());
