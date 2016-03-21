---
title: Authentication
description: Perk authentication API documentation.
date: 2016-02-15
layout: topic.html
---

Authentication is something that many web application need, but it's time consuming and tedious to roll your own. Perk has a flexible authentication system based on [Passport](http://passportjs.org/).

Four authentication providers are currently supported out of the box.

1. Username / Password Authentication (local)
1. Google OAuth (google)
1. Facebook OAuth (facebook)
1. Trello OAuth (trello)

More are coming soon. You can request support for a specific provider [here](https://github.com/alarner/perk/issues/1).

Setting up authentication is a breeze. It all happens inside of your `/config/auth.js` file. Simply fill out the necessary information for the provider that you want to support. Then redirect your users to:

* **/auth/:provider/login** to authenticate via an OAuth provider
* **/auth/login** or **/auth/register** to authenticate via username and password
* **/auth/logout** to log the user out of their current session

You can also read the full guide on setting up [Facebook OAuth](/guides/user-auth-with-facebook.html).

## Configuration

Each authentication provider can be configured separately. Your configuration object in `/config/auth.js` should have multiple keys, one for each provider you wish to support. There is full documentation on all of the configuration options in the [authentication config](http://perkframework.com/api/config.html#authentication) section of the Perk API docs.