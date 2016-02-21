---
title: howhap-middleware requires an express session.
date: 2016-02-20
layout: error.html
---

[howhap-middleware](https://github.com/alarner/howhap-middleware) is a library that makes it easier to display errors from the server to the client. This library relies on teh fact that there is an express session available on your request objects. This error commonly pops up if your session configuration is incorrect or your redis server is not running.

### To fix

Try running `redis-cli` on on the command line. If you get an error that looks something like:

```
Could not connect to Redis at 127.0.0.1:6379: Connection refused
```

then you need to start your redis server.