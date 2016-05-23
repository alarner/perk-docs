---
title: Routing
description: Perk routing API documentation.
date: 2016-02-27
layout: topic.html
---

## Table of Contents

1. [Overview](#overview)
1. [Creating routes](#creating-routes)
	* [The simple way](#the-simple-way)
	* [The right way](#the-right-way)
1. [Routing methods](#routing-methods)
1. [Routing paths](#routing-paths)
	* [Basic paths](#basic-paths)
	* [Parameterized paths](#parameterized-paths)
1. [Overriding routes](#overriding-routes)
1. [Middleware](#middleware)
1. [Additional information](#additional-information)

## Overview

Routes allow Perk developers to easily determine which backend code should run when a specific URL is requested. Essentially each route specifies a URL pattern and a function to run if that pattern is matched. Since Perk uses express, the full documentation on routes can be found in the [express docs](http://expressjs.com/en/guide/routing.html).

## Creating routes

Routes are created on express `router` objects. The whole express app (found in the `/app.js` file) is a router object. Additionally, you can created your own router objects to break up your backend code into smaller logical pieces. Adding a route doesn't require a lot of code, but you must call one of the [routing methods](#routing-methods) on your router object. For example:

```js
myRoute.get('/about', function(req, res, next) {
	// About page code goes here
});
```

### The simple way

Since the express app itself is a `router` you can add routes directly within your `/app.js` file. There is a [section of the app.js](https://github.com/alarner/perk/blob/master/app.js#L49) file that is dedicated to setting up new routes. To add your own route you may use one of the [routing methods](#routing-methods) on the `app` object like so:

```js
app.get('/about', function(req, res, next) {
	res.send('<h1>This is the about page</h1>');
});
```

### The right way

In a large application it can be cumbersome to add every single route inside of your app.js file. The file can get very large very quickly and it can be hard to find what you're looking for to make changes or fix bugs. Instead we can create new routers and break up our routes into smaller logical pieces. To create a new route you can use the `express.Router()` method. First create a new file. By convention each new router lives in its own file inside of the `/routes` directory. Inside of that new file you can load express, create a new router and add your first route.

#### /routes/form.js
```js
// Load express
let express = require('express');

// Create a new router object
let router = express.Router();

// Now we can use router methods
router.post('/submit-form', function(req, res, next) {
	// Route specific logic goes here
});
```

One this new file has been created and set up, we're not quite done. The last step is to let our `/app.js` file that it needs to use our newly created router. To do so, update the [router section of the app.js](https://github.com/alarner/perk/blob/master/app.js#L49) to use the newly created route:

#### /app.js
```js
/*******************************/
/*                             */
/*            ROUTES           */
/*                             */
/*******************************/

/* 1. ROUTES are loaded here */

let index = require('./routes/index');
let auth = require('./routes/auth');
let form = require('./routes/form');   // <- require it

/* 2. ROUTES are added here */

app.use('/auth', auth);
app.use('/', index);
app.use('/form', form);                // <- use it
```

> Notice that when we use the route we still specify a URL pattern to match. It might seem like there are conflicting url patterns. The pattern in [/routes/form.js](#-routes-form-js) (/submit-form) does not match the pattern in [/app.js](#-app-js) (/form). Which one will win? The answer is both. The way that routing works, if one route uses another route, the URL patterns will chain. In our example the route will match the URL `/form/submit-form`.

## Routing methods

The major routing methods are:

* `router.all`
* `router.get`
* `router.post`
* `router.put`
* `router.delete`
* `router.use`

Perk uses express for backend routing, so you can refer to the [express routing documentation](http://expressjs.com/en/4x/api.html#router) for more information.

## Routing paths

Each route requires a path in order to match request. This path can be a basic string or a parameterized string. Examples of both can be found below.

### Basic paths

Basic paths require a string representation of the path that you with to match. For example:

```js
// All requests that start with /auth will trigger the
// auth function to run.
app.use('/auth', auth);

// Get requests that start with /contact will trigger
// the showContactPage function to run.
app.get('/contact', showContactPage);

// Post requests that start with /foo will trigger the
// anonymous function to run.
router.post('/foo', function(req, res, next) {
	res.send('it worked!');
});
```

### Parameterized paths

Parameterized paths allow to match routes based on a pattern. The `:` symbol is used followed by a name to signify that any requests following the specified pattern should cause the route function to run.

```js
// :userId will match any string in the url
// A get request to /user/1 will run the function
// A get request to /user/foo will run the function
// A get request to /user/8 will run the function
// A post request to /wrong/8 will *not* run the
// function
router.get('/user/:userId', function(req, res, next) {
	// The value of the parameter can be accessed via
	// the params property of the parsed request.
	res.send('The user id is '+req.params.userId);
});

router.get('/user/:username', function(req, res, next) {
	// The value of the parameter can be accessed via
	// the params property of the parsed request.
	res.send('The username is '+req.params.username);
});

router.get('/blog/:category/:slug', function(req, res, next) {
	res.send('The blog post category is '+req.params.category);
});
```

> Accessing the value of a parameter via `req.params.NAME` is a good way to look up data by an ID or some other unique identifier.

## Overriding routes

When defining your routes, order does matter. Routes that are defined first will run first. If they do not call their `next()` callback, then routes defined below them will be ignored. If `next()` is called then future routes will be handled in the order that they were defined until the last one is run, or one of the routes fails to call `next()`. See examples below.

### Example 1

```js
router.get('/test-precedence', function(req, res, next) {
	res.send('first');
});

router.get('/test-precedence', function(req, res, next) {
	res.send('second');
});
```

> In this example the first route will take precedence and run first. The second will never run because the first does not call `next()`

### Example 2

```js
router.get('/test-precedence', function(req, res, next) {
	console.log('first');
	next();
});

router.get('/test-precedence', function(req, res, next) {
	res.send('second');
});
```

### Example 3

```js
router.get('/user/1', function(req, res, next) {
	res.send('something special for user 1');
});

router.use('/user/:userId', function(req, res, next) {
	res.send('the user id is '+req.params.userId);
});
```

> In this example the first route will take precedence and run first, but only for the route `/user/1`. All other routes that start with `/user/...` will run the second route.

## Middleware

Middleware allows you to abstract our certain pieces of code that are used in multiple routes, in order to keep your code [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). All route methods can accept an arbitrary number of functions to run when a request matches the route path. Those functions will be run in the order that they were specified and as long as the previous function called the `next()` callback. See examples below.

### Example 1

```js
function isAuthenticated(req, res, next) {
	if(/* user is logged in */) {
		// Run the next piece of middleware / route
		next();
	}
	else {
		res.status(403).send('You must log in first');
	}
}
router.post('/create-blog-post', isAuthenticated, function(req, res, next) {
	res.send('blog post created');
});
router.put('/edit-blog-post', isAuthenticated, function(req, res, next) {
	res.send('blog post saved');
});
```

> Notice that the `isAuthenticated` function is included in both the `/create-blog-post` and `/edit-blog-post` routes and appears before the route specific logic. It ensures that the user is logged in and calls `next()` if they are. It returns an error if they are not. This is one example of using middleware to prevent duplicating code.

## Additional information

Here are a few guides that walk you through examples of how to use routes within your code:

* [Creating new pages and routes](http://localhost:8080/guides/creating-new-pages-and-routes.html)
* [Creating a dynamic view with ejs](http://localhost:8080/guides/creating-a-dynamic-view-with-ejs.html)

Perk uses express for routing, so you can find more information within the express documentation.

* [Basic routing](http://expressjs.com/en/starter/basic-routing.html)
* [Routing guide](http://expressjs.com/en/guide/routing.html)
* [Router API documenation](http://expressjs.com/en/4x/api.html#router)