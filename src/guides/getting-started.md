---
title: Getting Started with Perk
date: 2016-02-09
layout: tutorial.html
---

Perk is glue that holds together a collection of powerful and full featured libraries that are written by some awesome developers. Those libraries include:

* [Passport](http://passportjs.org/)
* [Express](http://expressjs.com/)
* [React](https://facebook.github.io/react/)
* [Knex](http://knexjs.org/)


If you're already familiar with one or more of these libraries a lot of this should look familiar. If not, this guide will help you get started.

### Installing Perk

1. `npm install -g knex perk-cli`
1. `mkdir myProject`
1. `perk myProject`

### Starting Your App

1. `npm start`

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