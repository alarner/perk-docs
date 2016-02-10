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

Perk has a robust configuration system that allows you to specify default config information, environment specific overrides as well as local machine specific overrides. This is useful for configuring database connection information, OAuth API keys, session information and more. The first time you start a Perk app it will ask you to specify some information about your app.

1. `npm start`