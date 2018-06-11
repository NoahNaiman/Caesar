#!/bin/bash
#Cleanup file for Sauron on safe exit

echo 'Cleaning up server.js'

sed -n 1,$(awk '/Dynamically appended redirects/{print NR}' server.js)p server.js > server.js.tmp && mv server.js.tmp server.js

echo 'Cleaning up processes.txt'

echo '' > src/processes.txt

echo 'Cleaning up list.pug'

sed -n 1,8p views/list.pug > views/list.pug.tmp && mv views/list.pug.tmp views/list.pug

read -p 'Would you like to delete anything in uploads? [y/n] ' cleanUploads

if [ "$cleanUploads" = "y" ]; then
	`rm -rf uploads/*`
fi

echo 'Cleanup complete, safely exited.'
