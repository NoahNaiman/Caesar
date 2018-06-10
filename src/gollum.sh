#!/bin/bash
#Cleanup file for Sauron on safe exit

echo 'Initiating cleanup of server.js';

sed -n 1,$(awk '/Dynamically appended redirects/{print NR}'
server.js)p server.js > ../server.js;

echo 'Initiating cleanup of list.pug';

sed -n 1,8p views/list.pug > views/list.pug;

read -p 'Would you like to delete anything in uploads? [y/n] ' cleanUploads

if [$(echo "$cleanUploads" |tr [:upper:] [:lower:]) = 'y'] || [$(echo "$cleanUploads" | tr [:upper:] [:lower:]) = 'yes'];
then
	rm -rf uploads/*
fi

echo 'Cleanup complete.';
