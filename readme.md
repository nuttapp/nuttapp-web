Create server
------------

- Install etc keeper


- Create data dir and set perms
mkdir /data

Add ubuntu user to www-data group
```
sudo usermod -a -G www-data ubuntu
```

set correct perms on /data
```
sudo chgrp -R www-data /data
sudo chmod -R g+w /data
```

Set GID so that, so that all new files and directories created under /data are owned by the www-data group.
```
sudo chmod 2775 /data
```

install nginx
```
sudo apt-get install nginx-extras
```

configure nginx to hide it's header
```
server_tokes: off
more_set_headers 'Server: My Very Own Server ;)';
```
