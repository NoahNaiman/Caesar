#!/bin/bash
#Cleanup file for Sauron on safe exit

echo 'Killing children processes'

while read line; do
	echo $line
	ps | awk '/'$line'/{kill $1}'
done < processes.txt

echo 'Cleaning up processes.txt'

echo '' > processes.txt

echo 'Cleaning up list.pug'

sed -n 1,8p views/list.pug > views/list.pug.tmp && mv views/list.pug.tmp views/list.pug

echo 'Cleaning up server.js'

sed -n 1,$(awk '/Dynamically appended redirects/{print NR}' server.js)p server.js > server.js.tmp && mv server.js.tmp server.js

echo 'Cleanup completed, safe exit complete'