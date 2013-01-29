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

Requirements
------------

Recent node.js

License
------

(C) Copyright 2013 Thomas Lackner <tom@go.co>

MIT license


