---
title: "Knex:Error Pool2 - Error: connect ECONNREFUSED"
description: "Knex:Error Pool2 - Error: connect ECONNREFUSED"
date: 2016-05-28
layout: topic.html
order: 600
---

This error occurs when when your Perk application is unable to connect to a database. Often this means that your local database server is not running.

### To fix

If have installed PostgreSQL with homebrew you can try to restart the postgres server using the following commands:

```
launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
```

> If you get no output that likely means that the server was restarted **successfully**. If you get an error try researching that specific error.

Alternatively, you can try running postgres without launchctl using the following command:

```
postgres -D /usr/local/var/postgres
```

You should see output that looks like this:

```
LOG:  database system was shut down at 2016-05-28 12:57:11 CDT
LOG:  MultiXact member wraparound protections are now enabled
LOG:  database system is ready to accept connections
LOG:  autovacuum launcher started
```

> If you get an error try researching that specific error.

**After successfully restarting your database server, try restarting your perk app by first typing ctrl+c in the terminal window where you originally saw the error. Then type `npm run dev`.**