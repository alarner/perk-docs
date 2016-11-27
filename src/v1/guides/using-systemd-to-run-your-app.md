---
title: Using systemd to Run Your App
description: systemd allows you to ensure that your node server is always running
date: 2016-11-26
layout: topic.html
order: 500
---

Ensuring the your node app is always running is important. In the old days of node we used to use node modules like `forever` to do this, but now we have better options. systemd is an init system that's built into many different linux distributions. This guide will show you how to use systemd to restart your app if the process dies for some reason.

### Using systemd scripts

To use systemd create a new file in the `/etc/systemd/system` directory on your system called `yourapp.service`. Inside of that file you can use the following template. You should replace everything in all caps with your own values, except where it says NODE_ENV. 

```
[Service]
ExecStart=/usr/bin/node --use_strict /PATH/TO/YOUR/APP/bin/www
Restart=always
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=YOUR_APP
User=node
Group=node
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

### Starting your app with systemd

Once you've created the systemd script you can now use the `service` command to start, stop or restart your app. In these examples `yourapp` will be the name of the .service file that you created.

`service yourapp start`

`service yourapp stop`

`service yourapp restart`

Once you've run the start command your app will continue to re-boot if the process dies until you run the stop command.