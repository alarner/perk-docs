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

You can also read the full guide on setting up [Facebook OAuth](/guides/user-auth-with-facebook.html).

## Configuration

Each authentication provider can be configured separately. Your configuration object in `/config/auth.js` should have multiple keys, one for each provider you wish to support. The options for each provider are detailed below:

### Username / Password Options

#### saltRounds [integer]

The number of rounds used to encrypt a given hashed password.

#### registerRedirect [url string]

The url where the user should be redirected after successfully registering.

#### loginRedirect [url string]

The url where the user should be redirected after successfully logging in.

### OAuth Options

#### clientID [string]

Register API credentials with your provider and they will provide a client id string.

*When using trello this option is called consumerKey instead*.

#### clientSecret [string]

Register API credentials with your provider and they will provide a client secret string.

*When using trello this option is called consumerSecret instead*.

#### scope [array of strings]

An array of permissions that you request the end user to grant to you. This list will differ depending on the provider. Here are some resources to look up those scopes:

* Google
	* [https://developers.google.com/gmail/api/auth/scopes](https://developers.google.com/gmail/api/auth/scopes)
	* [https://developers.google.com/+/web/api/rest/oauth?hl=en](https://developers.google.com/+/web/api/rest/oauth?hl=en)
	* [https://developers.google.com/google-apps/calendar/auth](https://developers.google.com/google-apps/calendar/auth)
* Facebook
	* [https://developers.facebook.com/docs/facebook-login/permissions](https://developers.facebook.com/docs/facebook-login/permissions)
* Trello
	* [https://developers.trello.com/authorize](https://developers.trello.com/authorize)

#### requireEmail [boolean]

Boolean denoting if a user should be required to provide an email address. If this option is set to true and the provider does not share the users email address, they will be forced to enter it manually before completing thier registration. The form that prompts for their email address is located in `/views/auth/email.ejs`.

#### redirect [url string]

The url where the user should be redirected after successfully authenticating with the provider.