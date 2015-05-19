DOMAINS_FILE_DATE=20131210

while :;
do
	kill	`ps awx | grep node | grep axfr | cut -d' ' -f2`
	sleep 2
	bin/start-server data/domains-$DOMAINS_FILE_DATE.json 2>&1 | tee -a log.txt
	sleep 2
done
