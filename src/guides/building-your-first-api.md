---
title: Building your first API
description: Follow these steps to build your first API using Perk.
date: 2016-02-15
layout: topic.html
---

One of the most common uses for node is building RESTful APIs. Perk uses express routing with bookshelf models to accomplish this task. It's a short three step process.

### Create a new database table

The first step is to create a new database table. YOu can do this easily with a [knex migration](http://knexjs.org/#Migrations). If you haven't installed the knex command line tools yet, you shoud start by running:

`npm install -g knex`

Imagine we want to create a RESTful API endpoint for creating, reading, updating and deleting a series of products that we will sell via our web application. This is just an example, you could create any endpoint you like. Run the following command *while in the root directory of your Perk project* to create the migration for your new database table:

`knex migrate:make products`

This command will create a new file in the `/migrations` directory of your Perk project. It will be called something like `20160306194216_products.js`. The number might be different than the one listed above, but that's fine. It's just a timestamp of when the migration was created so that it will be run in the correct order. Open up that file and add the following code:

```js
exports.up = function(knex, Promise) {
	return knex.schema.createTable('products', function(t) {
		t.increments('id').unsigned().primary();
		t.dateTime('createdAt').notNull();
		t.dateTime('updatedAt').nullable();
		t.dateTime('deletedAt').nullable();

		t.string('name').notNull();
		t.decimal('price').notNull();
		t.integer('quantity').notNull().defaultTo(0);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('products');
};
```

For each database migration we are going to describe how to change the database schema (that's the *exports.up* part) as well as how to undo that change in case we need to (that's the *exports.down* part). You can read more about migrations in the [Database Migrations with Knex](/guides/database-migrations-knex.html) guide.

Once the migration is complete, run the command:

`knex migrate:latest`

This will run all of the necessary migrations on your database.

### Create a new model

Creating the model is easy. Simply create a new file in your `/models` directory called `Product.js` or whatever the equivalent name would be for the database table you just created. It should start with an upper case letter and be the *singular form* of the database table you created. Inside of the newly created file add the following code:

```js
module.exports = bookshelf.model('Product', {
	tableName: 'products',
	hasTimestamps: ['createdAt', 'updatedAt', 'deletedAt']
});
```

This file specifies the table name that should be associated with this model, as well as the important timestamps that it should keep track of.

### Create a route

Finally, you'll want to create and hook up a new route for your API endpoint.

We've put together a library called *bookshelf-api* that will create express midleware to automatically generate the API endpoint from your models directory. First install it:

`npm instal --save bookshelf-api`

Next, create a new `api.js` file in your `/routes` directory. In that file add the following code:

```js
let express = require('express');
let router = express.Router();
let path = require('path');
let api = require('bookshelf-api')({
	path: path.join(__dirname, '../models')
});

router.use('/product', api);

module.exports = router;
```

This code uses the *bookshelf-api* middleware the handle any requests that start with `/product`.

Finally, let's hook up this route to our application. In your `/app.js` file add the following line of code near the top where you include your routes:

```js
let api = require('./routes/api');
```

Then towards the bottom where you use your routes add the api route:

```js
app.use('/api/v1/', api); // Add this line
app.use('/auth', auth);
app.use('/', index);
```

That should be it! Now anytime you GET, POST, PUT or DELETE to the `/api/v1/products` API endpoint it should update your database.

You can read more about the [bookshelf-api](https://github.com/alarner/bookshelf-api) middleware as well as [knex migrations](http://knexjs.org/#Migrations) on their documentation pages.