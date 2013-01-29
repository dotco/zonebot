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
```

Requirements
------------

Recent node.js (we're using 0.8 in testing, but 0.6 seems to work as well)

License
------

(C) Copyright 2013 Domain Marketing Ventures <tom@go.co>

MIT license
