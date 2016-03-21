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
1. [Interactive CLI configuration](#cli-configuration)
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

## CLI configuration

Perk has a command line configuration tool specifically designed to help you build and manage local machine overrides. The first time you run `npm run dev` you will encounter this tool. It will ask you to fill in some information about your machine so that Perk can automatically do some configuration for you. The information that you enter will be automatically saved in `/config/local.js`. The tool will look like this...

![config template](/assets/images/guides/getting-started/config-template.jpg)

You have the power to modify what information the CLI configuration tool asks for. Imagine you add Twilio as a dependency to your app. It's bad practice to check API keys into your repository (especially if it's public) so you don't want to check in your Twilio API key. Instead, you can prompt other developers who wish to run your app for their Twilio API key the first time the run `npm run dev`. You do this by modifying the `/config/local.template.js`.

```js
module.exports = {
	database: {
		client: '[string] The type of database to use (pg, mysql, mariasql, ...)',
		connection: {
			host: '[string] The database host',
			user: '[string] The database user',
			password: '[string] The database user\'s password',
			database: '[string] The database name'
		}
	},
	session: {
		secret: '[string] The secret key to use for encrypting sessions'
	},
	twilio: {
		key: '[string] Twilio API key'
	}
};
```

This file is simply a JSON structure that describes the fields that you wish to fill when starting your app for the first time. Each property value in the JSON structure desribes the type of data that you expect (string, number, boolean, json) and a description of the information you wish to collect. After adding the `twilio` section new developers will be prompted for that information. There's more detailed documentation on the [config templating tool](https://github.com/alarner/config-template) available.

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

#### client

> type: string

> default: 'pg'

The client parameter is required and determines which client adapter will be used with the library. Options are `pg`, `sqlite3`, `mysql`, `mysql2`, `mariasql`, `strong-oracle`, `oracle`. You can learn more about this option by reading the [knex documentation](http://knexjs.org/).

#### connection.host

> type: string

> default: 'localhost'

The host (url, IP, etc.) where the database is being run. You can learn more about this option by reading the [knex documentation](http://knexjs.org/).

#### connection.user

> type: string

> default: 'postgres'

The database user to connect with. Running `createuser new_user_name` on the command line will create a new postgres usre for you. You can learn more about this option by reading the [knex documentation](http://knexjs.org/).

#### connection.password

> type: string

> default: ''

The database user's password to use when connecting to the database. Running `createuser -W new_password new_user_name` on the command line will create a new postgres user for you with the specified password. You can learn more about this option by reading the [knex documentation](http://knexjs.org/).

#### connection.database

> type: string

> default: 'test'

The name of the database to connect to. Running `createdb test` on the command line will create a new postgres database for you. You can learn more about this option by reading the [knex documentation](http://knexjs.org/).

#### migrations.tableName

> type: string

> default: 'migrations'

The name of the database table used to store migration history. You can learn more about this option by reading the [knex documentation](http://knexjs.org/).

#### seeds.directory

> type: string

> default: './seeds/dev'

The name of the directory where seed scripts are stored. You can learn more about this option by reading the [knex documentation](http://knexjs.org/).

### Logging

```
file:               /config/logging.js
override property:  logging
```

#### name

> type: string

> default: 'a new perk app'

The name to use when logging information or errors. You can learn more about this option by reading the [bunyan documentation](https://github.com/trentm/node-bunyan).

#### stream

> type: stream

> default: prettyStdOut

Specified the stream where errors will be logged. By default this will format errors and log them to stdout. You can learn more about this option by reading the [bunyan documentation](https://github.com/trentm/node-bunyan).

#### level

> type: string

> default: 'info'

Set the precedence of errors that should be logged. For example, if this is set to 'info', any errors that are level 'info' or greater will be logged. You can learn more about this option by reading the [bunyan documentation](https://github.com/trentm/node-bunyan).


### Session

```
file:               /config/session.js
override property:  session
```

#### secret

> type: string

> default: 'SECRET_GOES_HERE'

This is the secret used to sign the session ID cookie. This can be either a string for a single secret, or an array of multiple secrets. If an array of secrets is provided, only the first element will be used to sign the session ID cookie, while all the elements will be considered when verifying the signature in requests. You can learn more about this option by reading the [express-session documentation](https://github.com/expressjs/session).

#### resave

> type: boolean

> default: false

Forces the session to be saved back to the session store, even if the session was never modified during the request. You can learn more about this option by reading the [express-session documentation](https://github.com/expressjs/session).

#### saveUninitialized

> type: boolean

> default: false

Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified. You can learn more about this option by reading the [express-session documentation](https://github.com/expressjs/session).

### Webserver

```
file:               /config/webserver.js
override property:  webserver
```

#### hostname

> type: string

> default: 'localhost'

Specifies the hostname for your application. This is ued by OAuth authentication to know where users should be redirected after authenticating, among other places in the codebase.

#### http.port

> type: number

> default: 3000

The port at which the unencrypted (http) application is accessible.

#### http.proxyPort

> type: number

> default: 3000

If your application is running behind a proxy server *such as nginx) this option specifies the port that the node process is running on. For example, nginx may be running on port 80 but your node process is running on port 3000. In this example the http.port would be 80 and the http.proxyPort would be 3000.

#### https.port

> type: number

> default: 434

Optional. The port at which the encrypted (https) application is accessible.

#### https.proxyPort

> type: number

> default: 3434

If your application is running behind a proxy server *such as nginx) this option specifies the port that the node process is running on. For example, nginx may be running on port 434 but your node process is running on port 3434. In this example the https.port would be 434 and the https.proxyPort would be 3434.

#### https.keyPath

> type: string

> default: undefined

The path to the SSL certificate key file. If you are running nginx in front of your web application then this should be handled by nginx instead. Perk ships with an insecure private key that you can use for development, but should not be used for production.

#### https.certPath

> type: string

> default: undefined

The path to the SSL certificate file. If you are running nginx in front of your web application then this should be handled by nginx instead. Perk ships with an insecure certificate that you can use for development, but should not be used for production.

