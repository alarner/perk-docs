---
title: Errors
description: Perk errors API documentation.
date: 2016-02-27
layout: topic.html
---

## Table of Contents

1. [Overview](#overview)
1. [Defining errors](#defining-errors)
1. [res.error.add](#res-error-add-error-params-descriptor-default-)
1. [res.error.send](#res-error-send-redirect-)
1. [res.error.display](#error-display-descriptor-default-defaultvalue-)
1. [Additional information](#additional-information)

## Overview

Gracefully handling errors is an important piece of any web framework. Perk uses the [Howhap](https://github.com/alarner/howhap) library for keeping track of, and displaying errors.

## Defining errors

Perk errors are defined in the `/errors` directory. By default, Perk pre-defines a series of errors related to user authentication. You may use these default errors or customize them to better fit the needs of the app you are building. Once defined, errors can be easily returned as JSON or displayed inside of a view. Errors are defined as follows:

```js
// File: /errors/auth.js
module.exports = {
	UNKNOWN: {
		message: 'An unknown error occurred: {{ errorString }}',
		status: 500
	},
	EMAIL_EXISTS: {
		message: 'A user with the email {{ emailAddress }} has already registered.',
		status: 409
	}
	// more errors can be listed here
};
```

When defining errors, each error should have a message (handlebars template string) and http status (number) property.

## res.error.add(error[, params[, descriptor='default']])

Adds a new error to your error list. When you encounter an error in a backend route, you can easily display any of the errors that you have [defined](#defining-errors) or a new custom error.

### Params

* `error` (string or object): Defines the message template and status of the error to be added. This argument can be either a string or an object. If a string is used, the string will be parsed and the appropriate error object will be looked up within the errors directory.

* `params` (object): A series of key/value pairs that will be used when rendering the parameterized  error message.

* `descriptor` (string): A string representing what this error is related to (eg. 'email', 'password', 'firstName') so that the error can be rendered in the appropriate place and distinguished from other errors that may have been added as well. If the discriptor is omitted, it will be the string 'default'.

### Return

Returns the error list that the error was added to in order to support method chaining, eg. `res.error.add('api.NOT_FOUND').send()`

### Examples

```js
// looks for a file called /errors/auth.js and for a
// property in the file called `UNKNOWN`.
res.error.add('auth.UNKNOWN');
```

> Adding an error using a pre-defined error string

```js
res.error.add({
	message: 'An unknown error occurred: "{{ errorString }}"',
	status: 500,
	params: {
		'Could not connect to database.'
	}
});
```

> Adding an error with a plain 'ol object

```js
// looks for a file called /errors/auth.js and for a 
// property in the file called `EMAIL_EXISTS`.
//
// Passes params to the error so that when it is 
// ultimately displayed, the offending email will be 
// included in the message.
//
// Specifies that this is an 'email' related error so 
// that the error can be displayed near the email address 
// field in the form.

res.error.add(
	'auth.EMAIL_EXISTS',
	{ email: 'test@test.com' },
	'email'
);
```

> Using params to customize error messages

## res.error.send([redirect])

Send the errors as JSON or stores them in the session and redirects to the specified location.

### Params

* `redirect` (string): If the user should be redirected to another page, this argument specifies which page they should be redirected to before displaying the error.

### Return

Returns `true` if an error was sent, or `false` if there were no errors added to send.

### Examples

```js
res.error.add('api.NOT_FOUND', { model: 'Product', id: 10 });
res.error.send();
```

> Send a JSON response with error information to the client.


```js
res.error.add('auth.INVALID_CREDENTIALS');
res.error.send('/auth/login');
```

> Stores error information in the session and redirects the user to the /auth/login page where it can be displayed.

```js
res.error.add('auth.INVALID_CREDENTIALS').send('/auth/login');
```

> Uses method chaining to add and send an error in one statement.

```js
// some code that may or may not add other errors

if(username !== 'perk' || password !== 'rocks') {
	res.error.add('auth.INVALID_CREDENTIALS');
}

// Attempt to send errors
if(!res.error.send('/auth/login')) {
	// If no errors were added, redirect to the
	// dashboard page.
	res.redirect('/dashboard')
}


```

> Takes advantage of the return value to determine if errors were sent.

## error.display([descriptor='default'[, defaultValue='']])

Renders an error for display within a view.

### Params

* `descriptor` (string): Describes which error in the list of errors that were added, to display. Defaults to the string 'default'.

* `defaultValue` (string): If no error with the provided descriptor was found, the defaultValue determines what should be returned.

### Return

Returns a string representation of the error specified by the descriptor. If no error with the specified descriptor was found, the defaultValue is returned.

### Examples

```html
<form action="/auth/login" method="post">
	<div>
		<%= error.display('email') %>
		<input type="email">
	</div>
	<div>
		<%= error.display('password') %>
		<input type="password">
	</div>
	<button>Log in</button>
</form>
```

> Displays any errors in the last session inside of an ejs view.

## Additional information

Perk uses the 