#!/bin/sh
clear && rsync -v -c -z -r --delete --exclude .git --exclude .DS_Store . na:/data/nuttapp/nuttapp-web | grep -i -E "\w*\.[a-z]{2,4}}?"


