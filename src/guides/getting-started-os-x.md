---
title: Getting started with Perk on OS X
description: Get Perk up and running on your OS X machine.
date: 2016-02-09
layout: topic.html
---

Perk is glue that holds together a collection of powerful and full featured JavaScript libraries that are written by some awesome developers. Those libraries include:

* [Passport](http://passportjs.org/)
* [Express](http://expressjs.com/)
* [Redis](http://redis.io/)
* [Knex](http://knexjs.org/)


If you're already familiar with one or more of these libraries a lot of this should look familiar. If not, this guide will help you get started on OS X.

### Installing Homebrew

> If you already have homebrew installed you can skip this step.

Before we can start writing code we need to install a few other things that Perk depends on. Those things are **node** and **redis**. The easiest way to do this on OS X is by using **homebrew**. Sorry for all the names! I wish I could say is gets better, but it doesn't.

There are instructions for how to [install Homebrew here](http://brew.sh/). Basically you just need to open up your terminal and copy and paste the command under the big **Install Homebrew** heading. Once you're done installing homebrew, meet us back here. We'll be waiting.

> Normally you don't want to paste random commands from the internet into your terminal because bad people can do bad things, but homebrew is very trusted in the development community and you can see exactly what the script does [here](https://github.com/Homebrew/homebrew/blob/master/share/doc/homebrew/Installation.md#installation).

### Installing node, redis, etc.

> If you already have these installed, you can skip this step.

Great! Now we can install node and redis very easily. If you're planning on building a database driven app you will want to install a database as well. We recommend Postgres. To install these three just type the following command into your terminal:

`brew install node redis postgres`

> postgres is optional and you can leave it out.

If you don't want to have to manually start the redis and postgres servers each time your computer restarts you should be sure to run the commands that start with `launchctl load ...`. They will be displayed in your terminal after brew is finished installing and will probably look like this:

```
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist
```

### Installing Perk

1. `npm install -g knex perk-cli`
1. `mkdir myProject`
1. `perk myProject`

### Starting Your App

1. `npm run serve`

Perk has a robust configuration system that allows you to specify default config information, environment specific overrides as well as local machine specific overrides. This is useful for configuring database connection information, OAuth API keys, session information and more. The first time you start a Perk app it will ask you to specify some information about your app.

The bare minimum information that you will need to fill out when your app first starts is the database connection info as well as a secret key to encrypt your sessions. You can learn about all the different configuration options in the [configuration](/docs/configuration.html) documentation.

You can use the arrow keys / enter key to navigate the configuration interface. Once you are done type `crtl + s` to save and continue.

![config screenshot](/assets/images/guides/getting-started/config-template.jpg)

After saving your app should be up and running! Go to [http://localhost:3000](http://localhost:3000) to check it out.

### What's next?

There are a bunch of other great [guides](/guides) on topics like:

* [Building your first API](/guides/building-your-first-api.html)
* [User authentication with Facebook](/guides/user-auth-with-facebook.html)
* [Database migrations with Knex](/guides/database-migrations-with-knex.html)
* and many more...