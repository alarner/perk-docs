---
title: Config
description: Perk configuration API documentation.
date: 2016-02-15
layout: topic.html
---

## Table of Contents

1. [Overview](#overview)
1. [Local machine overrides](#local-machine-overrides)
1. [Environment overrides](#environment-overrides)
1. [Interactive CLI configuration](#environment-overrides)
1. [Full list of configuration options](#configuration-options)
	* [Authentication](#authentication)
	* [Database](#database)
	* [Logging](#logging)
	* [Session](#session)
	* [Webserver](#webserver)

## Overview

Perk has a multi-layers configuration system. Default config information is specified in files in your `/config` directory. Those files are:

1. `/config/auth.js`
1. `/config/database.js`
1. `/config/logging.js`
1. `/config/session.js`
1. `/config/webserver.js`

## Local machine overrides

The configuration system also allows you to override the default settings on specific environment or machine.

For example, if you wanted your webserver to run on port 8080 instead of port 3000 you could create a `/config/local.js` file with the following contents:

```js
module.exports = {
	webserver: {
		http: {
			port: 8080
		}
	}
};
```

If you wanted to override both the port and database name you can modify like so:

```js
module.exports = {
	webserver: {
		http: {
			port: 8080
		}
	},
	database: {
		connection: {
			password: 'notarealp@ssword'
		}
	}
};
```

For the full list of configuration options for the webserver, database and more, please review the rest of this documentation.

The `/config/local.js` file is intentionally ignored from git because it is intended to be specific to one machine and not shared.

## Environment overrides

If you wish to override the configuration for all machines that run in a specific environment, for example the `development` environment, you can create a `/config/env/development.js` file with similar contents.

When running your app on a specific environment you can start it with the following command:

```
NODE_ENV=production npm start
```

> You may replace production with any environment name you wish, provided that you have a file in the `/config/env` directory that matches that name. For example, you should already have a file in that directory specifically configured for heroku.

## Configuration options

Below you'll find a complete list of configuration options:

### Authentication

```
file:               /config/auth.js
override property:  auth
```

#### local.saltRounds

> type: integer

> default: 10

The number of rounds used to encrypt a given hashed password.

#### local.registerRedirect [string, default: '/dashboard']

> type: string

> default: '/dashboard'

The url where the user should be redirected after successfully registering.

#### local.loginRedirect

> type: string

> default: '/dashboard'

The url where the user should be redirected after successfully logging in.

#### [google|facebook].clientID

> type: string

> default: undefined

The client identifier string given by the authentication provider (Google or Facebook)

#### [google|facebook].clientSecret

> type: string

> default: undefined

The client secret string given by the authentication provider (Google or Facebook)

#### trello.consumerKey

> type: string

> default: undefined

The consumer key string given by the trello.

#### trello.consumerSecret

> type: string

> default: undefined

The consumer secret string given by trello.

#### [trello|google|facebook].scope

> type: array of strings

> default: undefined

An array representing the scope of permissions that you would like access to on the authenticating user's account. Some examples might be getting the users email, posting to their wall, creating new cards, etc.

Below you can find documentation on available scopes for each provider:

* facebook
	* [https://developers.facebook.com/docs/facebook-login/permissions](https://developers.facebook.com/docs/facebook-login/permissions)
* google
	* [https://developers.google.com/gmail/api/auth/scopes](https://developers.google.com/gmail/api/auth/scopes)
	* [https://developers.google.com/+/web/api/rest/oauth?hl=en](https://developers.google.com/+/web/api/rest/oauth?hl=en)
	* [https://developers.google.com/google-apps/calendar/auth](https://developers.google.com/google-apps/calendar/auth)
* trello
	* [https://developers.trello.com/authorize](https://developers.trello.com/authorize)

#### [trello|google|facebook].requireEmail

> type: boolean

> default: true

A boolean value representing whether or not the user should be required to provide an email. If the authentication provider refuses to provide the email automatically after a user is authorized, that user will be prompted to enter their email address manually. The view associated with this action is in `/views/auth/email`.

#### [trello|google|facebook].redirect

> type: string

> default: '/dashboard'

The url where the user should be redirected after successfully logging in or registering.

### Database

```
file:               /config/database.js
override property:  database
```

### Logging

```
file:               /config/logging.js
override property:  logging
```

### Session

```
file:               /config/session.js
override property:  session
```

### Webserver

```
file:               /config/webserver.js
override property:  webserver
```