---
title: Database Migrations with Knex
description: Learn how to migrate your Postgres database.
date: 2016-02-27
layout: topic.html
order: 500
---

> This guide will explain the purpose of database migrations and show you how to use migrations to create new database tables as well as modify existing tables.

Throughout the lifetime of a web application we often need to make changes to the database structure. Maybe we don't get it 100% right on the first try, or requirements change that necessitate storage of new types of data. If your app is running across multiple environments (development, testing, production, etc.) it can be difficult to keep track of the structural changes to your database because the structure of your database is not tracked in your version control system (e.g. git) by default. Database migrations solve this problem by defining each change made to your database in a migration file, that is tracked by version control.

## Where are migrations stored?

Migrations are simply files that live in the `/migrations` directory of your project. When you use the perk command line tool to create a new project you will notice that there are two migrations in that directory to being with:

* [20151009115505_create_users.js](https://github.com/alarner/perk/blob/master/migrations/20151009115505_create_users.js)
* [20151009155020_create_authentication.js](https://github.com/alarner/perk/blob/master/migrations/20151009155020_create_authentication.js)

> Notice how these files each start with a long number. This number is a timestamp representing when the migration was created. Migrations run in chronological order and this timestamp preserves that order.

These migrations define how user information is stored within Perk, but you can also create your own migrations.

## Creating a migration file

Perk uses [Knex](http://knexjs.org/) for all database related functionality. One of the best features of Knex is it's robust migration support. To create a new migration simply use the knex cli:

```
knex migrate:make migration_name
```

> Your migration name should be something descriptive, not simply the name of the table that you are creating / modifying. Remember that throughout the lifetime of your app there may be several migrations that all relate to the same database table, so you want your migrations names to inform other developers as to what that migration is doing.

After running this command you'll notice that a new file is created withing your migrations directory. This file will include a current timestamp as well as the name that you gave your migration. The file will look like this:

```js

exports.up = function(knex, Promise) {
  
};

exports.down = function(knex, Promise) {
  
};
```

## Structure of a migration file

There are two functions within your newly created migration file. The first is `exports.up`, which specifies the commands that should be run to make the database change that you'd like to make. Usually you'll be running one or more commands found in the [schema builder](http://knexjs.org/#Schema) section of the Knex documentation. These are things like creating database tables, adding or removing a column from a table, changing indexes, etc.

The second function within your migration file is `exports.down`. This functions goal is to do the opposite of what `exports.up` did. If `exports.up` created a table, then `exports.down` will drop that table. If `exports.up` added a column, then `exports.down` will remove that column. The reason to include `exports.down` is so that you can quickly undo a migration should you need to.

## Creating a new database table

Let's go through a real life example. Let's say I want to create a database table that will hold product information including product name, description, price and category. Here's the steps we will take:

1. Create a new migration file with knex cli
1. Write the code for the `exports.up` function
1. Write the code for the `exports.down` function
1. Run the migration

### Step 1: Create a new migration file with knex cli

You can refer back to the [Creating a migration file](#creating-a-migration-file) section of this guide as well.

```
knex migrate:make create_products
```

This will create a file like `/migrations/20160524110801_create_products.js`. Your timestamp will be different. Open that file.

### Step 2: Write the code for the `exports.up` function

Inside of the `exports.up` function of your newly created migration file add the following code:

```js
exports.up = function(knex, Promise) {
	return knex.schema.createTable('products', function(t) {
		t.increments('id').unsigned().primary();
		t.dateTime('createdAt').notNull();
		t.dateTime('updatedAt').nullable();
		t.dateTime('deletedAt').nullable();

		t.string('name').notNull();
		t.text('decription').nullable();
		t.decimal('price', 6, 2).notNull();
		t.enum('category', ['apparel', 'electronics', 'furniture']).notNull();
	});
};
```

Our `exports.up` and `exports.down` functions should always return a promise. In this case we are using `knex.schema.createTable` to create a new database table. We pass in the name of the table and a callback function, in which we can specify the columns that should exist on the table. Notice that the callback takes an argument `t`, which gives us a reference to the table. For each column that we want to create we specify a column type (increments, dateTime, string, text, decimal, enum, etc.) as well as a column name. Certain column types take additional arguments. We can optionally specify more information about each column such as whether or not the column is nullable, its' default value among others. You can find the full list of functionality in the [knex documentation](http://knexjs.org/#Schema).

### Step 3: Write the code for the `exports.down` function

Inside of the `exports.down` function of your create_products migration file add the following code:

```js
exports.down = function(knex, Promise) {
	return knex.schema.dropTable('products');
};
```

This code is meant to do the opposite of `exports.up` in case we need to quickly undo a migration. In this case since we created the products table in `exports.up` we will drop the products table in `exports.down`. As before, we will also return the promise that knex gives to us when calling dropTable.

### Step 4: Run the migration

Now that the migration has been created and defined, we will run the migration on our local database. To do this use the following command:

```
knex migrate:latest
```

> This will cause any new migrations to run. To quickly undo the migration you may run `knex migrate:rollback`

Knex keeps track of which migrations have been run so that it doesn't try to run the same migration twice.

## Adding a column

The process of adding a column is similar to creating a table. We never want to edit a migration file after it has been run because when we run `knex migrate:latest` knex will not make the change. Migrations will only run once. Instead of modifying our existing migration we will create a new migration to specifically add a new column. In this case let's add a quantity column to our products table.

### Step 1: Create a new migration file with knex cli

```
knex migrate:make add_quantity_to_products
```

### Steps 2 & 3: Write the code for `exports.up` and `exports.down`

```js
exports.up = function(knex, Promise) {
	return knex.schema.table('products', function(t) {
		t.integer('quantity').notNull().defaultTo(0);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.table('products', function(t) {
		t.dropColumn('quantity');
	});
};
```

> In this case we are using `knex.schema.table` instead of `knex.schema.createTable`. This allows us to obtain a reference to an existing table for modification. Our `exports.up` function adds a new integer column called quantity, which defaults to a value of zero. `exports.down` undoes the add column by removing it in case we need to rollback our migration.

### Step 4: Run the migration

```
knex migrate:latest
```

## Removing a column

### Step 1: Create a new migration file with knex cli

```
knex migrate:make remove_category_from_products
```

### Steps 2 & 3: Write the code for `exports.up` and `exports.down`

```js
exports.up = function(knex, Promise) {
	return knex.schema.table('products', function(t) {
		t.dropColumn('category');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.table('products', function(t) {
		t.enum('category', ['apparel', 'electronics', 'furniture']).notNull();
	});
};
```

### Step 4: Run the migration

```
knex migrate:latest
```

## Adding an index

### Step 1: Create a new migration file with knex cli

```
knex migrate:make index_product_price
```

### Steps 2 & 3: Write the code for `exports.up` and `exports.down`

```js
exports.up = function(knex, Promise) {
	return knex.schema.table('products', function(t) {
		t.index([ 'price' ]);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.table('products', function(t) {
		t.dropIndex([ 'price' ]);
	});
};
```

### Step 4: Run the migration

```
knex migrate:latest
```