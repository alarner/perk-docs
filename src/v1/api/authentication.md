---
title: Authentication
description: Perk authentication API documentation.
date: 2016-02-15
layout: topic.html
---

## Table of Contents

1. [Overview](#overview)
1. [Email / Password Authentication](#email-password-authentication)
	* [Registering](#registering-with-a-password)
	* [Logging In](#logging-in-with-a-password)
	* [Password Reset](#password-reset)
1. [OAuth](#oauth)
	* [Obtaining API Keys](#obtaining-api-keys)
	* [Registering and Logging In](#registering-and-logging-in)
1. [Logging Out](#logging-out)
1. [Accessing the Logged in User](#accessing-the-logged-in-user)
1. [Configuration](#configuration)


## Overview

Authentication is something that many web application need, but it's time consuming and tedious to roll your own. Perk has a flexible authentication system built on top of [Passport](http://passportjs.org/). Perk adds a think layer on top of Passport that makes authentication easier to configure and more consistent across authentication providers.

Perk also has a flexible authentication model that allows one user to authenticate in multiple ways. For example, a single use could use both a email / password and Facebook OAuth to log in to the same account.

## Email / Password Authentication

Most web applications provide some form of password based authentication. Perk's built in email / password authentication uses an email address and password to authenticate users. All passwords are hashed using the [bcrypt](https://github.com/ncb000gt/node.bcrypt.js) module before they are stored in the database.

Perk supports password based authentication out of the box.

### Registering with a Password

There are two methods for registering a user using an email and password. You may use a traditional web-based form or hit a RESTful JSON API.

#### via Web-based Form

To register a user using this method simply redirect users to `/auth/register` where they will be prompted to fill in their name, email address and password.

You can style this registration page by modifying the view file in `/views/auth/register.html`

#### via RESTful API

The second method of registering uses a built-in RESTful API endpoint. This is particularly useful for single page applications (SPAs) that make use of front-end JavaScript and AJAX. With this method you still make a POST request to `/auth/register` but use AJAX instead.

```js
fetch('/auth/register', {
	method: 'POST', 
	headers: new Headers({
		'Content-Type': 'application/json'
	})
}).then(function(response) {
	// Convert response to JSON
	return response.json();
}).then(function(user) {
	// `user` is the newly registered user
	console.log('Success!', user); 
}).catch(function(err) {
	// `err` is an error returned from the server
	console.log('There was a problem', err);
});
```

The server knows to respond back with JSON in this scenario because the *Content-Type* specifies a JSON response.

### Logging in with a Password

Logging in is handled very similarly to registering. There are two methods, a traditional web based form and RESTful API.

#### via Web-based Form

To log in using this method simply redirect users to `/auth/login` where they will be prompted to fill in their email address and password.

You can style this log in page by modifying the view file in `/views/auth/login.html`

#### via RESTful API

The second method of logging in uses a built-in RESTful API endpoint. This is particularly useful for single page applications (SPAs) that make use of front-end JavaScript and AJAX. With this method you still make a POST request to `/auth/login` but use AJAX instead.

```js
fetch('/auth/login', {
	method: 'POST', 
	headers: new Headers({
		'Content-Type': 'application/json'
	})
}).then(function(response) {
	// Convert response to JSON
	return response.json();
}).then(function(user) {
	// `user` is the logged in user
	console.log('Success!', user); 
}).catch(function(err) {
	// `err` is an error returned from the server
	console.log('There was a problem', err);
});
```

The server knows to respond back with JSON in this scenario because the *Content-Type* specifies a JSON response.

### Password Reset

Password reset functionality is not yet implemented, but is [on the roadmap](https://github.com/alarner/perk/issues/5) and will be arriving shortly.

## OAuth

In addition to traditional password based authentication, Perk also supports OAuth with a handful of popular OAuth providers. Perk adds a thin layer of abstraction on top of [Passport](http://passportjs.org/) to standardize the configuration and responses.

### Obtaining API Keys

Each provider has a different set of steps that developers must take to obtain client id / client secret information. You can refer to our guide on [user authentication with Facebook](/v1/guides/user-auth-with-facebook.html) for Facebook specific instructions or look up provider specific instructions for [Google](https://developers.google.com/identity/protocols/OAuth2#basicsteps) and [Trello](https://trello.com/app-key).

### Registering and Logging In

After obtaining your client id and client secret you need only add these strings to your `/config/auth.js` file in order to enable OAuth for that provider. To allow a user to register with that provider simply redirect them to `/auth/:provider/login`.

The API endpoint is the same for both login and register. If a user has not previously authenticated they will be registered, otherwise the will be logged in to their existing account.

## Logging Out

Logging out is the same for all users, and will destroy their server based session.

> Logging out will not log users out of the provider that they used to authenticate with (eg. Facebook).

To log out you can either redirect users to `/auth/logout` or make a GET or POST request to `/auth/logout`. For example:

```html
<a href="/auth/logout">Log out</a>
```

or

```js
fetch('/auth/login', {
	method: 'POST', 
	headers: new Headers({
		'Content-Type': 'application/json'
	})
}).then(function(response) {
	// Convert response to JSON
	return response.json();
}).then(function(response) {
	// `user` is now logged out
	console.log('The user is logged out'); 
}).catch(function(err) {
	// `err` is an error returned from the server
	console.log('There was a problem', err);
});
```

## Accessing the Logged in User

It is often useful to be able to access the logged in user on the server. This can be done by using the `req.user` property on your server requests (within your routes or middleware).

For example, to check if a user is logged in you could use the following code:

```js
/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.user) {
		// The user is logged in.
		// Redirect them to their dashboard
		res.redirect('/dashboard');
	}
	else {
		// Render the home page
		res.render('index');
	}
});
```

There is built in middleware that you can use to lock down any of your routes to only logged in users. It will appropriately respond with a 403 JSON response if the request is expecting a JSON response, otherwise it will redirect the user to the login page. This middleware is located in `/lib/middleware/logged-in.js` and can be used like so:

```js
let isLoggedIn = require('../lib/middleware/logged-in');

// Add `isLoggedIn` middleware to restrict
// this page to logged in users.
router.get('/dashboard', isLoggedIn, function(req, res, next) {
	// Dashboard code goes here
});
```



## Configuration

Each authentication provider can be configured separately. Your configuration object in `/config/auth.js` should have multiple keys, one for each provider you wish to support. There is full documentation on all of the configuration options in the [authentication config](/v1/api/config.html#authentication) section of the Perk API docs.