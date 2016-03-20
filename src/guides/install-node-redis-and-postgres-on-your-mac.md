---
title: Installing Node, Redis and PostgreSQL on your Mac
description: A quick guide describing how to install Node, Redis and PostgreSQL on OS X.
date: 2016-03-18
layout: topic.html
order: 020
---

> If you already have these installed, you can skip this step.

Once you have [homebrew installed](/guides/installing-homebrew-on-your-mac.html) you can install node and redis very easily. If you're planning on building a database driven app you will want to install a database as well. We recommend Postgres. To install these three just type the following command into your terminal:

`brew install node redis postgres`

> postgres is optional and you can leave it out.

If you don't want to have to manually start the redis and postgres servers each time your computer restarts you should be sure to run the commands that start with `launchctl load ...`. They will be displayed in your terminal after brew is finished installing and will probably look like this:

```
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist
```