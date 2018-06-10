#!/bin/bash
#Cleanup file for Sauron on safe exit

sed -n 1,$(awk '/Dynamically appended redirects/{print NR}' server.js)p server.js
