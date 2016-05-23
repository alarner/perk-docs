---
title: Routing
description: Perk routing API documentation.
date: 2016-02-27
layout: topic.html
---

## { Coming soon }

## Table of Contents

1. [Overview](#overview)
1. [Creating routes](#creating-routes)
	* [The simple way](#the-simple-way)
	* [The right way](#the-right-way)
1. [Routing methods](#routing-methods)
1. [Routing paths]()
	* [Simple paths]()
	* [Parameterized paths]()
1. [Overriding routes]()
1. [Using middleware]()
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