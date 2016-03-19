---
title: Creating new pages and routes
description: Learn how to use express routing with Perk to create new pages.
date: 2016-03-19
layout: topic.html
order: 110
---

Perk uses standard express routing to determine how the server should respond to a request from the client. The overall flow of data looks like:

`client request` > `route` > `view (optional)` > `server response`

In order to create a new route we need to modify the `/app.js` file. When your server boots up for the first time your `/app.js` file specifies all of the available routes. When you start a new Perk project it will come with a few routes already baked in, which you're welcome to change.

To add a new route we need to do three things:

1. Create a new route file
1. Create a new view file
1. Load and use the route file

### 1. Create the new route file

Perk routes are stored in the `/routes` directory. Create a new file in that directory. For the sake of this guide we will be creating bloggin routes in `/routes/blog.js`.

After creating the blog route we'll want to add some boilerplate code:

```js
// load express router
let router = require('express').Router();

// create the route to handle GET requests to /blog
router.get('/', function(req, res, next) {
	/*
	 * All of the code that you want to run
	 * when the client makes a GET request
	 * to /blog  should go here. In this case
	 * we are simply rendering a view.
	 */
	res.render('blog/index');
});

// export the router
module.exports = router;
```

### 2. Create the new view file

Since our route renders a new view we want to also create that view. In our route we wrote the following code:

```js
res.render('blog/index');
```

This will render the view in `/views/blog/index.ejs` so we need to create this file now. We'll just throw in some basic HTML:

```html
<!DOCTYPE html>
<html>
<head>
	<title>Welcome to my blog</title>
</head>
<body>
	<p>Come back later to see some blog posts.</p>
</body>
</html>
```

If we were truely creating a blog we would want to display a list of posts here. You can learn about how to use models to query and [display data from the database](/guides/querying-and-displaying-data-with-models.html).

### 3. Load and use the route file

If you open up `/app.js` you'll find a section of the file that looks something like this:

```js
/*******************************/
/*                             */
/*            ROUTES           */
/*                             */
/*******************************/

/* 1. ROUTES are loaded here */

// let api = require('./routes/api1');
let index = require('./routes/index');
let auth = require('./routes/auth');

/* 2. ROUTES are added here */

// app.use('/api/v1/', api);
app.use('/auth', auth);
app.use('/', index);
```

This is where we can actually use the express route that we created in step 1. First we need to load the route from our `/routes` directory.

```js
let myBlogRoute = require('./routes/blog');
```

Next we want to use that route. This will send all requests that start with `/blog` to our newly created route for further processing.

```js
app.use('/blog', myBlogRoute);
```

If you want to learn more about express routes you can check out their [routing documentation](http://expressjs.com/en/guide/routing.html).