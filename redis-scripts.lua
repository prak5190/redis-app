-- redis-cli  --eval redis-scripts.lua
-- Some redis commands in lua

local log = function(s)
   redis.log(redis.LOG_WARNING, s)
end
-- get set
redis.call('set','fib1','asd')
local l = redis.call('get','fib1')
redis.log(redis.LOG_WARNING, l)


-- Lets do some list stuff
redis.call('lpush','as','ddd')
local r = redis.call('lrange','as',0, -1)
log(r)



