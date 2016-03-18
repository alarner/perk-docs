---
title: Getting started with Perk on OS X
description: Get Perk up and running on your OS X machine.
date: 2016-02-09
layout: topic.html
order: 002
---

Perk is glue that holds together a collection of powerful and full featured JavaScript libraries that are written by some awesome developers. Those libraries include:

* [Passport](http://passportjs.org/)
* [Express](http://expressjs.com/)
* [Redis](http://redis.io/)
* [Knex](http://knexjs.org/)


If you've already used one or more of these libraries a lot of this should look familiar. If not, this guide will help you get started on OS X.

For the purposes of this guide we'll assume that you already have the following software installed:

1. Node (version 5.0+)
	> How can I tell if node is installed? Type `node -v` into your terminal. It should respond with the version of node that you have installed. If it's not installed you can follow our guide to [install node on your mac](/guides/install-node-redis-and-postgres-on-your-mac.html).
1. redis
	> How can I tell if redis is installed? Type `redis-cli -v` into your terminal. It should respond with the version of redis that you have installed. If it's not installed you can follow our guide to [install redis on your mac](/guides/install-node-redis-and-postgres-on-your-mac.html).
1. PostgreSQL
	> How can I tell if postgres is installed? Type `psql -V` into your terminal. It should respond with the version of postgres that you have installed. If it's not installed you can follow our guide to [install postgres on your mac](/guides/install-node-redis-and-postgres-on-your-mac.html).

### Installing Perk

In your terminal type the following commands:

1. `npm install -g knex perk-cli`
	
	> Installs knex and the Perk command line interface

1. `perk myProject`

	> creates a new Perk project called "myProject"

1. `cd myProject && npm install`

	> installs all of the dependencies for your new project

### Starting Your App

In your terminal type `npm run dev`. This will start the perk server and 

Perk has a robust configuration system that allows you to specify default config information, environment specific overrides as well as local machine specific overrides. This is useful for configuring database connection information, OAuth API keys, session information and more. The first time you start a Perk app it will ask you to specify some information about your app.

The bare minimum information that you will need to fill out when your app first starts is the database connection info as well as a secret key to encrypt your sessions.

> If you are not building a database driven app then you can leave the database connection information blank.

You can learn about all the different configuration options in the [configuration](/docs/configuration.html) documentation.

You can use the arrow keys / enter key to navigate the configuration interface. Once you are done type `crtl + s` to save and continue.

![config screenshot](/assets/images/guides/getting-started/config-template.jpg)

After saving your app should be up and running! Go to [http://localhost:3000](http://localhost:3000) to check it out.

### What's next?

There are a bunch of other great [guides](/guides) on topics like:

<!--* [Creating a static home page](/guides/creating-a-static-home-page.html)-->
* [Building your first API](/guides/building-your-first-api.html)
* [User authentication with Facebook](/guides/user-auth-with-facebook.html)
* [Database migrations with Knex](/guides/database-migrations-with-knex.html)
* and many more...