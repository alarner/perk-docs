---
title: Querying and displaying data with models
description: Learn how to query data from the database using models and display it using a view.
date: 2016-03-19
layout: topic.html
order: 150
---

Querying data from your database and displaying it on a page is a basic task that almost every web app must accomplish. This guide will walk you through how to pull data using a model and display it on a page via a HTML or JSON response. Below is an outline of the steps we will take.

1. Creating a model
1. Create a route for our page
1. Query the database and display the results

## Step 1: Creating a model

Imagine we want to display a list of products or a single product on one of the pages of our application. You can follow the [Database migrations with knex](/v1/guides/database-migrations-knex.html) guide for information on how to create the database table to store your products. For this guide we will assume that your migration has been created and run (i.e. the database table exists).

Once the necessary database table has been created you can create a [Bookshelf model](http://bookshelfjs.org/) to make it easier to interact with (save and query) records in that table. By convention, Bookshelf models live in the `/models` directory of your application. Model files are fairly small. They simply tell Bookshelf which table the model should interact with, as well as any [associations](/v1/api/database.html#associations) that the model may have with other models. Here's what the model file should look like for a Product.

### /models/Product.js

```js
module.exports = bookshelf.model('Product', {
	tableName: 'products',
	hasTimestamps: ['createdAt', 'updatedAt', 'deletedAt']
});
```

> Note: By convention table names are plural, while models are singular.

Notice that this code defines a name for our model `... bookshelf.model('Product' ...` as well as specifies the database table that this model should connect to `tableName: 'products'`. Lastly, it list the important timstamps in our database table.

## Step 2: Creating a route

Routes allow Perk developers to easily determine which backend code should run when a specific URL is requested. You can read more about routes in the [routing documentation](/v1/api/routing.html).

We will create a new routers to break up our routes into smaller logical pieces. To create a new route you can use the `express.Router()` method. First create a new file. By convention each new router lives in its own file inside of the `/routes` directory. Inside of that new file you can load express, create a new router and add your first route:

#### /routes/products.js
```js
// Load express
let express = require('express');

// Create a new router object
let router = express.Router();

// Now we can use router methods
router.get('/list', function(req, res, next) {
	res.send('The products route is working');
});

module.exports = router;
```

Next we need to tell our application to use this route. In the `/app.js` file you can require the route file and tell express to use it. Look for the section of the file that says "ROUTES are loaded here":

#### /app.js
```js

/* 1. ROUTES are loaded here */

let index = require('./routes/index');
let auth = require('./routes/auth');

// YOUR ADDITION: require the new router
let products = require('./routes/products');

/* 2. ROUTES are added here */

app.use('/auth', auth);
app.use('/', index);

// YOUR ADDITION: use the new router
app.use('/products', products);
```

> You should now be able to visit http://localhost:3000/products/list and see a message that says "The products route is working" (we created this message in `/routes/products.js`).


## Step 3: Query the database

Now that we've got our setup complete, we can use our newly created bookshelf model to query the database for results. This will happen inside of our product list route.

#### /routes/products.js
```js
// YOUR ADDITION: Require the product model that we created in step 1
let ProductModel = require('../models/Product');

// ...

router.get('/list', function(req, res, next) {
	// YOUR ADDITION: Instantiate a new Product model
	let products = new ProductModel();

	// YOUR ADDITION: Fetch every product in the database
	products.fetchAll().then(function(results) {
		// YOUR ADDITION: Display the results as JSON
		res.json(results.toJSON());
	});
});

// ...
```

> If you want HTML output instead of JSON you may use a view and follow the instructions in the [Creating a dynamic view with ejs](/v1/guides/creating-a-dynamic-view-with-ejs.html) guide. Instead of passing in a hard coded object like the example shows, you may pass in the results from the database query as shown above.

If you want to query a single record you may use `.fetch()` instead of `.fetchAll()`. A full list of methods available on your models can be found in the [Bookshelf.js documentation](http://bookshelfjs.org).