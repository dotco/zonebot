Zonebot
=======

Consumes a zone file and becomes a "domain registered?" REST service for said data

Install
-------

```shell
$ git clone http://whatever
$ npm install
$ mkdir data
$ scp user@host:my-zone-file data/axfr.txt
$ bin/axfr-txt-to-json data/axfr.txt data/axfr.json
$ bin/start-server data/axfr.json
```

Performance
-----------

We wrote this to be highly performant. With a 16 CPU system with 16GB of RAM we are able to push 400+ hits per second
from across the country with an average response time of 133ms. I'd like to decrease the response time but I think some
network issues may be involved. In any case, this is fast enough for us.

Requirements
------------

Recent node.js

License
------

(C) Copyright 2013 Thomas Lackner <tom@go.co>

MIT license


