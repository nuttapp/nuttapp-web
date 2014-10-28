#!/bin/sh
clear && rsync -v -c -z -r --delete --exclude .git --exclude .DS_Store --exclude node_modules --exclude bower_components . na:/data/nuttapp/nuttapp-web | grep -i -E "\w*\.[a-z]{2,4}}?"


