# sh bin/fetch-axfr-from-srsconsumer.sh
node bin/domains-dump-to-json.js < data/axfr.txt > data/domains-`date +%Y%m%d`.json
