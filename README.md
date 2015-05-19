Zonebot
=======

Consumes a zone file and becomes a "domain registered?" REST service for said data.

We (the .CO TLD) produced this because we have a commercial with Go Daddy in
the 2013 Super Bowl and as you can imagine that leads to a lot of traffic to
our servers. This is one of those cases where optimization makes sense and we
need to check domain availability as quickly as possible.

Install
-------

```shell
$ git clone https://github.com/dotco/zonebot.git
$ cd zonebot
$ npm install
$ mkdir data
$ scp user@host:my-zone-file data/axfr.txt
$ bin/axfr-txt-to-json data/axfr.txt data/axfr.json
$ bin/start-server data/axfr.json

Todo
----

- Better performance measurement/statistics
- Watch input file for changes and then reload data
- Switch to fs.readFileSync(fn).split('\n').forEach rather than JSON

Performance
-----------

We wrote this to be highly performant. With a 16 CPU system with 16GB of RAM we are able to push 400+ hits per second
from across the country with an average response time of 133ms. I'd like to decrease the response time but I think some
network issues may be involved. In any case, this is fast enough for us.

Performance
-----------

We wrote this to be highly performant. With a 16 CPU system with 16GB of RAM we are able to push 400+ hits per second
from across the country with an average response time of 133ms. I'd like to decrease the response time but I think some
network issues may be involved. In any case, this is fast enough for us.

Performance
-----------

We wrote this to be highly performant. With a 16 CPU system with 16GB of RAM we are able to push 400+ hits per second
from across the country with an average response time of 133ms. I'd like to decrease the response time but I think some
network issues may be involved. In any case, this is fast enough for us.

Performance
-----------

We wrote this to be highly performant. With a 16 CPU system with 16GB of RAM we are able to push 400+ hits per second
from across the country with an average response time of 133ms. I'd like to decrease the response time but I think some
network issues may be involved. In any case, this is fast enough for us.

Performance
-----------

We wrote this to be highly performant. With a 16 CPU system with 16GB of RAM we are able to push 400+ hits per second
from across the country with an average response time of 133ms. I'd like to decrease the response time but I think some
network issues may be involved. In any case, this is fast enough for us.

Performance
-----------

We wrote this to be highly performant. With a 16 CPU system with 16GB of RAM we are able to push 400+ hits per second
from across the country with an average response time of 133ms. I'd like to decrease the response time but I think some
network issues may be involved. In any case, this is fast enough for us.

Requirements
------------

Recent node.js (we're using 0.8 in testing, but 0.6 seems to work as well)

License
------

(C) Copyright 2013 Domain Marketing Ventures <tom@go.co>

MIT license
