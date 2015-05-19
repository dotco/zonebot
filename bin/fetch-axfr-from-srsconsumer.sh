#!/bin/sh
DIR=$( cd "$( dirname "$0" )" && pwd )
scp srsconsumer@gorilla.go.co:srsdata/co-axfr.txt $DIR/../data/axfr.txt
